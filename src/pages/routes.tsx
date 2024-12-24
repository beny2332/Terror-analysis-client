import { createBrowserRouter } from "react-router-dom"
import DeadliestAttackTypesPage from "./analytics/DeadliestAttackTypesPage"
import IncidentTrendsPage from "./analytics/IncidentTrendsPage"
import GroupsByYearPage from "./analytics/GroupsByYearPage"
import DeadliestRegionsPage from "./maps/DeadliestRegionsPage"
import HighestCasualtyRegionsPage from "./maps/HighestCasualtyRegionsPage"
// import CreateEventPage from "./events/createEventPage"

export const pages = [

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
  // {
  //   path: "createEventPage",
  //   element: <CreateEventPage />,
  //   display: "Create Event",
  // },
]

export const routes = createBrowserRouter(pages)
