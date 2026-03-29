import { motion } from 'motion/react';
import { DollarSign, Leaf, Clock, Users, Shield, Zap } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Cost Reduction',
    description: 'Save up to 50% on waste collection costs through optimized routes and schedules.',
    stat: '50%',
    statLabel: 'Cost Savings',
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'Reduce carbon emissions with efficient collection routes and better waste sorting.',
    stat: '40%',
    statLabel: 'CO₂ Reduction',
  },
  {
    icon: Clock,
    title: 'Time Efficiency',
    description: 'Automated monitoring eliminates manual checks and optimizes collection schedules.',
    stat: '60%',
    statLabel: 'Time Saved',
  },
  {
    icon: Users,
    title: 'Improved Service',
    description: 'Proactive odor control and overflow prevention enhance community satisfaction.',
    stat: '95%',
    statLabel: 'Satisfaction',
  },
  {
    icon: Shield,
    title: 'Reliable System',
    description: '24/7 monitoring ensures bins are never overflowing and issues are caught early.',
    stat: '99.9%',
    statLabel: 'Uptime',
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'AI-powered insights predict patterns and prevent problems before they occur.',
    stat: '85%',
    statLabel: 'Efficiency Gain',
  },
];

export function Benefits() {
  return (
    <div className="relative bg-gradient-to-b from-green-900 via-green-800 to-green-900 py-32 sm:py-40 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-24"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Transform Your Waste Management
          </h2>
          <p className="text-xl text-green-100 leading-relaxed">
            Experience the benefits of intelligent, data-driven waste collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md border border-white/30 group-hover:border-white/50 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative p-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="inline-flex rounded-2xl bg-gradient-to-br from-green-400/40 to-green-600/30 p-4 ring-2 ring-white/20 group-hover:ring-white/40 group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="h-8 w-8 text-white font-bold" />
                    </div>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold text-white tracking-tight group-hover:text-green-100 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="mb-8 text-green-50 leading-relaxed flex-grow font-medium">
                    {benefit.description}
                  </p>
                  
                  <div className="border-t border-white/20 pt-6 flex items-end justify-between">
                    <div className="text-sm font-semibold text-green-100">{benefit.statLabel}</div>
                    <div className="text-2xl font-bold text-white">{benefit.stat}</div>
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