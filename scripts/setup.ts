import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Define the path to the .env.local file
const envPath = path.join(process.cwd(), '.env.local');

// Define the path to the db directory
const dbDir = path.join(process.cwd(), 'db');

function setupEnvironment() {
  console.log('Setting up environment variables...');
  
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('.env.local already exists, skipping creation');
  } else {
    // Create the .env.local file with default values
    const envContent = `# Authentication
NEXTAUTH_SECRET=GymBroSecureString123!@#
NEXTAUTH_URL=http://localhost:3000

# Database
# These settings are already configured in the db.ts file, but added here for completeness
DB_PATH=./db/gymbro.db`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('.env.local file created successfully');
  }
}

function setupDatabase() {
  console.log('Setting up database...');
  
  // Create the db directory if it doesn't exist
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('Created db directory');
  } else {
    console.log('db directory already exists, skipping creation');
  }
  
  // Check if database file exists
  const dbPath = path.join(dbDir, 'gymbro.db');
  if (fs.existsSync(dbPath)) {
    console.log('Database file already exists, skipping setup');
  } else {
    try {
      // The database will be created when the app starts or when seed script runs
      console.log('Database file will be created when the app starts');
      
      // Run the seed script
      console.log('Running seed script to initialize database with sample data...');
      execSync('npm run seed', { stdio: 'inherit' });
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}

function main() {
  console.log('Starting GymBro setup...');
  
  try {
    setupEnvironment();
    setupDatabase();
    
    console.log('\nSetup completed successfully!');
    console.log('You can now start the development server with:');
    console.log('  npm run dev');
    console.log('\nAccess the app at: http://localhost:3000');
    console.log('\nDefault test user:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

main(); 