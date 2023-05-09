$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
    });
    calendar.render();
});

var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: getEventsData(),
});

function getEventsData() {
    // create an array of events based on the due date of the tasks
    var events = [];
    var tasks = [
        {
            name: "Sample Task",
            priority: "High",
            date: new Date(),
            dueDate: new Date("2023-05-10"),
        },
    ];
    tasks.forEach(function (task) {
        events.push({
            title: task.name,
            start: task.dueDate,
            allDay: true,
        });
    });
    return events;
}
