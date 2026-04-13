import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";

// Lazy load route components for code splitting
const BinMonitoring = lazy(() => import("./pages/BinMonitoring").then(m => ({ default: m.BinMonitoring })));
const MapLocation = lazy(() => import("./pages/MapLocation").then(m => ({ default: m.MapLocation })));
const Alerts = lazy(() => import("./pages/Alerts").then(m => ({ default: m.Alerts })));
const Collections = lazy(() => import("./pages/Collections").then(m => ({ default: m.Collections })));
const RotIndex = lazy(() => import("./pages/RotIndex").then(m => ({ default: m.RotIndex })));
const Analytics = lazy(() => import("./pages/Analytics").then(m => ({ default: m.Analytics })));
const Workers = lazy(() => import("./pages/Workers").then(m => ({ default: m.Workers })));
const Maintenance = lazy(() => import("./pages/Maintenance").then(m => ({ default: m.Maintenance })));
const UserManagement = lazy(() => import("./pages/UserManagement").then(m => ({ default: m.UserManagement })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export function createAppRouter(onLogout: () => void) {
  return createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout onLogout={onLogout} />,
      children: [
        { index: true, Component: Dashboard },
        { path: "bins", element: <Suspense fallback={<LoadingFallback />}><BinMonitoring /></Suspense> },
        { path: "map", element: <Suspense fallback={<LoadingFallback />}><MapLocation /></Suspense> },
        { path: "alerts", element: <Suspense fallback={<LoadingFallback />}><Alerts /></Suspense> },
        { path: "collections", element: <Suspense fallback={<LoadingFallback />}><Collections /></Suspense> },
        { path: "rot-index", element: <Suspense fallback={<LoadingFallback />}><RotIndex /></Suspense> },
        { path: "analytics", element: <Suspense fallback={<LoadingFallback />}><Analytics /></Suspense> },
        { path: "workers", element: <Suspense fallback={<LoadingFallback />}><Workers /></Suspense> },
        { path: "maintenance", element: <Suspense fallback={<LoadingFallback />}><Maintenance /></Suspense> },
        { path: "users", element: <Suspense fallback={<LoadingFallback />}><UserManagement /></Suspense> },
        { path: "*", element: <Suspense fallback={<LoadingFallback />}><NotFound /></Suspense> },
      ],
    },
  ], { basename: import.meta.env.BASE_URL });
}