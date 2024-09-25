import { ReactNode } from "react";

import { AuthProtectedRoute } from "./guards/AuthProtectedRoute";

import Home from "./pages/Home";

import SearchIndex from "./pages/SearchIndex";

import PlaylistEdit from "./pages/PlaylistEdit";

import PlaylistDetails from "./pages/PlaylistDetails";

import ProfileIndex from "./pages/ProfileIndex";
import ProfileFriendIndex from "./components/ProfileIndex/ProfileFriends/ProfileFriendIndex";
import ProfileEdit from "./components/ProfileIndex/ProfileEdit/ProfileEdit";
import ProfileNotificationIndex from "./components/ProfileIndex/ProfileNotification/ProfileNotificationIndex";
import PlaylistsIndex from "./pages/PlaylistsIndex";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "playlist/:id",
    element: <PlaylistDetails />,
  },
  { path: "playlists/:type", element: <PlaylistsIndex /> },
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
        element: <ProfileFriendIndex />,
      },
      {
        path: "profile",
        element: <ProfileEdit />,
      },
      {
        path: "notifications",
        element: <ProfileNotificationIndex />,
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
