import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Database } from "better-sqlite3";

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// Validation schema for signup
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // In production with PostgreSQL
    if (isProduction) {
      try {
        // Import PostgreSQL client instead of MySQL
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Check if user already exists
        const existingUser = await mysqlDb.queryRow(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        
        if (existingUser) {
          return NextResponse.json(
            { error: "User with this email already exists" },
            { status: 409 }
          );
        }
        
        // Insert user into database - note the parameter format change for PostgreSQL
        const userId = await mysqlDb.insert(
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
          [name, email, hashedPassword]
        );
        
        // Return success response without the password
        return NextResponse.json(
          {
            id: userId,
            name,
            email,
            message: "User created successfully",
          },
          { status: 201 }
        );
      } catch (error) {
        console.error("PostgreSQL signup error:", error);
        return NextResponse.json(
          { error: "An error occurred while creating the user in production" },
          { status: 500 }
        );
      }
    } 
    // In development with SQLite
    else {
      try {
        // Check if db is available
        if (!db) {
          throw new Error("Database is not initialized in development mode");
        }
        
        // Check if user already exists
        const existingUser = db!.prepare("SELECT * FROM users WHERE email = ?").get(email);
        
        if (existingUser) {
          return NextResponse.json(
            { error: "User with this email already exists" },
            { status: 409 }
          );
        }
        
        // Insert user into database
        const insertStmt = db!.prepare(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
        );
        
        const info = insertStmt.run(name, email, hashedPassword);
        
        // Return success response without the password
        return NextResponse.json(
          {
            id: info.lastInsertRowid,
            name,
            email,
            message: "User created successfully",
          },
          { status: 201 }
        );
      } catch (error) {
        console.error("SQLite signup error:", error);
        return NextResponse.json(
          { error: "An error occurred while creating the user in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
} 