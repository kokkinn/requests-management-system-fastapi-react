import { createContext, useContext, useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { LoaderContext } from "./loaderContext";

export const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userIsLogged, setUserIsLogged] = useState(null);
  useEffect(() => {
    if (!token) {
      setUserIsLogged(false);
    } else {
      // if any (valid or not) token in storage, check if is valid
      const fetchUser = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch(`${SERVER_URL}/auth-test`, requestOptions);
        if (!response.ok) {
          setUserIsLogged(false);
          setToken(null);
        } else {
          setUserIsLogged(true);
          setToken(token);
        }
      };

      fetchUser().then();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, userIsLogged, setUserIsLogged }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
