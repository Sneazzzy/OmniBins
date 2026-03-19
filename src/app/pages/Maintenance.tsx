import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Battery, Wifi, Activity, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';

const systems = [
  { id: 'BIN-001', location: 'Main Street', sensors: 'online', battery: 85, connectivity: 'excellent', lastMaintenance: '2 days ago', status: 'good' },
  { id: 'BIN-002', location: 'Park Avenue', sensors: 'online', battery: 92, connectivity: 'excellent', lastMaintenance: '1 day ago', status: 'good' },
  { id: 'BIN-003', location: 'Central Plaza', sensors: 'online', battery: 45, connectivity: 'good', lastMaintenance: '5 days ago', status: 'warning' },
  { id: 'BIN-004', location: 'Beach Road', sensors: 'online', battery: 78, connectivity: 'good', lastMaintenance: '3 days ago', status: 'good' },
  { id: 'BIN-005', location: 'Shopping District', sensors: 'offline', battery: 12, connectivity: 'poor', lastMaintenance: '10 days ago', status: 'critical' },
  { id: 'BIN-006', location: 'City Hall', sensors: 'online', battery: 68, connectivity: 'excellent', lastMaintenance: '4 days ago', status: 'good' },
];

export function Maintenance() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      default:
        return <Badge className="bg-green-500 text-white">Good</Badge>;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level < 20) return 'text-red-600';
    if (level < 50) return 'text-yellow-500';
    return 'text-green-600';
  };

  const getConnectivityColor = (level: string) => {
    if (level === 'poor') return 'text-red-600';
    if (level === 'good') return 'text-yellow-500';
    return 'text-green-600';
  };

  const criticalCount = systems.filter(s => s.status === 'critical').length;
  const warningCount = systems.filter(s => s.status === 'warning').length;
  const goodCount = systems.filter(s => s.status === 'good').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Maintenance & System Health</h2>
        <p className="text-gray-900 font-semibold">Monitor IoT device status and maintenance needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Warnings</p>
                <p className="text-2xl font-bold text-yellow-500">{warningCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-semibold">Operating Normal</p>
                <p className="text-2xl font-bold text-green-600">{goodCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {systems.map((system) => (
          <Card key={system.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-bold text-lg text-gray-900">{system.id}</p>
                    {getStatusBadge(system.status)}
                  </div>
                  <p className="text-sm text-gray-900 font-medium mb-4">{system.location}</p>
                  
                  <div className="flex gap-6 overflow-x-auto pb-2">
                    <div className="min-w-max">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Activity className="h-4 w-4" />
                        <span>Sensors</span>
                      </div>
                      <p className={`font-bold ${system.sensors === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                        {system.sensors === 'online' ? 'Online' : 'Offline'}
                      </p>
                    </div>
                    
                    <div className="min-w-max">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Battery className="h-4 w-4" />
                        <span>Battery</span>
                      </div>
                      <p className={`font-bold ${getBatteryColor(system.battery)}`}>
                        {system.battery}%
                      </p>
                    </div>
                    
                    <div className="min-w-max">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Wifi className="h-4 w-4" />
                        <span>Connectivity</span>
                      </div>
                      <p className={`font-bold capitalize ${getConnectivityColor(system.connectivity)}`}>
                        {system.connectivity}
                      </p>
                    </div>
                    
                    <div className="min-w-max">
                      <p className="text-sm text-gray-600 mb-1">Last Maintenance</p>
                      <p className="font-bold text-sm">{system.lastMaintenance}</p>
                    </div>
                  </div>
                </div>
                
                {system.status !== 'good' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Wrench className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}