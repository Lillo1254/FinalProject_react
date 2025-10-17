import { useContext } from "react";
import FavoritesContext from "../../contexts/FavoritesContext";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../card/Card";

// const favoriteGameUI = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "1rem",
//   marginBottom: "1rem",
//   width: "25%",
// };


export default function ListFavorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { session } = useAuth();
  // console.log(session);

  return (
    <div translate="no">
      <details className="">
        <summary>
          I giochi preferiti di {session?.user.user_metadata.userName}
        </summary>

        <ul className="flex gap-5 flex-wrap">
          {favorites &&
            favorites.map((game) => (
              <li key={game.game_id} /* style={favoriteGameUI} */ className="flex flex-col gap-2 items-center w-48 my-5">
                <Card 
                  title={game.game_name}
                  image={game.game_image}
                  slug={game.game_id}
                />
                  <button
                    onClick={() => removeFavorite(game.game_id)}
                    className="btn bg-red-500"
                  >
                    Rimuovi dai preferiti
                  </button>
                
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
}
