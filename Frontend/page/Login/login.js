import {setIdCookies} from "../../functions/authentications.js";

const login_btn = document.querySelector("#login-btn");

login_btn.addEventListener("click", login)

function login(event) {

    event.preventDefault();

    let url = "http://localhost:8080/api/auth/signin";

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    let inputs = {
        username: username,
        password: password,
    };

    console.log(JSON.stringify(inputs));

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.userId > 0) {
            setIdCookies('userId', json.userId, 1); // 1-hour long cookie
            window.location.assign('../Home/home.html');
            login_btn.removeEventListener("click", login);
            console.log("event removed");
        }
    })
    .catch((e) => {
        console.log(e);
    });
};
