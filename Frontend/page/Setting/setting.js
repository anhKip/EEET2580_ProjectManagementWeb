import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";
import { reLog, logOut, getIdCookie } from "../../functions/authentications.js";

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
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

var memberId

getContributors();

// Call the getProjectName function
getProjectName();

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
        event.preventDefault()
        addContributors();
        $(".overlay, .add-form").fadeOut();
    });
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
        renderContributors(contributors)
    })
    .catch((error) => {
        console.error("Error getting contributors", error);
    });
}

function renderContributors(cons) {
    const contributorsList = document.querySelector(".contributors");

    // Clear previous list items
    contributorsList.innerHTML = "";

    // Add each contributor to the list
    cons.forEach((contributor) => {
        const listItem = document.createElement("li");
        listItem.classList.add("contributor");
        listItem.innerHTML = contributor.userId == getIdCookie('userId') ?
        `<h5>${contributor.username}</h5> <button type="button" id="remove-${contributor.memberId}" class="leave-btn"> Leave </button>` :
        `<h5>${contributor.username}</h5> <button type="button" id="remove-${contributor.memberId}" class="remove-btn"> Remove </button>`
        if (contributor.userId == getIdCookie('userId')) { memberId = contributor.memberId }

        // Append the list item to the contributors list
        contributorsList.appendChild(listItem);
    });

    const buttons = document.querySelectorAll(".remove-btn");
    const leaveButton = document.querySelector(".leave-btn").addEventListener("click", removeMember);
    buttons.forEach((button) => {button.addEventListener("click", removeMember)})

    checkRank(memberId)
}

function getProjectName() {

    const fetch_url = `http://localhost:8080/api/project/${pId}`;

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
    .then((response) => response.text())
    .then((contributors) => {
        if (contributors === "Member has been added") {
            getContributors();
        }
    })
    .catch((error) => {
        console.error("Error getting user", error);
    });
}

function checkRank(id) {
    const fetch_url = "http://localhost:8080/api/member/" + id + "/isAdmin";

    fetch(fetch_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.text())
    .then((data) => {
        // console.log(typeof data);
        if (data === "false") {
            const disable_remove_button = document.querySelectorAll(".remove-btn")
            const disable_delete_button = document.querySelector(".delete-project-btn")

            disable_remove_button.forEach((btn) => {
                btn.style.backgroundColor = "grey";
                btn.removeEventListener("click", removeMember)
            })

            disable_delete_button.style.backgroundColor = "grey"
            disable_delete_button.removeEventListener("click", removeMember)
        }
    })
    .catch((e) => {
        console.log(e)
    })
}

function deleteProject() {
    const fetch_url = "http://localhost:8080/api/project/" + pId

    fetch(fetch_url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.text())
    .then((data) => {
        
    })
}

function removeMember(event) {
    const id = event.target.id.split("-")[1]

    const fetch_url = "http://localhost:8080/api/project/" + pId + "/remove-member/" + id

    fetch(fetch_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.text())
    .then((data) => {
        if (data == "Member has been removed" && memberId == id) {
            location.assign("../Home/home.html")
        }
        else {
            location.reload()
        }
    })
    .catch((e) => {
        console.log(e)
    })
}



