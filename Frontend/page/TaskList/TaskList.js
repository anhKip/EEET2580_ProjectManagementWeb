import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { getIdCookie } from "../../functions/authentications.js";
import { urlGen } from "../../functions/topNavURL.js";
import { reLog, logOut } from "../../functions/authentications.js";

reLog();

addWrapper();
pageLoader();

urlGen();
// Get userID
const userId = getIdCookie("userId");

document.getElementById("logOut-btn").addEventListener("click", logOut);

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

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
document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

// initialize task array
let tasks = [];
// initialize member array
let members = [];

// function to sort tasks
function sortTasks(sortBy) {
    if (sortBy === "dueDate") {
        // sort by due date
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "name") {
        // sort by name
        tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "priority") {
        // sort by priority
        tasks.sort((a, b) => {
            const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    // Update the task list after sorting
    updateTaskList(tasks);
}

// add event listener to the sort dropdown menu
const sortDropdown = document.querySelector("#dropdownMenuButton");
sortDropdown.addEventListener("click", (event) => {
    const sortBy = event.target.getAttribute("data-sort");
    console.log(sortBy);
    sortTasks(sortBy);
});

// function to format due date
function formatDueDate(dueDate) {
    const dateObj = new Date(dueDate); // Parse the dueDate string into a Date object
    const options = {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    return formattedDate;
}

// add event listener to add task button
document.querySelector("#addTaskBtn").addEventListener("click", addTask);

$(document).ready(function () {
    // click event handler for create project card
    $(".add-task-btn").click(function (event) {
        // prevent the default click behavior, which is to navigate to a new page
        event.preventDefault();

        // show the gray overlay
        $(".overlay").fadeIn();

        // show the create project box
        $(".add-task-popup").fadeIn();
    });

    // click event handler for close button and overlay
    $("#cancelBtn").click(function () {
        // hide the gray overlay and create project box
        $(".overlay, .add-task-popup").fadeOut();
    });
});

function openEditPopup(task, taskId) {
    console.log("openedit task ID: ", task.dueDate);

    // Get edit popup elements
    const editPopup = document.querySelector(".edit-task-popup");
    const taskNameInput = document.querySelector("#editTaskNameInput");
    const prioritySelect = document.querySelector("#editPrioritySelect");
    const dueDateInput = document.querySelector("#editDueDateInput");
    const taskDetailsInput = document.querySelector("#editTaskDetailsInput");
    const deleteTaskBtn = document.querySelector("#deleteTaskBtn");
    // get edit popup elements
    const updateBtn = document.querySelector("#editTaskSubmitBtn");
    const cancelBtn = document.querySelector("#cancelEditBtn");
    // Fill in input fields with task information
    taskNameInput.value = task.name;
    prioritySelect.value = task.priority;
    taskDetailsInput.value = task.details;
    dueDateInput.value = task.dueDate;

    // Store task object and index as properties of the editPopup element
    editPopup.taskObj = task;
    editPopup.taskId = taskId;
    console.log("editPopup", editPopup.taskObj);

    // Show edit popup and overlay
    editPopup.style.display = "block";
    document.querySelector(".overlay").style.display = "block";

    // Add event listener to delete button
    deleteTaskBtn.addEventListener("click", () => {
        // Call the deleteTask function to remove the task
        deleteTask(taskId);
        // Close the edit popup
        closeEditPopup();
    });

    cancelBtn.addEventListener("click", () => {
        // close edit popup
        closeEditPopup();
    });

    updateBtn.addEventListener("click", () => {
        // Create a new Date object for today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

        // Create a new Date object to validate the edited due date
        const editedDueDateObj = new Date(dueDateInput.value);

        // Check if the edited due date is valid and not before today
        if (isNaN(editedDueDateObj) || editedDueDateObj < today) {
            window.alert("Invalid due date!");
            return; // Exit the function if the edited due date is invalid
        }

        updateTask(
            taskId,
            taskNameInput.value,
            prioritySelect.value,
            dueDateInput.value,
            taskDetailsInput.value
        );

        // close edit popup
        closeEditPopup();
    });
}

function deleteTask(taskId) {
    const url = `http://localhost:8080/api/task/${taskId}`;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                console.log("Delete successfull");
                // Remove the task from the tasks array
                tasks.splice(taskId, 1);
                location.reload();
            }
        })
        .catch((error) => {
            console.error("Error creating task:", error);
        });
}

function closeEditPopup() {
    // get edit popup elements
    const editPopup = document.querySelector(".edit-task-popup");

    // hide edit popup
    editPopup.style.display = "none";

    // clear input fields
    document.querySelector("#editTaskNameInput").value = "";
    document.querySelector("#editPrioritySelect").value = "";
    document.querySelector("#editDueDateInput").value = "";

    // hide gray overlay
    document.querySelector(".overlay").style.display = "none";
}

function updateTask(taskId, taskName, priority, dueDate, details) {
    const url = `http://localhost:8080/api/task/${taskId}`;

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: taskName,
            priority: priority,
            deadline: dueDate,
            detail: details,
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Edit successfull");
                location.reload();
            }
        })
        .catch((error) => {
            console.error("Error creating task:", error);
        });

    // close edit popup
    closeEditPopup();
}

function openTaskDetails(task) {
    // Get task details popup elements
    const taskDetailsPopup = document.querySelector(".task-details-popup");
    const detailsTaskName = document.querySelector("#detailsTaskName");
    const detailsTaskPriority = document.querySelector("#detailsTaskPriority");
    const detailsTaskDetails = document.querySelector("#detailsTaskDetails");
    const detailsTaskDueDate = document.querySelector("#detailsTaskDueDate");
    const closeDetailsBtn = document.querySelector("#closeDetailsBtn");

    // Populate task details in the popup
    detailsTaskName.textContent = task.name;
    detailsTaskPriority.textContent = task.priority;
    detailsTaskDetails.textContent = task.details;
    detailsTaskDueDate.textContent = formatDueDate(task.dueDate);

    // Show task details popup and overlay
    taskDetailsPopup.style.display = "block";
    document.querySelector(".overlay").style.display = "block";

    // Add event listener to close button
    closeDetailsBtn.addEventListener("click", () => {
        // Hide task details popup and overlay
        taskDetailsPopup.style.display = "none";
        document.querySelector(".overlay").style.display = "none";
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////

function addTask() {
    const fetch_url = `http://localhost:8080/api/task/${pId}`;
    const taskName = document.querySelector("#taskNameInput").value;
    const priority = document.querySelector("#prioritySelect").value;
    const dueDate = document.querySelector("#dueDateInput").value;
    const taskDetails = document.querySelector("#taskDetailsInput").value;

    if (taskName === null || taskName === "") {
        window.alert("Empty task name is not allowed!");
        return;
    }

    // Create a new Date object for today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

    // Create a new Date object to validate the due date
    const dueDateObj = new Date(dueDate);

    console.log("Due date: ", dueDateObj);

    // Check if the due date is valid and not before today
    if (isNaN(dueDateObj) || dueDateObj < today) {
        window.alert("Invalid due date!");
        return; // Exit the function if the due date is invalid
    }

    const task = {
        name: taskName,
        priority: priority,
        detail: taskDetails,
        deadline: dueDate,
    };

    fetch(fetch_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Task created successfully!");
                // Clear input fields
                document.querySelector("#taskNameInput").value = "";
                document.querySelector("#dueDateInput").value = "";
                document.querySelector("#taskDetailsInput").value = "";
                fetchTasks();
            } else {
                response.json().then((data) => {
                    console.error(
                        "Failed to create task. Status:",
                        response.status
                    );
                    console.log("Response body:", data);
                });
            }
        })
        .catch((error) => {
            console.error("Error creating task:", error);
        });
}

function fetchTasks() {
    const url = `http://localhost:8080/api/task/pId=${pId}`;

    fetch(url, {
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
                    taskId: task.taskId,
                    name: task.name,
                    priority: task.priority,
                    dueDate: task.deadline,
                    details: task.detail,
                    status: task.status,
                    assignedTo: task.assignedTo,
                    username: task.username,
                }));
                console.log("Get task", tasks);
                updateTaskList(tasks);
                updateOnGoingTaskList(tasks);
                updateCompletedTaskList(tasks);
            } else {
                throw new Error(
                    "Invalid response format. Expected an array of tasks."
                );
            }
        })
        .catch((error) => {
            console.error("Error fetching task list:", error);
        });
}

// Initial fetch of tasks
fetchTasks();

function updateTaskList(tasks) {
    // Get task list element
    const taskList = document.querySelector("#taskList");

    // Clear task list
    taskList.innerHTML = "";

    // Add each task to the list
    tasks.forEach((task, index) => {
        if (task.status === "TODO") {
            // Create task list item
            console.log(task.dueDate);
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item");
            taskItem.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h6 class="mb-1">${task.name}</h6>
                    <small>Priority: ${task.priority}</small>
                </div>
                <div class="mx-auto">
                    <small>Due Date: ${formatDueDate(task.dueDate)}</small>
                </div>
                <div class="btn-container">
                    <button id=${
                        task.taskId
                    } type="button" class="btn btn-success take-task-btn" data-task-index="${index}">Take Task</button>
                </div>
                <div class="d-flex justify-content-end">
                    <a href="#" class="edit-task">
                        <div class="edit-task-icon"><i id="edit-${
                            task.taskId
                        }" class="fa-regular fa-pen-to-square"></i></div>
                    </a>
                </div>
            </div>
        `;

            // Get edit icon element
            const editIcon = taskItem.querySelector(`#edit-${task.taskId}`);

            // Add event listener to edit icon
            editIcon.addEventListener("click", (event) => {
                let taskId = event.target.id.split("-")[1];
                console.log("Task ID: ", taskId);
                event.stopPropagation();
                openEditPopup(task, taskId);
            });

            // Add event listener to open task details
            taskItem.addEventListener("click", (event) => {
                const clickedElement = event.target;
                const takeTaskBtn = taskItem.querySelector(".take-task-btn");
                const completeTaskBtn =
                    taskItem.querySelector(".complete-task-btn");

                // Check if the clicked element is not "Take Task" or "Complete Task" button
                if (clickedElement !== takeTaskBtn) {
                    openTaskDetails(task);
                }
            });

            // Add task item to task list
            taskList.appendChild(taskItem);
        }
    });

    // Attach click event listeners to take task buttons
    const takeTaskBtns = document.querySelectorAll(".take-task-btn");
    takeTaskBtns.forEach((btn) => {
        btn.addEventListener("click", takeTask);
    });
}

function updateOnGoingTaskList(tasks) {
    // Get on-going task list element
    const onGoingTaskList = document.querySelector("#onGoingTaskList");

    // Clear task list
    onGoingTaskList.innerHTML = "";

    // Add each task to the list
    tasks.forEach((task, index) => {
        if (task.status === "ONGOING") {
            // Create task list item
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item");
            taskItem.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h6 class="mb-1">${task.name}</h6>
                <small>Priority: ${task.priority}</small>
            </div>
            <div class="mx-auto">
                <small>Due Date: ${formatDueDate(task.dueDate)}</small>
            </div>
            <div class="btn-container">
                <button id=${
                    task.taskId
                } type="button" class="btn btn-success complete-task-btn" data-task-index="${index}">Complete Task</button>
            </div>    
            <div class="d-flex justify-content-end">
                <small class="me-3">Assigned to: ${task.username}</small>
            </div>
        </div>
      `;

            // Add event listener to open task details
            taskItem.addEventListener("click", (event) => {
                const clickedElement = event.target;
                const completeTaskBtn =
                    taskItem.querySelector(".complete-task-btn");

                // Check if the clicked element is not "Complete Task" button
                if (clickedElement !== completeTaskBtn) {
                    openTaskDetails(task);
                }
            });

            // Add task item to on-going task list
            onGoingTaskList.appendChild(taskItem);
        }
    });

    // Attach click event listeners to complete task buttons
    const completeTaskBtns = document.querySelectorAll(".complete-task-btn");
    completeTaskBtns.forEach((btn) => {
        btn.addEventListener("click", completeTask);
    });
}

function updateCompletedTaskList(tasks) {
    // Get completed task list element
    const completedTaskList = document.querySelector("#completedTaskList");

    // Clear completed task list
    completedTaskList.innerHTML = "";

    // Add each completed task to the list
    tasks.forEach((task) => {
        if (task.status === "COMPLETED") {
            // Create completed task list item
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item");
            taskItem.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h6 class="mb-1">${task.name}</h6>
                <small>Priority: ${task.priority}</small>
            </div>
            <div class="mx-auto">
                <small>Due Date: ${formatDueDate(task.dueDate)}</small>
            </div>
            <div class="d-flex justify-content-end">
                <small class="me-3">Assigned to: ${task.username}</small>
            </div>
        </div>
      `;

            // Add event listener to open task details
            taskItem.addEventListener("click", (event) => {
                const clickedElement = event.target;
                openTaskDetails(task);
            });

            // Add task item to completed task list
            completedTaskList.appendChild(taskItem);
        }
    });
}
function takeTask(event) {
    // get the task index
    const taskId = event.target.id;
    const url = `http://localhost:8080/api/task/${taskId}/assign`;

    const assignedTask = {
        userId: userId,
        projectId: pId,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedTask),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Task assigned successfully!");
                console.log("User ID: ", userId);
                location.reload();
            } else {
                response.json().then((data) => {
                    console.error(
                        "Failed to create task. Status:",
                        response.status
                    );
                    console.log("Response body:", data);
                });
            }
        })
        .catch((error) => {
            console.error("Error assigning task:", error);
        });
}

function completeTask(event) {
    const taskId = event.target.id;
    const url = `http://localhost:8080/api/task/${taskId}/complete`;

    // Fetch the members
    getMembers()
        .then((members) => {
            console.log("Members:", members);

            // Find the member with the corresponding user ID
            const member = members.find((member) => member.userId == userId);

            console.log("Member:", member);

            if (!member) {
                console.error("Member not found. UserID:", userId);
                return;
            }

            // Find the task with the given taskId
            const task = tasks.find((task) => task.taskId == taskId);

            console.log("Task:", task);

            if (!task) {
                console.error("Task not found. TaskID:", taskId);
                return;
            }

            // Check if the member is assigned to the task
            if (task.assignedTo !== member.memberId) {
                alert("You are not assigned to the task")
                return;
            }

            const completedTask = {
                userId: member.userId,
                projectId: pId,
            };

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(completedTask),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Task completed successfully!");
                        location.reload();
                    } else {
                        response.json().then((data) => {
                            console.error(
                                "Failed to complete task. Status:",
                                response.status
                            );
                            console.log("Response body:", data);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error completing task:", error);
                });
        })
        .catch((error) => {
            console.error("Error getting members:", error);
        });
}

function getMembers() {
    const url = `http://localhost:8080/api/project/${pId}/members`;

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
                    "Failed to fetch members. Status: " + response.status
                );
            }
        })
        .then((data) => {
            if (Array.isArray(data)) {
                members = data.map((member) => ({
                    memberId: member.memberId,
                    userId: member.userId,
                    username: member.username,
                    score: member.score,
                }));
                console.log("Members:", members);
                return members; // Return the members array
            } else {
                throw new Error(
                    "Invalid response format. Expected an array of members."
                );
            }
        })
        .catch((error) => {
            console.error("Error getting members", error);
            throw error; // Rethrow the error to propagate it to the caller
        });
}
