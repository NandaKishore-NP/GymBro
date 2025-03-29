import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

// Get a specific workout with its exercises
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const workoutId = params.id;
    
    // Get the workout
    const workout = db.prepare(`
      SELECT id, name, date, notes
      FROM workouts
      WHERE id = ? AND user_id = ?
    `).get(workoutId, userId);
    
    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    
    // Get the exercises for this workout
    const exercises = db.prepare(`
      SELECT id, name, sets, reps, weight
      FROM exercises
      WHERE workout_id = ?
      ORDER BY id ASC
    `).all(workoutId);
    
    return NextResponse.json({
      ...workout,
      exercises
    });
  } catch (error) {
    console.error("Error fetching workout:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the workout" },
      { status: 500 }
    );
  }
}

// Update a workout
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const workoutId = params.id;
    const body = await req.json();
    
    // Check if workout exists and belongs to the user
    const workout = db.prepare(`
      SELECT id FROM workouts WHERE id = ? AND user_id = ?
    `).get(workoutId, userId);
    
    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    
    // Start a transaction
    db.prepare("BEGIN TRANSACTION").run();
    
    try {
      // Update workout
      if (body.name || body.date || body.notes !== undefined) {
        const updates = [];
        const params = [];
        
        if (body.name) {
          updates.push("name = ?");
          params.push(body.name);
        }
        
        if (body.date) {
          updates.push("date = ?");
          params.push(body.date);
        }
        
        if (body.notes !== undefined) {
          updates.push("notes = ?");
          params.push(body.notes);
        }
        
        updates.push("updated_at = CURRENT_TIMESTAMP");
        
        if (updates.length > 1) {
          db.prepare(`
            UPDATE workouts
            SET ${updates.join(", ")}
            WHERE id = ?
          `).run(...params, workoutId);
        }
      }
      
      // Update exercises if provided
      if (body.exercises && Array.isArray(body.exercises)) {
        // Delete existing exercises that are not in the new list
        const exerciseIds = body.exercises
          .filter(ex => ex.id)
          .map(ex => ex.id);
        
        if (exerciseIds.length > 0) {
          db.prepare(`
            DELETE FROM exercises
            WHERE workout_id = ? AND id NOT IN (${exerciseIds.map(() => '?').join(',')})
          `).run(workoutId, ...exerciseIds);
        } else {
          // If no exercise IDs, delete all exercises for this workout
          db.prepare(`
            DELETE FROM exercises WHERE workout_id = ?
          `).run(workoutId);
        }
        
        // Insert or update exercises
        const insertStmt = db.prepare(`
          INSERT INTO exercises (workout_id, name, sets, reps, weight)
          VALUES (?, ?, ?, ?, ?)
        `);
        
        const updateStmt = db.prepare(`
          UPDATE exercises
          SET name = ?, sets = ?, reps = ?, weight = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ? AND workout_id = ?
        `);
        
        for (const exercise of body.exercises) {
          if (!exercise.name || !exercise.sets || !exercise.reps) {
            continue; // Skip invalid exercises
          }
          
          if (exercise.id) {
            // Update existing exercise
            updateStmt.run(
              exercise.name,
              exercise.sets,
              exercise.reps,
              exercise.weight || null,
              exercise.id,
              workoutId
            );
          } else {
            // Insert new exercise
            insertStmt.run(
              workoutId,
              exercise.name,
              exercise.sets,
              exercise.reps,
              exercise.weight || null
            );
          }
        }
      }
      
      // Commit the transaction
      db.prepare("COMMIT").run();
      
      // Get the updated workout with exercises
      const updatedWorkout = db.prepare(`
        SELECT id, name, date, notes
        FROM workouts
        WHERE id = ?
      `).get(workoutId);
      
      const updatedExercises = db.prepare(`
        SELECT id, name, sets, reps, weight
        FROM exercises
        WHERE workout_id = ?
        ORDER BY id ASC
      `).all(workoutId);
      
      return NextResponse.json({
        message: "Workout updated successfully",
        workout: {
          ...updatedWorkout,
          exercises: updatedExercises
        }
      });
    } catch (error) {
      // Rollback on error
      db.prepare("ROLLBACK").run();
      throw error;
    }
  } catch (error) {
    console.error("Error updating workout:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the workout" },
      { status: 500 }
    );
  }
}

// Delete a workout
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const workoutId = params.id;
    
    // Check if workout exists and belongs to the user
    const workout = db.prepare(`
      SELECT id FROM workouts WHERE id = ? AND user_id = ?
    `).get(workoutId, userId);
    
    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    
    // Delete workout (exercises will be deleted due to CASCADE)
    db.prepare(`DELETE FROM workouts WHERE id = ?`).run(workoutId);
    
    return NextResponse.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the workout" },
      { status: 500 }
    );
  }
} 