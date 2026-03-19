import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Phone, Mail, CheckCircle, Clock, Search } from 'lucide-react';

const workers = [
  { id: 1, name: 'Juan Dela Cruz', team: 'Team A', phone: '0917-123-4567', email: 'juan@omnibins.com', tasksToday: 5, tasksCompleted: 3, status: 'active' },
  { id: 2, name: 'Maria Santos', team: 'Team A', phone: '0918-234-5678', email: 'maria@omnibins.com', tasksToday: 4, tasksCompleted: 4, status: 'active' },
  { id: 3, name: 'Pedro Reyes', team: 'Team B', phone: '0919-345-6789', email: 'pedro@omnibins.com', tasksToday: 6, tasksCompleted: 2, status: 'active' },
  { id: 4, name: 'Ana Garcia', team: 'Team B', phone: '0920-456-7890', email: 'ana@omnibins.com', tasksToday: 3, tasksCompleted: 1, status: 'active' },
  { id: 5, name: 'Jose Ramos', team: 'Team C', phone: '0921-567-8901', email: 'jose@omnibins.com', tasksToday: 0, tasksCompleted: 0, status: 'off-duty' },
];

export function WorkerManagement() {
  const [workerList, setWorkerList] = useState(workers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkers = workerList.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeWorkers = workerList.filter(w => w.status === 'active').length;
  const totalTasks = workerList.reduce((sum, w) => sum + w.tasksCompleted, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Worker Management</h2>
          <p className="text-gray-900 font-semibold">Manage sanitation workers and collection teams</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Add New Worker
        </Button>
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
        <Input
          placeholder="Search workers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 text-gray-900 font-medium"
        />
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
    </div>
  );
}