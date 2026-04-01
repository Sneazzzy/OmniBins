import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Phone, Mail, CheckCircle, Clock, Search, X, Users, Plus, Trash2 } from 'lucide-react';

const workersData = [
  { id: 1, name: 'Juan Dela Cruz', team: 'Team A', phone: '0917-123-4567', email: 'juan@omnibins.com', tasksToday: 5, tasksCompleted: 3, status: 'active' },
  { id: 2, name: 'Maria Santos', team: 'Team A', phone: '0918-234-5678', email: 'maria@omnibins.com', tasksToday: 4, tasksCompleted: 4, status: 'active' },
  { id: 3, name: 'Pedro Reyes', team: 'Team B', phone: '0919-345-6789', email: 'pedro@omnibins.com', tasksToday: 6, tasksCompleted: 2, status: 'active' },
  { id: 4, name: 'Ana Garcia', team: 'Team B', phone: '0920-456-7890', email: 'ana@omnibins.com', tasksToday: 3, tasksCompleted: 1, status: 'active' },
  { id: 5, name: 'Jose Ramos', team: 'Team C', phone: '0921-567-8901', email: 'jose@omnibins.com', tasksToday: 0, tasksCompleted: 0, status: 'off-duty' },
];

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  workers: typeof workersData;
  onCreateTeam: (teamName: string, selectedWorkerIds: number[]) => void;
}

function CreateTeamModal({ isOpen, onClose, workers, onCreateTeam }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState('');
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);

  const toggleWorker = (workerId: number) => {
    setSelectedWorkers(prev =>
      prev.includes(workerId)
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };

  const handleCreate = () => {
    if (!teamName.trim()) {
      alert('Team name is required');
      return;
    }
    if (selectedWorkers.length === 0) {
      alert('Please select at least one worker');
      return;
    }
    onCreateTeam(teamName, selectedWorkers);
    setTeamName('');
    setSelectedWorkers([]);
    onClose();
  };

  const availableWorkers = workers.filter(w => w.status === 'active');

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
                  <div>
                    <h2 className="text-2xl font-bold text-white">Create New Team</h2>
                    <p className="text-green-100">Select workers to add to the team</p>
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
                <div className="space-y-6">
                  {/* Team Name */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4" />
                      Team Name
                    </Label>
                    <Input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter team name (e.g., Team D)"
                      className="border-gray-300"
                    />
                  </div>

                  {/* Worker Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4" />
                      Select Workers ({selectedWorkers.length} selected)
                    </Label>
                    <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                      {availableWorkers.map((worker) => (
                        <label
                          key={worker.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            checked={selectedWorkers.includes(worker.id)}
                            onChange={() => toggleWorker(worker.id)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 flex-shrink-0">
                            <span className="text-white font-bold text-sm">
                              {worker.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{worker.name}</p>
                            <p className="text-sm text-gray-500">{worker.email}</p>
                          </div>
                          <Badge className={worker.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                            {worker.status}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={handleCreate}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Workers() {
  const [workerList, setWorkerList] = useState(workersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

  const filteredWorkers = workerList.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeWorkers = workerList.filter(w => w.status === 'active').length;
  const totalTasks = workerList.reduce((sum, w) => sum + w.tasksCompleted, 0);

  const handleCreateTeam = (teamName: string, selectedWorkerIds: number[]) => {
    setWorkerList(workerList.map(worker =>
      selectedWorkerIds.includes(worker.id)
        ? { ...worker, team: teamName }
        : worker
    ));
    alert(`Team "${teamName}" created successfully with ${selectedWorkerIds.length} worker(s)!`);
  };

  return (

    
    <div className="space-y-6">

      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workers</h2>
          <p className="text-gray-900 font-semibold">Manage sanitation workers and collection teams</p>
          
        </div>
        <div className=" flex items-end flex-col gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-55">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
            <Input
              placeholder="Search Workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-gray-900 font-medium"
            />
          </div>
          <Button 
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Total Workers</p>
                <p className="text-2xl font-bold text-gray-900">{workerList.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Active Today</p>
                <p className="text-2xl font-bold text-gray-900">{activeWorkers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{worker.name}</p>
                    <p className="text-sm text-gray-900 font-medium">{worker.team}</p>
                  </div>
                </div>
                <Badge className={worker.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                  {worker.status === 'active' ? 'Active' : 'Off Duty'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{worker.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{worker.email}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-600">Tasks Today</span>
                  <span className="font-bold">{worker.tasksCompleted} / {worker.tasksToday}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
        workers={workerList}
        onCreateTeam={handleCreateTeam}
      />
    </div>
  );
}
