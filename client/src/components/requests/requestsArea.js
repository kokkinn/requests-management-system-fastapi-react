import { ResolveDialog } from "./resolveDialog";
import { useContext, useEffect, useState } from "react";
import "./requests.css";
import { GetRequestsForm } from "./getRequestsForm";
import { RequestsGrid } from "./requestsGrid";
import { AuthContext } from "../../contexts/authContext";
import { Loader } from "../loader";
import { SERVER_URL } from "../../constants";
import { LoaderContext } from "../../contexts/loaderContext";

export function RequestsArea() {
  const { isLoading, setIsLoading, loaderVisible, loaderInVisible } =
    useContext(LoaderContext);
  const [dialogContent, setDialogContent] = useState({});
  const [queryType, setQueryType] = useState("false"); //TODO set constants
  const [limitInp, setLimitInp] = useState("15");
  const [limitPar, setLimitPar] = useState("15");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    loaderVisible();
    fetch(
      `${SERVER_URL}/get-requests?limit=${limitPar}${
        queryType !== "" ? `&resolved=${queryType}` : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      loaderInVisible();
      if (!response.ok) {
        console.log("Unauthorized");
      } else {
        response.json().then((json) => {
          let req_temp = [];
          for (const i in json.data) {
            req_temp.push(json.data[i]);
          }
          setRequests(req_temp.reverse());
        });
      }
    });
  }, [queryType, limitPar]);
  return (
    <div id="requests-area">
      <GetRequestsForm
        queryType={queryType}
        setQueryType={setQueryType}
        limitInp={limitInp}
        setLimitInp={setLimitInp}
        limitPar={limitPar}
        setLimitPar={setLimitPar}
      />
      {!loading || requests.length > 0 ? (
        <RequestsGrid
          requests={requests}
          setDialogContent={setDialogContent}
          gridState={requests}
          updateGridState={setRequests}
        />
      ) : null}
      <ResolveDialog
        id={dialogContent.id}
        question={dialogContent.question}
        gridState={requests}
        updateGridState={setRequests}
      />
    </div>
  );
}
