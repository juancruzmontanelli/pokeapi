import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./pages/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import Grid from "./pages/Grid";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Rutas de la pagina */}
          <Route path="/" element={<Home />}/>
          <Route path="/pokemons" element={<Grid />}/>
          <Route path="/pokemon/:id" element={<PokemonDetails />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
