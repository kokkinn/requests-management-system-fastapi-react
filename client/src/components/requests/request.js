import { SERVER_URL } from "../../constants";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function Request({
  id,
  email,
  name,
  surname,
  question,
  date,
  resolved,
  setDialogContent,
  updateGridState,
  gridState,
}) {
  const { token } = useContext(AuthContext);
  return (
    <div className="request">
      <ul>
        <li>
          <span className="request-field-label">Email: </span>
          {email}
        </li>
        <li>
          <span className="request-field-label">Name: </span>
          {name}
        </li>
        <li>
          <span className="request-field-label">Surname: </span>
          {surname}
        </li>
        <li>
          <span className="request-field-label">Question: </span>
          {question ? question : "No question here"}
        </li>
        <li>
          <span className="request-field-label">Date: </span>{" "}
          {date.slice(0, 10) + " " + date.slice(12, 19)}
        </li>
      </ul>
      <div className="request-buttons-container">
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
              } else {
                console.log("Deleted");
                updateGridState(
                  gridState.filter((request) => request.id !== id)
                );
                response.json().then((json) => {
                });
              }
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
