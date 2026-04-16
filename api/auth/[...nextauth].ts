// api/auth/[...nextauth].ts
// Handles all Auth.js routes: /api/auth/signin, /api/auth/callback/google, etc

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Block sign-in for anyone not on a brown.edu email
    async signIn({ profile }) {
      const email = profile?.email ?? "";
      return email.endsWith("@brown.edu");
    },
    // Make the email available in the session
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    // Shown when a non-Brown email tries to sign in
    error: "/blog/auth-error",
  },
});

export const { GET, POST } = handlers;
