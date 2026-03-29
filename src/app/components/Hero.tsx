import { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, Wifi, Wind } from 'lucide-react';
import { Button } from './ui/button';
import { LoginModal } from './LoginModal';

interface HeroProps {
  onLoginSuccess?: () => void;
}

export function Hero({ onLoginSuccess }: HeroProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 flex justify-center gap-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-green-600 p-4"
            >
              <Trash2 className="h-8 w-8 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="rounded-full bg-blue-600 p-4"
            >
              <Wifi className="h-8 w-8 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="rounded-full bg-emerald-600 p-4"
            >
              <Wind className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            OMNIBINS
          </h1>
          
          <p className="mb-4 text-xl text-gray-900 sm:text-2xl">
            IoT-Based Smart Waste Management System
          </p>
          
          <p className="mb-10 text-lg text-gray-900">
            Real-Time Load Sensing & Odor-Triggered Neutralization
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="rounded-2xl bg-gray-50 p-8 shadow-2xl ring-1 ring-gray-900/10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">50%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={onLoginSuccess} />
    </>
  );
}