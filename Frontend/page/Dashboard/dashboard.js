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

