import { Link, useLoaderData } from "react-router";

import Card from "../components/UInterface/card/Card";
import StarFavorites from "../components/UInterface/favorites/StarFavorites";
import Modal from "../components/UInterface/Modal";
import { useAuth } from "../components/contexts/AuthContext";
import { getRatingStars } from "../components/Uexp/function/script_basic";
import { useEffect } from "react";

export default function Detail() {
  const { session } = useAuth();

  const game = useLoaderData();
  // console.log(game);
  const description = game.description_raw;

  const rater = getRatingStars(game.ratings);

    useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // console.log(game);

  if (!game) {
    return <p>Gioco non trovato</p>;
  }



  return (
    <div translate="no">
      <div className="flex justify-center mt-25">

      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
                 drop-shadow-lg hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-300">{game.name.toUpperCase()}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start my-5">
        
        <div className="flex flex-col mx-5 ">
          <Card
            key={game.id}
            title={game.name}
            image={game.background_image}
            dater={game.released}
            slug={game.slug}
            description={description}
            publisher={game.publishers[0]?.name}
            parent_platforms={game.parent_platforms}
            
          />
          <div className="p-4 bg-secondary rounded-2xl mt-5">

          <h3>Users Rating</h3>
          {rater}
          </div>

        </div>

        
        <div className="flex flex-col gap-4 mx-5">
          <div className="p-4 bg-secondary rounded-2xl">
            <h1 className="text-xl font-bold mb-2">Description</h1>
            <p className="text-primary text-sm">{description}</p>
          {session && <div className="mt-3 flex gap-2  items-center justify-center font-bold text-2xl"><StarFavorites data={game} /> <small>Add To Favorite</small></div>}
          </div>
        </div>
      </div>

      {session ? (
        <div className="absolute bottom-0 right-0 fixed ">
          <Modal data={game} />
        </div>
      ) : (
        <div className="absolute bottom-0 right-0 fixed ">
          <Link to="/auth" className="btn btn-primary">
            Login o Register per aggiungere ai preferiti e utilizzare la chat
          </Link>
        </div>
      )}
    </div>
  );
}
