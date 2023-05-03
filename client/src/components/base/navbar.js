import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function NavBar() {
  const { token, setToken, userIsLogged, setUserIsLogged } =
    useContext(AuthContext);
  return (
    <nav>
      <p>You are currently {userIsLogged ? "logged in" : "logged out"}</p>
    </nav>
  );
}
