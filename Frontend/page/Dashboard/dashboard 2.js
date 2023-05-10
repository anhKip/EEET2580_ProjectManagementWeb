$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });
});

$(document).ready(function(){
    $(".button-leaderboard").click(function(){
        $(".leaderboard-box").toggle();
        $(".updates-box").hide();
    });
    $(".button-updates").click(function(){
        $(".updates-box").toggle();
        $(".leaderboard-box").hide();
    });
});