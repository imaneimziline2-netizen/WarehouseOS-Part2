"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import LogoutButton from "../LogoutButton";

export default function Header() {
  const { data } = useSession();

  return (
    <header className="border-b bg-white">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
    {/* Left */}
    <div className="flex items-center gap-4 md:gap-8">
      <h1 className="text-lg font-bold md:text-xl">
        WarehouseOS
      </h1>

      <nav>
        <Link
          href="/dashboard"
          className="text-sm font-medium hover:text-slate-600"
        >
          Dashboard
        </Link>
      </nav>
    </div>

    <div className="flex items-center gap-3 md:gap-6">
      <div className="hidden text-right sm:block">
        <h3 className="text-sm font-semibold">
          {data?.user?.name}
        </h3>

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