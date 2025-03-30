import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { Database } from "better-sqlite3";

// Add response options to control caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Get weight logs for the user
        const weightLogs = await mysqlDb.query(`
          SELECT id, weight, date 
          FROM weight_logs 
          WHERE user_id = $1
          ORDER BY date ASC
        `, [userId]);
        
        return NextResponse.json(weightLogs);
      } catch (error) {
        console.error("PostgreSQL error fetching weight logs:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching weight logs in production" },
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
        
        // Get weight logs for the user
        const weightLogs = database.prepare(`
          SELECT id, weight, date 
          FROM weight_logs 
          WHERE user_id = ?
          ORDER BY date ASC
        `).all(userId);
        
        return NextResponse.json(weightLogs);
      } catch (error) {
        console.error("SQLite error fetching weight logs:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching weight logs in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching weight logs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching weight logs" },
      { status: 500 }
    );
  }
} 