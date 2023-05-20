import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { reLog, logOut, checkProjectAccess } from "../../functions/authentications.js";
import { urlGen } from "../../functions/topNavURL.js";

reLog();
// Set href for top-nav anchors
urlGen();
addWrapper();
pageLoader();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

checkProjectAccess(pId)

// initialize task array
let tasks = [];

document.getElementById("logOut-btn").addEventListener("click", logOut);

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

$(document).ready(async function () {
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

    var calendarEl = document.getElementById("calendar");
    const data = await fetchTasks();
    const events = data.map((task) => {
        return convertTaskToEvent(task);
    });
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
        navLinks: true,
        eventSources: [
            {
                events: data.map(convertTaskToEvent),
            },
        ],
        eventClick: function (info) {
            alert(
                "Task Name: " +
                    info.event.title +
                    "\nAssigned To: " +
                    info.event.extendedProps.usernames
            );
        },
        eventContent: function (arg) {
            var assignedToHtml = "";
            if (arg.view.type === "listMonth") {
              assignedToHtml =
                "<div class='assigned-to'>Assigned To: " +
                arg.event.extendedProps.usernames +
                "</div>";
            }
      
            var taskNameHtml = "<div class='task-name";
            if (arg.event.extendedProps.status === "COMPLETED") {
              taskNameHtml += " completed-task";
            }
            taskNameHtml += "'>" + arg.event.title + "</div>";
      
            return {
              html:
                "<div class='task-event'>" + taskNameHtml + assignedToHtml + "</div>",
            };
          },
        
        editable: false,
        droppable: false,
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

function convertTaskToEvent(task) {
    let color;
    switch (task.priority) {
        case "HIGH":
            color = "#f8a580";
            break;
        case "MEDIUM":
            color = "#fad3a5";
            break;
        case "LOW":
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
        display: "block",
        extendedProps: {
            usernames: task.usernames || "",
            status: task.status,
        },
    };
}

function updateTaskDueDate(taskId, newDueDate) {
    console.log("Task ID:", taskId);
    console.log("New Due Date:", newDueDate);
}

function fetchTasks() {
    const url = `http://localhost:8080/api/task/pId=${pId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(
                    "Failed to fetch task list. Status: " + response.status
                );
            }
        })
        .then((data) => {
            if (Array.isArray(data)) {
                tasks = data.map((task) => ({
                    id: task.taskId,
                    name: task.name,
                    priority: task.priority,
                    dueDate: task.deadline,
                    details: task.detail,
                    status: task.status,
                    assignedTo: task.assignedTo,
                    usernames: task.username,
                }));
                console.log("Get task", tasks);
                return tasks;
            } else {
                throw new Error(
                    "Invalid response format. Expected an array of tasks."
                );
            }
        })
        .catch((error) => {
            console.error("Error fetching task list:", error);
            throw error;
        });
}

// Initial fetch of tasks
// fetchTasks();