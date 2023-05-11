import "./App.css";
import { AuthContext } from "./contexts/authContext";
import { NavBar } from "./components/base/navbar";
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
        </>
      );
    case false:
      return (
        <>
          <NavBar />
          <AppRouter />
        </>
      );
    default:
      return null;
  }
}

export default App;
