import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth();

    if (request.nextUrl.pathname == "/dashboard" && !session?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
        (request.nextUrl.pathname == "/login" ||
            request.nextUrl.pathname == "/register") &&
        session?.user
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}
