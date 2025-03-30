// This is a database adapter that uses SQLite locally and PostgreSQL in production
import { Database } from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Declare development database is type safe
export type DatabaseInstance = Database;

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// SQLite database for development
let sqliteDb: Database | null = null;

// Database initialization for development (SQLite)
if (!isProduction) {
  // Create the db directory if it doesn't exist
  const dbDir = path.join(process.cwd(), 'db');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'gymbro.db');
  
  try {
    // Dynamic import because better-sqlite3 is only used on the server
    const sqlite = require('better-sqlite3');
    sqliteDb = new sqlite(dbPath);
    
    // Enable foreign keys
    sqliteDb?.pragma('foreign_keys = ON');
    
    // Create users table
    sqliteDb?.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create workouts table
    sqliteDb?.exec(`
      CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,
        heart_rate INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create exercises table
    sqliteDb?.exec(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        sets INTEGER NOT NULL,
        reps INTEGER NOT NULL,
        weight REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
      );
    `);

    // Create weight_logs table for tracking user weight progress
    sqliteDb?.exec(`
      CREATE TABLE IF NOT EXISTS weight_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        weight REAL NOT NULL,
        date TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('SQLite database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

// This is the database interface we export
// In development, it's just SQLite
// In production, we'll use PostgreSQL via the API routes
export const db = isProduction ? null : sqliteDb;

// For the production database, we use pg-db.ts
// In your API routes, use:
// const { mysqlDb } = await import('@/lib/pg-db');
// In your API routes, replace:
// const { mysqlDb } = await import('@/lib/mysql-db');
// with:
// const { mysqlDb } = await import('@/lib/pg-db'); 