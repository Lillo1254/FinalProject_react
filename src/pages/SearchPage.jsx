// pages/SearchPage.jsx
import { useLoaderData, useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Card from "../components/UInterface/card/Card";
import { Search, Gamepad2, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function SearchPage() {
  const games = useLoaderData();
  const { search } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-primary text-primary p-6 md:p-12 mt-15"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      translate="no"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-primary pb-4">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Search className="text-accent w-7 h-7" />
          Risultati per: <span className="text-accent">“{search}”</span>
        </h1>

        <button
          onClick={handleClick}
          className="mt-4 md:mt-0 btn btn-primary flex items-center gap-2 shadow-form"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla Home
        </button>
      </div>

      {games.length === 0 ? (
        <motion.div
          className="text-center mt-16 p-6 bg-secondary rounded-xl shadow-detail border border-primary max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gamepad2 className="mx-auto text-support w-12 h-12 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2 text-accent">Nessun gioco trovato</h2>
          <p className="text-sm opacity-80 mb-4">
            Prova a cercare un titolo differente o torna alla home per esplorare altri giochi.
          </p>
          <button
            onClick={handleClick}
            className="btn btn-primary w-full md:w-auto mx-auto shadow-neon"
          >
            <ArrowLeft className="w-4 h-4" /> Torna alla Home
          </button>
        </motion.div>
      ) : (
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {games.map((game) => (
            <motion.li
              key={game.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                title={game.name}
                description={game.description}
                image={game.background_image}
                dater={game.released}
                slug={game.slug}
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
