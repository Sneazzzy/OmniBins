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
import { Label } from '../components/ui/label';
import { Shield, User, Users, Settings, X, Search, Edit2, Save, Mail, Phone, Calendar, Trash2, Upload, Clock } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const users: UserData[] = [
  { id: 1, name: 'Admin User', email: 'admin@omnibins.com', role: 'admin', status: 'active', lastLogin: '2 hours ago', phone: '+1 (555) 123-4567', department: 'Administration', joinedDate: 'January 2024', avatar: undefined },
  { id: 2, name: 'LGU Staff 1', email: 'staff1@omnibins.com', role: 'staff', status: 'active', lastLogin: '5 hours ago', phone: '+1 (555) 234-5678', department: 'Operations', joinedDate: 'February 2024', avatar: undefined },
  { id: 3, name: 'LGU Staff 2', email: 'staff2@omnibins.com', role: 'staff', status: 'active', lastLogin: '1 day ago', phone: '+1 (555) 345-6789', department: 'Operations', joinedDate: 'March 2024', avatar: undefined },
  { id: 4, name: 'Worker Manager', email: 'manager@omnibins.com', role: 'manager', status: 'active', lastLogin: '3 hours ago', phone: '+1 (555) 456-7890', department: 'Management', joinedDate: 'January 2024', avatar: undefined },
  { id: 5, name: 'Analyst', email: 'analyst@omnibins.com', role: 'analyst', status: 'active', lastLogin: '6 hours ago', phone: '+1 (555) 567-8901', department: 'Analytics', joinedDate: 'April 2024', avatar: undefined },
  { id: 6, name: 'Inactive User', email: 'inactive@omnibins.com', role: 'staff', status: 'inactive', lastLogin: '30 days ago', phone: '+1 (555) 678-9012', department: 'Operations', joinedDate: 'May 2024', avatar: undefined },
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
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1 cursor-pointer">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer">Add</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinedDate: string;
  status: string;
  lastLogin: string;
  avatar?: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onUpdateUserData: (data: UserData) => void;
  onRemoveUser: () => void;
}

function ProfileModal({ isOpen, onClose, userData, onUpdateUserData, onRemoveUser }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData>(userData);

  const handleSave = () => {
    onUpdateUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove ${userData.name} from the system?`)) {
      onRemoveUser();
      onClose();
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({ ...editedData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ duration: 0.2 }} 
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 overflow-hidden">
                        {editedData.avatar ? (
                          <img src={editedData.avatar} alt={editedData.name} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-10 w-10 text-white" />
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 h-6 w-6 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-100 transition-colors">
                          <Upload className="h-3 w-3 text-gray-700" />
                          <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{isEditing ? 'Edit Profile' : 'User Profile'}</h2>
                      <p className="text-green-100">{userData.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="rounded-full p-2 bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.phone}</p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4" />
                      Department
                    </Label>
                    {isEditing ? (
                      <select
                        value={editedData.department}
                        onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Administration">Administration</option>
                        <option value="Operations">Operations</option>
                        <option value="Management">Management</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.department}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Settings className="h-4 w-4" />
                      Role
                    </Label>
                    {isEditing ? (
                      <select
                        value={editedData.role}
                        onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.role}</p>
                    )}
                  </div>

                  {/* Joined Date */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </Label>
                    <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.joinedDate}</p>
                  </div>

                  {/* Last Login */}
                  <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4" />
                      Last Login
                    </Label>
                    <p className="text-gray-900 font-medium p-2 bg-gray-50 rounded-lg">{userData.lastLogin}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex-1 cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      {userData.role !== 'admin' && (
                        <Button
                          onClick={handleRemove}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove User
                        </Button>
                      )}
                    </>
                  )}
                </div>
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
  const [userList, setUserList] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateUserData = (updatedData: UserData) => {
    setUserList(userList.map(user => user.id === updatedData.id ? updatedData : user));
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      setUserList(userList.filter(user => user.id !== selectedUser.id));
    }
  };

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
                      setSelectedUser({
                        ...user,
                        phone: user.phone || 'N/A',
                        department: user.department || 'Operations',
                        joinedDate: user.joinedDate || 'January 2024',
                        avatar: user.avatar
                      });
                      setIsProfileModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedUser && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userData={selectedUser}
          onUpdateUserData={handleUpdateUserData}
          onRemoveUser={handleRemoveUser}
        />
      )}
    </div>
  );
}