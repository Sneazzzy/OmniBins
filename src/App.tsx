// src/App.tsx
import { useState, useMemo } from 'react';
import { RouterProvider } from 'react-router';

// Update these to include the "app" folder!
import { createAppRouter } from './app/routes'; 
import { Navbar } from './app/components/Navbar';
import { Hero } from './app/components/Hero';
import { Features } from './app/components/Features';
import { Dashboard } from './app/components/Dashboard';
import { HowItWorks } from './app/components/HowItWorks';
import { Benefits } from './app/components/Benefits';
import { Footer } from './app/components/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useMemo(() => createAppRouter(() => setIsLoggedIn(false)), []);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  // If logged in, show the dashboard application
  if (isLoggedIn) {
    return <RouterProvider router={router} />;
  }

  // Otherwise, show the landing page
  return (
    <div className="min-h-screen">
      <Navbar onLoginSuccess={handleLoginSuccess} />
      <Hero onLoginSuccess={handleLoginSuccess} />
      <div id="features">
        <Features />
      </div>
      <div id="dashboard">
        <Dashboard />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <Footer />
    </div>
  );
}