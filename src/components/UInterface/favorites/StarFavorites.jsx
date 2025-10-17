import { useContext} from "react";
// import { useAuth } from "../../../components/contexts/AuthContext";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import FavoritesContext from "../../contexts/FavoritesContext";


export default function StarFavorites({ data }) {
    // const { session } = useAuth();
    const {favorites, addFavorites, removeFavorite} = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => +el.game_id === data.id);


    return (
        <>
            {isFavorite() ? (<button onClick={() => removeFavorite(data.id)}><FaTrashAlt className="text-white hover:text-red-600 transition-colors duration-300"/></button>) : (<button onClick={() => addFavorites(data)}><FaHeart className="text-pink-900 hover:scale-150 transition-colors duration-300"/></button>)}
        </>
    );
}