/**
 * MySQL database client for production environment (PlanetScale)
 */

// Dynamically import mysql2 in a try-catch to avoid build issues
let mysql: any;

try {
  // This needs to be a dynamic require to prevent build issues
  mysql = require('mysql2/promise');
} catch (error) {
  console.warn('mysql2 not available. This is expected during build time.');
}

// Get database connection string from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Create a connection pool if we have the URL and mysql module
let pool: any = null;

// This function safely initializes the pool if needed
async function getPool() {
  if (!pool && mysql && DATABASE_URL) {
    try {
      pool = mysql.createPool({
        uri: DATABASE_URL,
        ssl: {
          rejectUnauthorized: true
        },
        // Connection pool settings
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
      });
      console.log('MySQL pool created successfully');
    } catch (error) {
      console.error('Failed to create MySQL pool:', error);
      throw error;
    }
  }
  
  if (!pool) {
    if (!mysql) {
      throw new Error('MySQL module not available');
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
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('MySQL query error:', sql, error);
    throw error;
  }
}

// Helper for getting a single row
export async function queryRow(sql: string, params: any[] = []) {
  try {
    const results = await query(sql, params) as any[];
    return results[0] || null;
  } catch (error) {
    console.error('MySQL queryRow error:', sql, error);
    throw error;
  }
}

// Helper for inserting data and getting the inserted ID
export async function insert(sql: string, params: any[] = []) {
  const pool = await getPool();
  try {
    const [result] = await pool.execute(sql, params) as any;
    return result.insertId;
  } catch (error) {
    console.error('MySQL insert error:', sql, error);
    throw error;
  }
}

// Helper for updating data and getting affected rows count
export async function update(sql: string, params: any[] = []) {
  const pool = await getPool();
  try {
    const [result] = await pool.execute(sql, params) as any;
    return result.affectedRows;
  } catch (error) {
    console.error('MySQL update error:', sql, error);
    throw error;
  }
}

// Transaction support
export async function startTransaction() {
  const pool = await getPool();
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

export async function commit(connection: any) {
  await connection.commit();
  connection.release();
}

export async function rollback(connection: any) {
  await connection.rollback();
  connection.release();
}

// Expose the database functions
export const mysqlDb = {
  queryRow,
  insert,
  update,
  // Transaction-aware query function
  query: async (sql: string, params: any[] = []) => {
    if (sql === 'START TRANSACTION') {
      await query('START TRANSACTION');
      return [];
    } else if (sql === 'COMMIT') {
      await query('COMMIT');
      return [];
    } else if (sql === 'ROLLBACK') {
      await query('ROLLBACK');
      return [];
    } else {
      return query(sql, params);
    }
  }
}; 