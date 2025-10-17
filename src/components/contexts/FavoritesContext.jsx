import { createContext, useCallback, useEffect, useState } from "react";
import supabaseClient from "../../QueryDb/queryDB";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const { session } = useAuth();
    // console.log(favorites);

    const getFavorites = useCallback(async () => {
    let { data: favourites, error } = await supabaseClient
      .from("favorites")
      .select("*")
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
    }
    }, [session]);
    
    const addFavorites = async (game) => {
    await supabaseClient
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
    };
    
    const removeFavorite = async (gameId) => {
    await supabaseClient
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session?.user.id);
    };
    
    useEffect(() => {
        if (session) {
            getFavorites();
        }
        const favorites = supabaseClient
            .channel("favorites")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "favorites"
                },
                () => getFavorites()
            )
            .subscribe();
        return () => {
            if (favorites) {
                supabaseClient.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [session, getFavorites]);


    return <FavoritesContext.Provider value={{ getFavorites, addFavorites, removeFavorite, favorites }}>{children}</FavoritesContext.Provider>;
}


export default FavoritesContext;