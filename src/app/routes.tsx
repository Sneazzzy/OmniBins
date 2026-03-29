import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { BinMonitoring } from "./pages/BinMonitoring";
import { MapLocation } from "./pages/MapLocation";
import { Alerts } from "./pages/Alerts";
import { Collections } from "./pages/Collections";
import { RotIndex } from "./pages/RotIndex";
import { Analytics } from "./pages/Analytics";
import { Workers } from "./pages/Workers";
import { Maintenance } from "./pages/Maintenance";
import { UserManagement } from "./pages/UserManagement";
import { NotFound } from "./pages/NotFound";

export function createAppRouter(onLogout: () => void) {
  return createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout onLogout={onLogout} />,
      children: [
        { index: true, Component: Dashboard },
        { path: "bins", Component: BinMonitoring },
        { path: "map", Component: MapLocation },
        { path: "alerts", Component: Alerts },
        { path: "collections", Component: Collections },
        { path: "rot-index", Component: RotIndex },
        { path: "analytics", Component: Analytics },
        { path: "workers", Component: Workers },
        { path: "maintenance", Component: Maintenance },
        { path: "users", Component: UserManagement },
        { path: "*", Component: NotFound },
      ],
    },
  ], { basename: import.meta.env.BASE_URL });
}