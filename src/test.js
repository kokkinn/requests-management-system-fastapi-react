// document.querySelector('form').addEventListener('submit', function (ev) {
//     ev.preventDefault()
//
//     fetch("http://127.0.0.1:8000/send-email-request", {
//         method: "POST",
//         body: JSON.stringify({
//             name: this.name.value,
//             surname: this.surname.value,
//             email: this.email.value,
//             question: this.question.value
//         }),
//         headers: {
//             "accept": "application/json",
//             "Content-type": "application/json"
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json));
// })


document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault()

    fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        body: JSON.stringify({
            email: this.email.value,
            password: this.password.value
        }),
        headers: {
            "accept": "application/json",
            "Content-type": "application/json"
        }
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    localStorage.setItem('Authorization', json.access_token);
                    console.log(`Logged in with token ${json.access_token}`)
                })
            } else {
                console.log('Invalid credentials')
            }
        })

})

document.querySelector('#test-auth').addEventListener('click', function (ev) {
    ev.preventDefault()

    fetch("http://127.0.0.1:8000/auth-test", {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }

    })
        .then((response) => {
            if (response.ok) {
                response.json().then((json) => console.log(`Current logged user is ${json.email}`));
            }
            else{
                console.log('No logged user')
            }

        })

})

document.querySelector('#logout').addEventListener('click', function (ev) {
    localStorage.removeItem('Authorization')
    console.log('User have been logged out')
})