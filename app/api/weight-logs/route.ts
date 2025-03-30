import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

// Add response options to control caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Get weight logs for the user
    const weightLogs = db.prepare(`
      SELECT id, weight, date 
      FROM weight_logs 
      WHERE user_id = ?
      ORDER BY date ASC
    `).all(userId);
    
    return NextResponse.json(weightLogs);
  } catch (error) {
    console.error("Error fetching weight logs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching weight logs" },
      { status: 500 }
    );
  }
} 