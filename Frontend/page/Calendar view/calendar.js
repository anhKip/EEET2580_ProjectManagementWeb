$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });

    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
        navLinks: true,
        events: getTasksData().map(convertTaskToEvent),
        eventClick: function (info) {
            alert("Task Name: " + info.event.title);
        },
        eventRender: function (info) {
            info.el.style.color = "black";
        },
    });

    calendar.render();
});

function getTasksData() {
    const tasks = [
        {
            id: 1,
            name: "Task 1",
            priority: 1,
            dueDate: "2023-05-01",
        },
        {
            id: 2,
            name: "Task 2",
            priority: 2,
            dueDate: "2023-05-05",
        },
        {
            id: 3,
            name: "Task 3",
            priority: 3,
            dueDate: "2023-05-10",
        },
    ];

    return tasks;
}

function convertTaskToEvent(task) {
    let color;
    switch (task.priority) {
        case 1:
            color = "red";
            break;
        case 2:
            color = "#FFEB99";
            break;
        case 3:
            color = "green";
            break;
        default:
            color = "blue";
    }

    return {
        id: task.id,
        title: task.name,
        start: task.dueDate,
        color: color,
    };
}
