document
  .querySelector("#form-create-request")
  .addEventListener("submit", function (ev) {
    ev.preventDefault();

    fetch("http://127.0.0.1:8000/send-email-request", {
      method: "POST",
      body: JSON.stringify({
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        question: this.question.value,
      }),
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .catch((er) => console.log(er))
      .then((response) => response.json())
      .then((json) => console.log(json));
  });






document
  .querySelector("#get-requests")
  .addEventListener("submit", function (ev) {
    ev.preventDefault();

  });

document
  .querySelector("#form-resolve-request")
  .addEventListener("submit", function (ev) {
    ev.preventDefault();
    const authToken = localStorage.getItem("Authorization")
      ? `Bearer ${localStorage.getItem("Authorization")}`
      : null;
    fetch(`http://127.0.0.1:8000/resolve_request`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        request_id: this.id.value,
        message: this.message.value,
      }),
    }).then((resp) => resp.json().then((json) => console.log(json)));
  });
