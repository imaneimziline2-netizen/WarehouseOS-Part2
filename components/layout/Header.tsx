import Link from "next/link";
import { Bell, LogOut, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
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

        {/* Right */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <h3 className="text-sm font-semibold">John Doe</h3>

            <p className="text-xs text-slate-500">
              john@example.com
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm hover:text-red-500">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}