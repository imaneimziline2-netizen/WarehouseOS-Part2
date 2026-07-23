"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();

        setError("");

        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    };

    return (
        <Card className="shadow-lg border-slate-200">
            <CardHeader>
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="text-sm text-slate-500">
                    Sign in to manage your inventory.
                </p>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label>Email address</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                            <Input
                                name="email"
                                type="email"
                                placeholder="you@company.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                type="password"
                                placeholder="********"
                                className="pl-10"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
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
                </form>
            </CardContent>
        </Card>
    );
}
