// src/App.tsx
import { useState, useMemo } from 'react';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './app/routes'; 
import { LandingPage } from './app/pages/LandingPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useMemo(() => createAppRouter(() => setIsLoggedIn(false)), []);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  // If logged in, show the dashboard application
  if (isLoggedIn) {
    return <RouterProvider router={router} />;
  }

  // Otherwise, show the landing page
  return <LandingPage onLoginSuccess={handleLoginSuccess} />;
}