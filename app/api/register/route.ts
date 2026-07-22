import { registerSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const result = registerSchema.safeParse(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error("POST ERROR:", error);

        return NextResponse.json(
            {
                message: "Erreur serveur",
                error,
            },
            {
                status: 500,
            },
        );
    }
}
