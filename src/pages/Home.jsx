import pokeball from "../assets/pokeball.svg";

function Home() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center space-y-4 ">
        <h1 className="text-6xl font-bold">Poke Api</h1>
        <img src={pokeball} className="w-72 " />
      </div>
    </>
  );
}

export default Home;
