import { createBrowserRouter } from "react-router-dom"
import Home from "./home/Home"
import Analytics from "./analytics/Analytics"
import Dashboard from "./dashboard/Dashboard"
import DeadliestAttackTypesPage from "./analytics/DeadliestAttackTypesPage"
import IncidentTrendsPage from "./analytics/IncidentTrendsPage"
import GroupsByYearPage from "./analytics/GroupsByYearPage"

export const pages = [
  {
    path: "",
    element: <Home />,
    display: "Home",
  },
  {
    path: "analytics",
    element: <Analytics />,
    display: "Analytics",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    display: "Dashboard",
  },
  {
    path: "deadliestAttackTypesPage",
    element: <DeadliestAttackTypesPage />,
    display: "DeadliestAttackTypesPage",
  },
  {
    path: "incidentTrendsPage",
    element: <IncidentTrendsPage />,
    display: "IncidentTrendsPage",
  },
  {
    path: "groupsByYearPage",
    element: <GroupsByYearPage />,
    display: "GroupsByYearPage",
  },
]

export const routes = createBrowserRouter(pages)
