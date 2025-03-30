import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { NextRequest, NextResponse } from "next/server";

// Create an error handling wrapper for the NextAuth handler
async function authHandler(req: NextRequest, context: any) {
  try {
    // This creates a dynamic route handler for NextAuth.js
    const handler = NextAuth(authOptions);
    
    // Execute the handler
    return await Promise.race([
      handler(req, context),
      // Add a timeout to prevent hanging indefinitely on auth requests
      new Promise<NextResponse>((_, reject) => 
        setTimeout(() => {
          console.error('Auth request timed out');
          reject(new Error('Auth request timed out'));
        }, 15000)
      )
    ]);
  } catch (error) {
    console.error('NextAuth handler error:', error);
    
    // Ensure we always return a valid response, not an error
    return NextResponse.json(
      { error: 'Authentication error occurred', message: (error as Error).message },
      { status: 500 }
    );
  }
}

// Export the handler functions for API route
export { authHandler as GET, authHandler as POST }; 