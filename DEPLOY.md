# GymBro - Free Deployment Guide

This guide will walk you through deploying the GymBro application for free using Vercel and Supabase (PostgreSQL).

## Prerequisites

- GitHub account
- Vercel account (free tier) - Sign up with your GitHub account at [vercel.com](https://vercel.com)
- Supabase account (free tier) - Sign up at [supabase.com](https://supabase.com)

## 1. Prepare Your Repository

1. Make sure your code is pushed to a GitHub repository
2. Ensure you've made the database changes included in this PR (switching from SQLite to PostgreSQL for production)
3. Create a copy of `.env.local.example` as `.env.local` for local development (don't push this to GitHub)

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

### 2.1 Important - Enable Row Level Security

For extra security, you should enable Row Level Security (RLS) on your tables:

1. Go to the "Authentication" > "Policies" section
2. For each table:
   - Click "New Policy"
   - Select "Create a policy from scratch"
   - Set "Policy name" to something like "User can only access their own records"
   - Set "Target roles" to "authenticated"
   - For tables with a `user_id` column:
     - Set "Using expression" to: `auth.uid() = user_id`
   - For the `users` table:
     - Set "Using expression" to: `auth.uid() = id`
   - Click "Review" then "Save policy"

## 3. Deploy to Vercel

1. Log in to Vercel and click "Add New..." > "Project"
2. Import your GitHub repository
3. In the "Configure Project" step:
   - Framework Preset: Next.js
   - Build and Output Settings: Leave as default
   - Environment Variables: 
     - Add the following environment variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=generate-a-strong-random-secret-at-least-32-chars
```

4. Click "Deploy"
5. Wait for the deployment to complete
6. After deployment, if you need to update environment variables:
   - Go to the project settings
   - Click "Environment Variables"
   - Update or add new variables as needed

## 4. IMPORTANT - Update the NEXTAUTH_URL

After your first deployment, update the NEXTAUTH_URL environment variable with your actual deployed URL:

1. Go to your project in Vercel dashboard
2. Go to Settings > Environment Variables
3. Update NEXTAUTH_URL with your actual domain, e.g., https://gymbro-app.vercel.app
4. Click "Save"
5. Redeploy by clicking "Deployments" and "Redeploy" on your latest deployment

## 5. Keep Your App Alive (Free Tier Limitations)

Both Vercel and Supabase free tiers have limitations:

1. **Vercel** - Free projects go to sleep after inactivity
   - To keep your app alive, set up a cron job or use a service like [UptimeRobot](https://uptimerobot.com) to ping your app every 10 minutes

2. **Supabase** - Has usage limits on the free tier
   - Database: 500MB, 2 simulaneous connections
   - Be aware of these limits for your application

## 6. Troubleshooting Common Issues

### Database Connection Issues

If you're having trouble connecting to your database:

1. Verify your DATABASE_URL is correct in Vercel environment variables
2. Make sure you've properly formatted the connection string
3. Check Supabase logs for connection issues
4. Ensure your IP is not blocked by Supabase

### Authentication Issues

If authentication doesn't work after deployment:

1. Verify NEXTAUTH_URL is set to your actual deployed URL
2. Ensure NEXTAUTH_SECRET is set and is at least 32 characters long
3. Check your browser console and Vercel logs for errors

### Deployment Failed

If your deployment fails:

1. Check the build logs in Vercel
2. Verify that you've installed all necessary dependencies (`pg`, `@types/pg`)
3. Make sure your code has the proper database conditionals for both development and production

## 7. Optional - Custom Domain

To set up a custom domain for your application:

1. Go to your Vercel project
2. Click "Settings" > "Domains"
3. Follow the instructions to add your custom domain

Remember to update the NEXTAUTH_URL environment variable with your custom domain after setting it up. 