import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { LogoutButton } from "../auth/logoutButton";
import { LoginButton } from "../auth/loginButton";
import "./navbar.css";
import { Link } from "react-router-dom";
import { LoaderContext } from "../../contexts/loaderContext";
import { Loader } from "../loader";

export function NavBar() {
    const {isLoading, setIsLoading, loaderVisible, loaderInVisible} =
        useContext(LoaderContext);
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
      <a
        target="_blank"
        href="https://github.com/kokkinn/requests-management-system"
        className="nav-title"
      >
        Email management system
      </a>
        <Loader/>
      {/*{isLoading ? <Loader /> : null}*/}
      <div className="nav-buttons">
        <Link to="/" className="nav-button">
          Main page
        </Link>
        {status}
      </div>
    </nav>
  );
}
