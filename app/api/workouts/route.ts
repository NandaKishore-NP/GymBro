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
    // Get the authenticated user
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
        
        // Get workouts from the database for the authenticated user
        const workouts = await mysqlDb.query(`
          SELECT id, name, date, notes 
          FROM workouts 
          WHERE user_id = $1 
          ORDER BY date DESC
        `, [userId]);
        
        return NextResponse.json(workouts);
      } catch (error) {
        console.error("PostgreSQL error fetching workouts:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching the workouts in production" },
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
        
        // Get workouts from the database for the authenticated user
        const workouts = database.prepare(`
          SELECT id, name, date, notes 
          FROM workouts 
          WHERE user_id = ? 
          ORDER BY date DESC
        `).all(userId);
        
        return NextResponse.json(workouts);
      } catch (error) {
        console.error("SQLite error fetching workouts:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching the workouts in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the workouts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.date) {
      return NextResponse.json(
        { error: "Name and date are required" },
        { status: 400 }
      );
    }
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Start a transaction
        await mysqlDb.query('START TRANSACTION');
        
        try {
          // Insert the workout
          const workoutId = await mysqlDb.insert(`
            INSERT INTO workouts (name, date, notes, user_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `, [body.name, body.date, body.notes || null, userId]);
          
          // Insert the exercises if any
          if (body.exercises && body.exercises.length > 0) {
            for (const exercise of body.exercises) {
              await mysqlDb.insert(`
                INSERT INTO exercises (name, sets, reps, weight, workout_id, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
              `, [
                exercise.name,
                exercise.sets || null,
                exercise.reps || null,
                exercise.weight || null,
                workoutId
              ]);
            }
          }
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          return NextResponse.json({
            id: workoutId,
            name: body.name,
            date: body.date,
            notes: body.notes || null,
            exercises: body.exercises || []
          }, { status: 201 });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error creating workout:", error);
        return NextResponse.json(
          { error: "An error occurred while creating the workout in production" },
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
        
        // Insert workout into the database
        const insertStmt = database.prepare(`
          INSERT INTO workouts (user_id, name, date, notes)
          VALUES (?, ?, ?, ?)
        `);
        
        const info = insertStmt.run(userId, body.name, body.date, body.notes || null);
        
        const workoutId = info.lastInsertRowid;
        
        // If exercises are provided, insert them
        if (body.exercises && Array.isArray(body.exercises) && body.exercises.length > 0) {
          const insertExerciseStmt = database.prepare(`
            INSERT INTO exercises (workout_id, name, sets, reps, weight)
            VALUES (?, ?, ?, ?, ?)
          `);
          
          for (const exercise of body.exercises) {
            if (!exercise.name || !exercise.sets || !exercise.reps) {
              continue; // Skip invalid exercises
            }
            
            insertExerciseStmt.run(
              workoutId,
              exercise.name,
              exercise.sets,
              exercise.reps,
              exercise.weight || null
            );
          }
        }
        
        return NextResponse.json(
          { id: workoutId, message: "Workout created successfully" },
          { status: 201 }
        );
      } catch (error) {
        console.error("SQLite error creating workout:", error);
        return NextResponse.json(
          { error: "An error occurred while creating the workout in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the workout" },
      { status: 500 }
    );
  }
} 