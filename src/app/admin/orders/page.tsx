'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Package,
  Mail,
  User,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ArrowLeft,
  RefreshCw,
  Key,
  Copy,
  Lock
} from 'lucide-react';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface AccessCode {
  code: string;
  tier: string;
  isUsed: boolean;
  productId: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string;
  status: string;
  total: number;
  currency: string;
  paymentMethod: string | null;
  transactionId: string | null;
  notes: string | null;
  items: OrderItem[];
  accessCodes: AccessCode[];
  createdAt: string;
}

const ADMIN_PASSWORD = 'tamkinly2024';

export default function OrdersAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [generatingCode, setGeneratingCode] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadOrders();
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
      loadOrders();
    } else {
      setAuthError('Incorrect password');
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders?password=${ADMIN_PASSWORD}`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'COMPLETED' | 'CANCELLED', generateCode: boolean = false) => {
    setGeneratingCode(true);
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          password: ADMIN_PASSWORD,
          generateCode,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh orders
        await loadOrders();
        // Update selected order
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case 'PROCESSING':
        return <Badge className="bg-blue-100 text-blue-700"><RefreshCw className="w-3 h-3 mr-1" />Processing</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const totalRevenue = orders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0);

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#1F6F78]" />
            </div>
            <CardTitle className="text-[#0F1C2E]">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
              {authError && (
                <p className="text-sm text-red-500">{authError}</p>
              )}
            </div>
            <Button onClick={handleLogin} className="w-full bg-[#1F6F78] hover:bg-[#1F6F78]/90 text-white">
              Login
            </Button>
            <Link href="/" className="block text-center text-sm text-[#8A94A6] hover:text-[#1F6F78]">
              ← Back to Home
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-[#1F6F78]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-[#1F6F78] hover:text-[#3DD4B0] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#0F1C2E]">Orders Management</h1>
            <Button onClick={loadOrders} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#3DD4B0]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1C2E]">{orders.length}</p>
                  <p className="text-xs text-[#8A94A6]">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1C2E]">{pendingOrders}</p>
                  <p className="text-xs text-[#8A94A6]">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1C2E]">{orders.filter(o => o.status === 'COMPLETED').length}</p>
                  <p className="text-xs text-[#8A94A6]">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1C2E]">${totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-[#8A94A6]">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders Table */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E]">All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-[#8A94A6]">No orders yet</p>
                    <p className="text-sm text-slate-400">Orders will appear here when customers make purchases</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${selectedOrder?.id === order.id ? 'border-[#3DD4B0] bg-[#3DD4B0]/5' : 'border-slate-200 bg-white'}`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                              <Package className="w-5 h-5 text-[#1F6F78]" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#0F1C2E]">{order.orderNumber}</p>
                              <p className="text-xs text-[#8A94A6]">{order.customerName || 'No name'} • {order.customerEmail}</p>
                              <p className="text-xs text-slate-400">{order.items?.map(i => i.productName).join(', ')}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#0F1C2E]">${order.total}</p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#3DD4B0]" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-[#8A94A6]">Order Number</p>
                      <p className="font-mono text-sm text-[#0F1C2E]">{selectedOrder.orderNumber}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.customerName || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.items?.map(i => i.productName).join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm font-semibold text-[#0F1C2E]">${selectedOrder.total}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {selectedOrder.transactionId && (
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-[#8A94A6]">Skrill Transaction ID</p>
                        <p className="font-mono text-sm text-[#0F1C2E]">{selectedOrder.transactionId}</p>
                      </div>
                    )}

                    {selectedOrder.notes && (
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-[#8A94A6]">Notes</p>
                        <p className="text-sm text-[#2B2E34]">{selectedOrder.notes}</p>
                      </div>
                    )}

                    {/* Access Codes */}
                    {selectedOrder.accessCodes && selectedOrder.accessCodes.length > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-green-600 mb-2">Access Codes</p>
                        {selectedOrder.accessCodes.map((ac, idx) => (
                          <div key={idx} className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm font-bold text-green-700">{ac.code}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{ac.tier}</Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(ac.code)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-[#2B2E34] mb-2">Status: {getStatusBadge(selectedOrder.status)}</p>
                    </div>

                    {selectedOrder.status === 'PENDING' && (
                      <div className="space-y-2">
                        <Button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'COMPLETED', true)}
                          disabled={generatingCode}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Key className="w-4 h-4 mr-1" />
                          {generatingCode ? 'Processing...' : 'Complete & Generate Code'}
                        </Button>
                        <Button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel Order
                        </Button>
                      </div>
                    )}

                    {/* Copy Email */}
                    <Button
                      onClick={() => copyToClipboard(selectedOrder.customerEmail)}
                      variant="outline"
                      className="w-full"
                    >
                      Copy Customer Email
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-[#8A94A6]">Select an order to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
