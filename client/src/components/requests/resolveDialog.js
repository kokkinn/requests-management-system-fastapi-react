import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { redirect } from "react-router-dom";
import {RESOLVE_DIALOG_TEXT_AREA_SAMPLE, SERVER_URL} from "../../constants";

export function ResolveDialog({ id, question, updateGridState, gridState }) {
  const [answer, setAnswer] = useState(RESOLVE_DIALOG_TEXT_AREA_SAMPLE);
  const authToken = useContext(AuthContext).token;
  return (
    <dialog id="request-resolve-modal">
      <div id="rrm-content">
        {question}
        <textarea
          placeholder="Your reply ..."
          value={answer}
          onChange={(ev) => {
            setAnswer(ev.target.value);
          }}
        />
        <div>
          {" "}
          <button
            id="rdbutton-resolve"
            onClick={() => {
              if (answer === "") {
                if (
                  !window.confirm("Provided reply is empty, send it anyway ?")
                ) {
                  return 0;
                }
              }
              fetch(`${SERVER_URL}/resolve-request`, {
                method: "POST",
                headers: {
                  accept: "application/json",
                  "Content-type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                  request_id: id,
                  message: answer,
                }),
              }).then((resp) =>
                resp.json().then((json) => {
                  setAnswer("");
                  document.querySelector("#request-resolve-modal").close();
                  updateGridState(
                    gridState.filter((request) => request.id !== id)
                  );
                  redirect("/");
                })
              );
            }}
          >
            Resolve!
          </button>
          <button
            id="rdbutton-close"
            onClick={() => {
              document.querySelector("#request-resolve-modal").close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
