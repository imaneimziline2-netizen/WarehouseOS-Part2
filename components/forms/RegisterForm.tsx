"use client";

import Link from "next/link";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function RegisterForm() {
  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Create Account</h2>

        <p className="text-sm text-slate-500">
          Join our inventory management platform.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>

          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              placeholder="John Doe"
              className="pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email Address</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              type="email"
              placeholder="you@company.com"
              className="pl-10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Password</Label>

            <span className="text-xs text-slate-400">
              Min. 8 characters
            </span>
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

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label>Confirm Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              type="password"
              placeholder="********"
              className="pl-10"
            />
          </div>
        </div>

        {/* Security Card */}
        <div className="rounded-lg border bg-slate-50 p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />

            <div>
              <h4 className="font-medium">
                Secure Registration
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Your password will be encrypted before being stored.
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full">
          Create Account
        </Button>

        <div className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Login here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}