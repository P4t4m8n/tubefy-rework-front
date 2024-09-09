import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

import { App } from "./App";

import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
