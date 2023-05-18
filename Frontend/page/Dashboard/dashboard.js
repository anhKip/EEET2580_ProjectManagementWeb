import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

const queryString = window.location.search;
const urlPrarams = new URLSearchParams(queryString);
const pId = urlPrarams.get("pId");

addWrapper();
pageLoader();

$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });
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

document.getElementById("top_nav_bar").innerHTML = `
<div>   
<a class="menu-icon" href="#"><i class="fa-solid fa-bars"></i></a>
    <div class="menu-container">
        <a href="./../Dashboard/dashboard.html?pId=${pId}"><i class="fa-solid fa-house"></i> Dashboard</a>
        <a href="./../TaskList/TaskList.html?pId=${pId}"><i class="fa-regular fa-clipboard"></i> Task</a>
        <a href="./../CalendarView/calendar.html?pId=${pId}"><i class="fa-solid fa-list"></i> View</a>
        <a href="../File/file.html?pId=${pId}"><i class="fa-regular fa-file-lines"></i> File management</a>
        <a href="../Setting/setting.html?pId=${pId}"><i class="fa-solid fa-gear"></i> Settings</a>
    </div>
    <div class="hide-menu">
        <a href="./../Dashboard/dashboard.html?pId=${pId}"><i class="fa-solid fa-house"></i></a>
        <a href="./../TaskList/TaskList.html?pId=${pId}"><i class="fa-regular fa-clipboard"></i></a>
        <a href="./../CalendarView/calendar.html?pId=${pId}"><i class="fa-solid fa-list"></i></a>
        <a href="../File/file.html?pId=${pId}"><i class="fa-regular fa-file-lines"></i></a>
        <a href="../Setting/setting.html?pId=${pId}"><i class="fa-solid fa-gear"></i></a>
    </div>
    <div class="right-icons">
        <a href="../Account/notification.html?pId=${pId}"><i class="fa-regular fa-bell"></i></a>
        <a href="#"><i class="fa-solid fa-rotate" id="refresh"></i></a>
        <a href="../Account/profile.html"><i class="fa-regular fa-user"></i></a>
    </div>
    </div>`;

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

function getProjectName() {
    // var url = window.location.href.split("/").reverse()[0];
    // var id = url.slice(url.indexOf("=") + 1);

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
