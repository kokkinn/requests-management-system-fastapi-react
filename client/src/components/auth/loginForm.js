import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Loader } from "../loader";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken, setUserIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <form
      id="form-login"
      onSubmit={(ev) => {
        ev.preventDefault();
        setErrorMsg('')
        setLoading(true);
        fetch("http://0.0.0.0:80/api/token", {
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
          setLoading(false);
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
      <input type="submit" value="Login" />
      {loading ? <Loader /> : null}
      {errorMsg}
    </form>
  );
}
