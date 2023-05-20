import { RequestsArea } from "../requests/requestsArea";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

export function MainPage() {
  return (
    <>
      {useContext(AuthContext).userIsLogged ? (
        <RequestsArea />
      ) : (
        <Link to="/login" className="please-login">
          Please login to view this page
        </Link>
      )}
    </>
  );
}
