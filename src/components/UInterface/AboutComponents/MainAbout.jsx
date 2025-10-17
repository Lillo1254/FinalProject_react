import { Link } from "react-router";
import videoFile from "../../../assets/videos/videoreact2.mp4";
import { motion } from "framer-motion";


export default function Main({children}) {
  return (


    <main className="relative flex flex-col items-center text-center min-h-screen]">
      <div className="absolute inset-0 bg-black opacity-0 md:opacity-70 z-[-1]">

      <video
          
          src={videoFile}
          playsInline
          loop
          autoPlay
          preload="auto"
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          ></video>
          </div>
      
      <motion.div
        className="flex flex-col items-center h-100 justify-center"
        initial={{ opacity: 0, y: -50 }}   
        animate={{ opacity: 1, y: 50 }}       
        transition={{ duration: 1, ease: "easeOut" }} 
      >

      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                     drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]  mb-4 py-3">
        Scopri il Mondo dei videogiochi in VisualGame
      </h1>
      
      <p className="text-lg sm:text-xl text-primary mb-8 max-w-2xl">
        Esplora, scegli e vivi le migliori avventure.  
        Ogni gioco ha una storia unica, pronta a sorprenderti.
      </p>
      
      <Link
       to={"/market"}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                   text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
        Scopri Ora
      </Link>

      <div className="absolute inset-0 pointer-events-none" />
                        
      </motion.div>
      {children}
    </main>
  );
}
