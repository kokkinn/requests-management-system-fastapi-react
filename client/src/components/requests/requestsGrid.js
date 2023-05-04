import { Request } from "./request";
import uuid from "react-uuid";
export function RequestsGrid({ requests, setDialogContent }) {
  return (
    <div className="requests-grid">
      {/* //TODO how to pass all props as object and ** unpack them as  in Python */}
      {requests.map((request) =>
        <Request key={request.id}
          id={request.id}
          question={request.question}
          email={request.email}
          name={request.name}
          surname={request.surname}
          setDialogContent={setDialogContent}
        />
      )}
    </div>
  );
}
