'use client';

import { useState } from 'react';
import { Mail, Loader, User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { logger } from '@/utils/logger';
import { OAuthButtons } from './OAuthButtons';

type AuthMode = 'login' | 'register';

export function AuthForm() {
  const router = useRouter();
  const { signIn, signUp, error: authError, clearError } = useAuthStore();
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearError();

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      if (mode === 'login') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password);
      }
      router.push('/');
    } catch (error) {
      logger.error(`${mode} failed:`, error);
      setError(`Failed to ${mode}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      logger.info('Demo login: Starting authentication');
      setIsLoading(true);
      setError(null);
      clearError();

      await signIn('demo@smartemail.demo', 'demo123456');
      logger.info('Demo login: Successful sign in');
      router.push('/');
    } catch (error) {
      logger.error('Demo login failed:', error);
      setError('Failed to access demo account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Mail className="w-16 h-16 text-primary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Smart Email Manager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {(error || authError) && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {mode === 'register' && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <OAuthButtons />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            Try Demo Account
          </button>

          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}