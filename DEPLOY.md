# GymBro - Free Deployment Guide

This guide will walk you through deploying the GymBro application for free using Vercel and PlanetScale.

## Prerequisites

- GitHub account
- Vercel account (free tier) - Sign up with your GitHub account at [vercel.com](https://vercel.com)
- PlanetScale account (free tier) - Sign up at [planetscale.com](https://planetscale.com)

## 1. Prepare Your Repository

1. Make sure your code is pushed to a GitHub repository
2. Ensure you've made the database changes included in this PR (switching from SQLite to MySQL for production)

## 2. Set Up PlanetScale Database

1. Log in to PlanetScale
2. Create a new database called `gymbro`
3. Create a new branch called `main`
4. Connect to your database and run the following SQL scripts to create your tables:

```sql
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workouts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  notes TEXT,
  heart_rate INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  workout_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  sets INT NOT NULL,
  reps INT NOT NULL,
  weight FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE weight_logs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  user_id INT NOT NULL,
  weight FLOAT NOT NULL,
  date VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_profiles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  height FLOAT,
  target_weight FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

5. After creating the tables, go to the "Branches" tab and "promote" your branch to production
6. Go to the "Connect" tab and create a new password for your database
7. Select "Connect with MySQL" and copy the connection string 

## 3. Deploy to Vercel

1. Log in to Vercel and click "Add New..." > "Project"
2. Import your GitHub repository
3. In the "Configure Project" step:
   - Keep the default framework preset (Next.js)
   - Add the following environment variables:

     ```
     DATABASE_URL=mysql://your-planetscale-connection-string
     NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
     NEXTAUTH_SECRET=generate-a-secure-random-string
     NODE_ENV=production
     ```

4. Click "Deploy"

## 4. Update the NEXTAUTH_URL

After your first deployment, you need to update the NEXTAUTH_URL environment variable:

1. Get your deployment URL from Vercel (e.g., https://gym-bro.vercel.app)
2. Go to your project settings > Environment Variables
3. Update NEXTAUTH_URL to match your deployment URL
4. Redeploy your application

## 5. Keep Your Application Alive

Free tiers often have inactivity timeouts. To keep your application alive:

1. Set up a free service like UptimeRobot (uptimerobot.com)
2. Add your Vercel URL as a monitored endpoint
3. Set the monitoring interval to 5 minutes

## 6. Optional: Custom Domain

If you want a custom domain:

1. Register a free domain from Freenom (.tk, .ml, etc.) or use your own
2. Go to your Vercel project settings > Domains
3. Add your custom domain and follow the DNS configuration instructions

## Troubleshooting

- **Database Connection Issues**: Check your DATABASE_URL environment variable
- **Authentication Problems**: Verify that NEXTAUTH_URL matches your actual deployment URL
- **Deployment Failures**: Check Vercel's build logs for details

## Limitations of Free Tier

- PlanetScale Free Tier: 5GB storage, limited connections
- Vercel Free Tier: Limited execution time, bandwidth limits
- Both have fair usage policies

To upgrade later, both platforms offer paid plans with more resources. 