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

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.getElementById("logOut-btn").addEventListener("click", logOut)
