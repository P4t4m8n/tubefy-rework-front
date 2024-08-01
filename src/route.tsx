import { ReactNode } from "react";
import PlaylistIndex from "./pages/PlaylistIndex";

export interface RouteConfig {
  path: string;
  element: ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <PlaylistIndex />,
  },
];

export default routes;
