import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import StartScreen from "./pages/StartScreen";
import GameScreen from "./pages/GameScreen";
import "./assets/css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<StartScreen />} />
          <Route path="game" element={<GameScreen />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
