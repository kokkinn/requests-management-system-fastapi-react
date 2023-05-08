import { RequestsArea } from "./requests/requestsArea";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function MainPage() {
  return (
    <>
      {useContext(AuthContext).userIsLogged ? (
        <RequestsArea />
      ) : (
        <h3>Please login to view this page</h3>
      )}
    </>
  );
}
