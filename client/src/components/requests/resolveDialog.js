export function ResolveDialog({ id, question }) {
  return (
    <dialog id="request-resolve-modal">
      <div id="rrm-content">
        {question}
        <textarea />
        <button>Resolve!</button>
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
