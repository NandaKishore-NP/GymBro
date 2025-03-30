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

// Get a specific partner/friend's progress
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const url = new URL(req.url);
    const partnerId = url.searchParams.get('id');
    
    if (!partnerId) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 }
      );
    }
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Check if the relationship exists and is accepted
        const relationship = await mysqlDb.query(`
          SELECT id FROM user_relationships 
          WHERE ((user_id = $1 AND related_user_id = $2) OR (user_id = $2 AND related_user_id = $1))
          AND status = 'accepted'
        `, [userId, partnerId]);
        
        if (!relationship || relationship.length === 0) {
          return NextResponse.json(
            { error: "Not in an accepted relationship with this user" },
            { status: 403 }
          );
        }
        
        // Get partner's basic info
        const partnerInfo = await mysqlDb.query(`
          SELECT id, name, email, created_at
          FROM users
          WHERE id = $1
        `, [partnerId]);
        
        if (!partnerInfo || partnerInfo.length === 0) {
          return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }
        
        // Get partner's weight logs
        const weightLogs = await mysqlDb.query(`
          SELECT weight, date
          FROM weight_logs
          WHERE user_id = $1
          ORDER BY date DESC
          LIMIT 10
        `, [partnerId]);
        
        // Get partner's recent workouts
        const recentWorkouts = await mysqlDb.query(`
          SELECT id, name, date, notes, heart_rate
          FROM workouts
          WHERE user_id = $1
          ORDER BY date DESC
          LIMIT 5
        `, [partnerId]);
        
        // Get exercise summary
        const exerciseSummary = await mysqlDb.query(`
          SELECT e.name, COUNT(*) as workout_count, 
                 MAX(weight) as max_weight, AVG(weight) as avg_weight
          FROM exercises e
          JOIN workouts w ON e.workout_id = w.id
          WHERE w.user_id = $1
          GROUP BY e.name
          ORDER BY workout_count DESC
          LIMIT 5
        `, [partnerId]);
        
        return NextResponse.json({
          partner: partnerInfo[0],
          weightLogs,
          recentWorkouts,
          exerciseSummary
        });
      } catch (error) {
        console.error("PostgreSQL error fetching partner progress:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching partner progress in production" },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        const database = db as Database;
        
        // Check if the relationship exists and is accepted
        const relationship = database.prepare(`
          SELECT id FROM user_relationships 
          WHERE ((user_id = ? AND related_user_id = ?) OR (user_id = ? AND related_user_id = ?))
          AND status = 'accepted'
        `).get(userId, partnerId, partnerId, userId) as { id: number } | undefined;
        
        if (!relationship) {
          return NextResponse.json(
            { error: "Not in an accepted relationship with this user" },
            { status: 403 }
          );
        }
        
        // Get partner's basic info
        const partnerInfo = database.prepare(`
          SELECT id, name, email, created_at
          FROM users
          WHERE id = ?
        `).get(partnerId) as { id: number; name: string; email: string; created_at: string } | undefined;
        
        if (!partnerInfo) {
          return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }
        
        // Get partner's weight logs
        const weightLogs = database.prepare(`
          SELECT weight, date
          FROM weight_logs
          WHERE user_id = ?
          ORDER BY date DESC
          LIMIT 10
        `).all(partnerId);
        
        // Get partner's recent workouts
        const recentWorkouts = database.prepare(`
          SELECT id, name, date, notes, heart_rate
          FROM workouts
          WHERE user_id = ?
          ORDER BY date DESC
          LIMIT 5
        `).all(partnerId);
        
        // Get exercise summary
        const exerciseSummary = database.prepare(`
          SELECT e.name, COUNT(*) as workout_count, 
                 MAX(weight) as max_weight, AVG(weight) as avg_weight
          FROM exercises e
          JOIN workouts w ON e.workout_id = w.id
          WHERE w.user_id = ?
          GROUP BY e.name
          ORDER BY workout_count DESC
          LIMIT 5
        `).all(partnerId);
        
        return NextResponse.json({
          partner: partnerInfo,
          weightLogs,
          recentWorkouts,
          exerciseSummary
        });
      } catch (error) {
        console.error("SQLite error fetching partner progress:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching partner progress in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching partner progress:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching partner progress" },
      { status: 500 }
    );
  }
} 