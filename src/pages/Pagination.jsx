import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export const Pagination = ({
  pokemonPerPage,
  totalPokemons,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const [maxPageLimit, setMaxPageLimit] = useState(9); // Número máximo de páginas visibles a la vez
  const [minPageLimit, setMinPageLimit] = useState(1); // Límite inferior;
  const [pageLimit] = useState(9); // limite de paginas

  //Calcula las paginas necesarias en base al total de pokemons 
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  // Mostrar solo las páginas dentro del rango de límites
  const visiblePages = pageNumbers.filter(
    (number) => number >= minPageLimit && number <= maxPageLimit
  );

  // Cambia los limites cada vez que se cambie la pagina actual 
  const handlePageLimits = () => {
    let min = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    let max = Math.min(pageNumbers.length, min + pageLimit - 1);
    // Comprueba que el maximo y actualiza el valor del limite inferior
    if (max - min + 1 < pageLimit) {
      min = Math.max(1, max - pageLimit + 1);
    }

    setMaxPageLimit(max);
    setMinPageLimit(min);
  };
  // Actualiza cada vez que cambie el currentPage o la longitud de paginas
  useEffect(() => {
    handlePageLimits();
  }, [currentPage, pageNumbers.length]);

  return (
    <nav>
      <ul className="flex items-center justify-center gap-4 m-4">
        {/* Oculta la primera flecha en caso de que la pagina sea la primera*/}
        {currentPage > 1 && (
          <li>
            <NavLink onClick={() => paginate(currentPage - 1)}>
              <VscChevronLeft
                size={36}
                className="p-2 rounded-full  hover:bg-zinc-700 transition duration-300 ease-in-out "
              />
            </NavLink>
          </li>
        )}
        {/* Numeros del Pagination */}
        {visiblePages.map((number) => (
          <li key={number}>
            <NavLink
              onClick={() => paginate(number)}
              className={`text-lg px-3 py-2 rounded-full hover:bg-zinc-700 transition duration-300 ease-in-out  ${
                number === currentPage ? "font-bold bg-zinc-700" : ""
              }`}
            >
              {number}
            </NavLink>
          </li>
        ))}
        {/* Flecha para adelante, se oculta si es la última página */}
        {currentPage < pageNumbers.length && (
          <li>
            <NavLink onClick={() => paginate(currentPage + 1)}>
              <VscChevronRight
                size={36}
                className="p-2 rounded-full  hover:bg-zinc-700 transition duration-300 ease-in-out "
              />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
