// Import from authentication.js
import { getIdCookie, reLog } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

// add spinner
addWrapper()

// page loader
pageLoader()

// Redirect to login page, comment this out for testing
// reLog()

// Get userID
const userId = getIdCookie('userId')

// Start fetching here



$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".menu-container").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function(event) {
        if(!$('.menu-container').is(event.target) && !$('.menu-icon').is(event.target) && !$("#menu-i").is(event.target)) {
            $('.menu-container').removeClass("open");
        }
    })

    // click event handler for create project card
    $(".project-card-create").click(function (event) {
        // prevent the default click behavior, which is to navigate to a new page
        event.preventDefault();

        // show the gray overlay
        $(".overlay").fadeIn();

        // show the create project box
        $(".create-project-popup").fadeIn();
    });

    // click event handler for close button and overlay
    $(".close-btn, .overlay, .cancel-button").click(function () {
        // hide the gray overlay and create project box
        $(".overlay, .create-project-popup").fadeOut();
    });

    // click event handler for submit button
    $(".submit-button").click(function (event) {
        // prevent the default submit behavior, which is to refresh the page
        event.preventDefault();

        // hide the gray overlay and create project box
        $(".overlay, .create-project-popup").fadeOut();
    });
});

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});
