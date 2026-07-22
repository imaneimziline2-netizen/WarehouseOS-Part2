"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function LoginForm() {
  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader>
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-slate-500">
          Sign in to manage your inventory.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Email address</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              type="email"
              placeholder="you@company.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label>Password</Label>

    <button
      type="button"
      className="text-xs text-slate-500 hover:text-slate-900"
    >
      Forgot password?
    </button>
  </div>

  <div className="relative">
    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

    <Input
      type="password"
      placeholder="********"
      className="pl-10"
    />
  </div>
</div>

        <Button className="w-full">
          Sign In
        </Button>

        <div className="text-center text-sm">
          Don t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-slate-900 hover:underline"
          >
            Create one
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}