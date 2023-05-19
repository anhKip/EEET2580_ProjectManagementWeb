import { getIdCookie, reLog, logOut } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";

reLog()
// Set href for top-nav anchors
urlGen()
addWrapper()
pageLoader()

reLog()
const userId = getIdCookie("userId");

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.getElementById("logOut-btn").addEventListener("click", logOut)

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
    
    $("#change-password-input-btn").click(function () {
        if ($("#change-password-input").attr("type") == "password") {
            $("#change-password-input-btn").html('<i class="fa-solid fa-eye-slash"></i>');
            $("#change-password-input").attr("type", "text");
        } else {
            $("#change-password-input-btn").html('<i class="fa-solid fa-eye"></i>');
            $("#change-password-input").attr("type", "password");
        }
    });

    $("#confirm-change-password-input-btn").click(function () {
        if ($("#confirm-change-password-input").attr("type") == "password") {
            $("#confirm-change-password-input-btn").html('<i class="fa-solid fa-eye-slash"></i>');
            $("#confirm-change-password-input").attr("type", "text");
        } else {
            $("#confirm-change-password-input-btn").html('<i class="fa-solid fa-eye"></i>');
            $("#confirm-change-password-input").attr("type", "password");
        }
    });
});

const password = document.querySelector("#change-password-input");
const password_confirm = document.querySelector("#confirm-change-password-input");

document.getElementById("save-btn").addEventListener("click", changePassword)

function changePassword(event) {
    event.preventDefault();

    if (password_confirm.value == password.value) {
        const url = "http://localhost:8080/api/auth/change-password"
    
        let data = {
            'id': parseInt(userId),
            'newPassword': password.value,
        }
    
        fetch (url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    else {
        document.querySelector(".feedback").style.display = 'block';
    }

    password.value = ""
    password_confirm.value = ""
}


