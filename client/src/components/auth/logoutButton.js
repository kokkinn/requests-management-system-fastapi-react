import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function LogoutButton() {
  const { setToken, setUserIsLogged } = useContext(AuthContext);
  return (
    <a className="nav-button"
      onClick={() => {
        setToken(null);
        // setUserIsLogged(false);
        localStorage.removeItem("Authorization");
      }}
      type="submit"
      id="test-auth"
    >
      Logout
    </a>
  );
}
