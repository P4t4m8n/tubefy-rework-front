import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "./reducers/playlist.reducer";
import { userReducer } from "./reducers/user.reducer";
import { playerReducer } from "./reducers/player.reducer";
import { imgGradientReducer } from "./reducers/imgGradient.reducer";
import { friendReducer } from "./reducers/friend.reducer";
import { notificationReducer } from "./reducers/notification";

const rootReducer = combineReducers({
  playlists: playlistReducer,
  user: userReducer,
  player: playerReducer,
  imgGradient: imgGradientReducer,
  friends: friendReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
