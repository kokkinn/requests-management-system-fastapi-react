export function Request({
  id,
  email,
  name,
  surname,
  question,
  setDialogContent,
}) {
  return (
    <div key={id} className="request">
      <ul key={id}>
        <li key={id}>{id}</li>
      <li>{email}</li>
      <li>{name}</li>
      <li>{surname}</li>
      <li>{question}</li>
      </ul>
      <button
        onClick={() => {
          document.querySelector("#request-resolve-modal").showModal();
          setDialogContent({ id, question });
        }}
      >
        Resolve
      </button>
    </div>
  );
}
