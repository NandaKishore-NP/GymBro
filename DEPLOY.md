# GymBro - Free Deployment Guide

This guide will walk you through deploying the GymBro application for free using Vercel and Supabase (PostgreSQL).

## Prerequisites

- GitHub account
- Vercel account (free tier) - Sign up with your GitHub account at [vercel.com](https://vercel.com)
- Supabase account (free tier) - Sign up at [supabase.com](https://supabase.com)

## 1. Prepare Your Repository

1. Make sure your code is pushed to a GitHub repository
2. Ensure you've made the database changes included in this PR (switching from SQLite to PostgreSQL for production)

## 2. Set Up Supabase Database

1. Log in to Supabase
2. Create a new project
3. Make note of your project URL and API keys
4. In the SQL editor, run the following SQL scripts to create your tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  notes TEXT,
  heart_rate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  workout_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  weight NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE weight_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  weight NUMERIC NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  height NUMERIC,
  target_weight NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

5. Wait for the tables to be created
6. Go to Project Settings > Database to get your connection string
7. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres`

## 3. Update Database Client

1. Install the PostgreSQL client by running:
   ```bash
   npm install pg
   ```

2. Update `lib/mysql-db.ts` to use PostgreSQL instead:
   ```typescript
   // Rename this file to pg-db.ts and update imports in all API routes

   /**
    * PostgreSQL database client for production environment (Supabase)
    */

   // Dynamically import pg in a try-catch to avoid build issues
   let pg: any;

   try {
     // This needs to be a dynamic require to prevent build issues
     pg = require('pg');
   } catch (error) {
     console.warn('pg not available. This is expected during build time.');
   }

   // Get database connection string from environment variables
   const DATABASE_URL = process.env.DATABASE_URL;

   // Create a connection pool if we have the URL and pg module
   let pool: any = null;

   // This function safely initializes the pool if needed
   async function getPool() {
     if (!pool && pg && DATABASE_URL) {
       try {
         const { Pool } = pg;
         pool = new Pool({
           connectionString: DATABASE_URL,
           ssl: {
             rejectUnauthorized: false
           }
         });
         console.log('PostgreSQL pool created successfully');
       } catch (error) {
         console.error('Failed to create PostgreSQL pool:', error);
         throw error;
       }
     }
     
     if (!pool) {
       if (!pg) {
         throw new Error('PostgreSQL module not available');
       }
       if (!DATABASE_URL) {
         throw new Error('DATABASE_URL environment variable not set');
       }
     }
     
     return pool;
   }

   // Helper for executing a query with parameters
   export async function query(sql: string, params: any[] = []) {
     const pool = await getPool();
     try {
       const result = await pool.query(sql, params);
       return result.rows;
     } catch (error) {
       console.error('PostgreSQL query error:', sql, error);
       throw error;
     }
   }

   // Helper for getting a single row
   export async function queryRow(sql: string, params: any[] = []) {
     try {
       const results = await query(sql, params);
       return results[0] || null;
     } catch (error) {
       console.error('PostgreSQL queryRow error:', sql, error);
       throw error;
     }
   }

   // Helper for inserting data and getting the inserted ID
   export async function insert(sql: string, params: any[] = []) {
     const pool = await getPool();
     try {
       // Modify the SQL to return the inserted ID
       const modifiedSql = `${sql} RETURNING id`;
       const result = await pool.query(modifiedSql, params);
       return result.rows[0]?.id;
     } catch (error) {
       console.error('PostgreSQL insert error:', sql, error);
       throw error;
     }
   }

   // Helper for updating data and getting affected rows count
   export async function update(sql: string, params: any[] = []) {
     const pool = await getPool();
     try {
       const result = await pool.query(sql, params);
       return result.rowCount;
     } catch (error) {
       console.error('PostgreSQL update error:', sql, error);
       throw error;
     }
   }

   // Transaction support
   export async function startTransaction() {
     const pool = await getPool();
     const client = await pool.connect();
     await client.query('BEGIN');
     return client;
   }

   export async function commit(client: any) {
     await client.query('COMMIT');
     client.release();
   }

   export async function rollback(client: any) {
     await client.query('ROLLBACK');
     client.release();
   }

   // Expose the database functions
   export const mysqlDb = {
     queryRow,
     insert,
     update,
     // Transaction-aware query function
     query: async (sql: string, params: any[] = []) => {
       if (sql === 'START TRANSACTION') {
         await query('BEGIN', []);
         return [];
       } else if (sql === 'COMMIT') {
         await query('COMMIT', []);
         return [];
       } else if (sql === 'ROLLBACK') {
         await query('ROLLBACK', []);
         return [];
       } else {
         return query(sql, params);
       }
     }
   };
   ```

3. Update import in `package.json`:
   ```json
   {
     "dependencies": {
       // ...other dependencies
       "pg": "^8.11.3"
     }
   }
   ```

## 4. Deploy to Vercel

1. Log in to Vercel and click "Add New..." > "Project"
2. Import your GitHub repository
3. In the "Configure Project" step:
   - Keep the default framework preset (Next.js)
   - Add the following environment variables:

     ```
     DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
     NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
     NEXTAUTH_SECRET=generate-a-secure-random-string
     NODE_ENV=production
     ```

4. Click "Deploy"

## 5. Update the NEXTAUTH_URL

After your first deployment, you need to update the NEXTAUTH_URL environment variable:

1. Get your deployment URL from Vercel (e.g., https://gym-bro.vercel.app)
2. Go to your project settings > Environment Variables
3. Update NEXTAUTH_URL to match your deployment URL
4. Redeploy your application

## 6. Keep Your Application Alive

Free tiers often have inactivity timeouts. To keep your application alive:

1. Set up a free service like UptimeRobot (uptimerobot.com)
2. Add your Vercel URL as a monitored endpoint
3. Set the monitoring interval to 5 minutes

## 7. Optional: Custom Domain

If you want a custom domain:

1. Register a free domain from Freenom (.tk, .ml, etc.) or use your own
2. Go to your Vercel project settings > Domains
3. Add your custom domain and follow the DNS configuration instructions

## Troubleshooting

- **Database Connection Issues**: Check your DATABASE_URL environment variable
- **Authentication Problems**: Verify that NEXTAUTH_URL matches your actual deployment URL
- **Deployment Failures**: Check Vercel's build logs for details

## Limitations of Free Tier

- Supabase Free Tier: 500MB storage, 10,000 rows
- Vercel Free Tier: Limited execution time (10 seconds), bandwidth limits
- Both have fair usage policies

To upgrade later, both platforms offer paid plans with more resources. 