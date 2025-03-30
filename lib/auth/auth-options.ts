import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db, DatabaseInstance } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { DatabaseUser } from "@/lib/types";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Check environment
const isProduction = process.env.NODE_ENV === 'production';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          const email = credentials.email;
          const password = credentials.password;
          
          // Handle different database environments
          if (isProduction) {
            // Production: MySQL
            try {
              const { mysqlDb } = await import('@/lib/mysql-db');
              
              // Query the MySQL database
              const dbUser = await mysqlDb.queryRow(
                "SELECT * FROM users WHERE email = ?",
                [email]
              );
              
              if (!dbUser) return null;
              
              // Cast to our expected type
              const user = dbUser as unknown as DatabaseUser;
              
              // Verify password
              const isValid = await bcrypt.compare(password, user.password);
              
              if (!isValid) return null;
              
              // Return user without password
              return {
                id: user.id,
                email: user.email,
                name: user.name
              };
            } catch (error) {
              console.error('MySQL auth error:', error);
              return null;
            }
          } else {
            // Development: SQLite
            if (!db) {
              console.error('SQLite database not initialized');
              return null;
            }
            
            // Use the SQLite database
            const sqlite = db as DatabaseInstance;
            
            try {
              // Find the user
              const stmt = sqlite.prepare("SELECT * FROM users WHERE email = ?");
              const user = stmt.get(email) as DatabaseUser | undefined;
              
              if (!user) return null;
              
              // Verify password
              const isValid = await bcrypt.compare(password, user.password);
              
              if (!isValid) return null;
              
              // Return user without password
              return {
                id: user.id,
                email: user.email,
                name: user.name
              };
            } catch (error) {
              console.error('SQLite auth error:', error);
              return null;
            }
          }
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
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
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}; 