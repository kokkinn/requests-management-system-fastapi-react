import { AuthTestButton } from "./auth/authTestButton";
import { LoggedArea } from "./auth/loggedArea";
import { Request } from "./requests/request";
import { ResolveDialog } from "./requests/resolveDialog";
import {RequestsArea} from "./requests/requestsArea";
import {useContext} from "react";
import {AuthContext} from "../contexts/authContext";

export function MainPage() {
  return (
    <>
      <AuthTestButton />
      {/*<LoggedArea />*/}
        {useContext(AuthContext).userIsLogged ?  <RequestsArea/> : <h3>Please login to view this page</h3>}
    </>
  );
}
