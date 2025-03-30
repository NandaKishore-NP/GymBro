import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Database } from "better-sqlite3";

export const dynamic = 'force-dynamic';

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

export async function GET() {
  try {
    // In production with MySQL
    if (isProduction) {
      try {
        // Import MySQL client
        const { mysqlDb } = await import('@/lib/mysql-db');
        
        // Test database connection - in MySQL we can query information_schema
        const tables = await mysqlDb.query(`
          SELECT table_name as name
          FROM information_schema.tables
          WHERE table_schema = DATABASE()
          ORDER BY table_name
        `);
        
        // Check if workouts table exists
        const hasWorkoutsTable = tables.some((table: any) => table.name === 'workouts');
        
        // Get number of workouts
        let workoutCount = 0;
        if (hasWorkoutsTable) {
          const result = await mysqlDb.queryRow('SELECT COUNT(*) as count FROM workouts');
          workoutCount = result?.count || 0;
        }
        
        return NextResponse.json({
          status: 'ok',
          database: 'MySQL',
          message: 'Database is accessible',
          tables: tables.map((t: any) => t.name),
          hasWorkoutsTable,
          workoutCount
        });
      } catch (error: any) {
        console.error('MySQL database test error:', error);
        return NextResponse.json({
          status: 'error',
          database: 'MySQL',
          message: 'Database error in production',
          error: error.message
        }, { status: 500 });
      }
    }
    // In development with SQLite
    else {
      try {
        // We're using a type assertion here because our db.ts file ensures
        // that in development mode, DB will not be null.
        const database = db as Database;
        
        // Test database connection
        const tables = database.prepare(`
          SELECT name FROM sqlite_master 
          WHERE type='table'
          ORDER BY name
        `).all();
        
        // Check if workouts table exists
        const hasWorkoutsTable = tables.some((table: any) => table.name === 'workouts');
        
        // Get number of workouts
        let workoutCount = 0;
        if (hasWorkoutsTable) {
          const result = database.prepare('SELECT COUNT(*) as count FROM workouts').get() as { count: number };
          workoutCount = result.count;
        }
        
        return NextResponse.json({
          status: 'ok',
          database: 'SQLite',
          message: 'Database is accessible',
          tables: tables.map((t: any) => t.name),
          hasWorkoutsTable,
          workoutCount
        });
      } catch (error: any) {
        console.error('SQLite database test error:', error);
        return NextResponse.json({
          status: 'error',
          database: 'SQLite',
          message: 'Database error in development',
          error: error.message
        }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error('Database test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database error',
      error: error.message
    }, { status: 500 });
  }
} 