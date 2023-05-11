import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Loader } from "../loader";
import { SERVER_URL } from "../../constants";
import { LoaderContext } from "../../contexts/loaderContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoading, setIsLoading, loaderVisible, loaderInVisible } =
    useContext(LoaderContext);
  const { setToken, setUserIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <form
      id="form-login"
      onSubmit={(ev) => {
        ev.preventDefault();
        document
          .querySelector(".auth-error-msg")
          .classList.remove("auth-msg-visible");
        // setErrorMsg('')
        loaderVisible();
        setIsLoading(true);
        fetch(`${SERVER_URL}/token`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
        }).then((response) => {
          setIsLoading(false);
          loaderInVisible();
          if (response.ok) {
            response.json().then((json) => {
              localStorage.setItem("Authorization", json.access_token);
              setToken(json.access_token);
              setUserIsLogged(true);
              console.log(`Logged in with token ${json.access_token}`);
              navigate("/");
            });
          } else {
            setErrorMsg("Invalid credentials");
            document
              .querySelector(".auth-error-msg")
              .classList.add("auth-msg-visible");
            console.log("Invalid credentials");
          }
        });
      }}
    >
      <input
        onChange={(ev) => {
          setEmail(ev.target.value);
        }}
        value={email}
        type="email"
        placeholder="your email"
        name="email"
      />
      <input
        onChange={(ev) => {
          setPassword(ev.target.value);
        }}
        value={password}
        type="password"
        placeholder="your password"
        name="password"
      />
      <input
        style={{ cursor: "pointer" }}
        type="submit"
        value="Login"
        id="form-login-submit"
      />
      <div className="auth-error-msg">{errorMsg ? errorMsg : " "}</div>
    </form>
  );
}
