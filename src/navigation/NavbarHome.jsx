import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

import { clickoutside } from "../components/Uexp/function/script_basic";
import SearchForm from "../components/UInterface/forms/SerachForm";
import { useAuth } from "../components/contexts/AuthContext";
import defaultImg from "../assets/reactdefault.jpg";

export default function NavbarHome({ generi }) {
  const listGen = [...new Set(generi)];
  const { session, userName, signOut, avatarUrl } = useAuth();
  console.log(session);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

const publicAvatarUrl = avatarUrl || defaultImg;
  // console.log(publicAvatarUrl);

  useEffect(() => {
    const cleanup = clickoutside(".js-menu-genres");
    return cleanup;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = ["Home", "Market", "About Us", "Contact"];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 lg:mt-3" translate="no">
      <nav className="navbar w-full lg:w-[85%] bg-pink-400/20 backdrop-blur-xl border border-pink-300/30 shadow-lg rounded-b-3xl lg:rounded-full px-4 lg:px-6 py-2 transition-all duration-500">

        <div className="navbar-start flex items-center gap-2">
          
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 space-y-1 z-20"
            >
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                    {item}
                  </Link>
                </li>
              ))}

              <li>
                <details className="js-menu-genres">
                  <summary>Genres</summary>
                  <ul className="p-2">
                    {listGen.map((genre, index) => (
                      <li key={index}>
                        <Link to={`/genre/${genre}`}>{genre}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li className="flex justify-center">
                <button
                  onClick={toggleTheme}
                  className="btn btn-circle btn-ghost relative"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Sun className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Moon className="w-5 h-5 text-indigo-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </li>

              <SearchForm />

              <li>
                {session ? (
                  <button
                    onClick={signOut}
                    className="btn bg-red-800 text-white hover:bg-red-800 transition-colors w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/auth" className="bg-gray-800 p-1.5 rounded hover:bg-pink-600 transition-colors duration-600">
                    Login / Register
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <Link
            to={session ? "/profile" : "/auth"}
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <img
              src={publicAvatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-contain border border-pink-200/50"
            />
            <button className="block btn btn-ghost normal-case text-lg">
              {session ? userName || "Utente" : "Guest"}
            </button>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="btn btn-ghost h-10 px-1 transition hover:text-[var(--color-support)]"
                >
                  {item}
                </Link>
              </li>
            ))}

            <li>
              <details className="js-menu-genres">
                <summary className="btn h-10 px-4 hover:text-[var(--color-support)]">Genres</summary>
                <ul className="menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                  {listGen.map((genre, index) => (
                    <li key={index}>
                      <Link
                        to={`/genre/${genre}`}
                        className="transition hover:text-[var(--color-support)]"
                      >
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            <li className="flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-ghost w-10 h-10 p-0"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Moon className="w-5 h-5 text-indigo-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex gap-2 items-center">
          <SearchForm />
          {session ? (
            <button
              onClick={signOut}
              className="btn bg-red-700 text-white hover:bg-red-800 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" className="btn  hover:text-pink-600 transition-colors duration-400">
              Login / Register
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
