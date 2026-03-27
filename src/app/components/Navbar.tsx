import { useState } from 'react';
import { Menu, X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { LoginModal } from './LoginModal';

interface NavbarProps {
  onLoginSuccess?: () => void;
}

export function Navbar({ onLoginSuccess }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    onLoginSuccess?.();
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setIsOpen(false);
    setIsContactOpen(true);
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
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                Dashboard
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
                How It Works
              </a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">
                Benefits
              </a>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleContactClick}>
                Contact Us
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>
                Login
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#dashboard"
                className="block text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="block text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Benefits
              </a>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleContactClick}>
                Contact Us
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsLoginOpen(true)}>
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
}