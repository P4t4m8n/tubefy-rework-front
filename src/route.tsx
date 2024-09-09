import { ReactNode } from "react";

import { AuthProtectedRoute } from "./guards/AuthProtectedRoute";

import PlaylistIndex from "./pages/PlaylistIndex";


import SearchIndex from "./pages/SearchIndex";

import PlaylistEdit from "./pages/PlaylistEdit";

import PlaylistDetails from "./pages/PlaylistDetails";

import ProfileIndex from "./pages/ProfileIndex";
import ProfileFriendIndex from "./components/ProfileIndex/ProfileFriends/ProfileFriendIndex";
import ProfileDetails from "./components/ProfileIndex/ProfileEdit/ProfileDetails";
import ProfileNotificationIndex from "./components/ProfileIndex/ProfileNotification/ProfileNotificationIndex";

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
        element: <ProfileFriendIndex />,
      },
      {
        path: "details",
        element: <ProfileDetails />,
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
