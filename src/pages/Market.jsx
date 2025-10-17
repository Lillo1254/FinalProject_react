import { useLoaderData } from "react-router";
import Card from "../components/UInterface/card/Card";
import { useEffect } from "react";


export default function Market() {

    const [allGames,
        imgame,
        named,
      genres] = useLoaderData();
  // console.log(allGames);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div translate="no">
      <div className="container mx-auto p-4 my-22">
        <h1 className="text-3xl font-bold mb-10 text-center">All Games Avalaible</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {allGames.map((game, index, )   => (
          <Card
            key={index}
            title={game.name}
            image={game.background_image}
            dater={game.released}
            slug={game.slug}
            
          /> 
        ) , )}
      </div>
          </div>
    </div>
  );
}
