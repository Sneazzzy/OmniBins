import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Shield, User, Users, Settings } from 'lucide-react';

const users = [
  { id: 1, name: 'Admin User', email: 'admin@omnibins.com', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
  { id: 2, name: 'LGU Staff 1', email: 'staff1@omnibins.com', role: 'staff', status: 'active', lastLogin: '5 hours ago' },
  { id: 3, name: 'LGU Staff 2', email: 'staff2@omnibins.com', role: 'staff', status: 'active', lastLogin: '1 day ago' },
  { id: 4, name: 'Worker Manager', email: 'manager@omnibins.com', role: 'manager', status: 'active', lastLogin: '3 hours ago' },
  { id: 5, name: 'Analyst', email: 'analyst@omnibins.com', role: 'analyst', status: 'active', lastLogin: '6 hours ago' },
  { id: 6, name: 'Inactive User', email: 'inactive@omnibins.com', role: 'staff', status: 'inactive', lastLogin: '30 days ago' },
];

export function UserManagement() {
  const [userList] = useState(users);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      case 'manager':
        return <Badge className="bg-purple-500 text-white">Manager</Badge>;
      case 'analyst':
        return <Badge className="bg-blue-500 text-white">Analyst</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Staff</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-8 w-8 text-red-500" />;
      case 'manager':
        return <Users className="h-8 w-8 text-purple-500" />;
      default:
        return <User className="h-8 w-8 text-gray-500" />;
    }
  };

  const activeUsers = userList.filter(u => u.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-900 font-semibold">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{userList.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {userList.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {getRoleIcon(user.role)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      {getRoleBadge(user.role)}
                      {user.status === 'inactive' && (
                        <Badge className="bg-gray-600 text-white">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{user.email}</p>
                    <p className="text-xs text-gray-800 font-medium mt-1">Last login: {user.lastLogin}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {user.role !== 'admin' && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold mb-4">Role Permissions</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-bold">Admin</p>
                <p className="text-gray-600">Full system access, user management, system configuration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-bold">Manager</p>
                <p className="text-gray-600">Collection management, worker assignment, reports</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-bold">Analyst</p>
                <p className="text-gray-600">View analytics, generate reports, data export</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-bold">Staff</p>
                <p className="text-gray-600">View dashboards, monitoring, basic alerts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}