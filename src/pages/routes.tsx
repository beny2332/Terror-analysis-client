import { createBrowserRouter } from "react-router-dom"
import DeadliestAttackTypesPage from "./analytics/DeadliestAttackTypesPage"
import IncidentTrendsPage from "./analytics/IncidentTrendsPage"
import GroupsByYearPage from "./analytics/GroupsByYearPage"
import DeadliestRegionsPage from "./maps/DeadliestRegionsPage"
import HighestCasualtyRegionsPage from "./maps/HighestCasualtyRegionsPage"
import HomePage from "./HomePage"

export const pages = [
  {
    path: "/",
    element: <HomePage />,
    display: "Home",
    category: "home"
  },
  {
    path: "deadliestAttackTypesPage",
    element: <DeadliestAttackTypesPage />,
    display: "Deadliest Attack Types",
    category: "analytics"
  },
  {
    path: "incidentTrendsPage",
    element: <IncidentTrendsPage />,
    display: "Incident Trends",
    category: "analytics"
  },
  {
    path: "groupsByYearPage",
    element: <GroupsByYearPage />,
    display: "Groups By Year",
    category: "analytics"
  },
  {
    path: "deadliestRegionsPage",
    element: <DeadliestRegionsPage />,
    display: "Deadliest Regions",
    category: "maps"
  },
  {
    path: "highestCasualtyRegionsPage",
    element: <HighestCasualtyRegionsPage />,
    display: "Highest Casualty Regions",
    category: "maps"
  },
]

export const routes = createBrowserRouter(pages)
