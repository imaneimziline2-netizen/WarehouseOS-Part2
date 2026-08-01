import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import "@/models/Category";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id).populate("category");

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

 return NextResponse.json([], { status: 200 }); 
}

export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        archived: true,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product archived successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}