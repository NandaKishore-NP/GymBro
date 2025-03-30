import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";
import { Database } from 'better-sqlite3';

// Add response options to control caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define types
interface WeightLog {
  weight: number;
  date: string;
}

interface UserProfile {
  height: number | null;
  target_weight: number | null;
}

interface User {
  id: string | number;
  name: string;
  email: string;
  created_at: string;
}

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// Schema for profile data
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  currentWeight: z.number().positive("Weight must be a positive number"),
  targetWeight: z.number().positive("Target weight must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
});

// Get the user profile data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // In production environment
    if (isProduction) {
      try {
        // Dynamic import PostgreSQL client to reduce cold start time
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Get basic user data
        const user = await mysqlDb.queryRow(
          'SELECT id, name, email, created_at FROM users WHERE id = $1',
          [userId]
        ) as User;
        
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Get the latest weight log
        const latestWeight = await mysqlDb.queryRow(
          'SELECT weight, date FROM weight_logs WHERE user_id = $1 ORDER BY date DESC LIMIT 1',
          [userId]
        ) as WeightLog | null;
        
        // Get the user's target weight (if exists)
        const userProfile = await mysqlDb.queryRow(
          'SELECT height, target_weight FROM user_profiles WHERE user_id = $1',
          [userId]
        ) as UserProfile | null;
        
        return NextResponse.json({
          ...user,
          currentWeight: latestWeight?.weight || null,
          weightDate: latestWeight?.date || null,
          targetWeight: userProfile?.target_weight || null,
          height: userProfile?.height || null,
        });
      } catch (error) {
        console.error("PostgreSQL error:", error);
        return NextResponse.json(
          { error: "Database error occurred in production environment" },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        // We're using a type assertion here because our db.ts file ensures
        // that in development mode, DB will not be null.
        // This is a TypeScript safeguard.
        const database = db as Database;
        
        // Get basic user data
        const user = database.prepare(`
          SELECT id, name, email, created_at 
          FROM users 
          WHERE id = ?
        `).get(userId) as User;
        
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Get the latest weight log
        const latestWeight = database.prepare(`
          SELECT weight, date
          FROM weight_logs
          WHERE user_id = ?
          ORDER BY date DESC
          LIMIT 1
        `).get(userId) as WeightLog | undefined;
        
        console.log('Latest weight from DB:', latestWeight);
        
        // Get the user's target weight (if exists)
        const userProfile = database.prepare(`
          SELECT height, target_weight
          FROM user_profiles
          WHERE user_id = ?
        `).get(userId) as UserProfile | undefined;
        
        console.log('User profile from DB:', userProfile);
        
        const response = {
          ...user,
          currentWeight: latestWeight?.weight || null,
          weightDate: latestWeight?.date || null,
          targetWeight: userProfile?.target_weight || null,
          height: userProfile?.height || null,
        };
        
        console.log('Profile response:', response);
        
        return NextResponse.json(response);
      } catch (error) {
        console.error("SQLite error:", error);
        return NextResponse.json(
          { error: "Database error occurred in development environment" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the profile" },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PUT(req: NextRequest) {
  // Set a timeout to prevent hanging requests
  const requestTimeout = 15000; // 15 seconds
  let timeoutId: NodeJS.Timeout | null = null;
  
  // Create a timeout promise
  const timeoutPromise = new Promise<NextResponse>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Request timed out after 15 seconds'));
    }, requestTimeout);
  });
  
  try {
    // Wrap the entire request handling in a Promise
    const responsePromise = async () => {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      const userId = session.user.id;
      const body = await req.json();
      
      // Validate request body
      const validationResult = profileSchema.safeParse(body);
      if (!validationResult.success) {
        return NextResponse.json(
          { error: "Invalid data", details: validationResult.error.format() },
          { status: 400 }
        );
      }
      
      const { name, currentWeight, targetWeight, height } = validationResult.data;
      
      // In production environment
      if (isProduction) {
        try {
          // Import PostgreSQL client
          const { mysqlDb } = await import('@/lib/pg-db');
          
          // Start a transaction (PostgreSQL)
          await mysqlDb.query('START TRANSACTION');
          
          try {
            // Update user name
            await mysqlDb.update(
              'UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2',
              [name, userId]
            );
            
            // Check if user profile exists
            const profileExists = await mysqlDb.queryRow(
              'SELECT id FROM user_profiles WHERE user_id = $1',
              [userId]
            );
            
            // Update or insert profile
            if (profileExists) {
              await mysqlDb.update(
                'UPDATE user_profiles SET height = $1, target_weight = $2, updated_at = NOW() WHERE user_id = $3',
                [height, targetWeight, userId]
              );
            } else {
              await mysqlDb.insert(
                'INSERT INTO user_profiles (user_id, height, target_weight) VALUES ($1, $2, $3)',
                [userId, height, targetWeight]
              );
            }
            
            // Add weight log
            await mysqlDb.insert(
              'INSERT INTO weight_logs (user_id, weight, date) VALUES ($1, $2, CURRENT_DATE)',
              [userId, currentWeight]
            );
            
            // Commit transaction
            await mysqlDb.query('COMMIT');
            
            return NextResponse.json({ 
              message: "Profile updated successfully",
              updatedProfile: {
                name,
                currentWeight,
                targetWeight,
                height,
              }
            });
          } catch (error) {
            // Rollback transaction on error
            await mysqlDb.query('ROLLBACK');
            throw error;
          }
        } catch (error) {
          console.error("PostgreSQL profile update error:", error);
          return NextResponse.json(
            { error: "An error occurred while updating the profile in production" },
            { status: 500 }
          );
        }
      }
      // In development with SQLite
      else {
        try {
          // We're using a type assertion here because our db.ts file ensures
          // that in development mode, DB will not be null.
          const database = db as Database;
          
          // Start a transaction
          database.prepare("BEGIN TRANSACTION").run();
          
          try {
            // Update user name
            database.prepare(`
              UPDATE users 
              SET name = ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `).run(name, userId);
            
            // Check if user_profiles table exists, if not create it
            database.exec(`
              CREATE TABLE IF NOT EXISTS user_profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL UNIQUE,
                height REAL,
                target_weight REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
              );
            `);
            
            // Upsert user profile (insert or update)
            const profileExists = database.prepare(`
              SELECT id FROM user_profiles WHERE user_id = ?
            `).get(userId);
            
            if (profileExists) {
              database.prepare(`
                UPDATE user_profiles
                SET height = ?, target_weight = ?, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?
              `).run(height, targetWeight, userId);
            } else {
              database.prepare(`
                INSERT INTO user_profiles (user_id, height, target_weight)
                VALUES (?, ?, ?)
              `).run(userId, height, targetWeight);
            }
            
            // Add a new weight log entry
            database.prepare(`
              INSERT INTO weight_logs (user_id, weight, date)
              VALUES (?, ?, date('now'))
            `).run(userId, currentWeight);
            
            // Commit the transaction
            database.prepare("COMMIT").run();
            
            return NextResponse.json({ 
              message: "Profile updated successfully",
              updatedProfile: {
                name,
                currentWeight,
                targetWeight,
                height,
              }
            });
          } catch (error) {
            // Rollback the transaction on error
            database.prepare("ROLLBACK").run();
            throw error;
          }
        } catch (error) {
          console.error("SQLite profile update error:", error);
          return NextResponse.json(
            { error: "An error occurred while updating the profile in development" },
            { status: 500 }
          );
        }
      }
    };

    // Wait for the response or timeout
    const response = await Promise.race([responsePromise(), timeoutPromise]);
    
    // Clear timeout if the request completes
    if (timeoutId) clearTimeout(timeoutId);
    
    return response;
  } catch (error: any) {
    // Clear timeout if there's an error
    if (timeoutId) clearTimeout(timeoutId);
    
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: `An error occurred while updating the profile: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// Note: For a complete implementation, you would need to:
// 1. Update the PUT method to use the same pattern as GET
// 2. Apply similar changes to all other API routes
// 3. Create a fully-functional PostgreSQL implementation for production 