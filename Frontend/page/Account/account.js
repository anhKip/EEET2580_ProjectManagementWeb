import { getIdCookie, reLog, logOut } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";

// Check login info
reLog()
//Page spinner
addWrapper()
pageLoader()

// Get and add user info into inputs
getInfo()

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.getElementById("logOut-btn").addEventListener("click", logOut)
const userId = getIdCookie("userId");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

window.addEventListener('load', function() {
    if (pId === null) {
        document.querySelector(".menu-container").style.display = 'none';
        document.querySelector(".menu-icon").style.display = 'none';
        document.querySelector(".hide-menu").style.display = 'none';
        document.querySelector(".content-container").style.padding = '0';
        document.querySelector(".right-icons").classList.add('w-100');
    }
    else {
        const tabs = document.querySelector(".tabs")
        const tabs_a = tabs.querySelectorAll("a")
        tabs_a.forEach(anchor => {
            let buffer = anchor.href
            anchor.setAttribute("href", buffer + "?pId=" + pId)
        })
        urlGen()
    }
})

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
    .then(data => {
        if (data == "User info has been updated") {
            document.querySelector(".confirm-feedback").style.display = 'block';
        }
        else {
            document.querySelector(".confirm-feedback").style.display = 'block';
            document.querySelector(".confirm-feedback").style.color = 'red'
            document.querySelector(".confirm-feedback").innerHTML = "Username is taken"
        }
    })
    .catch((e) => {
        console.log(e)
    })
}
