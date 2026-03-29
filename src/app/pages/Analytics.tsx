// ============================================================================
// ANALYTICS - Analyze waste management trends and statistics
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, MapPin, Droplet } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const weeklyTrend = [
  { week: 'Week 1', collections: 85, weight: 3200 },
  { week: 'Week 2', collections: 92, weight: 3450 },
  { week: 'Week 3', collections: 88, weight: 3300 },
  { week: 'Week 4', collections: 95, weight: 3600 },
];

const topBins = [
  { bin: 'BIN-001', fills: 24 },
  { bin: 'BIN-007', fills: 22 },
  { bin: 'BIN-003', fills: 20 },
  { bin: 'BIN-005', fills: 18 },
  { bin: 'BIN-008', fills: 16 },
];

const areaData = [
  { area: 'Downtown', avgRotIndex: 6.8 },
  { area: 'Commercial', avgRotIndex: 5.2 },
  { area: 'Residential', avgRotIndex: 4.1 },
  { area: 'Parks', avgRotIndex: 3.5 },
];

const responseTime = [
  { name: 'Under 30 min', value: 45 },
  { name: '30-60 min', value: 30 },
  { name: '1-2 hours', value: 15 },
  { name: 'Over 2 hours', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-900 font-semibold">Data-driven insights for waste management planning</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900">360</p>
                <p className="text-xs text-green-500 font-semibold mt-1">+12% vs last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">42 min</p>
                <p className="text-xs text-blue-500 font-semibold mt-1">-8 min improvement</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">High Risk Areas</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-orange-500 font-semibold mt-1">Require attention</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Neutralization Usage</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-cyan-500 font-semibold mt-1">Activations this month</p>
              </div>
              <Droplet className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Accumulation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="collections" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Collections" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection Response Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={responseTime}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {responseTime.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Frequently Filled Bins</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topBins} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="bin" />
                <Tooltip />
                <Bar dataKey="fills" fill="#10b981" name="Fill Events" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas with Highest Rot Index</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgRotIndex" fill="#ef4444" name="Avg Rot Index" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}