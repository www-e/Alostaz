/**
 * Login page component
 * Provides the user interface for authentication
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoginForm from '@/components/features/auth/login-form';
import { useAuth } from '@/hooks/useAuth';

const LoginPage: React.FC = () => {
  const { authState } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    // Disable automatic redirection on page load to prevent flash redirects
    // Only redirect after explicit login action
    console.log('Login page loaded, auth state:', 
      authState.isLoading ? 'loading' : (authState.user ? 'authenticated' : 'unauthenticated'));
      
    // We're intentionally not redirecting here to prevent the flash redirect issue
    // Redirection will happen in the login function after explicit user action
  }, [authState.user, authState.isLoading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
        {/* Left side - Decorative */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8">
              <Image 
                src="/logo.png" 
                alt="الأستاذ التعليمي" 
                width={150} 
                height={50}
                className="mb-6"
              />
              <h1 className="text-3xl font-bold text-white mb-2">منصة الأستاذ التعليمية</h1>
              <p className="text-blue-100">المنصة الأولى للتعليم الثانوي المتميز</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-400 bg-opacity-30 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white">تتبع الحضور والغياب</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-400 bg-opacity-30 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white">إدارة المدفوعات والمصروفات</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-400 bg-opacity-30 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white">متابعة الواجبات والتكليفات</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
