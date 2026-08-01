"use client";

import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // لو ماعندكش lucide-react, دير npm install lucide-react

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-gray-900 tracking-tight">
          WarehouseOS
        </Link>

        {/* Desktop Navigation */}
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

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/products/create"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition-colors shadow-sm"
          >
            + Add Product
          </Link>
          <LogoutButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (اللائحة اللي كتظهر فاش كدير كليك فالموبايل) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4 absolute top-full left-0 w-full shadow-lg z-50">
          <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
          <Link href="/stock/movements" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>
            Movements
          </Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/products/create"
              className="text-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition-colors shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              + Add Product
            </Link>
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
}