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

    // Pop-up form for changing project name
    $("#change").click(function (event) {
        event.preventDefault();

        $(".overlay").fadeIn();

        $(".name-change-form").fadeIn();

        $("#name-input").val($("#project-name").text().trim());
    });

    $("#cancel-change-button").click(function () {
        $(".overlay, .name-change-form").fadeOut();
    });

    $("#confirm-button").click(function (event) {
        event.preventDefault();

        $(".overlay, .name-change-form").fadeOut();
    });

    // Pop-up form for add contributors
    $("#add-contributor").click(function (event) {
        event.preventDefault();

        $(".overlay").fadeIn();

        $(".add-form").fadeIn();
    });

    $("#cancel-button").click(function () {
        $(".overlay, .add-form").fadeOut();
    });

    $("#confirm-button").click(function (event) {
        event.preventDefault();

        $(".overlay, .add-form").fadeOut();
    });

    // Add leave button for user account
    $(".you").append(
        '<button type="button" class="remove-btn"> Leave </button>'
    );

    // Add remove button for each contributors
    $(".contributor").append(
        '<button type="button" class="remove-btn"> Remove </button>'
    );

    $(".remove-btn").click(function (event) {
        event.preventDefault();

        // Remove user from db
    });
});

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});
