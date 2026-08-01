"use client";

import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900 tracking-tight">
            WarehouseOS
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              Dashboard
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              Categories
            </Link>
            <Link href="/stock/movements" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              Movements
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/products/create"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition-colors shadow-sm"
          >
            + Add Product
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}