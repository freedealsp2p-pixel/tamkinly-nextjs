'use client';

import { useState, useEffect, useCallback } from 'react';

interface Order {
  id: string;
  email: string;
  amount: number;
  status: string;
  createdAt: string;
  packageName?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  orders?: number;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

interface ContentItem {
  id: string;
  type: string;
  key: string;
  value: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/verify');
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.authenticated === true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch {
      setLoginError('Connection error');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  // Fetch data using JWT session (no password in URL)
  const fetchAdminData = useCallback(async (endpoint: string) => {
    try {
      const res = await fetch(`/api/admin/${endpoint}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return null;
      }
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }, []);

  // Load data based on active tab
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = async () => {
      switch (activeTab) {
        case 'stats':
          const statsData = await fetchAdminData('stats');
          if (statsData) setStats(statsData);
          break;
        case 'orders':
          const ordersData = await fetchAdminData('orders');
          if (ordersData) setOrders(ordersData.orders || ordersData);
          break;
        case 'users':
          const usersData = await fetchAdminData('users');
          if (usersData) setUsers(usersData.users || usersData);
          break;
        case 'testimonials':
          const testimonialsData = await fetchAdminData('testimonials');
          if (testimonialsData) setTestimonials(testimonialsData.testimonials || testimonialsData);
          break;
        case 'content':
          const contentData = await fetchAdminData('content');
          if (contentData) setContent(contentData.content || contentData);
          break;
      }
    };
    
    loadData();
  }, [isAuthenticated, activeTab, fetchAdminData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          
          {loginError && (
            <div className="bg-red-600/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-6">
        <div className="flex space-x-1">
          {['stats', 'orders', 'users', 'testimonials', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm">Total Orders</h3>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalOrders || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm">Total Users</h3>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm">Revenue</h3>
              <p className="text-3xl font-bold text-white mt-2">${stats.revenue || 0}</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-gray-300 text-sm">ID</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Email</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Amount</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Status</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-gray-300 text-sm">{order.id?.slice(0, 8)}...</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{order.email}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">${order.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' ? 'bg-green-900 text-green-300' :
                        order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="p-6 text-gray-500 text-center">No orders found</div>}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-gray-300 text-sm">Name</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Email</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Orders</th>
                  <th className="px-6 py-3 text-gray-300 text-sm">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-gray-300 text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{user.orders || 0}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div className="p-6 text-gray-500 text-center">No users found</div>}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{t.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${t.approved ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {t.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{t.text}</p>
                <div className="mt-2 text-yellow-400 text-sm">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              </div>
            ))}
            {testimonials.length === 0 && <div className="col-span-2 p-6 text-gray-500 text-center">No testimonials found</div>}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-4">
            {content.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.key}</span>
                  <span className="text-gray-500 text-xs">{item.type}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.value}</p>
              </div>
            ))}
            {content.length === 0 && <div className="p-6 text-gray-500 text-center">No content found</div>}
          </div>
        )}
      </div>
    </div>
  );
}
