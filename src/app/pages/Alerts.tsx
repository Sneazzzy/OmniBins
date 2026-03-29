// ============================================================================
// ALERTS - Monitor and manage system alerts and notifications
// ============================================================================

// ============================================================================
// IMPORTS
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { AlertCircle, Bell, CheckCircle, XCircle, Wind, Weight, X } from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================
const alerts = [
  { id: 1, bin: 'BIN-001', type: 'overweight', message: 'Bin capacity at 95% - immediate collection required', time: '2 mins ago', severity: 'critical', read: false },
  { id: 2, bin: 'BIN-003', type: 'gas', message: 'High ammonia level detected (45 ppm)', time: '15 mins ago', severity: 'warning', read: false },
  { id: 3, bin: 'BIN-007', type: 'rot', message: 'Rot Index threshold exceeded (8.5)', time: '30 mins ago', severity: 'warning', read: false },
  { id: 4, bin: 'BIN-005', type: 'neutralization', message: 'Neutralizing mist system activated', time: '1 hour ago', severity: 'info', read: true },
  { id: 5, bin: 'BIN-012', type: 'sensor', message: 'Weight sensor malfunction detected', time: '2 hours ago', severity: 'error', read: false },
  { id: 6, bin: 'BIN-008', type: 'collection', message: 'Collection completed successfully', time: '3 hours ago', severity: 'success', read: true },
  { id: 7, bin: 'BIN-004', type: 'gas', message: 'Methane level increasing (38 ppm)', time: '4 hours ago', severity: 'warning', read: true },
  { id: 8, bin: 'BIN-015', type: 'overweight', message: 'Bin near full (82%)', time: '5 hours ago', severity: 'warning', read: true },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function Alerts() {
  const [alertList, setAlertList] = useState(alerts);
  const [filter, setFilter] = useState<string>('all');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [alertToConfirm, setAlertToConfirm] = useState<any>(null);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case 'error':
        return <Badge className="bg-red-500 text-white">Error</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      case 'success':
        return <Badge className="bg-green-500 text-white">Success</Badge>;
      default:
        return <Badge className="bg-blue-500 text-white">Info</Badge>;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'overweight':
        return <Weight className="h-5 w-5" />;
      case 'gas':
      case 'rot':
        return <Wind className="h-5 w-5" />;
      case 'sensor':
        return <XCircle className="h-5 w-5" />;
      case 'collection':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'error':
        return 'border-red-400 bg-red-50';
      case 'warning':
        return 'border-yellow-400 bg-yellow-50';
      case 'success':
        return 'border-green-400 bg-green-50';
      default:
        return 'border-blue-400 bg-blue-50';
    }
  };

  const markAsRead = (id: number) => {
    setAlertList(prev =>
      prev.map(alert => alert.id === id ? { ...alert, read: true } : alert)
    );
  };

  const dismissAlert = (id: number) => {
    setAlertList(prev => prev.filter(alert => alert.id !== id));
  };

  const ConfirmationModal = ({ isOpen, onClose, onConfirm, alert }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; alert?: any }) => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dismiss Alert</h2>
              <p className="text-gray-700 mb-2">Are you sure you want to dismiss this alert?</p>
              <div className="bg-gray-50 p-3 rounded-lg mb-6">
                <p className="font-semibold text-gray-900 text-base">{alert?.bin}</p>
                <p className="text-base text-gray-700 mt-1">{alert?.message}</p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                <Button type="button" onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Dismiss</Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  const filteredAlerts = alertList.filter(alert => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const unreadCount = alertList.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
          <p className="text-gray-900 font-semibold">Monitor critical system alerts and events</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-800" />
          <span className="text-base font-semibold text-gray-900">{unreadCount} unread</span>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Alerts' },
          { value: 'unread', label: 'Unread' },
          { value: 'critical', label: 'Critical' },
          { value: 'warning', label: 'Warning' },
          { value: 'info', label: 'Info' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-base font-semibold transition-colors ${
              filter === option.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-900 border border-gray-800 hover:bg-gray-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className={`${getAlertColor(alert.severity)} ${!alert.read ? 'border-l-4' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${alert.read ? 'bg-gray-200' : 'bg-gray-50'}`}>
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{alert.bin}</p>
                        <p className="text-sm mt-1 text-gray-900 font-medium">{alert.message}</p>
                      </div>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-900 font-medium">{alert.time}</p>
                      <div className="flex gap-2">
                        {!alert.read && (
                          <Button
                            size="sm"
                            onClick={() => markAsRead(alert.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => {
                            setAlertToConfirm(alert);
                            setIsConfirmOpen(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-700" />
            <p className="text-gray-900 font-semibold">No alerts to display</p>
          </CardContent>
        </Card>
      )}

      <ConfirmationModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={() => {
          dismissAlert(alertToConfirm?.id);
          setIsConfirmOpen(false);
          setAlertToConfirm(null);
        }}
        alert={alertToConfirm}
      />
    </div>
  );
}