import pokeball from "../assets/pokeball.svg";

function Home() {
  return (
    <>
      {/* Home de la pagina */}
      <div className="h-screen flex flex-col justify-center items-center space-y-4 ">
        <h1 className="text-6xl font-bold">Poke Api</h1>
        {/* Imagen de Pokeball Principal  */}
        <img src={pokeball} className="w-72 " />
      </div>
    </>
  );
}

export default Home;
