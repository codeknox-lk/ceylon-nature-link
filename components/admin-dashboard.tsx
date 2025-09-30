'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, DollarSign, Truck, Building2 } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  paymentMethod: 'cod' | 'bank';
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  reference?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'delivered'>('all');

  // Load orders from localStorage (real security data)
  useEffect(() => {
    const loadOrdersFromStorage = () => {
      const allOrders: Order[] = [];
      
      // Load COD orders
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cod_security_')) {
          try {
            const securityData = JSON.parse(localStorage.getItem(key) || '{}');
            const order: Order = {
              id: securityData.orderReference || 'Unknown',
              customerName: 'Customer', // Would be from order data
              email: 'customer@example.com',
              phone: securityData.customerPhone || 'Unknown',
              total: 0, // Would be calculated
              paymentMethod: 'cod',
              status: 'pending',
              orderDate: new Date().toISOString().split('T')[0],
              deliveryDate: securityData.deliveryDate,
              reference: securityData.trackingCode,
              items: []
            };
            allOrders.push(order);
          } catch (error) {
            console.error('Error parsing COD security data:', error);
          }
        }
        
        // Load Bank Transfer orders
        if (key && key.startsWith('bank_security_')) {
          try {
            const securityData = JSON.parse(localStorage.getItem(key) || '{}');
            const order: Order = {
              id: securityData.orderReference || 'Unknown',
              customerName: 'Customer',
              email: securityData.customerEmail || 'Unknown',
              phone: securityData.customerPhone || 'Unknown',
              total: 0,
              paymentMethod: 'bank',
              status: 'pending',
              orderDate: new Date().toISOString().split('T')[0],
              reference: securityData.bankReference,
              items: []
            };
            allOrders.push(order);
          } catch (error) {
            console.error('Error parsing Bank security data:', error);
          }
        }
      }
      
      setOrders(allOrders);
    };
    
    loadOrdersFromStorage();
    
    // Refresh every 5 seconds to show new orders
    const interval = setInterval(loadOrdersFromStorage, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'delivered': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      delivered: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders and track payments</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: 'Pending Payment' },
            { key: 'paid', label: 'Paid' },
            { key: 'delivered', label: 'Delivered' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key as any)}
              className="px-4 py-2"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.email} • {order.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      {order.paymentMethod === 'cod' ? (
                        <Truck className="w-4 h-4" />
                      ) : (
                        <Building2 className="w-4 h-4" />
                      )}
                      <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-2">Items</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-600"> x{item.quantity}</span>
                          <span className="float-right">LKR {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-semibold mb-2">Payment Info</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>Total: LKR {order.total.toLocaleString()}</span>
                      </div>
                      <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                      {order.deliveryDate && (
                        <p>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                      )}
                      {order.reference && (
                        <p>Reference: {order.reference}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-semibold mb-2">Actions</h4>
                    <div className="space-y-2">
                      {order.status === 'pending' && order.paymentMethod === 'bank' && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'paid')}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Mark as Paid
                        </Button>
                      )}
                      {order.status === 'paid' && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Mark as Delivered
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`mailto:${order.email}?subject=Order ${order.id} Update`)}
                      >
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No orders found for the selected filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
