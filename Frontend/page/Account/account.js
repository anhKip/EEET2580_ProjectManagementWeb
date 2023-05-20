import { getIdCookie, reLog, logOut } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";

reLog()
// Set href for top-nav anchors
addWrapper()
pageLoader()

// Get and add user info into inputs
getInfo()

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.getElementById("logOut-btn").addEventListener("click", logOut)
const userId = getIdCookie("userId");


$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".menu-container, .hide-menu").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function(event) {
        if(!$('.menu-container').is(event.target) && !$('.menu-icon').is(event.target) && !$("#menu-i").is(event.target)) {
            $('.menu-container').removeClass("open");
            $('.hide-menu').removeClass("open");
        }
    })
    
    $("#show-hide-btn").click(function () {
        if ($("#password-input").attr("type") == "password") {
            $("#show-hide-btn").html('<i class="fa-solid fa-eye-slash"></i>');
            $("#password-input").attr("type", "text");
        } else {
            $("#show-hide-btn").html('<i class="fa-solid fa-eye"></i>');
            $("#password-input").attr("type", "password");
        }
    });
});

function getInfo() {
    const get_url = "http://localhost:8080/api/user/" + getIdCookie("userId")

    // console.log(url)

    fetch(get_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("email-input").value = data.email;
        document.getElementById("username-input").value = data.username;
        document.getElementById("description-input").value = data.description;
    })
    .catch((e) => {
        console.log(e);
    })
}

document.getElementById("save-btn").addEventListener("click", saveInfo)

function saveInfo(event) {
    event.preventDefault();

    const change_url = "http://localhost:8080/api/user/" + getIdCookie("userId") + "/update"

    let inputs = {
        "email": document.getElementById("email-input").value,
        "username": document.getElementById("username-input").value,
        "description": document.getElementById("description-input").value
    }
    
    fetch(change_url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
    })
    .then((response) => response.text())
    .then(json => {
        console.log(json);
    })
    .catch((e) => {
        console.log(e)
    })
    document.querySelector(".confirm-feedback").style.display = 'block';

}
