import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Trash2, 
  Map, 
  Bell, 
  Truck, 
  Activity, 
  BarChart3, 
  Users, 
  Wrench, 
  Settings,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '../components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Bin Monitoring', href: '/bins', icon: Trash2 },
  { name: 'Map & Location', href: '/map', icon: Map },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Collections', href: '/collections', icon: Truck },
  { name: 'Rot Index', href: '/rot-index', icon: Activity },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Workers', href: '/workers', icon: Users },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'User Management', href: '/users', icon: Settings },
];

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Bin Monitoring</h2>
          <p className="text-gray-900 font-semibold">Real-time monitoring of all smart bins</p>
        </div>
      </div>
  return (
    
    <div className="min-h-screen bg-white">
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="rounded-lg bg-green-600 p-2">
              <Trash2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">OMNIBINS</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@omnibins.com</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      
      <div className="lg:pl-64">
        {/* Top bar */} 


        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}