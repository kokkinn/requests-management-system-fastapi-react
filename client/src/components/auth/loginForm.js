import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, userIsLogged, setUserIsLogged } =
    useContext(AuthContext);
  return (
    <form
      id="form-login"
      onSubmit={(ev) => {
        ev.preventDefault();
        fetch("http://127.0.0.1:8000/token", {
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
          if (response.ok) {
            response.json().then((json) => {
              localStorage.setItem("Authorization", json.access_token);
              setToken(json.access_token);
              setUserIsLogged(true);
              console.log(`Logged in with token ${json.access_token}`);
            });
          } else {
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
    </form>
  );
}

// document.querySelector("#form-login").addEventListener("submit", function (ev) {
//   ev.preventDefault();
// });
