import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <WeatherDashboard />
    </>
  );
}

export default App;
