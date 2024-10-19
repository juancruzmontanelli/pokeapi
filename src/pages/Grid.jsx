import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import { Pagination } from "./Pagination";

function Grid() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(10);
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  useEffect(() => {
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

  // Cambiar de pagina
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
