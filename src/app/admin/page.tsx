'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Key,
  Mail,
  Package,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
  Trash2,
  RefreshCw,
  Shield,
  Plus,
  Search,
  AlertCircle,
  LayoutDashboard,
  Settings,
  Sparkles,
  Brain,
  Heart,
  Sun,
  Calendar,
  BookOpen,
  User,
  Home,
  TrendingUp,
  BarChart3,
  Headphones,
  Clock,
  Star,
  ArrowRight,
  Lock,
  Unlock,
  Zap,
  Globe,
  CreditCard,
  ExternalLink,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';

// Access Tier Colors
const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-[#3DD4B0]/20', text: 'text-[#2BC49E]', border: 'border-[#3DD4B0]/50' },
  TRIAL: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  BASIC: { bg: 'bg-[#1F6F78]/20', text: 'text-[#1F6F78]', border: 'border-[#1F6F78]/50' },
  PREMIUM: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  BUNDLE: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' }
};

interface AccessCode {
  id: string;
  code: string;
  email: string;
  customerName: string | null;
  productId: string | null;
  tier: string;
  orderId: string | null;
  isUsed: boolean;
  usedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

// Admin Apps Data
const adminAppsData = [
  { slug: 'identity-gap-quiz', name: 'Identity Gap Assessment', description: 'Discover your identity gap.', icon: Brain, color: '#3DD4B0', category: 'Assessment', tier: 'FREE', duration: '3 min' },
  { slug: 'values-clarification', name: 'Values Clarification', description: 'Identify your core values.', icon: Heart, color: '#E57373', category: 'Assessment', tier: 'FREE', duration: '5 min' },
  { slug: 'daily-reflection', name: 'Daily Reflection', description: 'Daily identity prompts.', icon: Sun, color: '#FFB74D', category: 'Tracking', tier: 'FREE', duration: 'Daily' },
  { slug: 'trial-planner', name: '7-Day Trial Planner', description: 'Full system for 7 days.', icon: Calendar, color: '#1F6F78', category: 'Planning', tier: 'TRIAL', duration: '7 days' },
  { slug: 'executive-manual', name: 'Executive Manual', description: 'Implementation framework.', icon: BookOpen, color: '#1F6F78', category: 'Worksheet', tier: 'BASIC', duration: 'PDF' },
  { slug: 'daily-planner', name: '30-Day Planner', description: 'Interactive daily planner.', icon: Calendar, color: '#3DD4B0', category: 'Planning', tier: 'BASIC', duration: '30 days' },
  { slug: 'identity-baseline', name: 'Identity Baseline', description: '8 dimensions assessment.', icon: User, color: '#3DD4B0', category: 'Worksheet', tier: 'BASIC', duration: '15 min' },
  { slug: 'environmental-audit', name: 'Environmental Audit', description: 'Analyze your environment.', icon: Home, color: '#1F6F78', category: 'Worksheet', tier: 'BASIC', duration: '10 min' },
  { slug: 'decision-analysis', name: 'Decision Analysis', description: 'Track your decisions.', icon: TrendingUp, color: '#64B5F6', category: 'Analytics', tier: 'PREMIUM', duration: 'Ongoing' },
  { slug: 'evidence-tracking', name: 'Evidence Tracking', description: 'Log transformation proof.', icon: BarChart3, color: '#FFB74D', category: 'Tracking', tier: 'PREMIUM', duration: 'Daily' },
  { slug: 'progress-dashboard', name: 'Progress Dashboard', description: 'Advanced analytics.', icon: BarChart3, color: '#8A94A6', category: 'Analytics', tier: 'PREMIUM', duration: 'Always' },
  { slug: 'emotion-regulation', name: 'Emotion Regulation', description: 'ERQ assessment.', icon: Heart, color: '#E57373', category: 'Worksheet', tier: 'BUNDLE', duration: '10 min' },
  { slug: 'ai-identity-coach', name: 'AI Identity Coach', description: 'Personalized coaching.', icon: Sparkles, color: '#3DD4B0', category: 'Coaching', tier: 'BUNDLE', duration: 'Unlimited' },
  { slug: 'priority-support', name: 'Priority Support', description: '24-hour response.', icon: Headphones, color: '#0F1C2E', category: 'Support', tier: 'BUNDLE', duration: 'Unlimited' },
];

// Payment Settings Tab
function PaymentTab() {
  const [config, setConfig] = useState({
    tahweelApiKey: '',
    tahweelSecretKey: '',
    tahweelMerchantId: '',
    demoMode: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F1C2E]">Payment Settings</h2>
          <p className="text-slate-600">Configure payment gateways</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#3DD4B0]" />
            Active Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-[#3DD4B0]/10 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
            <div>
              <p className="font-medium text-[#0F1C2E]">Wise Payment</p>
              <p className="text-sm text-slate-600">wise.com/pay/me/abdallahc60</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-[#0F1C2E]">Crypto (USDC/USDT)</p>
              <p className="text-sm text-slate-600">BEP20 Network</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#1F6F78]/10 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-[#1F6F78]" />
            <div>
              <p className="font-medium text-[#0F1C2E]">Bank Transfer</p>
              <p className="text-sm text-slate-600">Community Federal Savings Bank</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newOrderId, setNewOrderId] = useState('');
  const [newTier, setNewTier] = useState('BASIC');
  const [generating, setGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rememberMe, setRememberMe] = useState(false);
  // Batch generation state
  const [batchCount, setBatchCount] = useState('10');
  const [batchTier, setBatchTier] = useState('BASIC');
  const [batchPrefix, setBatchPrefix] = useState('early');
  const [batchGenerating, setBatchGenerating] = useState(false);
  const [batchResults, setBatchResults] = useState<string[] | null>(null);
  const [batchCopied, setBatchCopied] = useState(false);

  // Check for saved session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('tamkinly_admin_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.expiry > Date.now()) {
          setPassword(session.password);
          setIsAuthenticated(true);
          fetchCodes(session.password);
        } else {
          localStorage.removeItem('tamkinly_admin_session');
        }
      } catch {
        localStorage.removeItem('tamkinly_admin_session');
      }
    }
  }, []);

  const stats = {
    total: codes.length,
    used: codes.filter(c => c.isUsed).length,
    unused: codes.filter(c => !c.isUsed).length,
    byTier: {
      FREE: codes.filter(c => c.tier === 'FREE').length,
      TRIAL: codes.filter(c => c.tier === 'TRIAL').length,
      BASIC: codes.filter(c => c.tier === 'BASIC').length,
      PREMIUM: codes.filter(c => c.tier === 'PREMIUM').length,
      BUNDLE: codes.filter(c => c.tier === 'BUNDLE').length,
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/access/list?password=${encodeURIComponent(password)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || 'Access denied');
        setLoading(false);
        return;
      }
      
      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setCodes(data.codes || []);
        
        // Save session if remember me is checked
        if (rememberMe) {
          localStorage.setItem('tamkinly_admin_session', JSON.stringify({
            password,
            expiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
          }));
        }
      } else {
        setError(data.error || 'Access denied');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCodes = async (pwd?: string) => {
    setLoadingCodes(true);
    try {
      const response = await fetch(`/api/access/list?password=${encodeURIComponent(pwd || password)}`);
      const data = await response.json();
      if (data.success) {
        setCodes(data.codes);
      }
    } catch {
      console.error('Failed to fetch codes');
    } finally {
      setLoadingCodes(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setGenerating(true);
    setGeneratedCode(null);
    setCopiedCode(false);

    // Map tier to proper product ID
    const tierToProductId: Record<string, string> = {
      'FREE': 'free',
      'TRIAL': 'trial',
      'BASIC': 'planner',
      'PREMIUM': 'premium',
      'BUNDLE': 'bundle',
    };

    try {
      const response = await fetch('/api/access/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail,
          customerName: newCustomerName || undefined,
          orderId: newOrderId || undefined,
          tier: newTier,
          productId: tierToProductId[newTier] || newTier.toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCode(data.code);
        setNewEmail('');
        setNewCustomerName('');
        setNewOrderId('');
        fetchCodes();
      } else {
        setError(data.error || 'Failed to generate code');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this code?')) return;

    try {
      const response = await fetch('/api/access/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        fetchCodes();
      }
    } catch {
      console.error('Failed to delete code');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('tamkinly_admin_session');
    setIsAuthenticated(false);
    setPassword('');
    setCodes([]);
  };

  const filteredCodes = codes.filter(code =>
    code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (code.customerName && code.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-[#0F1C2E] flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl text-[#0F1C2E]">Admin Access</CardTitle>
            <CardDescription className="text-[#8A94A6]">Enter your credentials to continue</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-[#FC6D26] text-sm bg-[#FFF3E8] p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Keep me logged in for 7 days
              </label>

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-[#0F1C2E] text-white hover:bg-[#0F1C2E]/90 h-12"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Authenticating...</>
                ) : 'Enter Admin Panel'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Tamkinly Admin</h1>
                <p className="text-[#8A94A6] text-sm">Manage your platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" target="_blank">
                <Button variant="secondary"><Globe className="w-4 h-4 mr-2" />View Site</Button></Link>
              <Button variant="secondary" onClick={() => fetchCodes()} disabled={loadingCodes}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingCodes ? 'animate-spin' : ''}`} />Refresh</Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-slate-200 mb-6">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</TabsTrigger>
            <TabsTrigger value="apps" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />Apps</TabsTrigger>
            <TabsTrigger value="codes" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
              <Key className="w-4 h-4 mr-2" />Access Codes</TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
              <CreditCard className="w-4 h-4 mr-2" />Payment</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A94A6] text-xs mb-1">Total Codes</p>
                      <p className="text-2xl font-bold text-[#0F1C2E]">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#0F1C2E]/10 flex items-center justify-center">
                      <Key className="w-5 h-5 text-[#0F1C2E]" /></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A94A6] text-xs mb-1">Used</p>
                      <p className="text-2xl font-bold text-[#3DD4B0]">{stats.used}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" /></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A94A6] text-xs mb-1">Available</p>
                      <p className="text-2xl font-bold text-[#1F6F78]">{stats.unused}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#1F6F78]" /></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A94A6] text-xs mb-1">Bundle Sales</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.byTier.BUNDLE}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600" /></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] text-lg">Tier Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.byTier).map(([tier, count]) => (
                      <div key={tier} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={`${tierColors[tier]?.bg} ${tierColors[tier]?.text}`}>{tier}</Badge>
                          <span className="text-sm text-slate-600">
                            {tier === 'BUNDLE' ? 'Complete Bundle' : tier === 'PREMIUM' ? 'Premium Package' : tier === 'BASIC' ? 'Basic Package' : tier === 'TRIAL' ? '7-Day Trial' : 'Free Access'}
                          </span>
                        </div>
                        <span className="font-semibold text-[#0F1C2E]">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]" onClick={() => setActiveTab('codes')}>
                    <Plus className="w-4 h-4 mr-2" />Generate New Access Code</Button>
                  <Button variant="outline" className="w-full justify-start border-[#1F6F78]/20" onClick={() => setActiveTab('apps')}>
                    <Sparkles className="w-4 h-4 mr-2" />View All Apps</Button>
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full justify-start border-[#1F6F78]/20">
                      <ExternalLink className="w-4 h-4 mr-2" />View Products Page</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps">
            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#0F1C2E]">All Apps - Admin Access</CardTitle>
                    <CardDescription>You have full access to all apps as admin</CardDescription>
                  </div>
                  <Badge className="bg-[#3DD4B0] text-[#0F1C2E]"><Unlock className="w-3 h-3 mr-1" />Full Access</Badge>
                </div>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {adminAppsData.map((app) => {
                const Icon = app.icon;
                const tierStyle = tierColors[app.tier];
                return (
                  <Card key={app.slug} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${app.color}20` }}>
                          <Icon className="w-5 h-5" style={{ color: app.color }} /></div>
                        <Badge className={`${tierStyle.bg} ${tierStyle.text} text-xs`}>{app.tier}</Badge>
                      </div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-1">{app.name}</h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{app.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{app.duration}</span>
                        <Link href={`/apps/${app.slug}`}>
                          <Button size="sm" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                            <Unlock className="w-3 h-3 mr-1" />Open</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Access Codes Tab */}
          <TabsContent value="codes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                {/* Single Code Generation */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#3DD4B0]" />Generate New Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGenerate} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                          <Mail className="w-4 h-4" />Customer Email *</label>
                        <Input type="email" placeholder="customer@email.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Customer Name</label>
                        <Input type="text" placeholder="John Doe" value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Access Tier</label>
                        <Select value={newTier} onValueChange={setNewTier}>
                          <SelectTrigger className="border-[#1F6F78]/20"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FREE">FREE - Lead Magnet</SelectItem>
                            <SelectItem value="TRIAL">TRIAL - 7 Day ($7)</SelectItem>
                            <SelectItem value="BASIC">BASIC - Planner ($17)</SelectItem>
                            <SelectItem value="PREMIUM">PREMIUM - Premium ($27)</SelectItem>
                            <SelectItem value="BUNDLE">BUNDLE - Complete ($47)</SelectItem>
                          </SelectContent>
                        </Select></div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Order ID (optional)</label>
                        <Input type="text" placeholder="ORD-12345" value={newOrderId} onChange={(e) => setNewOrderId(e.target.value)} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
                      <Button type="submit" disabled={generating || !newEmail} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12">
                        {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Key className="w-4 h-4 mr-2" />Generate Code</>}</Button>
                    </form>

                    {generatedCode && (
                      <div className="mt-6 p-4 bg-[#3DD4B0]/10 rounded-lg border border-[#3DD4B0]/30">
                        <p className="text-sm text-[#8A94A6] mb-2">Code generated successfully!</p>
                        <div className="flex items-center justify-between bg-white p-3 rounded-md">
                          <code className="text-lg font-mono font-bold text-[#0F1C2E]">{generatedCode}</code>
                          <Button 
                            onClick={() => copyToClipboard(generatedCode)} 
                            className={`${copiedCode ? 'bg-green-500 text-white' : 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]'} h-10 px-4`}
                          >
                            {copiedCode ? (
                              <><CheckCircle2 className="w-4 h-4 mr-2" />Copied!</>
                            ) : (
                              <><Copy className="w-4 h-4 mr-2" />Copy</>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Batch Code Generation */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#3DD4B0]" />Batch Generate</CardTitle>
                    <CardDescription>Generate multiple codes for first 200 customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setBatchGenerating(true);
                      setBatchResults(null);
                      setBatchCopied(false);
                      try {
                        const response = await fetch('/api/access/batch-generate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            count: parseInt(batchCount) || 10,
                            tier: batchTier,
                            prefix: batchPrefix || undefined,
                            password,
                          }),
                        });
                        const data = await response.json();
                        if (data.success) {
                          setBatchResults(data.codes);
                          fetchCodes();
                        } else {
                          setError(data.error || 'Failed to generate batch');
                        }
                      } catch {
                        setError('Network error. Please try again.');
                      } finally {
                        setBatchGenerating(false);
                      }
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Number of Codes</label>
                        <Input type="number" min="1" max="200" placeholder="10" value={batchCount} onChange={(e) => setBatchCount(e.target.value)} required className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" />
                        <p className="text-xs text-slate-500">Max 200 codes per batch</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Access Tier</label>
                        <Select value={batchTier} onValueChange={setBatchTier}>
                          <SelectTrigger className="border-[#1F6F78]/20"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FREE">FREE - Lead Magnet</SelectItem>
                            <SelectItem value="TRIAL">TRIAL - 7 Day ($7)</SelectItem>
                            <SelectItem value="BASIC">BASIC - Planner ($17)</SelectItem>
                            <SelectItem value="PREMIUM">PREMIUM - Premium ($27)</SelectItem>
                            <SelectItem value="BUNDLE">BUNDLE - Complete ($47)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Prefix (optional)</label>
                        <Input type="text" placeholder="early" value={batchPrefix} onChange={(e) => setBatchPrefix(e.target.value)} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" />
                        <p className="text-xs text-slate-500">Used for placeholder email: {batchPrefix || 'batch'}-1@tamkinly.com</p>
                      </div>
                      <Button type="submit" disabled={batchGenerating} className="w-full bg-[#0F1C2E] text-white hover:bg-[#0F1C2E]/90 h-12">
                        {batchGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Zap className="w-4 h-4 mr-2" />Generate {batchCount} Codes</>}
                      </Button>
                    </form>

                    {batchResults && (
                      <div className="mt-6 p-4 bg-[#0F1C2E]/5 rounded-lg border border-[#0F1C2E]/20">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium text-[#0F1C2E]">Generated {batchResults.length} codes:</p>
                          <Button 
                            onClick={() => {
                              navigator.clipboard.writeText(batchResults.join('\n'));
                              setBatchCopied(true);
                              setTimeout(() => setBatchCopied(false), 3000);
                            }}
                            size="sm"
                            className={`${batchCopied ? 'bg-green-500 text-white' : 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]'}`}
                          >
                            {batchCopied ? <><CheckCircle2 className="w-3 h-3 mr-1" />Copied All!</> : <><Copy className="w-3 h-3 mr-1" />Copy All</>}
                          </Button>
                        </div>
                        <div className="max-h-60 overflow-y-auto bg-white rounded-md p-3 space-y-1">
                          {batchResults.map((code, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50">
                              <span className="text-xs text-slate-500 w-8">{idx + 1}.</span>
                              <code className="font-mono text-sm font-bold text-[#0F1C2E] flex-1">{code}</code>
                              <button onClick={() => copyToClipboard(code)} className="text-[#1F6F78] hover:text-[#0F1C2E] p-1"><Copy className="w-3 h-3" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#0F1C2E]">Access Codes</CardTitle>
                    <div className="relative w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
                      <Input placeholder="Search codes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingCodes ? (
                    <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#1F6F78]" /></div>
                  ) : filteredCodes.length === 0 ? (
                    <div className="text-center py-12"><Key className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" /><p className="text-[#8A94A6]">No codes found</p></div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {filteredCodes.map((code) => {
                        const tierStyle = tierColors[code.tier] || tierColors.BASIC;
                        return (
                          <div key={code.id} className="flex items-center justify-between p-4 bg-[#F6F8FA] rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${code.isUsed ? 'bg-[#3DD4B0]/20 text-[#3DD4B0]' : 'bg-[#1F6F78]/10 text-[#1F6F78]'}`}>
                                {code.isUsed ? <CheckCircle2 className="w-5 h-5" /> : <Key className="w-5 h-5" />}</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <code className="font-mono font-bold text-[#0F1C2E]">{code.code}</code>
                                  <Badge className={`${tierStyle.bg} ${tierStyle.text}`}>{code.tier}</Badge>
                                  {code.isUsed && <Badge className="bg-[#3DD4B0] text-[#0F1C2E]">Used</Badge>}
                                </div>
                                <p className="text-sm text-[#8A94A6]">{code.customerName || code.email}{code.orderId && ` • Order: ${code.orderId}`}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code.code)} className="text-[#1F6F78] hover:text-[#0F1C2E]"><Copy className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(code.id)} className="text-[#FC6D26] hover:text-[#E55A10] hover:bg-[#FFF3E8]"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <PaymentTab />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E]">System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Platform</span>
                  <span className="font-medium text-[#0F1C2E]">Next.js 16 (Standalone)</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Payment Gateways</span>
                  <span className="font-medium text-[#0F1C2E]">Wise, Crypto, Bank Transfer</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Database</span>
                  <span className="font-medium text-[#0F1C2E]">Prisma (SQLite)</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Products</span>
                  <span className="font-medium text-[#0F1C2E]">4 Products (Local)</span>
                </div>
                <div className="flex justify-between p-3 bg-[#3DD4B0]/10 rounded">
                  <span className="text-[#1F6F78]">Status</span>
                  <span className="font-medium text-[#3DD4B0]">Online ✓</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
