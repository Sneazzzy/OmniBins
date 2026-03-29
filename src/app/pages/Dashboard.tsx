// ============================================================================
// DASHBOARD - Main dashboard overview with metrics and charts
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trash2, AlertCircle, Wind, Droplet } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const recentAlerts = [
  { id: 1, bin: 'BIN-001', message: 'Bin capacity at 95%', time: '2 mins ago', type: 'urgent' },
  { id: 2, bin: 'BIN-003', message: 'High ammonia level detected', time: '15 mins ago', type: 'warning' },
  { id: 3, bin: 'BIN-005', message: 'Collection completed', time: '1 hour ago', type: 'success' },
  { id: 4, bin: 'BIN-012', message: 'Neutralization activated', time: '2 hours ago', type: 'info' },
];

const weeklyCollections = [
  { day: 'Mon', collections: 12 },
  { day: 'Tue', collections: 15 },
  { day: 'Wed', collections: 18 },
  { day: 'Thu', collections: 14 },
  { day: 'Fri', collections: 20 },
  { day: 'Sat', collections: 16 },
  { day: 'Sun', collections: 10 },
];

const gasLevels = [
  { time: '00:00', nh3: 15, ch4: 22 },
  { time: '04:00', nh3: 18, ch4: 25 },
  { time: '08:00', nh3: 25, ch4: 30 },
  { time: '12:00', nh3: 32, ch4: 38 },
  { time: '16:00', nh3: 28, ch4: 35 },
  { time: '20:00', nh3: 20, ch4: 28 },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function Dashboard() {
  const [stats, setStats] = useState({
    totalBins: 124,
    fullBins: 12,
    highRotIndex: 8,
    activeNeutralization: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        fullBins: Math.max(8, Math.min(15, prev.fullBins + Math.floor(Math.random() * 3) - 1)),
        activeNeutralization: Math.max(0, Math.min(6, prev.activeNeutralization + Math.floor(Math.random() * 3) - 1)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Smart Bins', value: stats.totalBins, desc: 'Deployed across the area', icon: Trash2 },
          { title: 'Full / Near Full', value: stats.fullBins, desc: 'Require immediate collection', icon: AlertCircle, iconColor: 'text-red-600' },
          { title: 'High Rot Index', value: stats.highRotIndex, desc: 'Above threshold level', icon: Wind, iconColor: 'text-orange-600' },
          { title: 'Active Neutralization', value: stats.activeNeutralization, desc: 'Odor control events', icon: Droplet, iconColor: 'text-blue-600' },
        ].map((stat, idx) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.iconColor || 'text-gray-800'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-800 font-medium">{stat.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader><CardTitle>Recent Alerts & Notifications</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className={`flex items-start gap-3 rounded-lg border p-3 ${getAlertColor(alert.type)}`}>
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{alert.bin}</p>
                      <p className="text-sm text-gray-900 font-medium">{alert.message}</p>
                      <p className="text-xs mt-1 font-medium text-gray-800">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Collections */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
          <Card className="h-full flex flex-col">
            <CardHeader><CardTitle>Weekly Collections</CardTitle></CardHeader>
            <CardContent className="flex-1">
              <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                <BarChart data={weeklyCollections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="collections" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Gas Levels Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.6 }}>
        <Card>
          <CardHeader><CardTitle>Average Gas Levels (24h)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%" minHeight={350}>
              <LineChart data={gasLevels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nh3" stroke="#f59e0b" name="NH₃ (Ammonia) (ppm)" strokeWidth={2} />
                <Line type="monotone" dataKey="ch4" stroke="#3b82f6" name="CH₄ (Methane) (ppm)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
