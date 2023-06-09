import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { LoaderContext } from "../../contexts/loaderContext";
import { SERVER_URL } from "../../constants.js";

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
        setEmail(email.trim());
        setPassword(password.trim());
        document
          .querySelector(".auth-error-msg")
          .classList.remove("auth-msg-visible");
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
