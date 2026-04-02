'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Key,
  Sparkles,
  LogOut,
  Package,
  Calendar,
  Shield,
  ExternalLink,
  Settings,
  Bell,
  CreditCard,
  FileText
} from 'lucide-react';

type AuthMode = 'login' | 'register';

type UserData = {
  id: string;
  email: string;
  name?: string;
  role: string;
  accessCodes?: {
    code: string;
    productId: string;
    isUsed: boolean;
    createdAt: string;
  }[];
};

// Helper functions for localStorage sync
const getUserFromStorage = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('tamkinly_user');
  if (stored) {
    try {
      return JSON.parse(stored) as UserData;
    } catch {
      return null;
    }
  }
  return null;
};

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

// Account Dashboard Component (for logged-in users)
function AccountDashboard({ user, onLogout }: { user: UserData; onLogout: () => void }) {
  const getProductLabel = (productId: string) => {
    const products: Record<string, string> = {
      'identity-recode': 'Identity Recode Planner',
      'daily-planner': 'Daily Planner',
      'bundle': 'Complete Bundle',
      'worksheet': 'Worksheets Package',
    };
    return products[productId] || productId;
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {user.name || 'Welcome Back'}
                    </h1>
                    <p className="text-[#8A94A6] text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/apps">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Apps
                  </Button>
                </Link>
                <Button
                  className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] border-2 border-white/20"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8A94A6]">Products</p>
                    <p className="text-2xl font-bold text-[#0F1C2E]">
                      {user.accessCodes?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#1F6F78]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8A94A6]">Account Status</p>
                    <p className="text-2xl font-bold text-[#0F1C2E]">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0F1C2E]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#0F1C2E]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8A94A6]">Member Since</p>
                    <p className="text-lg font-bold text-[#0F1C2E]">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Access Codes */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Key className="w-5 h-5 text-[#3DD4B0]" />
                Your Access Codes
              </CardTitle>
              <CardDescription>
                Products you have purchased and their access codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.accessCodes && user.accessCodes.length > 0 ? (
                <div className="space-y-4">
                  {user.accessCodes.map((code, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F6F8FA] border border-slate-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#3DD4B0]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F1C2E]">
                            {getProductLabel(code.productId)}
                          </p>
                          <p className="text-sm text-[#8A94A6] font-mono">
                            {code.code}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={code.isUsed ? "default" : "secondary"}
                          className={code.isUsed ? "bg-[#3DD4B0] text-[#0F1C2E]" : ""}
                        >
                          {code.isUsed ? 'Activated' : 'Ready to Use'}
                        </Badge>
                        <Link href="/apps">
                          <Button size="sm" variant="outline">
                            Access
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                  <p className="text-[#8A94A6] mb-4">No products purchased yet</p>
                  <Link href="/products">
                    <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#1F6F78]" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B2E34]">Name</label>
                  <Input
                    value={user.name || ''}
                    placeholder="Not set"
                    disabled
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B2E34]">Email</label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-slate-50"
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" disabled>
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
                <Button variant="outline" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78]">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Need Help?</h3>
                    <p className="text-sm text-[#8A94A6]">
                      Our support team is here to assist you
                    </p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="bg-white text-[#0F1C2E] hover:bg-white/90">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Auth Form Component (for non-logged-in users)
function AuthForm({ onLogin }: { onLogin: (user: UserData) => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' 
        ? { email, password }
        : { email, password, name: name || undefined };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('tamkinly_user', JSON.stringify(data.user));
      
      if (mode === 'register') {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onLogin(data.user);
        }, 1500);
      } else {
        onLogin(data.user);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">Tamkinly</h1>
            <p className="text-[#8A94A6] text-sm">Identity Transformation Platform</p>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl text-[#0F1C2E]">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-[#8A94A6]">
              {mode === 'login' 
                ? 'Sign in to access your products'
                : 'Register to get started with your transformation journey'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === 'login' ? 'bg-white text-[#0F1C2E] shadow-sm' : 'text-[#8A94A6] hover:text-[#0F1C2E]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === 'register' ? 'bg-white text-[#0F1C2E] shadow-sm' : 'text-[#8A94A6] hover:text-[#0F1C2E]'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  {success}
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B2E34]">Name (optional)</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#8A94A6]">or</span>
              </div>
            </div>

            <Link href="/apps">
              <Button variant="outline" className="w-full border-[#1F6F78]/30 hover:bg-[#1F6F78]/10 h-12">
                <Key className="w-4 h-4 mr-2" />
                Use Access Code Instead
              </Button>
            </Link>

            {mode === 'register' && (
              <div className="mt-6 p-4 bg-[#3DD4B0]/10 rounded-lg border border-[#3DD4B0]/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#3DD4B0] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0F1C2E]">Already purchased?</p>
                    <p className="text-xs text-[#8A94A6] mt-1">
                      Register with the same email to automatically link your access codes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-[#8A94A6] text-sm">
            Need help?{' '}
            <Link href="/contact" className="text-[#3DD4B0] hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function AccountPage() {
  const router = useRouter();
  
  // Use useSyncExternalStore for SSR-safe localStorage access
  const user = useSyncExternalStore(
    subscribeToStorage,
    getUserFromStorage,
    () => null // Server snapshot
  );

  const handleLogout = () => {
    localStorage.removeItem('tamkinly_user');
    localStorage.removeItem('tamkinly_access');
    // Dispatch storage event to update other tabs
    window.dispatchEvent(new StorageEvent('storage'));
    router.push('/');
  };

  const handleLogin = (userData: UserData) => {
    // Storage event is automatically dispatched by localStorage.setItem
  };

  if (user) {
    return <AccountDashboard user={user} onLogout={handleLogout} />;
  }

  return <AuthForm onLogin={handleLogin} />;
}
