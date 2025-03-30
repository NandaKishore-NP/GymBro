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

// Expose the database functions with the same interface
// as the MySQL client for compatibility
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