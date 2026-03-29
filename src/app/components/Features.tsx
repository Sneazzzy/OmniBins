import { motion } from 'motion/react';
import { Gauge, Wind, Bell, BarChart3, MapPin, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const features = [
  {
    icon: Gauge,
    title: 'Real-Time Load Sensing',
    description: 'Advanced ultrasonic sensors monitor waste levels in real-time, providing accurate fill-level data.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    },
  {
    icon: Wind,
    title: 'Odor-Triggered Neutralization',
    description: 'Intelligent gas sensors detect unpleasant odors and automatically trigger neutralization systems.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Automated alerts notify collection teams when bins reach optimal capacity for efficient pickups.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive data visualization and insights for better waste management decisions.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: MapPin,
    title: 'GPS Tracking',
    description: 'Real-time location tracking of all bins across your city or facility for optimized routes.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Integration',
    description: 'Manage and monitor your entire waste management system from anywhere, anytime.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
];

export function Features() {
  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Powerful Features for Smart Waste Management
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to revolutionize your waste collection and management operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-gray-300 rounded-2xl p-6 flex flex-col">
                <div className={`mb-4 inline-flex rounded-lg ${feature.bgColor} p-3 w-full`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-700 leading-relaxed flex-grow">
                  {feature.description}
                </CardDescription>
                <div className="mt-6"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
