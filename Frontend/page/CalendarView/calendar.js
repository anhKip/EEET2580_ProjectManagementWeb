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
            alert(
                "Task Name: " +
                    info.event.title +
                    "\nAssigned To: " +
                    info.event.extendedProps.assignedTo
            );
        },
        eventContent: function (arg) {
            var assignedToHtml = "";
            if (arg.view.type === "listMonth") {
                assignedToHtml =
                    "<div class='assigned-to'>Assigned To: " +
                    arg.event.extendedProps.assignedTo +
                    "</div>";
            }

            return {
                html:
                    "<div class='task-event'>" +
                    "<div class='task-name'>" +
                    arg.event.title +
                    "</div>" +
                    assignedToHtml +
                    "</div>",
            };
        },
        editable: true,
        droppable: true,
        drop: function (info) {
            // Handle dropped events
            console.log("Dropped event:", info.event);
        },
        eventDrop: function (info) {
            // Update the due date of the task
            const taskId = info.event.id;
            const newDueDate = info.event.start;
            updateTaskDueDate(taskId, newDueDate);
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
            assignedTo: "John Doe",
        },
        {
            id: 2,
            name: "Task 2",
            priority: 2,
            dueDate: "2023-05-05",
            assignedTo: "Jane Smith",
        },
        {
            id: 3,
            name: "Task 3",
            priority: 3,
            dueDate: "2023-05-10",
            assignedTo: "David Johnson",
        },
    ];

    return tasks;
}

function convertTaskToEvent(task) {
    let color;
    switch (task.priority) {
        case 1:
            color = "#f8a580";
            break;
        case 2:
            color = "#fad3a5";
            break;
        case 3:
            color = "#46958d";
            break;
        default:
            color = "blue";
    }

    return {
        id: task.id,
        title: task.name,
        start: task.dueDate,
        color: color,
        assignedTo: task.assignedTo,
    };
}

function updateTaskDueDate(taskId, newDueDate) {
    console.log("Task ID:", taskId);
    console.log("New Due Date:", newDueDate);
}
