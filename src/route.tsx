import { ReactNode } from "react";
import PlaylistIndex from "./pages/PlaylistIndex";
import PlaylistDetails from "./pages/PlaylistDetails";
import SearchIndex from "./pages/SearchIndex";
import { AuthProtectedRoute } from "./guards/AuthProtectedRoute";
import PlaylistEdit from "./pages/PlaylistEdit";

export interface RouteConfig {
  path: string;
  element: ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <PlaylistIndex />,
  },

  { path: "playlist/:id", element: <PlaylistDetails /> },
  {
    path: "playlist/edit",
    element: (
      <AuthProtectedRoute>
        <PlaylistEdit />
      </AuthProtectedRoute>
    ),
  },
  {
    path: "playlist/edit/:id",
    element: (
      <AuthProtectedRoute>
        <PlaylistEdit />
      </AuthProtectedRoute>
    ),
  },
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
