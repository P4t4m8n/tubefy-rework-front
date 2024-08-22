import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import routes from "./route";
import "./scss/main.scss";
import { Player } from "./components/Footer/Player";
import BackgroundGradient from "./components/BackgroundGradient";

export function App() {
  return (
    <>
      <main>
        <Router>
          <Sidebar />
          <section className="main-content">
            <BackgroundGradient/>
            <Header />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </section>
        </Router>
        <Player />
      </main>
    </>
  );
}
