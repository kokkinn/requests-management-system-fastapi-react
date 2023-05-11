import { SERVER_URL } from "../../constants";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function Request({
  id,
  email,
  name,
  surname,
  question,
  resolved,
  setDialogContent,
  updateGridState,
  gridState,
}) {
  const { token } = useContext(AuthContext);
  return (
    <div className="request">

      <ul>
        <li key={id}>{id}</li>
        <li>{email}</li>
        <li>{name}</li>
        <li>{surname}</li>
        <li>{question}</li>
      </ul>
      {!resolved ? (
        <button
          onClick={() => {
            document.querySelector("#request-resolve-modal").showModal();
            setDialogContent({ id, question });
          }}
        >
          Resolve
        </button>
      ) : null}
      <button
        onClick={() => {
          fetch(`${SERVER_URL}/delete-request/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (!response.ok) {
              console.log("Something went wrong");
            } else {
              console.log("Deleted");
              updateGridState(gridState.filter((request) => request.id !== id));
              response.json().then((json) => {
                console.log(json);
              });
            }
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
