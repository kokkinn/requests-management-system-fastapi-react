import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { LogoutButton } from "../../auth/logoutButton";
import { LoginButton } from "../../auth/loginButton";
import "./navbar.css";
import { Link } from "react-router-dom";
import { LoaderContext } from "../../../contexts/loaderContext";
import { Loader } from "../../loader";
import { RefreshContext } from "../../../contexts/refreshContext";
import { SmNav } from "./smNav";

export function NavBar() {
  const { isLoading, setIsLoading, loaderVisible, loaderInVisible } =
    useContext(LoaderContext);

  const { refresh, setRefresh } = useContext(RefreshContext);
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

  const navTitle = (
    <a
      target="_blank"
      href="https://github.com/kokkinn/requests-management-system"
      className="nav-title"
    >
      Email management system
    </a>
  );

  const navButtons = (
    <div className="nav-buttons">
      <Link className="nav-button" to="/sources">Sources</Link>
      <a
        className="nav-button"
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        Refresh
      </a>
      <Link to="/" className="nav-button">
        Main page
      </Link>
      {status}
    </div>
  );

  const screenWidth = window.screen.width;
  return (
    <nav>
      {screenWidth < 672 ? (
        <SmNav navButtons={navButtons}/>
      ) : (
        <div id="nav-bg">
          {navTitle}
          {navButtons}
        </div>
      )}
    </nav>
  );
}
