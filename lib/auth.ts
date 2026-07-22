import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {handlers , singIn, singOut, auth}=NextAuth({
    providers: [
        Credentials({
            credentials: {},
            async authorize(credentials){
                return null;
            }
        })
    ]
})