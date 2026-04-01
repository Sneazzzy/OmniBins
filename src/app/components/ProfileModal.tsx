import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  User, X, Edit2, Save, Mail, Phone, 
  Calendar, Trash2, Upload, Clock, 
  Settings, Users, Shield 
} from 'lucide-react';

export interface UserData {
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
  onRemoveUser?: () => void;
  showRemoveButton?: boolean;
}

export function ProfileModal({ 
  isOpen, 
  onClose, 
  userData, 
  onUpdateUserData, 
  onRemoveUser,
  showRemoveButton = false 
}: ProfileModalProps) {
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
      onRemoveUser?.();
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
                  <div className="space-y-2">
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
                      {showRemoveButton && userData.role !== 'admin' && (
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
