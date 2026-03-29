import { motion } from 'motion/react';
import { Radio, Cloud, Bell, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Radio,
    title: 'Smart Sensors Detect',
    description: 'Ultrasonic sensors measure fill levels while gas sensors monitor odor levels in real-time.',
    step: '01',
  },
  {
    icon: Cloud,
    title: 'Data Transmission',
    description: 'IoT devices transmit data wirelessly to the cloud platform for processing and analysis.',
    step: '02',
  },
  {
    icon: Bell,
    title: 'Automated Alerts',
    description: 'System triggers notifications and odor neutralization when thresholds are exceeded.',
    step: '03',
  },
  {
    icon: TrendingUp,
    title: 'Optimize Operations',
    description: 'Analytics help optimize collection routes, reduce costs, and improve service quality.',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How OMNIBINS Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A seamless integration of IoT technology and smart waste management
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-px w-full bg-green-200 lg:block"></div>
              )}
              
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