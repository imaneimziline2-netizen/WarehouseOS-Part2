import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "./mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                },
                password: {
                    type: "password",
                },
            },

            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                console.log(
                    credentials,
                    "ccccccccccccccccccccccccccccccccccccccccccccccccccc",
                );

                if (!email || !password) {
                    // throw new Error("Missing email or password credentials");

                    const error = new CredentialsSignin();
                    error.code = "Missing email or password credentials";
                    throw error;
                }

                await connectDB();
                const user = await User.findOne({ email });

                if (!user) {
                    // throw new Error("No user found with this email");
                    const error = new CredentialsSignin();
                    error.code = "No user found with this email";
                    throw error;
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password,
                );

                if (!isPasswordValid) {
                    // throw new Error("Password is not correct");
                    const error = new CredentialsSignin();
                    error.code = "Password is not correct";
                    throw error;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});
