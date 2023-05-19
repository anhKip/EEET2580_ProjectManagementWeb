import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";
import { reLog, logOut } from "../../functions/authentications.js";

reLog()
// Set href for top-nav anchors
urlGen()

addWrapper()
pageLoader()

document.getElementById("logOut-btn").addEventListener("click", logOut)

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

const queryString = window.location.search;
const urlPrarams = new URLSearchParams(queryString);
const pId = urlPrarams.get("pId");

getContributors();

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
        addContributors();
        location.reload();
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

function getContributors() {
    const url = `http://localhost:8080/api/project/${pId}/members`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((contributors) => {
            const contributorsList = document.querySelector(".contributors");

            // Clear previous list items
            contributorsList.innerHTML = "";

            // Add each contributor to the list
            contributors.forEach((contributor) => {
                const listItem = document.createElement("li");
                listItem.classList.add("contributor");
                listItem.innerHTML = `
                    <h5>${contributor.username}</h5>
                    <button type="button" class="remove-btn">Remove</button>
                `;

                // Append the list item to the contributors list
                contributorsList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error getting contributors", error);
        });
}

function getProjectName() {

    const fetch_url = `http://localhost:8080/api/project/${pId}`;

    console.log(fetch_url);

    fetch(fetch_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((project) => {
            const projectName = document.getElementById("project-name");
            projectName.textContent = project.name;

            const contentContainer = document.querySelector(".content");
            contentContainer.insertBefore(
                projectName,
                contentContainer.firstChild
            );
        })
        .catch((error) => {
            console.error("Error getting project name", error);
        });
}

// Call the getProjectName function
getProjectName();

function addContributors() {
    const fetch_url = `http://localhost:8080/api/project/${pId}/add-member`;
    const name = document.getElementById("user-input").value;

    const member = {
        username: name
    };

    fetch(fetch_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
    })
        .then((response) => response.json())
        .then((contributors) => {
            const contributorsList = document.querySelector(".contributors");

            // Clear previous list items
            contributorsList.innerHTML = "";

            // Add each contributor to the list
            contributors.forEach((contributor) => {
                const listItem = document.createElement("li");
                listItem.classList.add("contributor");
                listItem.innerHTML = `
                <h5>${contributor.username}</h5>
                <button type="button" class="remove-btn"> Remove </button>
                `;

                // Append the list item to the contributors list
                contributorsList.appendChild(listItem);
                getContributors();
            });
        })
        .catch((error) => {
            console.error("Error getting user", error);
        });
}


