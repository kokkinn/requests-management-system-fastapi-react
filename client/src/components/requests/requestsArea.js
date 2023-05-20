import { ResolveDialog } from "./resolveDialog";
import { useContext, useEffect, useRef, useState } from "react";
import "./requests.css";
import { GetRequestsForm } from "./getRequestsForm";
import { RequestsGrid } from "./requestsGrid";
import { AuthContext } from "../../contexts/authContext";
import { DATE_SORT_TYPES, SERVER_URL } from "../../constants";
import { LoaderContext } from "../../contexts/loaderContext";
import { RefreshContext } from "../../contexts/refreshContext";
import {Link} from "react-router-dom";

export function RequestsArea() {
  const { isLoading, setIsLoading, loaderVisible, loaderInVisible } =
    useContext(LoaderContext);
  const [dialogContent, setDialogContent] = useState({});
  const [queryType, setQueryType] = useState("false");
  const [dateSort, setDateSort] = useState(DATE_SORT_TYPES.nto);
  const [limitInp, setLimitInp] = useState("15");
  const [limitPar, setLimitPar] = useState("15");
  const [requests, setRequests] = useState([]);
  const loadingRef = useRef(true);
  const { token } = useContext(AuthContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  useEffect(() => {
    loaderVisible();
    fetch(
      `${SERVER_URL}/get-requests?limit=${limitPar}${
        queryType !== "" ? `&resolved=${queryType}` : ""
      }&date_sort=${dateSort}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      loaderInVisible();
      loadingRef.current = false;
      if (!response.ok) {
      } else {
        response.json().then((json) => {
          let req_temp = [];
          for (const i in json.data) {
            req_temp.push(json.data[i]);
          }
          setRequests(req_temp);
        });
      }
    });
    const MINUTE_MS = 60000;
    const interval = setInterval(() => {
      setRefresh(!refresh);
    }, MINUTE_MS);

    return () => {
      clearInterval(interval);
    };
  }, [queryType, limitPar, refresh, dateSort]);

  return (
    <div id="requests-area">
      <GetRequestsForm
        queryType={queryType}
        setQueryType={setQueryType}
        limitInp={limitInp}
        setLimitInp={setLimitInp}
        limitPar={limitPar}
        setLimitPar={setLimitPar}
        dateSort={dateSort}
        setDateSort={setDateSort}
      />
      {!loadingRef.current ? (
        <>
          {requests.length > 0 ? (
            <RequestsGrid
              requests={requests}
              setDialogContent={setDialogContent}
              gridState={requests}
              updateGridState={setRequests}
            />
          ) : (
            <>
              <h1 className="no-requests">No requests for this query.</h1>
            </>
          )}
        </>
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
