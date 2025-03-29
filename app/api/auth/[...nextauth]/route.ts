import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

// This creates a dynamic route handler for NextAuth.js
const handler = NextAuth(authOptions);

// Export the handler functions for API route
export { handler as GET, handler as POST }; 