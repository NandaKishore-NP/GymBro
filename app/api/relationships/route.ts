import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { Database } from "better-sqlite3";
import { z } from "zod";

// Add response options to control caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// Validation schema for relationship creation
const relationshipSchema = z.object({
  email: z.string().email("Invalid email"),
  relationshipType: z.enum(["friend", "partner"]),
});

// Get all relationships for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        try {
          // Start a transaction
          await mysqlDb.query('BEGIN');
          
          // Check if the user_relationships table exists, create it if not
          await mysqlDb.query(`
            CREATE TABLE IF NOT EXISTS user_relationships (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              related_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              relationship_type VARCHAR(50) NOT NULL,
              status VARCHAR(50) NOT NULL DEFAULT 'pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, related_user_id)
            )
          `);
          
          // Check if table exists
          const tableCheck = await mysqlDb.query(`
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_name = 'user_relationships'
            ) as exists
          `);
          
          let sentRelationships = [];
          let receivedRelationships = [];
          
          // Only try to fetch relationships if the table exists
          if (tableCheck[0]?.exists) {
            // Get relationships for the user
            sentRelationships = await mysqlDb.query(`
              SELECT r.id, r.relationship_type, r.status, r.created_at, r.updated_at, 
                     u.id as related_user_id, u.name as related_user_name, u.email as related_user_email
              FROM user_relationships r
              JOIN users u ON r.related_user_id = u.id
              WHERE r.user_id = $1
            `, [userId]);
            
            receivedRelationships = await mysqlDb.query(`
              SELECT r.id, r.relationship_type, r.status, r.created_at, r.updated_at, 
                     u.id as related_user_id, u.name as related_user_name, u.email as related_user_email
              FROM user_relationships r
              JOIN users u ON r.user_id = u.id
              WHERE r.related_user_id = $1
            `, [userId]);
          }
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          return NextResponse.json({
            sent: sentRelationships,
            received: receivedRelationships
          });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          console.error("Transaction error:", error);
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error fetching relationships:", error);
        let errorMsg = "An error occurred while fetching relationships in production";
        if (error instanceof Error) {
          errorMsg += `: ${error.message}`;
          console.error("Error stack:", error.stack);
        }
        return NextResponse.json(
          { error: errorMsg },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        const database = db as Database;
        
        // Get relationships for the user (sent)
        const sentRelationships = database.prepare(`
          SELECT r.id, r.relationship_type, r.status, r.created_at, r.updated_at, 
                 u.id as related_user_id, u.name as related_user_name, u.email as related_user_email
          FROM user_relationships r
          JOIN users u ON r.related_user_id = u.id
          WHERE r.user_id = ?
        `).all(userId);
        
        // Get relationships for the user (received)
        const receivedRelationships = database.prepare(`
          SELECT r.id, r.relationship_type, r.status, r.created_at, r.updated_at, 
                 u.id as related_user_id, u.name as related_user_name, u.email as related_user_email
          FROM user_relationships r
          JOIN users u ON r.user_id = u.id
          WHERE r.related_user_id = ?
        `).all(userId);
        
        return NextResponse.json({
          sent: sentRelationships,
          received: receivedRelationships
        });
      } catch (error) {
        console.error("SQLite error fetching relationships:", error);
        return NextResponse.json(
          { error: "An error occurred while fetching relationships in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching relationships:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching relationships" },
      { status: 500 }
    );
  }
}

// Create a new relationship
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Validate request data
    const validationResult = relationshipSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { email, relationshipType } = validationResult.data;
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        // Find the user by email
        const userResult = await mysqlDb.query(`
          SELECT id FROM users WHERE email = $1
        `, [email]);
        
        if (!userResult || userResult.length === 0) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const relatedUserId = userResult[0]?.id;
        
        if (!relatedUserId) {
          return NextResponse.json({ error: "User ID not found" }, { status: 404 });
        }
        
        // Check if trying to add self
        if (Number(userId) === Number(relatedUserId)) {
          return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });
        }
        
        // Check if relationship already exists
        const existingRelationship = await mysqlDb.query(`
          SELECT id FROM user_relationships 
          WHERE (user_id = $1 AND related_user_id = $2)
             OR (user_id = $2 AND related_user_id = $1)
        `, [userId, relatedUserId]);
        
        if (existingRelationship && existingRelationship.length > 0) {
          return NextResponse.json({ error: "Relationship already exists" }, { status: 409 });
        }
        
        try {
          // Start a transaction
          await mysqlDb.query('BEGIN');
          
          // Check if the user_relationships table exists, create it if not
          await mysqlDb.query(`
            CREATE TABLE IF NOT EXISTS user_relationships (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              related_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              relationship_type VARCHAR(50) NOT NULL,
              status VARCHAR(50) NOT NULL DEFAULT 'pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, related_user_id)
            )
          `);
          
          // Create the relationship
          await mysqlDb.query(`
            INSERT INTO user_relationships (user_id, related_user_id, relationship_type)
            VALUES ($1, $2, $3)
          `, [userId, relatedUserId, relationshipType]);
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          return NextResponse.json({ 
            message: "Relationship request sent",
            status: "pending"
          });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          console.error("Transaction error:", error);
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error creating relationship:", error);
        let errorMsg = "An error occurred while creating relationship in production";
        if (error instanceof Error) {
          errorMsg += `: ${error.message}`;
        }
        return NextResponse.json(
          { error: errorMsg },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        const database = db as Database;
        
        // Find the user by email
        const relatedUser = database.prepare(`
          SELECT id FROM users WHERE email = ?
        `).get(email) as { id: number } | undefined;
        
        if (!relatedUser) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const relatedUserId = relatedUser.id;
        
        // Check if trying to add self
        if (Number(userId) === Number(relatedUserId)) {
          return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });
        }
        
        // Check if relationship already exists
        const existingRelationship = database.prepare(`
          SELECT id FROM user_relationships 
          WHERE (user_id = ? AND related_user_id = ?)
             OR (user_id = ? AND related_user_id = ?)
        `).get(userId, relatedUserId, relatedUserId, userId);
        
        if (existingRelationship) {
          return NextResponse.json({ error: "Relationship already exists" }, { status: 409 });
        }
        
        // Create the relationship
        database.prepare(`
          INSERT INTO user_relationships (user_id, related_user_id, relationship_type)
          VALUES (?, ?, ?)
        `).run(userId, relatedUserId, relationshipType);
        
        return NextResponse.json({ 
          message: "Relationship request sent",
          status: "pending"
        });
      } catch (error) {
        console.error("SQLite error creating relationship:", error);
        return NextResponse.json(
          { error: "An error occurred while creating relationship in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error creating relationship:", error);
    return NextResponse.json(
      { error: "An error occurred while creating relationship" },
      { status: 500 }
    );
  }
}

// Update relationship status (accept/reject)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    if (!data.relationshipId || !data.status) {
      return NextResponse.json(
        { error: "Missing required fields: relationshipId and status" },
        { status: 400 }
      );
    }
    
    const { relationshipId, status } = data;
    
    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be 'accepted' or 'rejected'" },
        { status: 400 }
      );
    }
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');

        try {
          // Start a transaction
          await mysqlDb.query('BEGIN');
          
          // Check if the user_relationships table exists, create it if not
          await mysqlDb.query(`
            CREATE TABLE IF NOT EXISTS user_relationships (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              related_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              relationship_type VARCHAR(50) NOT NULL,
              status VARCHAR(50) NOT NULL DEFAULT 'pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, related_user_id)
            )
          `);
          
          // Check if the relationship exists and the current user is the related user
          const relationship = await mysqlDb.query(`
            SELECT id FROM user_relationships 
            WHERE id = $1 AND related_user_id = $2 AND status = 'pending'
          `, [relationshipId, userId]);
          
          if (!relationship || relationship.length === 0) {
            await mysqlDb.query('ROLLBACK');
            return NextResponse.json(
              { error: "Relationship not found or not pending" },
              { status: 404 }
            );
          }
          
          // Update the relationship status
          await mysqlDb.query(`
            UPDATE user_relationships
            SET status = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
          `, [status, relationshipId]);
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          return NextResponse.json({ 
            message: `Relationship ${status}`,
            status: status
          });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          console.error("Transaction error:", error);
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error updating relationship:", error);
        let errorMsg = "An error occurred while updating relationship in production";
        if (error instanceof Error) {
          errorMsg += `: ${error.message}`;
        }
        return NextResponse.json(
          { error: errorMsg },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        const database = db as Database;
        
        // Check if the relationship exists and the current user is the related user
        const relationship = database.prepare(`
          SELECT id FROM user_relationships 
          WHERE id = ? AND related_user_id = ? AND status = 'pending'
        `).get(relationshipId, userId) as { id: number } | undefined;
        
        if (!relationship) {
          return NextResponse.json(
            { error: "Relationship not found or not pending" },
            { status: 404 }
          );
        }
        
        // Update the relationship status
        database.prepare(`
          UPDATE user_relationships
          SET status = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(status, relationshipId);
        
        return NextResponse.json({ 
          message: `Relationship ${status}`,
          status: status
        });
      } catch (error) {
        console.error("SQLite error updating relationship:", error);
        return NextResponse.json(
          { error: "An error occurred while updating relationship in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error updating relationship:", error);
    return NextResponse.json(
      { error: "An error occurred while updating relationship" },
      { status: 500 }
    );
  }
}

// Delete a relationship
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const url = new URL(req.url);
    const relationshipId = url.searchParams.get('id');
    
    if (!relationshipId) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 }
      );
    }
    
    // In production with MySQL
    if (isProduction) {
      try {
        // Import PostgreSQL client
        const { mysqlDb } = await import('@/lib/pg-db');
        
        try {
          // Start a transaction
          await mysqlDb.query('BEGIN');
          
          // Check if the relationship exists and the current user is involved
          const relationship = await mysqlDb.query(`
            SELECT id FROM user_relationships 
            WHERE id = $1 AND (user_id = $2 OR related_user_id = $2)
          `, [relationshipId, userId]);
          
          if (!relationship || relationship.length === 0) {
            await mysqlDb.query('ROLLBACK');
            return NextResponse.json(
              { error: "Relationship not found or you do not have permission" },
              { status: 404 }
            );
          }
          
          // Delete the relationship
          await mysqlDb.query(`
            DELETE FROM user_relationships
            WHERE id = $1
          `, [relationshipId]);
          
          // Commit the transaction
          await mysqlDb.query('COMMIT');
          
          return NextResponse.json({ 
            message: "Relationship deleted"
          });
        } catch (error) {
          // Rollback on error
          await mysqlDb.query('ROLLBACK');
          console.error("Transaction error:", error);
          throw error;
        }
      } catch (error) {
        console.error("PostgreSQL error deleting relationship:", error);
        let errorMsg = "An error occurred while deleting relationship in production";
        if (error instanceof Error) {
          errorMsg += `: ${error.message}`;
        }
        return NextResponse.json(
          { error: errorMsg },
          { status: 500 }
        );
      }
    }
    // In development with SQLite
    else {
      try {
        const database = db as Database;
        
        // Check if the relationship exists and the current user is involved
        const relationship = database.prepare(`
          SELECT id FROM user_relationships 
          WHERE id = ? AND (user_id = ? OR related_user_id = ?)
        `).get(relationshipId, userId, userId) as { id: number } | undefined;
        
        if (!relationship) {
          return NextResponse.json(
            { error: "Relationship not found or you do not have permission" },
            { status: 404 }
          );
        }
        
        // Delete the relationship
        database.prepare(`
          DELETE FROM user_relationships
          WHERE id = ?
        `).run(relationshipId);
        
        return NextResponse.json({ 
          message: "Relationship deleted"
        });
      } catch (error) {
        console.error("SQLite error deleting relationship:", error);
        return NextResponse.json(
          { error: "An error occurred while deleting relationship in development" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error deleting relationship:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting relationship" },
      { status: 500 }
    );
  }
} 