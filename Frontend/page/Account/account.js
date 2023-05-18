import { getIdCookie, reLog } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

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
    
        // console.log(data);
        console.log(JSON.stringify(data));
        // console.log(typeof JSON.stringify(data));
    
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

    else {
        document.querySelector(".invalid-feedback").style.display = 'block';
    }

    password.value = ""
    password_confirm.value = ""

}

password.addEventListener("change", function() {
    if (!password.checkValidity()) {
        document.querySelector(".invalid-feedback").style.display = "block";
        document.querySelector(".invalid-feedback").innerHTML = "Password must contain at least 8 characters";
      }
      else {
        document.querySelector(".invalid-feedback").style.display = "none";
        document.querySelector(".invalid-feedback").innerHTML = "";
      }
})

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});
