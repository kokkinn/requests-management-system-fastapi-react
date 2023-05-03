import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function AuthTestButton() {

  return (
    <>

      <button
        onClick={(ev) => {
          ev.preventDefault();

          fetch("http://127.0.0.1:8000/auth-test", {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          }).then((response) => {
            if (response.ok) {
              response
                .json()
                .then((json) =>
                  console.log(`Current logged user is ${json.email}`)
                );
            } else {
              console.log("No logged user");
            }
          });
        }}
        type="submit"
        id="test-auth"
      >
        Test Auth
      </button>
    </>
  );
}
