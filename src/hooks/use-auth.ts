'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  accessTier: string;
}

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const user: User | null = session?.user || null;
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      router.refresh();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }, [router]);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error };
      }

      // Auto-login after registration
      const loginResult = await login(email, password);
      return loginResult;
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  }, [login]);

  const hasAccess = useCallback((requiredTier: string) => {
    if (!user) return false;
    
    const tiers = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
    const userTierIndex = tiers.indexOf(user.accessTier);
    const requiredTierIndex = tiers.indexOf(requiredTier);
    
    return userTierIndex >= requiredTierIndex;
  }, [user]);

  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    isAuthenticated,
    isLoading,
    loading,
    login,
    logout,
    register,
    hasAccess,
    isAdmin,
    update,
  };
}
