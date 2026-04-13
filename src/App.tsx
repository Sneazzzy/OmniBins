// src/App.tsx
import { useState, useMemo, lazy, Suspense } from 'react';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './app/routes'; 

const LandingPage = lazy(() => import('./app/pages/LandingPage').then(m => ({ default: m.LandingPage })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-600"></div>
  </div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useMemo(() => createAppRouter(() => setIsLoggedIn(false)), []);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  // If logged in, show the dashboard application
  if (isLoggedIn) {
    return <RouterProvider router={router} />;
  }

  // Otherwise, show the landing page with lazy loading
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LandingPage onLoginSuccess={handleLoginSuccess} />
    </Suspense>
  );
}