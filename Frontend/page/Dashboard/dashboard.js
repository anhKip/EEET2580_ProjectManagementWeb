import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { reLog, logOut, checkProjectAccess } from "../../functions/authentications.js";
import { urlGen } from "../../functions/topNavURL.js";

reLog()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

checkProjectAccess(pId)

// Add spinner
addWrapper();
pageLoader();

// Set href for top-nav anchors
urlGen()

getProjectName();
getUpdates()

document.getElementById("logOut-btn").addEventListener("click", logOut)

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

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
    const fetch_url = `http://localhost:8080/api/project/${pId}`;

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

function getUpdates() {
    const getUpdate_url = "http://localhost:8080/api/update/" + pId;

    fetch(getUpdate_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then(json => {
        renderUpdate(json)
    })
    .catch((e) => {
        console.log(e)
    })
}

function renderUpdate(updates) {
    const current = new Date()

    const format = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    updates.forEach((update) => {
        const d = new Date(update.date);
        const formatted_local_date = d.toLocaleDateString('en-US', format)
        var time_diff_string = ""
        var time_diff = 0

        if ((current - d) <= (60000 * 60)) {
            time_diff = Math.floor((current - d) / 60000)
            time_diff_string = time_diff > 1 ? time_diff + " minutes ago" : time_diff + " minute ago"
        }
        else if (((current - d) > (60000 * 60)) && ((current - d) <= (60000 * 60 * 24))) {
            time_diff = Math.floor((current - d) / (60000 * 60))
            time_diff_string = time_diff > 1 ? time_diff + " hours ago" : time_diff + " hour ago"
        }
        else {
            time_diff = Math.floor((current - d) / (60000 * 60 * 24))
            time_diff_string = time_diff > 1 ? time_diff + " days ago" : time_diff + " day ago"
        }

        const update_box_ul = document.querySelector(".updates-box ul")

        var new_update = document.createElement("li")
        var message_span = document.createElement("span")
        message_span.classList.add("update-text")
        message_span.innerText = update.message

        var date_span = document.createElement("span")
        date_span.classList.add("update-date")
        date_span.innerText = time_diff_string + " | " + formatted_local_date

        new_update.appendChild(message_span)
        new_update.appendChild(date_span)
        update_box_ul.appendChild(new_update)
    })
}


