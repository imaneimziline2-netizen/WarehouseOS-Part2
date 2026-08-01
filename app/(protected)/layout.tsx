"use client";
import { SessionProvider } from "next-auth/react";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SessionProvider>

                <main className="min-h-screen bg-slate-50">{children}</main>

            </SessionProvider>
        </>
    );
}
