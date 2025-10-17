import { Outlet, useLoaderData } from "react-router";
import NavbarHome from "../navigation/NavbarHome";
import Footer from "../components/UInterface/AboutComponents/Footer";
// import videoFile from "../assets/videos/videoreact2.mp4";
// import { useEffect, useRef } from "react";

export default function LayoutGuest() {
  const [allGames, imgame, named, genres] = useLoaderData();


  return (
    <>
      <NavbarHome generi={genres} />
      <div className=" relative">


        <Outlet />
      </div>
      <Footer generi={genres} />
    </>
  );
}
