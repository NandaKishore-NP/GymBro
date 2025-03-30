// Type definitions for NextAuth

import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string | number;
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string | number;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT types
   */
  interface JWT extends DefaultJWT {
    id: string | number;
  }
}

// SQLite specific types
export interface SqliteDBQuery {
  get: <T = any>(params?: any) => T | undefined;
  all: <T = any>(params?: any) => T[];
  run: (params?: any) => { lastInsertRowid?: number; changes?: number };
}

export interface SqliteTransaction {
  commit: () => void;
  rollback: () => void;
}

// Database user
export interface DatabaseUser {
  id: number;
  email: string;
  name: string;
  password: string;
} 