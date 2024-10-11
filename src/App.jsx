import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./pages/Nav";
import pokeball from "./assets/pokeball.svg";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-6xl font-bold">Poke Api</h1>
          <img src={pokeball} className="w-72 " />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
