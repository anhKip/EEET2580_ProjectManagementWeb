import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

addWrapper()
pageLoader()

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

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

// Calculate the highest points
let highestPoints = 0;

const leaderboardMembers = document.querySelectorAll('.lboard_mem');

leaderboardMembers.forEach(member => {
    const points = parseInt(member.querySelector('.points').textContent);
    if (points > highestPoints) {
        highestPoints = points;
    }
});

// Update inner bar width based on the highest points
leaderboardMembers.forEach(member => {
    const points = parseInt(member.querySelector('.points').textContent);
    const percentage = (points / highestPoints) * 100;
    const innerBar = member.querySelector('.inner_bar');
    innerBar.style.width = `${percentage}%`;
});

function getProjectName() {
    var url = window.location.href.split("/").reverse()[0];
    var id = url.slice(url.indexOf("=") + 1);
  
    const fetch_url = `http://localhost:8080/api/project/${id}`;

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
  
        const dashboardContainer = document.querySelector(".dashboard-container");
        dashboardContainer.insertBefore(projectName, dashboardContainer.firstChild);
      })
      .catch((error) => {
        console.error("Error getting project name", error);
      });
  }
  
  // Call the getProjectName function
  getProjectName();
  

