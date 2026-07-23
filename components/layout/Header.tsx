"use client"
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { useSession } from "next-auth/react";

export default function Header() {

  const {data} = useSession()
  
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-bold">WarehouseOS</h1>

                    <nav>
                        <Link
                            href="/dashboard"
                            className="border-b-2 border-slate-900 pb-5 text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <h3 className="text-sm font-semibold"> {data?.user?.name}</h3>

                        <p className="text-xs text-slate-500">
                            {data?.user?.email}
                        </p>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
