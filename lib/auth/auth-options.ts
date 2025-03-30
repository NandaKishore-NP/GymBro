import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "@/types";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Validate input
          const result = loginSchema.safeParse(credentials);
          if (!result.success) {
            return null;
          }

          const { email, password } = result.data;

          // Find user in database
          const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
          
          if (!user) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }

          // Return user object without the password
          const { password: _, ...userWithoutPassword } = user;
          
          return userWithoutPassword as any;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      
      // Return previous token on subsequent calls
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Make sure we use the NEXTAUTH_SECRET from .env.local
  secret: process.env.NEXTAUTH_SECRET,
  // Improve JWT behavior
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  // Debug mode in development
  debug: process.env.NODE_ENV === "development",
}; 