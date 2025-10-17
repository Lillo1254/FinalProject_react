import { createBrowserRouter } from "react-router";
import Home from "../../../pages/Home";
import AboutUs from "../../../pages/AboutUs";
import Market from "../../../pages/Market";
import Contact from "../../../pages/Contact";
import { getGameBySlug, getGames, getGamesByGenre, getGamesBySearch } from "../function/loader";
import LayoutGuest from "../../../layouts/LayoutGuest";
import Category from "../../../pages/Category";
import Detail from "../../../pages/Detail";
import SearchPage from "../../../pages/SearchPage";
import AuthenticationPage from "../../../pages/AuthenticationPage";
import ProfilePage from "../../../pages/ProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: LayoutGuest,
        loader: getGames,
        children: [
            {
                path: "/",
                Component: Home,
                loader: getGames
            },
            {
                path: "genre/:id",
                Component: Category,
                loader: getGamesByGenre
            },
            {
                path: "detail/:id",
                Component: Detail,
                loader: getGameBySlug
            },
            {
                path: "about-us",
                Component: AboutUs
            },
            {
                path: "contact",
                Component: Contact
            },
            {
                path: "search/:search",
                Component: SearchPage,
                loader: getGamesBySearch
            },
            {
                path: "auth",
                Component: AuthenticationPage
            },
            {
                path: "profile",
                Component: ProfilePage
            },
            {
                path: "/market",
                Component: Market,
                loader: getGames
            },
        ],
    },
    {
        path: "/about-us",
        Component: AboutUs
    },

    {
        path: "Contact",
        Component: Contact
    }

])

export default router