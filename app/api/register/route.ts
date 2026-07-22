import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: result.error.flatten().fieldErrors,
                },
                {
                    status: 400,
                },
            );
        }

        await connectDB();

        const existingUser = await User.findOne({
            email: result.data.email,
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 409 },
            );
        }

        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        const user = await User.create({
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 201,
            },
        );

       
    } catch (error) {
        console.error("Register Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            },
        );
    }
}
