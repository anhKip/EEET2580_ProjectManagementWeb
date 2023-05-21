// Import from authentication.js
import { getIdCookie, reLog, logOut } from "../../functions/authentications.js";
import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

// Check login info
reLog();

// add spinner
addWrapper();
pageLoader();

// Get userID
const userId = getIdCookie("userId");

var projectSet = new Set()
var projectArray = []

window.addEventListener("load", fetchProjects);

document.getElementById("logOut-btn").addEventListener("click", logOut)

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

function fetchProjects() {
    const url = `http://localhost:8080/api/user/${userId}/my-projects`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        renderProjectCards(data)
    })
    .catch((error) => {
        console.error("Error fetching projects:", error);
    });
}

function renderProjectCards(projects) {
    const projectGrid = document.querySelector(".project-grid");
    const projectCards = projectGrid.querySelectorAll("a.project-card");

    projectCards.forEach((card) => {
        card.remove()
    })

    projects.forEach((project) => {
        // Add fetched project id to a set
        projectSet.add(project.id)
        const projectName = project.name;

        const projectCard = document.createElement("a");
        projectCard.href = "../Dashboard/dashboard.html?pId=" + project.id;
        projectCard.classList.add("project-card");

        const projectLogoWrapper = document.createElement("div");
        projectLogoWrapper.classList.add("project-logo-wrapper");

        const projectLogo = document.createElement("span");
        projectLogo.classList.add("project-logo");
        projectLogo.innerHTML = '<i class="fa-solid fa-circle-user"></i>';

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = projectName; // Display project name

        projectLogoWrapper.appendChild(projectLogo);
        projectCard.appendChild(projectLogoWrapper);
        projectCard.appendChild(projectTitle);

        projectGrid.appendChild(projectCard);
    });
    
    // Put set into an array
    projectArray = Array.from(projectSet);
    // Store array into the localStorage
    localStorage.setItem('projectList', JSON.stringify(projectArray));
}

function createProject() {
    const url = "http://localhost:8080/api/project/";

    const projectName = document.querySelector("#project-name").value;

    const projectData = {
        name: projectName,
        userId: parseInt(userId),
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data === "Project has been created.") {
                fetchProjects()
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

$(document).ready(function () {
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
        event.preventDefault()

        createProject()

        $("#project-name").val("")
        // hide the gray overlay and create project box
        $(".overlay, .create-project-popup").fadeOut();

    });
});