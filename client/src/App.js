import "./App.css";
import { AuthContext } from "./contexts/authContext";
import { NavBar } from "./components/base/navbar/navbar";
import { AppRouter } from "./router";
import { useContext } from "react";
import { Loader } from "./components/loader";
function App() {
  const { userIsLogged } = useContext(AuthContext);
  switch (userIsLogged) {
    case true:
      return (
        <>
          <NavBar />
          <AppRouter />
          <Loader/>
        </>
      );
    case false:
      return (
        <>
          <NavBar />
          <AppRouter />
          <Loader/>
        </>
      );
    default:
      return null;
  }
}

export default App;
