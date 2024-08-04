import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import routes from "./route";
import "./styles/main.scss";
import { Player } from "./components/Footer/Player";

export function App() {
  return (
    <>
      <main>
        <Router>
        <Sidebar />
          <section className="main-content">
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
