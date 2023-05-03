import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function LogoutButton() {
  const { setToken, setUserIsLogged } = useContext(AuthContext);
  return (
    <button
      onClick={() => {
        setToken("null token");
        setUserIsLogged(false);
        localStorage.removeItem("Authorization");
        console.log("User have been logged out");
      }}
      type="submit"
      id="test-auth"
    >
      Logout
    </button>
  );
}
