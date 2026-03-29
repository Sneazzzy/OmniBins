// ============================================================================
// CONSOLIDATED LANDING PAGE COMPONENTS
// All landing page components in a single file for easy navigation
// ============================================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Trash2, Wifi, Wind, Menu, X, Mail, Lock, 
  Gauge, Bell, BarChart3, MapPin, Smartphone, 
  Radio, Cloud, TrendingUp, DollarSign, Leaf, 
  Clock, Users, Shield, Zap, Phone, AlertCircle, 
  CheckCircle
} from 'lucide-react';

// ============================================================================
// SECTION 1: NAVBAR
// ============================================================================

interface NavbarProps {
  onLoginSuccess?: () => void;
}

export function Navbar({ onLoginSuccess }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    onLoginSuccess?.();
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="rounded-lg bg-green-600 p-2">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OMNIBINS</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
              <a href="#dashboard" className="text-gray-700 hover:text-green-600 transition-colors">Dashboard</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">Benefits</a>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href = '#contact'}>Contact Us</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>Login</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 space-y-4">
              {['features', 'dashboard', 'how-it-works', 'benefits'].map((item) => (
                <a key={item} href={`#${item}`} className="block text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              ))}
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href = '#contact'}>Contact Us</Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>Login</Button>
            </div>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
}

// ============================================================================
// SECTION 2: HERO
// ============================================================================

interface HeroProps {
  onLoginSuccess?: () => void;
}

export function Hero({ onLoginSuccess }: HeroProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center gap-4">
              {[
                { icon: Trash2, color: 'bg-green-600', delay: 0 },
                { icon: Wifi, color: 'bg-blue-600', delay: 0.3 },
                { icon: Wind, color: 'bg-emerald-600', delay: 0.6 },
              ].map((item, idx) => (
                <motion.div key={idx} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: item.delay }} className={`rounded-full ${item.color} p-4`}>
                  <item.icon className="h-8 w-8 text-white" />
                </motion.div>
              ))}
            </div>

            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">OMNIBINS</h1>
            <p className="mb-4 text-xl text-gray-900 sm:text-2xl">IoT-Based Smart Waste Management System</p>
            <p className="mb-10 text-lg text-gray-900">Real-Time Load Sensing & Odor-Triggered Neutralization</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>Get Started</Button>
              <Button size="lg" variant="outline" onClick={() => alert('Demo video coming soon!')}>Watch Demo</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-16 flex justify-center">
            <div className="rounded-2xl bg-gray-50 p-8 shadow-2xl ring-1 ring-gray-900/10">
              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: '99.9%', label: 'Uptime', color: 'text-green-600' },
                  { value: '24/7', label: 'Monitoring', color: 'text-blue-600' },
                  { value: '50%', label: 'Cost Reduction', color: 'text-emerald-600' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={onLoginSuccess} />
    </>
  );
}

// ============================================================================
// SECTION 3: FEATURES
// ============================================================================

const features = [
  { icon: Gauge, title: 'Real-Time Load Sensing', description: 'Advanced ultrasonic sensors monitor waste levels in real-time, providing accurate fill-level data.', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { icon: Wind, title: 'Odor-Triggered Neutralization', description: 'Intelligent gas sensors detect unpleasant odors and automatically trigger neutralization systems.', color: 'text-green-600', bgColor: 'bg-green-100' },
  { icon: Bell, title: 'Smart Notifications', description: 'Automated alerts notify collection teams when bins reach optimal capacity for efficient pickups.', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Comprehensive data visualization and insights for better waste management decisions.', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { icon: MapPin, title: 'GPS Tracking', description: 'Real-time location tracking of all bins across your city or facility for optimized routes.', color: 'text-red-600', bgColor: 'bg-red-100' },
  { icon: Smartphone, title: 'Mobile App Integration', description: 'Manage and monitor your entire waste management system from anywhere, anytime.', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
];

export function Features() {
  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">Powerful Features for Smart Waste Management</h2>
          <p className="text-xl text-gray-600 leading-relaxed">Everything you need to revolutionize your waste collection and management operations</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className="h-full border-2 border-gray-300 rounded-2xl p-6 flex flex-col">
                <div className={`mb-4 inline-flex rounded-lg ${feature.bgColor} p-3 w-full`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                <CardDescription className="text-sm text-gray-700 leading-relaxed flex-grow">{feature.description}</CardDescription>
                <div className="mt-6"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 4: DASHBOARD (LANDING PAGE PREVIEW)
// ============================================================================

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
      setActiveData(prev => prev.map(bin => ({ ...bin, fillLevel: Math.min(100, Math.max(0, bin.fillLevel + (Math.random() - 0.5) * 5)) })));
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Live Monitoring Dashboard</h2>
          <p className="mt-4 text-lg text-gray-600">Real-time insights into your waste management operations</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Total Bins', value: '124', desc: 'Across all locations', icon: Trash2, iconColor: 'text-green-600' },
            { title: 'Needs Collection', value: '12', desc: 'Above 80% capacity', icon: AlertCircle, iconColor: 'text-red-600' },
            { title: 'Collections Today', value: '18', desc: '+2 from yesterday', icon: CheckCircle, iconColor: 'text-emerald-600' },
            { title: 'Efficiency', value: '94.5%', desc: '+5.2% from last week', icon: TrendingUp, iconColor: 'text-cyan-600' },
          ].map((stat, idx) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-10 w-10 ${stat.iconColor || 'text-gray-800'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bin Status Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Bin Status Overview</CardTitle>
              <CardDescription>Real-time monitoring of all smart bins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeData.map((bin, index) => (
                  <motion.div key={bin.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center gap-4 rounded-lg border p-4">
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

        {/* Weekly Collections Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Collection Trends</CardTitle>
              <CardDescription>Collections and waste weight over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collections" fill="#10b981" name="Collections" />
                  <Bar dataKey="weight" fill="#3b82f6" name="Weight (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 5: HOW IT WORKS
// ============================================================================

const steps = [
  { icon: Radio, title: 'Smart Sensors Detect', description: 'Ultrasonic sensors measure fill levels while gas sensors monitor odor levels in real-time.', step: '01' },
  { icon: Cloud, title: 'Data Transmission', description: 'IoT devices transmit data wirelessly to the cloud platform for processing and analysis.', step: '02' },
  { icon: Bell, title: 'Automated Alerts', description: 'System triggers notifications and odor neutralization when thresholds are exceeded.', step: '03' },
  { icon: TrendingUp, title: 'Optimize Operations', description: 'Analytics help optimize collection routes, reduce costs, and improve service quality.', step: '04' },
];

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How OMNIBINS Works</h2>
          <p className="mt-4 text-lg text-gray-600">A seamless integration of IoT technology and smart waste management</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="relative">
              {index < steps.length - 1 && <div className="absolute left-1/2 top-16 hidden h-px w-full bg-green-200 lg:block"></div>}
              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 6: BENEFITS
// ============================================================================

const benefits = [
  { icon: DollarSign, title: 'Cost Reduction', description: 'Save up to 50% on waste collection costs through optimized routes and schedules.', stat: '50%', statLabel: 'Cost Savings' },
  { icon: Leaf, title: 'Environmental Impact', description: 'Reduce carbon emissions with efficient collection routes and better waste sorting.', stat: '40%', statLabel: 'CO₂ Reduction' },
  { icon: Clock, title: 'Time Efficiency', description: 'Automated monitoring eliminates manual checks and optimizes collection schedules.', stat: '60%', statLabel: 'Time Saved' },
  { icon: Users, title: 'Improved Service', description: 'Proactive odor control and overflow prevention enhance community satisfaction.', stat: '95%', statLabel: 'Satisfaction' },
  { icon: Shield, title: 'Reliable System', description: '24/7 monitoring ensures bins are never overflowing and issues are caught early.', stat: '99.9%', statLabel: 'Uptime' },
  { icon: Zap, title: 'Smart Automation', description: 'AI-powered insights predict patterns and prevent problems before they occur.', stat: '85%', statLabel: 'Efficiency Gain' },
];

export function Benefits() {
  return (
    <div className="relative bg-gradient-to-b from-green-900 via-green-800 to-green-900 py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center mb-24">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Transform Your Waste Management</h2>
          <p className="text-xl text-green-100 leading-relaxed">Experience the benefits of intelligent, data-driven waste collection</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md border border-white/30 group-hover:border-white/50 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative p-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="inline-flex rounded-2xl bg-gradient-to-br from-green-400/40 to-green-600/30 p-4 ring-2 ring-white/20 group-hover:ring-white/40 group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="h-8 w-8 text-white font-bold" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{benefit.stat}</div>
                    </div>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold text-white tracking-tight group-hover:text-green-100 transition-colors duration-300">{benefit.title}</h3>
                  <p className="mb-8 text-green-50 leading-relaxed flex-grow font-medium">{benefit.description}</p>
                  <div className="border-t border-white/20 pt-6">
                    <div className="text-sm font-semibold text-green-100">{benefit.statLabel}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 7: FOOTER
// ============================================================================

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-green-600 p-2">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OMNIBINS</span>
            </div>
            <p className="text-sm">Revolutionizing waste management with IoT technology and smart automation.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['features', 'dashboard', 'how-it-works', 'benefits'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-green-400 transition-colors">
                    {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              {['Documentation', 'API Reference', 'Support', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@omnibins.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Smart City Ave
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 OMNIBINS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// SECTION 8: LOGIN MODAL
// ============================================================================

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    onLoginSuccess?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} className="relative w-full max-w-md bg-gray-50 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 bg-white text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors shadow-md border border-gray-200">
                <X className="h-6 w-6" />
              </button>

              {/* Header */}
              <div className="bg-green-600 px-8 py-12 text-center">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="mt-2 text-green-50">Sign in to your OMNIBINS account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">Forgot password?</a>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">Sign In</Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
