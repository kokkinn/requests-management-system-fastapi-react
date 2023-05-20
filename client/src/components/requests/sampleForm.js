import { SERVER_URL } from "../../constants";
import { useContext, useRef, useState } from "react";
import { LoaderContext } from "../../contexts/loaderContext";

export function SampleForm() {
  const { loaderVisible, loaderInVisible } = useContext(LoaderContext);
  const [status, setStatus] = useState(null);
  const loading = useRef(false);
  return (
    <div className="sample-form-wrapper">
      <form
        className="sample-form"
        id="form-submit-request"
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus(" ")
          loaderVisible()
          fetch(`${SERVER_URL}/submit-request`, {
            method: "POST",
            body: JSON.stringify({
              name: ev.target.name.value,
              surname: ev.target.surname.value,
              question: ev.target.question.value,
              email: ev.target.email.value,
            }),
            headers: {
              accept: "application/json",
              "Content-type": "application/json",
            },
          }).then((response) => {
              loaderInVisible()
            if (response.ok) {
              response.json().then((json) => {
                setStatus("A request was submitted successfully");
              });
            } else {
              response.json().then((json) => {
                setStatus(
                  "Something went wrong, I am not sure, check dev tools' console"
                );
              });
            }
          });
        }}
      >
        <input type="text" placeholder="name" name="name" />
        <input type="text" placeholder="surname" name="surname" />
        <input type="text" placeholder="question" name="question" />
        <input type="text" placeholder="email" name="email" />
        <input id="srf-submit" type="submit" value="Submit request" />
      </form>
      <div className="srf-error-msg">{status ? status : " "}</div>
    </div>
  );
}
