import { Link, useLoaderData } from "react-router";
import Card from "../components/UInterface/card/Card";
import Modal from "../components/UInterface/Modal";
import Main from "../components/UInterface/AboutComponents/MainAbout";
import SectionPrimary from "../components/UInterface/AboutComponents/Section";
import SectionPromo from "../components/UInterface/AboutComponents/sectionPromo";
import { useEffect, useState } from "react";
import { follow } from "../components/Uexp/function/script_basic";
import { motion } from "framer-motion";


export default function Home() {
  const [allGames, genres] = useLoaderData();

  const uniqueGenres = [...new Set(genres)];

  // console.log(allGames);
  // console.log(imgame);
  // console.log(named);
  // console.log(genres);
  // console.log(uniqueGenres);
  const topRatedGames = allGames.filter((game) => game.rating > 4);

  const latestGames = [...allGames]
    .filter((game) => game.released)
    .sort((a, b) => new Date(b.released) - new Date(a.released))
    .slice(0, 6); 
  
  useEffect(() => {
    follow();
     window.scrollTo(0, 0);
  }, []);
  

    const [namount, setNamount] = useState(0.5);

 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setNamount(0.2);
      } else if(window.innerWidth < 1024) {
        setNamount(0.5);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <Main>

      
      <SectionPrimary title="Ultimi Arrivi" classes={"w-full mx-auto lg:py-5 text-center py-15 lg:mt-35"} namount={namount}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {latestGames.slice(0, 3).map((game, index) => (
            <Card
              key={index}
              title={game.name}
              image={game.background_image}
              dater={game.released}
              slug={game.slug}
            />
          ))}
        </div>
      </SectionPrimary>

      <SectionPrimary title="I Più Quotati" classes={"w-full mx-auto py-10 text-center"} namount={namount}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {topRatedGames.map(
            (game, index) =>
             
              ((
                <Card
                  key={index}
                  title={game.name}
                  image={game.background_image}
                  dater={game.released}
                  slug={game.slug}
                />
              ))
          ).slice(0, 6)}
        </div>
      </SectionPrimary>
        

                <motion.div className=""
        initial={{ opacity: 0, y: -50 }}  
        whileInView={{ opacity: 1, y: 50 }}        
          transition={{ duration: 1, ease: "easeOut" }} 
          viewport={{ once: true , amount: 0.3}}
        >
          <SectionPromo />
          </motion.div>
 </Main>
      
    </>
  );
}
