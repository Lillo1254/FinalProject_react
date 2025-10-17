// pages/Category.jsx
import { useLoaderData, useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Card from "../components/UInterface/card/Card";
import { FolderOpen, ArrowLeft, Gamepad2 } from "lucide-react";

export default function Category() {
  const { id } = useParams();
  const filteredGames = useLoaderData();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen bg-primary text-primary p-6 md:p-12 mt-15"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-primary pb-4">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <FolderOpen className="text-accent w-7 h-7" />
          Categoria: <span className="text-accent capitalize"> {id}</span>
        </h1>

        <button
          onClick={handleBack}
          className="mt-4 md:mt-0 btn btn-primary flex items-center gap-2 shadow-form"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla Home
        </button>
      </div>

      {filteredGames.length === 0 ? (
        <motion.div
          className="text-center mt-20 p-6 bg-secondary rounded-xl shadow-detail border border-primary max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gamepad2 className="mx-auto text-support w-12 h-12 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2 text-accent">
            Nessun gioco trovato
          </h2>
          <p className="text-sm opacity-80 mb-4">
            Non ci sono giochi disponibili in questa categoria al momento.
          </p>
          <button
            onClick={handleBack}
            className="btn btn-primary shadow-form flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Torna alla Home
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full"
            >
              <Card
                title={game.name}
                description={game.description}
                image={game.background_image}
                dater={game.released}
                slug={game.slug}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
