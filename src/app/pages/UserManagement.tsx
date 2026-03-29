// ============================================================================
// USER MANAGEMENT - Manage user accounts and permissions
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Shield, User, Users, Settings, X, Search } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const users = [
  { id: 1, name: 'Admin User', email: 'admin@omnibins.com', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
  { id: 2, name: 'LGU Staff 1', email: 'staff1@omnibins.com', role: 'staff', status: 'active', lastLogin: '5 hours ago' },
  { id: 3, name: 'LGU Staff 2', email: 'staff2@omnibins.com', role: 'staff', status: 'active', lastLogin: '1 day ago' },
  { id: 4, name: 'Worker Manager', email: 'manager@omnibins.com', role: 'manager', status: 'active', lastLogin: '3 hours ago' },
  { id: 5, name: 'Analyst', email: 'analyst@omnibins.com', role: 'analyst', status: 'active', lastLogin: '6 hours ago' },
  { id: 6, name: 'Inactive User', email: 'inactive@omnibins.com', role: 'staff', status: 'inactive', lastLogin: '30 days ago' },
];

// ============================================================================
// MODAL COMPONENTS
// ============================================================================
function AddUserModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', team: '', role: '' });
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const handleTeamChange = (value: string) => {
    setFormData({ ...formData, team: value });
    setShowRoleDropdown(value === 'N/A');
    if (value !== 'N/A') {
      setFormData(prev => ({ ...prev, role: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Full Name is required');
      return;
    }
    if (!formData.team) {
      alert('Team is required');
      return;
    }
    if (formData.team === 'N/A' && !formData.role) {
      alert('Role is required when team is N/A');
      return;
    }
    alert(`Person Added:\nName: ${formData.name}\nEmail: ${formData.email || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\nTeam: ${formData.team}${formData.role ? `\nRole: ${formData.role}` : ''}`);
    setFormData({ name: '', email: '', phone: '', team: '', role: '' });
    setShowRoleDropdown(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@omnibins.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="0900-000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team <span className="text-red-500">*</span></label>
                  <select value={formData.team} onChange={(e) => handleTeamChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" required>
                    <option value="">Select Team</option>
                    <option>Team A</option>
                    <option>Team B</option>
                    <option>Team C</option>
                    <option>N/A</option>
                  </select>
                </div>
                {showRoleDropdown && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role <span className="text-red-500">*</span></label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" required>
                      <option value="">Select Role</option>
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">Add</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function EditUserModal({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user?: any }) {
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', role: user?.role || 'staff' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`User Updated:\n${formData.name}\n${formData.email}\nRole: ${formData.role}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@omnibins.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function RemoveUserModal({ isOpen, onClose, userName }: { isOpen: boolean; onClose: () => void; userName?: string }) {
  const handleConfirm = () => {
    alert(`User "${userName}" has been removed from the system.`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Remove User</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to remove <span className="font-bold">{userName}</span> from the system? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                <Button type="button" onClick={handleConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Remove</Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}



// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function UserManagement() {
  const [userList] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [removeUser, setRemoveUser] = useState<any>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex items-end flex-col gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-gray-900 font-medium text-sm w-full sm:w-55"
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:w-30">
            Add User
          </Button>
        </div>
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

      <div className="space-y-4">
        {filteredUsers.map((user) => (
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
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setEditingUser(user);
                      setIsEditModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {user.role !== 'admin' && (
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setRemoveUser(user);
                        setIsRemoveModalOpen(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={editingUser} />
      <RemoveUserModal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)} userName={removeUser?.name} />
    </div>
  );
}