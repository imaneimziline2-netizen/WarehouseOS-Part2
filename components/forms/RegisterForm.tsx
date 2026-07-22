"use client";

import Link from "next/link";
import { Mail, Lock, User, ShieldCheck, AwardIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};
type FieldErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
};

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();

        setLoading(true);
        setErrors({});
        setServerError("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setServerError(data.message);
                }

                return;
            }

            router.push("/login");
        } catch (error) {
            console.error(error);

            setServerError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center">
                <h2 className="text-2xl font-bold">Create Account</h2>

                <p className="text-sm text-slate-500">
                    Join our inventory management platform.
                </p>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {serverError && (
                        <div className="rounded-md bg-red-100 border border-red-300 px-4 py-2 text-sm text-red-700">
                            {serverError}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label>Full Name</Label>

                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                            <Input
                                name="name"
                                placeholder="John Doe"
                                className="pl-10"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email Address</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                            <Input
                                type="email"
                                name="email"
                                placeholder="you@company.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>
                    </div>

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
                                name="password"
                                placeholder="********"
                                className="pl-10"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Confirm Password</Label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                className="pl-10"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.confirmPassword[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border bg-slate-50 p-4">
                        <div className="flex gap-3">
                            <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />

                            <div>
                                <h4 className="font-medium">
                                    Secure Registration
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your password will be encrypted before being
                                    stored.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Account"}
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
                </form>
            </CardContent>
        </Card>
    );
}
