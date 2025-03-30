'use client';

import { signOut } from 'next-auth/react';

// Function to reset the auth session entirely
export async function resetAuth() {
  // Clear any local storage or cookies that might be causing issues
  localStorage.removeItem('next-auth.session-token');
  localStorage.removeItem('next-auth.callback-url');
  localStorage.removeItem('next-auth.csrf-token');
  
  // Clear cookies by setting expiration in the past
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Trigger a NextAuth signout to completely reset the auth state
  return signOut({ redirect: false });
}

// Function to redirect to login with a clean slate
export async function redirectToLogin() {
  await resetAuth();
  window.location.href = '/auth/login';
  return null;
} 