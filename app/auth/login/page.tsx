'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaLock, FaDumbbell } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Add a timeout to prevent hanging indefinitely
      const loginPromise = signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Login request timed out. Please try again.')), 15000);
      });
      
      // Race the login against the timeout
      const result = await Promise.race([loginPromise, timeoutPromise]) as any;
      
      if (!result) {
        throw new Error('No response from server. Please try again.');
      }
      
      if (result.error) {
        console.error('Login error details:', result.error);
        if (result.error.includes('JSON')) {
          setError('Server error: Invalid response format. Please try again later.');
        } else {
          setError('Invalid email or password');
        }
        setIsLoading(false);
        return;
      }
      
      // Redirect to callbackUrl or dashboard on success
      router.push(callbackUrl);
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('timed out')) {
        setError('Login request timed out. Please try again later.');
      } else if (error.message?.includes('JSON') || error.name === 'SyntaxError') {
        setError('Server error: Invalid response from server. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark p-4">
      <div className="w-full max-w-md">
        <div className="card bg-white dark:bg-dark shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary to-accent text-white text-center">
            <div className="flex justify-center mb-3">
              <FaDumbbell className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to GymBro</h1>
            <p className="text-white/80">Sign in to track your fitness journey</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 