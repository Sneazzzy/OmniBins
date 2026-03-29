// ============================================================================
// COLLECTIONS - Manage waste collection tasks and assignments
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Truck, MapPin, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const collectionsData = [
  { id: 1, bin: 'BIN-001', location: 'Main Street Plaza', priority: 'high', status: 'pending', assignedTo: null as string | null, capacity: 95, scheduledTime: 'ASAP', completedAt: undefined as string | undefined },
  { id: 2, bin: 'BIN-003', location: 'Central Plaza', priority: 'high', status: 'in-progress', assignedTo: 'Team A', capacity: 85, scheduledTime: '10:00 AM', completedAt: undefined },
  { id: 3, bin: 'BIN-007', location: 'University Campus', priority: 'high', status: 'pending', assignedTo: null as string | null, capacity: 97, scheduledTime: 'ASAP', completedAt: undefined },
  { id: 4, bin: 'BIN-005', location: 'Shopping District', priority: 'medium', status: 'pending', assignedTo: null as string | null, capacity: 78, scheduledTime: '2:00 PM', completedAt: undefined },
  { id: 5, bin: 'BIN-008', location: 'Market Square', priority: 'low', status: 'completed', assignedTo: 'Team B', capacity: 68, scheduledTime: '8:00 AM', completedAt: '8:45 AM' },
  { id: 6, bin: 'BIN-002', location: 'Park Avenue', priority: 'low', status: 'completed', assignedTo: 'Team A', capacity: 48, scheduledTime: '9:00 AM', completedAt: '9:30 AM' },
];

const teams = ['Team A', 'Team B', 'Team C'];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function Collections() {
  const [taskList, setTaskList] = useState(collectionsData);
  const [filter, setFilter] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case 'in-progress': return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case 'completed': return <Badge className="bg-green-500 text-white">Completed</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      default: return <Badge className="bg-gray-500 text-white">Low</Badge>;
    }
  };

  const assignTeam = (taskId: number, team: string) => {
    setTaskList(prev => prev.map(task => task.id === taskId ? { ...task, assignedTo: team, status: 'in-progress' as const } : task));
  };

  const completeTask = (taskId: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTaskList(prev => prev.map(task => task.id === taskId ? { ...task, status: 'completed' as const, completedAt: timeString } : task));
  };

  const filteredTasks = taskList.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    pending: taskList.filter(t => t.status === 'pending').length,
    inProgress: taskList.filter(t => t.status === 'in-progress').length,
    completed: taskList.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
        <p className="text-gray-900 font-semibold">Manage waste collection tasks and assign teams</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'text-yellow-500' },
          { label: 'In Progress', value: stats.inProgress, icon: Truck, color: 'text-blue-500' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-500' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900 font-semibold">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Tasks' },
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ].map((option) => (
          <button key={option.value} onClick={() => setFilter(option.value)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === option.value ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 border hover:bg-gray-100'}`}>
            {option.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold">{task.bin}</p>
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {task.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm mt-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{task.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span>Capacity: {task.capacity}%</span>
                      </div>
                      {task.assignedTo && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{task.assignedTo}</span>
                        </div>
                      )}
                      {task.completedAt && (
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed at {task.completedAt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {task.status === 'pending' && teams.map(team => (
                      <Button key={team} size="sm" onClick={() => assignTeam(task.id, team)} className="bg-green-600 hover:bg-green-700 text-white">
                        <Truck className="h-4 w-4 mr-2" />
                        {team}
                      </Button>
                    ))}
                    {task.status === 'in-progress' && (
                      <Button size="sm" onClick={() => completeTask(task.id)} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
