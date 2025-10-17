import { RouterProvider } from "react-router";
import router from "./components/Uexp/routing/router";
import Home from "./pages/Home";
import { AuthProvider } from "./components/contexts/AuthContext";
import { FavoritesProvider } from "./components/contexts/FavoritesContext";

function App() {
  return (
    <>
      <AuthProvider>

        <FavoritesProvider>
          
      <RouterProvider router={router}/>

        </FavoritesProvider>


      </AuthProvider>

    </>
  );
}

export default App;
