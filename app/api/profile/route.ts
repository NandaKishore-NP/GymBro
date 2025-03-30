import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

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

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// In production, dynamically import MySQL client
let mysqlDb: any = null;
if (isProduction) {
  import('@/lib/mysql-db').then(module => {
    mysqlDb = module.mysqlDb;
  }).catch(err => {
    console.error('Failed to load MySQL client:', err);
  });
}

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
    
    // In production with MySQL
    if (isProduction) {
      if (!mysqlDb) {
        // If MySQL module hasn't loaded yet, load it
        const module = await import('@/lib/mysql-db');
        mysqlDb = module.mysqlDb;
      }
      
      // Get basic user data
      const user = await mysqlDb.queryRow(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [userId]
      );
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      // Get the latest weight log
      const latestWeight = await mysqlDb.queryRow(
        'SELECT weight, date FROM weight_logs WHERE user_id = ? ORDER BY date DESC LIMIT 1',
        [userId]
      );
      
      // Get the user's target weight (if exists)
      const userProfile = await mysqlDb.queryRow(
        'SELECT height, target_weight FROM user_profiles WHERE user_id = ?',
        [userId]
      );
      
      return NextResponse.json({
        ...user,
        currentWeight: latestWeight?.weight || null,
        weightDate: latestWeight?.date || null,
        targetWeight: userProfile?.target_weight || null,
        height: userProfile?.height || null,
      });
    }
    // In development with SQLite
    else {
      // Get basic user data
      const user = db.prepare(`
        SELECT id, name, email, created_at 
        FROM users 
        WHERE id = ?
      `).get(userId);
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      // Get the latest weight log
      const latestWeight = db.prepare(`
        SELECT weight, date
        FROM weight_logs
        WHERE user_id = ?
        ORDER BY date DESC
        LIMIT 1
      `).get(userId) as WeightLog | undefined;
      
      // Get the user's target weight (if exists)
      const userProfile = db.prepare(`
        SELECT height, target_weight
        FROM user_profiles
        WHERE user_id = ?
      `).get(userId) as UserProfile | undefined;
      
      return NextResponse.json({
        ...user,
        currentWeight: latestWeight?.weight || null,
        weightDate: latestWeight?.date || null,
        targetWeight: userProfile?.target_weight || null,
        height: userProfile?.height || null,
      });
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
  try {
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
    
    // Start a transaction
    db.prepare("BEGIN TRANSACTION").run();
    
    try {
      // Update user name
      db.prepare(`
        UPDATE users 
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(name, userId);
      
      // Check if user_profiles table exists, if not create it
      db.exec(`
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
      const profileExists = db.prepare(`
        SELECT id FROM user_profiles WHERE user_id = ?
      `).get(userId);
      
      if (profileExists) {
        db.prepare(`
          UPDATE user_profiles
          SET height = ?, target_weight = ?, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).run(height, targetWeight, userId);
      } else {
        db.prepare(`
          INSERT INTO user_profiles (user_id, height, target_weight)
          VALUES (?, ?, ?)
        `).run(userId, height, targetWeight);
      }
      
      // Add a new weight log entry
      db.prepare(`
        INSERT INTO weight_logs (user_id, weight, date)
        VALUES (?, ?, date('now'))
      `).run(userId, currentWeight);
      
      // Commit the transaction
      db.prepare("COMMIT").run();
      
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
      db.prepare("ROLLBACK").run();
      throw error;
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the profile" },
      { status: 500 }
    );
  }
} 