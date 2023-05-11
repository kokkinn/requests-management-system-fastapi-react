import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import {redirect} from "react-router-dom";
import {SERVER_URL} from "../../constants";

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
                document.querySelector("#request-resolve-modal").close();
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
