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

// Define types for better TypeScript support
interface Workout {
  id: number;
  name: string;
  date: string;
  notes: string | null;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
}

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
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Get the workout
        const workout = await mysqlDb.queryRow(`
          SELECT id, name, date, notes
          FROM workouts
          WHERE id = $1 AND user_id = $2
        `, [workoutId, userId]) as Workout | null;
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Get the exercises for this workout
        const exercises = await mysqlDb.query(`
          SELECT id, name, sets, reps, weight
          FROM exercises
          WHERE workout_id = $1
          ORDER BY id ASC
        `, [workoutId]) as Exercise[];
        
        return NextResponse.json({
          id: workout.id,
          name: workout.name,
          date: workout.date,
          notes: workout.notes,
          exercises
        });
      } catch (error) {
        console.error("PostgreSQL error fetching workout:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching the workout in production" },
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
        
        // Get the workout
        const workout = database.prepare(`
          SELECT id, name, date, notes
          FROM workouts
          WHERE id = ? AND user_id = ?
        `).get(workoutId, userId) as Workout;
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Get the exercises for this workout
        const exercises = database.prepare(`
          SELECT id, name, sets, reps, weight
          FROM exercises
          WHERE workout_id = ?
          ORDER BY id ASC
        `).all(workoutId) as Exercise[];
        
        return NextResponse.json({
          id: workout.id,
          name: workout.name,
          date: workout.date,
          notes: workout.notes,
          exercises
        });
      } catch (error) {
        console.error("SQLite error fetching workout:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching the workout in development" },
          { status: 500 }
        );
      }
    }
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
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Check if workout exists and belongs to the user
        const workout = await mysqlDb.queryRow(`
          SELECT id FROM workouts WHERE id = $1 AND user_id = $2
        `, [workoutId, userId]);
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Start a transaction
        await mysqlDb.query('START TRANSACTION');
        
        try {
          // Update workout
          if (body.name || body.date || body.notes !== undefined) {
            const updates = [];
            const updateParams = [];
            let paramIndex = 1;
            
            if (body.name) {
              updates.push(`name = $${paramIndex}`);
              updateParams.push(body.name);
              paramIndex++;
            }
            
            if (body.date) {
              updates.push(`date = $${paramIndex}`);
              updateParams.push(body.date);
              paramIndex++;
            }
            
            if (body.notes !== undefined) {
              updates.push(`notes = $${paramIndex}`);
              updateParams.push(body.notes);
              paramIndex++;
            }
            
            updates.push("updated_at = CURRENT_TIMESTAMP");
            
            if (updates.length > 1) {
              await mysqlDb.query(`
                UPDATE workouts
                SET ${updates.join(", ")}
                WHERE id = $${paramIndex}
              `, [...updateParams, workoutId]);
            }
          }
          
          // Update exercises if provided
          if (body.exercises && Array.isArray(body.exercises)) {
            // Delete existing exercises that are not in the new list
            const exerciseIds = body.exercises
              .filter((ex: {id?: number}) => ex.id)
              .map((ex: {id?: number}) => ex.id);
            
            if (exerciseIds.length > 0) {
              // Create parameterized query for PostgreSQL
              const params = [workoutId];
              const placeholders = exerciseIds.map((_: any, i: number) => `$${i + 2}`).join(',');
              
              await mysqlDb.query(`
                DELETE FROM exercises
                WHERE workout_id = $1 AND id NOT IN (${placeholders})
              `, [workoutId, ...exerciseIds]);
            } else {
              // If no exercise IDs, delete all exercises for this workout
              await mysqlDb.query(`
                DELETE FROM exercises WHERE workout_id = $1
              `, [workoutId]);
            }
            
            // Insert or update exercises
            for (const exercise of body.exercises) {
              if (!exercise.name || !exercise.sets || !exercise.reps) {
                continue; // Skip invalid exercises
              }
              
              if (exercise.id) {
                // Update existing exercise
                await mysqlDb.update(`
                  UPDATE exercises
                  SET name = $1, sets = $2, reps = $3, weight = $4, updated_at = CURRENT_TIMESTAMP
                  WHERE id = $5 AND workout_id = $6
                `, [
                  exercise.name,
                  exercise.sets,
                  exercise.reps,
                  exercise.weight || null,
                  exercise.id,
                  workoutId
                ]);
              } else {
                // Insert new exercise
                await mysqlDb.insert(`
                  INSERT INTO exercises (name, sets, reps, weight, workout_id, created_at, updated_at) 
                  VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [
                  exercise.name,
                  exercise.sets,
                  exercise.reps,
                  exercise.weight || null,
                  workoutId
                ]);
              }
            }
          }
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          // Get the updated workout with exercises
          const updatedWorkout = await mysqlDb.queryRow(`
            SELECT id, name, date, notes
            FROM workouts
            WHERE id = $1
          `, [workoutId]) as Workout;
          
          const updatedExercises = await mysqlDb.query(`
            SELECT id, name, sets, reps, weight
            FROM exercises
            WHERE workout_id = $1
            ORDER BY id ASC
          `, [workoutId]) as Exercise[];
          
          return NextResponse.json({
            message: "Workout updated successfully",
            workout: {
              id: updatedWorkout.id,
              name: updatedWorkout.name,
              date: updatedWorkout.date,
              notes: updatedWorkout.notes,
              exercises: updatedExercises
            }
          });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error updating workout:", error);
        return NextResponse.json(
          { error: "An error occurred while updating the workout in production" },
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
        
        // Check if workout exists and belongs to the user
        const workout = database.prepare(`
          SELECT id FROM workouts WHERE id = ? AND user_id = ?
        `).get(workoutId, userId);
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Start a transaction
        database.prepare("BEGIN TRANSACTION").run();
        
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
              database.prepare(`
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
              .filter((ex: {id?: number}) => ex.id)
              .map((ex: {id?: number}) => ex.id);
            
            if (exerciseIds.length > 0) {
              database.prepare(`
                DELETE FROM exercises
                WHERE workout_id = ? AND id NOT IN (${exerciseIds.map(() => '?').join(',')})
              `).run(workoutId, ...exerciseIds);
            } else {
              // If no exercise IDs, delete all exercises for this workout
              database.prepare(`
                DELETE FROM exercises WHERE workout_id = ?
              `).run(workoutId);
            }
            
            // Insert or update exercises
            const insertStmt = database.prepare(`
              INSERT INTO exercises (workout_id, name, sets, reps, weight)
              VALUES (?, ?, ?, ?, ?)
            `);
            
            const updateStmt = database.prepare(`
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
          database.prepare("COMMIT").run();
          
          // Get the updated workout with exercises
          const updatedWorkout = database.prepare(`
            SELECT id, name, date, notes
            FROM workouts
            WHERE id = ?
          `).get(workoutId) as Workout;
          
          const updatedExercises = database.prepare(`
            SELECT id, name, sets, reps, weight
            FROM exercises
            WHERE workout_id = ?
            ORDER BY id ASC
          `).all(workoutId) as Exercise[];
          
          return NextResponse.json({
            message: "Workout updated successfully",
            workout: {
              id: updatedWorkout.id,
              name: updatedWorkout.name,
              date: updatedWorkout.date,
              notes: updatedWorkout.notes,
              exercises: updatedExercises
            }
          });
        } catch (error) {
          // Rollback on error
          database.prepare("ROLLBACK").run();
          throw error;
        }
      } catch (error) {
        console.error("SQLite error updating workout:", error);
        return NextResponse.json(
          { error: "An error occurred while updating the workout in development" },
          { status: 500 }
        );
      }
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
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Check if workout exists and belongs to the user
        const workout = await mysqlDb.queryRow(`
          SELECT id FROM workouts WHERE id = $1 AND user_id = $2
        `, [workoutId, userId]);
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Delete workout (exercises will be deleted due to CASCADE)
        await mysqlDb.update(`DELETE FROM workouts WHERE id = $1`, [workoutId]);
        
        return NextResponse.json({ message: "Workout deleted successfully" });
      } catch (error) {
        console.error("PostgreSQL error deleting workout:", error);
        return NextResponse.json(
          { error: "An error occurred while deleting the workout in production" },
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
        
        // Check if workout exists and belongs to the user
        const workout = database.prepare(`
          SELECT id FROM workouts WHERE id = ? AND user_id = ?
        `).get(workoutId, userId);
        
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
        
        // Delete workout (exercises will be deleted due to CASCADE)
        database.prepare(`DELETE FROM workouts WHERE id = ?`).run(workoutId);
        
        return NextResponse.json({ message: "Workout deleted successfully" });
      } catch (error) {
        console.error("SQLite error deleting workout:", error);
        return NextResponse.json(
          { error: "An error occurred while deleting the workout in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the workout" },
      { status: 500 }
    );
  }
} 