document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault()

    fetch("http://127.0.0.1:8000/send-email-request", {
        method: "POST",
        body: JSON.stringify({
            name: this.name.value,
            surname: this.surname.value,
            email: this.email.value,
            question: this.question.value
        }),
        headers: {
            "accept": "application/json",
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
})
//
// fetch("https://jsonplaceholder.typicode.com/todos", {
//     method: "POST",
//     body: JSON.stringify({
//         userId: 1,
//         title: "Fix my bugs",
//         completed: false
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));