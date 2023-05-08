import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import {redirect} from "react-router-dom";

export function ResolveDialog({ id, question, updateGridState, gridState }) {
  const [answer, setAnswer] = useState("");
  const authToken = useContext(AuthContext).token;
  return (
    <dialog id="request-resolve-modal">
      <div id="rrm-content">
        {question}
        <textarea
          value={answer}
          onChange={(ev) => {
            setAnswer(ev.target.value);
          }}
        />
        <button
          onClick={() => {
            fetch(`http://0.0.0.0:80/api/resolve_request`, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-type": "application/json",
                Authorization: authToken,
              },
              body: JSON.stringify({
                request_id: id,
                message: answer,
              }),
            }).then((resp) =>
              resp.json().then((json) => {
                document.querySelector("#request-resolve-modal").close();
                console.log(json);
                  updateGridState(gridState.filter((request) => request.id !== id))
                redirect('/')
              })
            );
          }}
        >
          Resolve!
        </button>
        <button
          onClick={() => {
            document.querySelector("#request-resolve-modal").close();
          }}
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
