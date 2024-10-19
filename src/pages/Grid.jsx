import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import { Pagination } from "./Pagination";

function Grid() {
  const [pokemons, setPokemons] = useState([]); // Estado que contiene todo los pokemons obtenidos por la api 
  const [currentPage, setCurrentPage] = useState(1); // Estado de la pagina actual del pagination, por defecto es 1
  const [pokemonPerPage] = useState(10); // Estado que define la cantidad de pokemons por pagina
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"; // Url de la api

  useEffect(() => {
    // con este pedio axios obtenemos todos los pokemons y los guardamos
    axios.get(URL).then((res) => {
      setPokemons(res.data.results);
    });
  }, []);

  // Obtener el Pokemon actual
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Cambiar de pagina actual
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col justify-cente">
      <div className="flex flex-wrap justify-center p-10 gap-4">
        {/* Comprueba si hay pokemons y los pasa a PokeCard por props (pasa la url para luego obtener el pokemon en particular) */}
        {currentPokemon.length > 0 &&
          currentPokemon.map((pokemon, index) => (
            <PokeCard key={index} url={pokemon.url} />
          ))}
      </div>
      <Pagination
        pokemonPerPage={pokemonPerPage}
        totalPokemons={pokemons.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Grid;
