// ============================================================================
// MAP LOCATION - View and track bin locations on map
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Navigation, Clock } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const bins = [
  { id: 'BIN-001', location: 'Main Street Plaza', lat: 14.5995, lng: 120.9842, status: 'full', capacity: 92, lastCollection: '2 days ago' },
  { id: 'BIN-002', location: 'Park Avenue', lat: 14.6001, lng: 120.9838, status: 'normal', capacity: 48, lastCollection: '1 day ago' },
  { id: 'BIN-003', location: 'Central Plaza', lat: 14.5989, lng: 120.9850, status: 'near-full', capacity: 85, lastCollection: '3 days ago' },
  { id: 'BIN-004', location: 'Beach Road', lat: 14.5982, lng: 120.9845, status: 'normal', capacity: 25, lastCollection: '5 hours ago' },
  { id: 'BIN-005', location: 'Shopping District', lat: 14.6008, lng: 120.9832, status: 'near-full', capacity: 78, lastCollection: '2 days ago' },
  { id: 'BIN-006', location: 'City Hall', lat: 14.5978, lng: 120.9855, status: 'normal', capacity: 71, lastCollection: '12 hours ago' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function MapLocation() {
  const [selectedBin, setSelectedBin] = useState<typeof bins[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'full': return 'bg-red-500';
      case 'near-full': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'full': return <Badge variant="destructive">Full</Badge>;
      case 'near-full': return <Badge className="bg-yellow-500 text-white">Near Full</Badge>;
      default: return <Badge className="bg-green-500 text-white">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Map & Location</h2>
        <p className="text-gray-900 font-semibold">Interactive map showing all smart bin locations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bin Locations Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-blue-50 rounded-lg overflow-hidden">
              {/* Map placeholder with pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {bins.map((bin, index) => {
                    const top = 20 + (index * 12) % 60;
                    const left = 15 + (index * 17) % 70;
                    return (
                      <motion.button
                        key={bin.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedBin(bin)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(bin.status)} rounded-full p-3 shadow-lg hover:scale-110 transition-transform`}
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        <MapPin className="h-5 w-5 text-white" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-gray-900 font-semibold">Normal</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span className="text-gray-900 font-semibold">Near Full</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span className="text-gray-900 font-semibold">Full</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected bin details */}
        <Card>
          <CardHeader>
            <CardTitle>Bin Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBin ? (
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-bold">{selectedBin.id}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    {selectedBin.location}
                  </div>
                </div>

                <div className="pt-3 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    {getStatusBadge(selectedBin.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="font-bold">{selectedBin.capacity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Coordinates</span>
                    <span className="text-sm font-mono">{selectedBin.lat}, {selectedBin.lng}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Last collection: {selectedBin.lastCollection}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Click on a bin marker to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Priority Collection List */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Collection List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bins
              .filter(bin => bin.status === 'full' || bin.status === 'near-full')
              .sort((a, b) => b.capacity - a.capacity)
              .map((bin) => (
                <div
                  key={bin.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-white cursor-pointer"
                  onClick={() => setSelectedBin(bin)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(bin.status)}`}></div>
                    <div>
                      <p className="font-medium">{bin.id}</p>
                      <p className="text-sm text-gray-600">{bin.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{bin.capacity}%</p>
                    <p className="text-xs text-gray-500">{bin.lastCollection}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}