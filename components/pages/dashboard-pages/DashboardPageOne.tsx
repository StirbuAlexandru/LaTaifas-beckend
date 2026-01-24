'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Bell,
  RefreshCw,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const DashboardPageOne = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0,
    completedOrders: 0,
  });

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders?limit=5&sortBy=newest');
      const data = await response.json();
      
      if (data.success && data.data.orders) {
        const orders = data.data.orders;
        setRecentOrders(orders);
        
        // Calculate stats
        const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total_amount, 0);
        const pendingOrders = orders.filter((o: Order) => o.status === 'pending').length;
        const today = new Date().toDateString();
        const todayOrders = orders.filter((o: Order) => 
          new Date(o.created_at).toDateString() === today
        ).length;
        const completedOrders = orders.filter((o: Order) => o.status === 'delivered').length;
        
        setStats({
          totalRevenue,
          pendingOrders,
          todayOrders,
          completedOrders,
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'preparing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'delivered': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'În așteptare';
      case 'confirmed': return 'Confirmată';
      case 'preparing': return 'În preparare';
      case 'ready': return 'Gata';
      case 'delivered': return 'Livrată';
      case 'cancelled': return 'Anulată';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title - Modern */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text mb-2">Panou de Control</h1>
          <p className="text-gray-600 font-medium">
            Bun venit! Iată ce se întâmplă astăzi.
          </p>
        </div>
        <Button onClick={fetchRecentOrders} variant="outline" size="lg" disabled={loading} className="rounded-xl border-2 border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all duration-300">
          <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          Actualizează
        </Button>
      </div>

      {/* Stats Cards - Modern */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-red-50 to-white">
            <CardTitle className="text-sm font-bold text-gray-700">
              Venit Total
            </CardTitle>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">{stats.totalRevenue.toFixed(2)} LEI</div>
            <p className="text-xs text-gray-600 font-medium mt-2">
              Din ultimele {recentOrders.length} comenzi
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-orange-50 to-white">
            <CardTitle className="text-sm font-bold text-gray-700">
              Comenzi În Așteptare
            </CardTitle>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-600 font-medium mt-2">
              Necesită confirmare
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-red-50 to-white">
            <CardTitle className="text-sm font-bold text-gray-700">
              Comenzi Astăzi
            </CardTitle>
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{stats.todayOrders}</div>
            <p className="text-xs text-gray-600 font-medium mt-2">
              Plasate azi
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-orange-50 to-white">
            <CardTitle className="text-sm font-bold text-gray-700">
              Comenzi Livrate
            </CardTitle>
            <div className="bg-gradient-to-br from-orange-600 to-red-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Package className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{stats.completedOrders}</div>
            <p className="text-xs text-gray-600 font-medium mt-2">
              Completate cu succes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Comenzi Recente</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/orders">
                <Eye className="mr-2 h-4 w-4" />
                Vezi toate
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nu există comenzi încă
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer_name} - {order.customer_phone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleString('ro-RO')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium">{order.total_amount.toFixed(2)} LEI</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} produse</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Notificări Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.pendingOrders > 0 && (
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{stats.pendingOrders} comenzi noi</p>
                    <p className="text-xs text-muted-foreground">Necesită confirmare</p>
                  </div>
                </div>
              )}
              {stats.todayOrders > 0 && (
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{stats.todayOrders} comenzi astăzi</p>
                    <p className="text-xs text-muted-foreground">Plasate azi</p>
                  </div>
                </div>
              )}
              {stats.completedOrders > 0 && (
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{stats.completedOrders} comenzi livrate</p>
                    <p className="text-xs text-muted-foreground">Completate cu succes</p>
                  </div>
                </div>
              )}
              {recentOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nu există notificări
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/dashboard/products/add-product">
            <Package className="mr-2 h-4 w-4" />
            Adaugă Produs
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/orders">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Vezi Comenzi
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/products">
            <Package className="mr-2 h-4 w-4" />
            Gestionează Produse
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardPageOne;