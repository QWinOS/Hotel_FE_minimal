import { access } from "fs";
import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // providers: [Google],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // checks: ["pkce", "state"],
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          respinse_type: "code",
        },
      },
    }),
  ],
  // cookies: {
  //   pkceCodeVerifier: {
  //     name: "next-auth.pkce.code_verifier",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "none",
  //       path: "/",
  //     },
  //   },
  // },
});
