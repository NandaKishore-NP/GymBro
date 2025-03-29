import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Get workouts from the database for the authenticated user
    const workouts = db.prepare(`
      SELECT id, name, date, notes 
      FROM workouts 
      WHERE user_id = ? 
      ORDER BY date DESC
    `).all(userId);
    
    return NextResponse.json(workouts);
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
    
    // Insert workout into the database
    const insertStmt = db.prepare(`
      INSERT INTO workouts (user_id, name, date, notes)
      VALUES (?, ?, ?, ?)
    `);
    
    const info = insertStmt.run(userId, body.name, body.date, body.notes || null);
    
    const workoutId = info.lastInsertRowid;
    
    // If exercises are provided, insert them
    if (body.exercises && Array.isArray(body.exercises) && body.exercises.length > 0) {
      const insertExerciseStmt = db.prepare(`
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
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the workout" },
      { status: 500 }
    );
  }
} 