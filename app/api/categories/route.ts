import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/validations";



export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({
      archived: false,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body = await request.json();

    const validation =
      categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors:
            validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const category =
      await Category.create(body);

    return NextResponse.json(
      category,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}