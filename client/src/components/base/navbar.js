import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { LogoutButton } from "../auth/logoutButton";
import { LoginButton } from "../auth/loginButton";
import "./navbar.css";

export function NavBar() {
  const { userIsLogged } = useContext(AuthContext);
  let status;
  switch (userIsLogged) {
    case true:
      status = <LogoutButton />;
      break;
    case false:
      status = <LoginButton />;
      break;
  }
  return (
    <nav>
      <h1>Email management system</h1>
      {status}
    </nav>
  );
}
