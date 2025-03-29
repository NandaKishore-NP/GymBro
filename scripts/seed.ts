import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Hash a sample password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Check if test user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('test@example.com');
    
    if (!existingUser) {
      // Insert a sample user
      const result = db.prepare(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'
      ).run('test@example.com', hashedPassword, 'Test User');
      
      console.log(`Created test user with ID: ${result.lastInsertRowid}`);
      
      // Get the user id
      const userId = result.lastInsertRowid;
      
      // Insert a sample workout
      const workoutResult = db.prepare(
        'INSERT INTO workouts (user_id, name, date, notes) VALUES (?, ?, ?, ?)'
      ).run(userId, 'Push Day', new Date().toISOString().split('T')[0], 'Focused on chest and triceps');
      
      const workoutId = workoutResult.lastInsertRowid;
      
      // Insert some sample exercises
      const exercises = [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
        { name: 'Incline Press', sets: 3, reps: 12, weight: 115 },
        { name: 'Tricep Pushdown', sets: 3, reps: 15, weight: 50 }
      ];
      
      exercises.forEach(exercise => {
        db.prepare(
          'INSERT INTO exercises (workout_id, name, sets, reps, weight) VALUES (?, ?, ?, ?, ?)'
        ).run(workoutId, exercise.name, exercise.sets, exercise.reps, exercise.weight);
      });
      
      // Insert a sample weight log
      db.prepare(
        'INSERT INTO weight_logs (user_id, weight, date) VALUES (?, ?, ?)'
      ).run(userId, 180, new Date().toISOString().split('T')[0]);
      
      console.log('Sample data inserted successfully!');
    } else {
      console.log('Test user already exists, skipping seeding');
    }
    
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed(); 