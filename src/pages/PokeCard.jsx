import { useEffect, useState } from "react";
import axios from "axios";
import pokeball from "../assets/pokeball.svg"
import { Link, NavLink } from "react-router-dom";

function PokeCard({ url }) {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data);
     
      })
      .catch((err) => {
        console.error("Error fetching Pokemon data", err);
      });
  }, [url]);
  return (
    <NavLink to={"/pokemon/" + pokemon.id} className="w-full lg:w-1/6 md:w-1/4 rounded-lg border border-zinc-900 hover:border-hidden hover:bg-zinc-700 transition duration-300 ease-in-out ">
      <img
        src={
          pokemon.sprites?.front_default
            ? pokemon.sprites.front_default
            : pokeball
        }
        alt={pokemon.name}
        className="h-auto w-full object-cover object-center  rounded-t-lg"
      />
      <div className="bg-zinc-900 text-white p-2 rounded-b-lg">
        <h3 className="font-bold text-lg">{pokemon.name}</h3>
      </div>
    </NavLink>
  );
}

export default PokeCard;
