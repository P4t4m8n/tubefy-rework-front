import { ReactNode } from "react";
import PlaylistIndex from "./pages/PlaylistIndex";
import PlaylistDetails from "./pages/PlaylistDetails";
import SearchIndex from "./pages/SearchIndex";
import { AuthProtectedRoute } from "./guards/AuthProtectedRoute";
import PlaylistEdit from "./pages/PlaylistEdit";
import ProfileIndex from "./pages/ProfileIndex";
import ProfileFriends from "./components/ProfileIndex/ProfileFriends";
import ProfileDetails from "./components/ProfileIndex/ProfileDetails";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <PlaylistIndex />,
  },
  {
    path: "playlist/:id",
    element: <PlaylistDetails />,
  },
  {
    path: "playlist/edit",
    element: (
      <AuthProtectedRoute>
        <PlaylistEdit />
      </AuthProtectedRoute>
    ),
  },
  {
    path: "profile",
    element: (
      <AuthProtectedRoute>
        <ProfileIndex />
      </AuthProtectedRoute>
    ),
    children: [
      {
        path: "friends",
        element: <ProfileFriends />,
      },
      {
        path: "details",
        element: <ProfileDetails />,
      },
    ],
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
