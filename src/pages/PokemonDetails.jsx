import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error("Error fetching Pokemon details", err));
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const fetchAbilities = async () => {
        try {
          // Realiza todas las solicitudes de habilidades en paralelo
          const abilityPromises = pokemon.abilities.map((ability) => {
            // Agrega `return` aquí para que la promesa sea devuelta
            return axios.get(ability.ability.url);
          });

          // Espera a que todas las promesas se resuelvan
          const abilityResponses = await Promise.all(abilityPromises);

          // Extrae los datos de cada habilidad y actualiza el estado
          const fetchedAbilities = abilityResponses.map((res) => res.data);
          setAbilities(fetchedAbilities);
          console.log(fetchedAbilities);
        } catch (error) {
          console.error("Error fetching abilities", error);
        }
      };

      fetchAbilities();
    }
  }, [pokemon]);

  if (!pokemon) return <div>Loading...</div>;
  return (
    <div className="flex flex-wrap justify-center p-10">
      <div className="w-full bg-zinc-900 rounded-lg p-8 space-y-8">
        <div className="">
          <h1 className=" font-bold text-6xl text-center">{pokemon.name}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className=" w-full md:w-8/12 h-full  overflow-hidden rounded-lg bg-zinc-800 hover:bg-zinc-700 transition duration-300 ease-in-out">
            <img
              src={
                pokemon.sprites?.front_default
                  ? pokemon.sprites.front_default
                  : pokeball
              }
              alt={pokemon.name}
              className="w-full h-auto object-cover object-center "
            />
          </div>
          <div className="flex flex-col w-full items-start space-y-4">
            <p className="text-2xl">
              <strong className="text-gray-300">Height:</strong>{" "}
              {pokemon.height}
            </p>
            <p className="text-2xl">
              <strong className="text-gray-300">Weight:</strong>{" "}
              {pokemon.weight}
            </p>
            <p className="text-2xl">
              <strong className="text-gray-300">Base Experience:</strong>{" "}
              {pokemon.base_experience}
            </p>
            <p className="text-2xl">
              <strong className="text-gray-300">Abilities:</strong>
            </p>

            <ul className="list-disc pl-5 space-y-4">
              {abilities.map((ability, index) => (
                <li key={index} className="text-lg text-gray-300 text-left">
                  {/* Muestra el nombre y la descripción de la habilidad */}
                  <strong>{ability.name}</strong>:
                  <br />
                  {
                    // Busca el efecto en inglés
                    ability.effect_entries.find(
                      (entry) => entry.language.name === "en"
                    )?.effect || "No effect description available."
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
