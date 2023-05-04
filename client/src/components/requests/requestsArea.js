import { ResolveDialog } from "./resolveDialog";
import { useContext, useEffect, useState } from "react";
import "./requests.css";
import { GetRequestsForm } from "./getRequestsForm";
import { RequestsGrid } from "./requestsGrid";
import { AuthContext } from "../../contexts/authContext";
import {Loader} from "../loader";

export function RequestsArea() {
  const [dialogContent, setDialogContent] = useState({});
  const [queryType, setQueryType] = useState("false"); //TODO set constants
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/get-requests?resolved=${queryType}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setLoading(false);
      if (!response.ok) {
        console.log("Unauthorized");
      } else {
        response.json().then((json) => {
          let req_temp = [];
          for (const i in json) {
            req_temp.push(json[i]);
          }
          setRequests(req_temp);
        });
      }
    });
  }, [queryType]);
  return (
    <div id="requests-area">
      <GetRequestsForm queryType={queryType} setQueryType={setQueryType} />
      {!loading ? (
        <RequestsGrid requests={requests} setDialogContent={setDialogContent} />
      ) : <Loader/>}
      <ResolveDialog id={dialogContent.id} question={dialogContent.question} />
    </div>
  );
}
