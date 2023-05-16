import { Request } from "./request";
export function RequestsGrid({
  requests,
  setDialogContent,
  updateGridState,
  gridState,
}) {
  return (
    <>
      {requests.length > 0 ? (
        <div id="requests-grid">
          {requests.map((request) => (
            <Request
              key={request.id}
              id={request.id}
              question={request.question}
              email={request.email}
              name={request.name}
              surname={request.surname}
              resolved={request.resolved}
              date={request.created_date}
              setDialogContent={setDialogContent}
              gridState={gridState}
              updateGridState={updateGridState}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
