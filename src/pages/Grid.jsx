import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

function Grid() {
  const [pokemons, setPokemons] = useState([]);
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res.data.results);
      setPokemons(res.data.results);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center p-10 gap-4">
        {pokemons.length > 0 &&
          pokemons
            .slice(0, 100)
            .map((pokemon, index) => (
              <PokeCard key={index} url={pokemon.url} />
            ))}
      </div>
    </>
  );
}

export default Grid;
