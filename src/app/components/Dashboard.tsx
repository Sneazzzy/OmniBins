import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trash2, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const binData = [
  { id: 'BIN-001', location: 'Main Street', fillLevel: 85, odorLevel: 'High', status: 'urgent' },
  { id: 'BIN-002', location: 'Park Avenue', fillLevel: 45, odorLevel: 'Low', status: 'normal' },
  { id: 'BIN-003', location: 'Central Plaza', fillLevel: 92, odorLevel: 'Medium', status: 'urgent' },
  { id: 'BIN-004', location: 'Beach Road', fillLevel: 23, odorLevel: 'Low', status: 'normal' },
  { id: 'BIN-005', location: 'Shopping District', fillLevel: 67, odorLevel: 'Medium', status: 'warning' },
  { id: 'BIN-006', location: 'City Hall', fillLevel: 78, odorLevel: 'High', status: 'warning' },
];

const weeklyData = [
  { day: 'Mon', collections: 12, weight: 450 },
  { day: 'Tue', collections: 15, weight: 520 },
  { day: 'Wed', collections: 18, weight: 610 },
  { day: 'Thu', collections: 14, weight: 480 },
  { day: 'Fri', collections: 20, weight: 680 },
  { day: 'Sat', collections: 16, weight: 550 },
  { day: 'Sun', collections: 10, weight: 380 },
];

export function Dashboard() {
  const [activeData, setActiveData] = useState(binData);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveData(prev => 
        prev.map(bin => ({
          ...bin,
          fillLevel: Math.min(100, Math.max(0, bin.fillLevel + (Math.random() - 0.5) * 5)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'urgent': return <Badge variant="destructive">Urgent</Badge>;
      case 'warning': return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      default: return <Badge className="bg-green-500 text-white">Normal</Badge>;
    }
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Live Monitoring Dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real-time insights into your waste management operations
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bins</CardTitle>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">Across all locations</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Collection</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Above 80% capacity</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collections Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last week</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bin Status Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Bin Status Overview</CardTitle>
              <CardDescription>Real-time monitoring of all smart bins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeData.map((bin, index) => (
                  <motion.div
                    key={bin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(bin.status)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{bin.id}</p>
                          <p className="text-sm text-gray-600">{bin.location}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Odor Level</p>
                            <p className="text-sm font-medium">{bin.odorLevel}</p>
                          </div>
                          {getStatusBadge(bin.status)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Fill Level</span>
                          <span className="font-medium">{Math.round(bin.fillLevel)}%</span>
                        </div>
                        <Progress value={bin.fillLevel} className="mt-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Collections</CardTitle>
              <CardDescription>Number of collections and total weight</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collections" fill="#3b82f6" name="Collections" />
                  <Bar dataKey="weight" fill="#10b981" name="Weight (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}