import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection
    const tables = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table'
      ORDER BY name
    `).all();
    
    // Check if workouts table exists
    const hasWorkoutsTable = tables.some((table: any) => table.name === 'workouts');
    
    // Get number of workouts
    let workoutCount = 0;
    if (hasWorkoutsTable) {
      const result = db.prepare('SELECT COUNT(*) as count FROM workouts').get() as { count: number };
      workoutCount = result.count;
    }
    
    return NextResponse.json({
      status: 'ok',
      message: 'Database is accessible',
      tables: tables.map((t: any) => t.name),
      hasWorkoutsTable,
      workoutCount
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database error',
      error: error.message
    }, { status: 500 });
  }
} 