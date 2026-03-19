import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardOverview } from "./pages/DashboardOverview";
import { BinMonitoring } from "./pages/BinMonitoring";
import { MapLocation } from "./pages/MapLocation";
import { Alerts } from "./pages/Alerts";
import { CollectionManagement } from "./pages/CollectionManagement";
import { RotIndex } from "./pages/RotIndex";
import { Analytics } from "./pages/Analytics";
import { WorkerManagement } from "./pages/WorkerManagement";
import { Maintenance } from "./pages/Maintenance";
import { UserManagement } from "./pages/UserManagement";
import { NotFound } from "./pages/NotFound";

export function createAppRouter(onLogout: () => void) {
  return createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout onLogout={onLogout} />,
      children: [
        { index: true, Component: DashboardOverview },
        { path: "bins", Component: BinMonitoring },
        { path: "map", Component: MapLocation },
        { path: "alerts", Component: Alerts },
        { path: "collections", Component: CollectionManagement },
        { path: "rot-index", Component: RotIndex },
        { path: "analytics", Component: Analytics },
        { path: "workers", Component: WorkerManagement },
        { path: "maintenance", Component: Maintenance },
        { path: "users", Component: UserManagement },
        { path: "*", Component: NotFound },
      ],
    },
  ]);
}