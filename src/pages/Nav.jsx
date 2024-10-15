import React, { useState } from "react";
import pokeball from "../assets/pokeball.svg";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import { Link, NavLink } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav>
        {/* Navbar para pantallas grandes */}
        <div className="h-10vh flex justify-between z-50 lg:py-5 px-10 py-4 bg-zinc-900">
          <div className="flex items-center flex-1">
            <img className="w-10" src={pokeball} alt="" />
          </div>
          <div className="lg:flex md:flex lg:flex-1 items-center justify-end hidden">
            <div className="">
              <ul className="flex gap-8 mr-16 text-[18px]">
                <NavLink to="/">
                  <li className="hover:text-gray-500 font-bold cursor-pointer">
                    Home
                  </li>
                </NavLink>
                <NavLink to="/pokemons">
                  <li className="hover:text-gray-500 font-bold cursor-pointer">
                    Pokemons
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
          <div className="lg:hidden md:hidden flex items-center">
            {!menuOpen ? (
              <button
                onClick={toggleMenu}
                className="block transition bg-zinc-900 hover:bg-zinc-800 hover:border-transparent focus:outline-none focus:ring-0"
              >
                <VscMenu size={30} />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className="block transition bg-zinc-900  hover:bg-zinc-800 hover:border-transparent focus:outline-none focus:ring-0"
              >
                <VscChromeClose size={30} />
              </button>
            )}
          </div>
        </div>
        {/* Menú desplegable para pantallas pequeñas */}
        <div
          className={`lg:hidden md:hidden bg-zinc-900 menu ${
            menuOpen ? "menuActive" : "menuInactive"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 px-10 py-5 text-[18px]">
            <NavLink to="/" onClick={toggleMenu}>
              <li className="hover:text-gray-500 font-bold cursor-pointer">
                Home
              </li>
            </NavLink>
            <NavLink to="/pokemons" onClick={toggleMenu}>
              <li className="hover:text-gray-500 font-bold cursor-pointer">
                Pokemons
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
