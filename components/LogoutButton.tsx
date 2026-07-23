"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async (): Promise<void> => {
    await signOut({
      redirectTo: "/login",
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm hover:text-red-500"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}