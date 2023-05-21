import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";
import { reLog, logOut, getIdCookie, checkProjectAccess } from "../../functions/authentications.js";

// Check login info
reLog()
// Set href for top-nav anchors
urlGen()
// Page spinner
addWrapper()
pageLoader()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

// Check project access
checkProjectAccess(pId)

document.getElementById("logOut-btn").addEventListener("click", logOut)

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.querySelector(".delete-project-btn").addEventListener("click", deleteProject)
var memberId

getContributors();
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
    document.querySelector(".leave-btn").addEventListener("click", removeMember);
    buttons.forEach((button) => {button.addEventListener("click", removeMember)})

    checkAdmin(memberId)
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

function checkAdmin(id) {
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
        const remove_buttons = document.querySelectorAll(".remove-btn")
        const delete_button = document.querySelector(".delete-project-btn")
        const leave_button = document.querySelector(".leave-btn")

        // If user is not an admin, remove-member and delete-project buttons are disable
        if (data === "false") {
            remove_buttons.forEach((btn) => {
                btn.style.backgroundColor = "grey";
                btn.disabled = true;
                btn.removeEventListener("click", removeMember)
            })

            delete_button.style.backgroundColor = "grey"
            delete_button.disabled = true;
            delete_button.removeEventListener("click", deleteProject)
        }
        // Else if user is an admin, the their leave-project will become a delete-project button
        else {
            leave_button.removeEventListener("click", removeMember)
            leave_button.addEventListener("click", deleteProject)
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
        if (data == "Done") {
            location.assign("../Home/home.html")
        }
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



