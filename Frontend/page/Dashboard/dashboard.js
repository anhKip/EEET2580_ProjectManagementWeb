import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { reLog } from "../../functions/authentications.js";
import { urlGen } from "../../functions/topNavURL.js";

// Add spinner
addWrapper();
pageLoader();

// Redirect to login page, comment this out for testing
// reLog()

// Set href for top-nav anchors
urlGen()

$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function(event) {
        if(!$('.menu-container').is(event.target) && !$('.menu-icon').is(event.target) && !$("#menu-i").is(event.target)) {
            $('.menu-container').removeClass("open");
            $('.hide-menu').removeClass("open");
        }
    })
});

$(document).ready(function () {
    $(".updates-box").hide();
    $(".button-leaderboard").click(function () {
        $(".leaderboard-box").toggle();
        $(".updates-box").hide();
    });
    $(".button-updates").click(function () {
        $(".updates-box").toggle();
        $(".leaderboard-box").hide();
    });
});

document.getElementById("refresh").addEventListener("click", function () {
    location.reload();
});

// Calculate the highest points
let highestPoints = 0;

const leaderboardMembers = document.querySelectorAll(".lboard_mem");

leaderboardMembers.forEach((member) => {
    const points = parseInt(member.querySelector(".points").textContent);
    if (points > highestPoints) {
        highestPoints = points;
    }
});

// Update inner bar width based on the highest points
leaderboardMembers.forEach((member) => {
    const points = parseInt(member.querySelector(".points").textContent);
    const percentage = (points / highestPoints) * 100;
    const innerBar = member.querySelector(".inner_bar");
    innerBar.style.width = `${percentage}%`;
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

function getProjectName() {
    const fetch_url = `http://localhost:8080/api/project/${pId}`;

    // console.log(fetch_url);

    fetch(fetch_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((project) => {
            const projectName = document.createElement("h3");
            projectName.textContent = project.name;

            const dashboardContainer = document.querySelector(
                ".dashboard-container"
            );
            dashboardContainer.insertBefore(
                projectName,
                dashboardContainer.firstChild
            );
        })
        .catch((error) => {
            console.error("Error getting project name", error);
        });
}

// Call the getProjectName function
getProjectName();
