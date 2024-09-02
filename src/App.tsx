import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Player } from "./components/Footer/Player";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import routes, { RouteConfig } from "./route";
import UserMsg from "./components/User/UserMsg";
import "./scss/main.scss";

export function App() {
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <>
      <main>
        <Router>
          <Sidebar />
          <section className="main-content">
            <Header />
            <Routes>{renderRoutes(routes)}</Routes>
            <UserMsg />
          </section>
        </Router>
        <Player />
      </main>
    </>
  );
}
