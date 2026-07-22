import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <TriangleAlert className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-5xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the page you are looking for doesn t exist or has been moved.
        </p>

        <Button  className="mt-8">
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </main>
  );
}