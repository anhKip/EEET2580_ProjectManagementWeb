import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { reLog, logOut } from "../../functions/authentications.js";
import { urlGen } from "../../functions/topNavURL.js";

reLog();
// Add spinner
addWrapper();
pageLoader();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

// Set href for top-nav anchors
urlGen();

getProjectName();
getUpdates();

document.getElementById("logOut-btn").addEventListener("click", logOut);

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function (event) {
        if (
            !$(".menu-container").is(event.target) &&
            !$(".menu-icon").is(event.target) &&
            !$("#menu-i").is(event.target)
        ) {
            $(".menu-container").removeClass("open");
            $(".hide-menu").removeClass("open");
        }
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
        },
    })
        .then((response) => response.json())
        .then((json) => {
            renderUpdate(json);
        })
        .catch((e) => {
            console.log(e);
        });
}

function renderUpdate(updates) {
    const current = new Date();

    const format = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    updates.forEach((update) => {
        const d = new Date(update.date);
        const formatted_local_date = d.toLocaleDateString("en-US", format);
        var time_diff_string = "";
        var time_diff = 0;

        if (current - d <= 60000 * 60) {
            time_diff = Math.floor((current - d) / 60000);
            time_diff_string =
                time_diff > 1
                    ? time_diff + " minutes ago"
                    : time_diff + " minute ago";
        } else if (current - d > 60000 * 60 && current - d <= 60000 * 60 * 24) {
            time_diff = Math.floor((current - d) / (60000 * 60));
            time_diff_string =
                time_diff > 1
                    ? time_diff + " hours ago"
                    : time_diff + " hour ago";
        } else {
            time_diff = Math.floor((current - d) / (60000 * 60 * 24));
            time_diff_string =
                time_diff > 1
                    ? time_diff + " days ago"
                    : time_diff + " day ago";
        }

        const update_box_ul = document.querySelector(".updates-box ul");

        var new_update = document.createElement("li");
        var message_span = document.createElement("span");
        message_span.classList.add("update-text");
        message_span.innerText = update.message;

        var date_span = document.createElement("span");
        date_span.classList.add("update-date");
        date_span.innerText = time_diff_string + " | " + formatted_local_date;

        new_update.appendChild(message_span);
        new_update.appendChild(date_span);
        update_box_ul.appendChild(new_update);
    });
}

// initialize member array
let members = [];
// Calculate the highest points
let highestScore = 0;

function getMembers() {
    const url = `http://localhost:8080/api/project/${pId}/members`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                members = data.map((member) => ({
                    username: member.username,
                    score: member.score,
                }));
                console.log("Get member", members);
                updateLeaderboard(members);
}})
        .catch((error) => {
            console.error("Error getting contributors", error);
        });
}

getMembers();

function updateLeaderboard(members) {
    const membersList = document.querySelector(".leaderboard-box");
    // Clear previous list items
    membersList.innerHTML = `<h4>Top 5 Contributors</h4>`;
  
    // Sort members in descending order based on scores
    members.sort((a, b) => b.score - a.score);
  
    // Calculate the highest score
    let highestScore = 0;
    members.forEach((member) => {
      const score = member.score;
      if (score > highestScore) {
        highestScore = score;
      }
    });
  
    // Limit the number of members to top 5
    const topMembers = members.slice(0, 5);
  
    // Add each contributor to the list
    topMembers.forEach((member, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("lboard_mem");
  
      // Calculate the width of the inner bar
      const score = member.score;
      const percentage = (score / highestScore) * 100;
      const innerBarWidth = score === highestScore ? "100%" : `${percentage}%`;
  
      listItem.innerHTML = `
        <div class="img">
          <img src="./../../static/profile.png" alt="picture_1" />
        </div>
        <div class="name_bar">
          <p>${member.username}</p>
          <div class="bar_wrap">
            <div class="inner_bar" style="width: ${innerBarWidth}"></div>
          </div>
        </div>
        <div class="points">${member.score} points</div>
      `;
  
      // Append the list item to the contributors list
      membersList.appendChild(listItem);
    });
  }
  
