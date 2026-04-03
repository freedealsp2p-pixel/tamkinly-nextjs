'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  RefreshCw
} from 'lucide-react';

interface Order {
  id: string;
  product: string;
  productName: string;
  price: number;
  customerName: string;
  customerEmail: string;
  transactionId?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

// Helper function to load orders from localStorage
function loadOrdersFromStorage(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const storedOrders = localStorage.getItem('tamkinly_orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch {
    return [];
  }
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>(loadOrdersFromStorage);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = () => {
    setLoading(true);
    setOrders(loadOrdersFromStorage());
    setLoading(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: 'completed' | 'cancelled') => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('tamkinly_orders', JSON.stringify(updatedOrders));

    // Update selected order if viewing
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.price, 0);

  if (loading) {
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
                  <p className="text-2xl font-bold text-[#0F1C2E]">{orders.filter(o => o.status === 'completed').length}</p>
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
                  <p className="text-2xl font-bold text-[#0F1C2E]">${totalRevenue}</p>
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
                    {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order) => (
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
                              <p className="font-semibold text-[#0F1C2E]">{order.productName}</p>
                              <p className="text-xs text-[#8A94A6]">{order.customerName} • {order.customerEmail}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#0F1C2E]">${order.price}</p>
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
                      <p className="text-xs text-[#8A94A6]">Order ID</p>
                      <p className="font-mono text-sm text-[#0F1C2E]">{selectedOrder.id}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm text-[#2B2E34]">{selectedOrder.productName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#8A94A6]" />
                        <span className="text-sm font-semibold text-[#0F1C2E]">${selectedOrder.price}</span>
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

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-[#2B2E34] mb-2">Status: {getStatusBadge(selectedOrder.status)}</p>
                    </div>

                    {selectedOrder.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    )}

                    {/* Copy Email */}
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedOrder.customerEmail);
                        alert('Email copied!');
                      }}
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
