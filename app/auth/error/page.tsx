'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    default: 'An error occurred during authentication.',
    configuration: 'There is a problem with the server configuration.',
    accessdenied: 'You do not have permission to sign in.',
    verification: 'The verification link may have expired or has already been used.',
    signin: 'Try signing in with a different account or method.',
    credentialssignin: 'The email or password you entered is incorrect.',
    sessionrequired: 'Please sign in to access this page.',
  };
  
  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark p-4">
      <div className="w-full max-w-md">
        <div className="card bg-white dark:bg-dark shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 bg-red-500 text-white text-center">
            <div className="flex justify-center mb-3">
              <FaExclamationTriangle className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold">Authentication Error</h1>
          </div>
          
          <div className="p-6">
            <p className="text-lg mb-6">{errorMessage}</p>
            
            <div className="flex justify-center space-x-4">
              <Link 
                href="/auth/login" 
                className="btn-primary"
              >
                Back to Sign In
              </Link>
              <Link 
                href="/" 
                className="btn-secondary"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 