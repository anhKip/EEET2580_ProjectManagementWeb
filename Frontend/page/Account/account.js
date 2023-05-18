import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { getIdCookie, reLog } from "../../functions/authentications.js";

addWrapper()
pageLoader()

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

document.getElementById("save-btn").addEventListener("click", changePassword)

function changePassword(event) {
    event.preventDefault();

    const url = "http://localhost:8080/api/auth/change-password"

    const password = document.querySelector("#password-input").value;

    let data = {
        'id': parseInt(userId),
        'newPassword': password,
    }

    console.log(data);
    console.log(JSON.stringify(data));
    console.log(typeof JSON.stringify(data));

    fetch (url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    })
    .catch((e) => {
        console.log(e)
    })
}

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});
