import { ReactNode } from "react";
import PlaylistIndex from "./pages/PlaylistIndex";
import PlaylistDetails from "./pages/PlaylistDetails";
import SearchIndex from "./pages/SearchIndex";

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
    element: <PlaylistDetails /> },
  {
    path: "/search",
    element: <SearchIndex />,
  },
  {
    path: "/search/:query",
    element: <SearchIndex />,
  },
];

export default routes;
