export function Request({
  id,
  email,
  name,
  surname,
  question,
  resolved,
  setDialogContent,
}) {
  console.log("Resolved", resolved);
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
    </div>
  );
}
