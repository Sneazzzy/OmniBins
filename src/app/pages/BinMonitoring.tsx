// ============================================================================
// BIN MONITORING - Real-time monitoring of smart waste bins
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, MapPin, Weight, Wind, X } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const initialBins = [
  { id: 'BIN-001', location: 'Main Street Plaza', weight: 45.2, capacity: 92, nh3: 38, ch4: 42, status: 'Full' },
  { id: 'BIN-002', location: 'Park Avenue', weight: 22.5, capacity: 48, nh3: 15, ch4: 18, status: 'Normal' },
  { id: 'BIN-003', location: 'Central Plaza', weight: 41.8, capacity: 85, nh3: 32, ch4: 38, status: 'Near Full' },
  { id: 'BIN-004', location: 'Beach Road', weight: 12.3, capacity: 25, nh3: 8, ch4: 12, status: 'Normal' },
  { id: 'BIN-005', location: 'Shopping District', weight: 38.7, capacity: 78, nh3: 28, ch4: 32, status: 'Near Full' },
  { id: 'BIN-006', location: 'City Hall', weight: 35.2, capacity: 71, nh3: 25, ch4: 28, status: 'Normal' },
  { id: 'BIN-007', location: 'University Campus', weight: 48.1, capacity: 97, nh3: 45, ch4: 48, status: 'Full' },
  { id: 'BIN-008', location: 'Market Square', weight: 33.5, capacity: 68, nh3: 22, ch4: 26, status: 'Normal' },
  { id: 'BIN-009', location: 'Downtown Station', weight: 2.1, capacity: 4, nh3: 1, ch4: 2, status: 'Empty' },
];

// ============================================================================
// MODAL COMPONENTS
// ============================================================================
const AddBinModal = ({ isOpen, onClose, onAddBin }: { isOpen: boolean; onClose: () => void; onAddBin: (bin: any) => void }) => {
  const [binId, setBinId] = useState('');
  const [location, setLocation] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!binId || !location) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newBin = {
      id: binId,
      location,
      weight: 0,
      capacity: 0,
      nh3: 0,
      ch4: 0,
      status: 'Normal',
    };
    
    onAddBin(newBin);
    alert(`Bin ${binId} added successfully at ${location}`);
    setBinId('');
    setLocation('');
    setTeam('');
    onClose();
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
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-6 z-50 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Bin</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Bin ID
                </label>
                <Input
                  placeholder="e.g., BIN-010"
                  value={binId}
                  onChange={(e) => setBinId(e.target.value)}
                  className="text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Location
                </label>
                <Input
                  placeholder="e.g., Main Street Plaza"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Assigned Team
                </label>
                <Input
                  placeholder="e.g., Team A"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="text-gray-900"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Add Bin
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-6 z-50 w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 text-sm cursor-pointer">
                Cancel
              </Button>
              <Button type="button" onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer">
                Confirm
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function BinMonitoring() {
  const [bins, setBins] = useState(initialBins);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

  const handleAddBin = (newBin: any) => {
    setBins([...bins, newBin]);
  };

  const handleRemoveBin = (binId: string) => {
    setConfirmAction({
      title: 'Remove Bin',
      message: `Are you sure you want to remove bin ${binId}? This action cannot be undone.`,
      onConfirm: () => {
        setBins(bins.filter(b => b.id !== binId));
        setIsConfirmOpen(false);
        alert(`Bin ${binId} has been removed`);
      }
    });
    setIsConfirmOpen(true);
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBins(prev =>
        prev.map(bin => ({
          ...bin,
          weight: Math.max(5, Math.min(50, bin.weight + (Math.random() - 0.5) * 2)),
          capacity: Math.max(10, Math.min(100, bin.capacity + (Math.random() - 0.5) * 3)),
          nh3: Math.max(5, Math.min(50, bin.nh3 + (Math.random() - 0.5) * 2)),
          ch4: Math.max(5, Math.min(50, bin.ch4 + (Math.random() - 0.5) * 2)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Full':
        return <Badge className="bg-red-600 text-white">Full</Badge>;
      case 'Near Full':
        return <Badge className="bg-yellow-500 text-white">Near Full</Badge>;
      case 'High Gas Level':
        return <Badge className="bg-orange-500 text-white">High Gas</Badge>;
      case 'Empty':
        return <Badge className="bg-green-600 text-white">Empty</Badge>;
      default:
        return <Badge className="bg-green-600 text-white">Normal</Badge>;
    }
  };

  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bin.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Bin Monitoring</h2>
          <p className="text-gray-900 font-semibold">Real-time monitoring of all smart bins</p>
        </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
            <Input
              placeholder="Search Bins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-gray-900 font-medium text-sm w-full sm:w-55"
            />
          </div>
        
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 cursor">
        {['all', 'Normal', 'Near Full', 'Full', 'High Gas Level'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className= {`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filterStatus === status
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-900 border border-gray-800 hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'All Bins' : status}
          </button>
        ))}
      </div>

      {/* Bins Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredBins.map((bin, index) => (
          <motion.div
            key={bin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{bin.id}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      {bin.location}
                    </div>
                  </div>
                  {getStatusBadge(bin.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Weight */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Weight</span>
                  </div>
                  <span className="text-sm font-bold">{bin.weight.toFixed(1)} kg</span>
                </div>

                {/* Capacity */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Capacity</span>
                    <span className="font-bold">{Math.round(bin.capacity)}%</span>
                  </div>
                  <Progress value={bin.capacity} className="h-2" />
                </div>

                {/* Gas Levels */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Wind className="h-3 w-3" />
                      NH₃ (Ammonia)
                    </div>
                    <p className="text-lg font-bold">{bin.nh3.toFixed(1)} ppm</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Wind className="h-3 w-3" />
                      CH₄ (Methane)
                    </div>
                    <p className="text-lg font-bold">{bin.ch4.toFixed(1)} ppm</p>
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