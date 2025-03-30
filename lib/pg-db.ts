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
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/gymbro';

// Create a connection pool if we have the URL and pg module
let pool: any = null;

// This function safely initializes the pool if needed
async function getPool() {
  if (!pool && pg && DATABASE_URL) {
    try {
      const { Pool } = pg;
      
      // Check if connection string is valid
      if (DATABASE_URL === 'your-connection-string' || 
          DATABASE_URL.includes('your-connection-string') ||
          DATABASE_URL.includes('example.com')) {
        console.error('Invalid DATABASE_URL. Please set a valid PostgreSQL connection string in your environment variables.');
        throw new Error('Invalid DATABASE_URL configuration. Please check your environment variables.');
      }
      
      pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        },
        // Add connection timeout to avoid hanging during deployment
        connectionTimeoutMillis: 5000, 
        // Add idle timeout
        idleTimeoutMillis: 30000
      });
      
      // Test the connection
      const client = await pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      
      console.log('PostgreSQL connection established successfully');
    } catch (error: any) {
      console.error('Failed to create PostgreSQL pool:', error);
      // Reset pool to allow retry on next request
      pool = null;
      
      throw new Error(`PostgreSQL connection failed: ${error.message || 'Unknown error'}`);
    }
  }
  
  if (!pool) {
    if (!pg) {
      console.error('PostgreSQL client library not available');
      throw new Error('PostgreSQL module not available. Run "npm install pg @types/pg" to install.');
    }
    if (!DATABASE_URL) {
      console.error('DATABASE_URL environment variable not set');
      throw new Error('DATABASE_URL environment variable is required for PostgreSQL connection.');
    }
    
    throw new Error('Failed to initialize PostgreSQL connection pool.');
  }
  
  return pool;
}

// Helper for executing a query with parameters
export async function query(sql: string, params: any[] = []) {
  try {
    const pool = await getPool();
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
  try {
    const pool = await getPool();
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
  try {
    const pool = await getPool();
    const result = await pool.query(sql, params);
    return result.rowCount;
  } catch (error) {
    console.error('PostgreSQL update error:', sql, error);
    throw error;
  }
}

// Transaction support
export async function startTransaction() {
  try {
    const pool = await getPool();
    const client = await pool.connect();
    await client.query('BEGIN');
    return client;
  } catch (error) {
    console.error('PostgreSQL transaction start error:', error);
    throw error;
  }
}

export async function commit(client: any) {
  try {
    await client.query('COMMIT');
    client.release();
  } catch (error) {
    console.error('PostgreSQL transaction commit error:', error);
    // Always try to release client back to pool
    try { client.release(); } catch {}
    throw error;
  }
}

export async function rollback(client: any) {
  try {
    await client.query('ROLLBACK');
    client.release();
  } catch (error) {
    console.error('PostgreSQL transaction rollback error:', error);
    // Always try to release client back to pool
    try { client.release(); } catch {}
    throw error;
  }
}

// Expose the database functions with the same interface
// as the MySQL client for compatibility
export const mysqlDb = {
  queryRow,
  insert,
  update,
  // Transaction-aware query function
  query: async (sql: string, params: any[] = []) => {
    try {
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
    } catch (error) {
      console.error('PostgreSQL transaction query error:', error);
      throw error;
    }
  }
}; 