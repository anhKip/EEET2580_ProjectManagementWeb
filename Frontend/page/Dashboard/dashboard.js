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
