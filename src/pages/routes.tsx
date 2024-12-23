import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./dashboard/Dashboard"
import DeadliestAttackTypesPage from "./analytics/DeadliestAttackTypesPage"
import IncidentTrendsPage from "./analytics/IncidentTrendsPage"
import GroupsByYearPage from "./analytics/GroupsByYearPage"
import DeadliestRegionsPage from "./maps/DeadliestRegionsPage"
import HighestCasualtyRegionsPage from "./maps/HighestCasualtyRegionsPage"

export const pages = [

  {
    path: "dashboard",
    element: <Dashboard />,
    display: "Dashboard",
  },
  {
    path: "deadliestAttackTypesPage",
    element: <DeadliestAttackTypesPage />,
    display: "Deadliest Attack Types",
  },
  {
    path: "incidentTrendsPage",
    element: <IncidentTrendsPage />,
    display: "Incident Trends",
  },
  {
    path: "groupsByYearPage",
    element: <GroupsByYearPage />,
    display: "Groups By Year",
  },
  {
    path: "deadliestRegionsPage",
    element: <DeadliestRegionsPage />,
    display: "Deadliest Regions",
  },
  {
    path: "highestCasualtyRegionsPage",
    element: <HighestCasualtyRegionsPage />,
    display: "Highest Casualty Regions",
  },
]

export const routes = createBrowserRouter(pages)
