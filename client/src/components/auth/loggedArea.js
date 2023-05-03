import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function LoggedArea() {
  const { token, setToken, userIsLogged, setUserIsLogged } = useContext(AuthContext);
  return (
    <div style={{ border: "black solid 1px", padding: "2rem" }}>{token}</div>
  );
}
