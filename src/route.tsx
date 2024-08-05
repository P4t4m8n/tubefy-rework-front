import { ReactNode } from "react";
import PlaylistIndex from "./pages/PlaylistIndex";
import PlaylistDetails from "./pages/PlaylistDetails";

export interface RouteConfig {
  path: string;
  element: ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <PlaylistIndex />,
  },
  
  { path: "playlist/:id",
    element: <PlaylistDetails />
  },
];

export default routes;
