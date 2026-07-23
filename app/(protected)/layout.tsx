"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SessionProvider>
                <Header />

                <main className="min-h-screen bg-slate-50">{children}</main>

                <Footer />
            </SessionProvider>
        </>
    );
}
