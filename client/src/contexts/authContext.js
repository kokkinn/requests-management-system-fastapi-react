import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userIsLogged, setUserIsLogged] = useState(false);
  useEffect(() => {
    if (!token) {
      setUserIsLogged(false);
    } else {
      // if token in storage, check if is valid
      const fetchUser = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch(
          "http://127.0.0.1:8000/auth-test",
          requestOptions
        );

        if (!response.ok) {
          setUserIsLogged(false);
          setToken("invalid token");
        } else {
          setToken(token);
          setUserIsLogged(true);
        }
      };
      fetchUser().then();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, userIsLogged, setUserIsLogged }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
