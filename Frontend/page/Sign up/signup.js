import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

addWrapper()
pageLoader()

const sign_up_btn = document.getElementById("sign-up-btn");

sign_up_btn.addEventListener("click", signUp)

function signUp(event) {
    event.preventDefault();

    let pass1 = document.getElementById("password");
    let pass2 = document.getElementById("password-confirm");

    if (pass1 != pass2) {
        console.log("Passwords are not alike");
        pass1.value = "";
        pass2.value = "";
    }

    else {
        let url = 'http://localhost:8080/api/auth/signup'
    
        let inputs = {
            email: document.querySelector('#email').value,
            username: document.querySelector("#username").value,
            password: document.querySelector('#password').value
        }
    
        console.log(inputs)
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json.message);
            window.location.assign('../Login/login.html')
            sign_up_btn.removeEventListener("click", signUp)
        })
        .catch(e => {
            console.log(e)
        })
    }
};