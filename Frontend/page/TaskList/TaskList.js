import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

addWrapper();
pageLoader();

$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function(event) {
        if(!$('.menu-container').is(event.target) && !$('.menu-icon').is(event.target) && !$("#menu-i").is(event.target)) {
            $('.menu-container').removeClass("open");
            $('.hide-menu').removeClass("open");
        }
    })
});

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

// initialize task array
let tasks = [];
// initialize my task array
let onGoingTasks = [];
// initialize completed task array
let completedTasks = [];

// function to add a new task
function addTask() {
    // get input values
    const taskName = document.querySelector("#taskNameInput").value;
    const priority = document.querySelector("#prioritySelect").value;
    let dueDate = document.querySelector("#dueDateInput").value;
    const taskDetails = document.querySelector("#taskDetailsInput").value;

    if (taskName == null || taskName == "") {
        window.alert("Empty task name is not allowed!");
    } else {
        // Check if hour input is empty
        if (!dueDate.includes(":")) {
            dueDate += " 23:59"; // Set default time to 23:59
        }

        // Create a new Date object for today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

        // Create a new Date object to validate the due date
        const dueDateObj = new Date(dueDate);

        // Check if the due date is valid and not before today
        if (isNaN(dueDateObj) || dueDateObj < today) {
            window.alert("Invalid due date!");
            return; // Exit the function if the due date is invalid
        }

        // create new task object
        const task = {
            name: taskName,
            priority: priority,
            dueDate: new Date(dueDate),
            details: taskDetails,
        };

        // add new task to array
        tasks.push(task);

        // update task list
        updateTaskList();

        // Clear input fields
        taskNameInput.value = "";
        dueDateInput.value = "";
        taskDetailsInput.value = "";
    }
}

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
        tasks.sort((a, b) => a.priority - b.priority);
    }

    // update task list
    updateTaskList();
}

function updateTaskList() {
    // Get task list element
    const taskList = document.querySelector("#taskList");

    // Clear task list
    taskList.innerHTML = "";

    // Add each task to the list
    tasks.forEach((task, index) => {
        // Map the priority value to the corresponding label
        const priorityLabels = {
            1: "High",
            2: "Medium",
            3: "Low",
        };

        // Create task list item
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item");
        taskItem.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h6 class="mb-1">${task.name}</h6>
                    <small>Priority: ${priorityLabels[task.priority]}</small>
                </div>
                <div class="mx-auto">
                    <small>Due Date: ${formatDueDate(task.dueDate)}</small>
                </div>
                <div class="btn-container">
                    <button type="button" class="btn btn-success take-task-btn" data-task-index="${index}">Take Task</button>
                </div>
                <div class="d-flex justify-content-end">
                    <a href="#" class="edit-task">
                        <div class="edit-task-icon" id="edit-${index}"><i class="fa-regular fa-pen-to-square"></i></div>
                    </a>
                </div>
            </div>
        `;

        // Get edit icon element
        const editIcon = taskItem.querySelector(`#edit-${index}`);

        // Add event listener to edit icon
        editIcon.addEventListener("click", (event) => {
            event.stopPropagation();
            openEditPopup(task, index);
        });

        // Add event listener to open task details
        taskItem.addEventListener("click", (event) => {
            const clickedElement = event.target;
            const takeTaskBtn = taskItem.querySelector(".take-task-btn");
            const completeTaskBtn =
                taskItem.querySelector(".complete-task-btn");

            // Check if the clicked element is not "Take Task" or "Complete Task" button
            if (
                clickedElement !== takeTaskBtn &&
                clickedElement !== completeTaskBtn
            ) {
                openTaskDetails(task);
            }
        });

        // Add task item to task list
        taskList.appendChild(taskItem);
    });

    // Attach click event listeners to take task buttons
    const takeTaskBtns = document.querySelectorAll(".take-task-btn");
    takeTaskBtns.forEach((btn) => {
        btn.addEventListener("click", takeTask);
    });
}

// function to format due date
function formatDueDate(dueDate) {
    const options = {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const formattedDate = dueDate.toLocaleDateString(undefined, options);
    return formattedDate;
}

function updateOnGoingTaskList() {
    // Get on-going task list element
    const onGoingTaskList = document.querySelector("#onGoingTaskList");

    // Clear task list
    onGoingTaskList.innerHTML = "";

    // Add each task to the list
    onGoingTasks.forEach((task, index) => {
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
                <button type="button" class="btn btn-success complete-task-btn" data-task-index="${index}">Complete Task</button>
            </div>    
            <div class="d-flex justify-content-end">
                <small class="me-3">Assigned to:</small>
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
    });

    // Attach click event listeners to complete task buttons
    const completeTaskBtns = document.querySelectorAll(".complete-task-btn");
    completeTaskBtns.forEach((btn) => {
        btn.addEventListener("click", completeTask);
    });
}

function updateCompletedTaskList() {
    // Get completed task list element
    const completedTaskList = document.querySelector("#completedTaskList");

    // Clear completed task list
    completedTaskList.innerHTML = "";

    // Add each completed task to the list
    completedTasks.forEach((task) => {
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
                <small class="me-3">Assigned to:</small>
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
    });
}

function takeTask(event) {
    // get the task index
    const taskIndex = event.target.dataset.taskIndex;

    // move the task from tasks array to onGoingTasks array
    const onGoingTask = tasks.splice(taskIndex, 1)[0];
    onGoingTasks.push(onGoingTask);

    // update task list and my task list
    updateTaskList();
    updateOnGoingTaskList();
}

function completeTask(event) {
    // get the task index
    const taskIndex = event.target.dataset.taskIndex;

    // move the task from onGoingTasks array to completedTasks array
    const completedTask = onGoingTasks.splice(taskIndex, 1)[0];
    completedTasks.push(completedTask);

    // update task list, my task list, and completed task list
    updateTaskList();
    updateOnGoingTaskList();
    updateCompletedTaskList();
}

// add event listener to add task button
document.querySelector("#addTaskBtn").addEventListener("click", addTask);

// add event listeners to sort links
const sortLinks = document.querySelectorAll(".sort-link");
sortLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const sortBy = event.target.dataset.sort;
        sortTasks(sortBy);
    });
});

// add event listener to take task button
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("take-task-btn")) {
        const index = parseInt(event.target.dataset.taskIndex);
        tasks[index].assigned = true; // add a new property to the task object to indicate it's assigned
        updateTaskList(); // update the task list to reflect the changes
    }
});

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

// ...

function openEditPopup(task, index) {
    // find the task object in the tasks array by index
    const taskObj = tasks[index];

    // get edit popup elements
    const editPopup = document.querySelector(".edit-task-popup");
    const taskNameInput = document.querySelector("#editTaskNameInput");
    const prioritySelect = document.querySelector("#editPrioritySelect");
    const dueDateInput = document.querySelector("#editDueDateInput");
    const taskDetailsInput = document.querySelector("#editTaskDetailsInput");
    const deleteTaskBtn = document.querySelector("#deleteTaskBtn");

    // fill in input fields with task information
    taskNameInput.value = taskObj.name;
    prioritySelect.value = taskObj.priority;
    taskDetailsInput.value = taskObj.details;

    // Format the due date to be in the format accepted by the input element
    const formattedDueDate = taskObj.dueDate.toISOString().substring(0, 16);
    dueDateInput.value = formattedDueDate;

    // store taskObj and index as properties of the editPopup element
    editPopup.taskObj = taskObj;
    editPopup.index = index;

    // show edit popup and overlay
    editPopup.style.display = "block";
    document.querySelector(".overlay").style.display = "block";

    // add event listener to delete button
    deleteTaskBtn.addEventListener("click", () => {
        // Call the deleteTask function to remove the task
        deleteTask(index);

        // Close the edit popup
        closeEditPopup();
    });
}

function deleteTask(index) {
    // Remove the task from the tasks array
    tasks.splice(index, 1);

    // Update the task list
    updateTaskList();
}

// get edit popup elements
const editPopup = document.querySelector(".edit-task-popup");
const updateBtn = document.querySelector("#editTaskSubmitBtn");
const cancelBtn = document.querySelector("#cancelEditBtn");

// add event listener to update button in edit popup
updateBtn.addEventListener("click", () => {
    // get taskObj and index from the editPopup element
    const taskObj = editPopup.taskObj;
    const index = editPopup.index;

    // get input values
    const taskName = document.querySelector("#editTaskNameInput").value;
    const priority = document.querySelector("#editPrioritySelect").value;
    const dueDate = document.querySelector("#editDueDateInput").value;
    const details = document.querySelector("#editTaskDetailsInput").value;

    // Create a new Date object for today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

    // Create a new Date object to validate the edited due date
    const editedDueDateObj = new Date(dueDate);

    // Check if the edited due date is valid and not before today
    if (isNaN(editedDueDateObj) || editedDueDateObj < today) {
        window.alert("Invalid due date!");
        return; // Exit the function if the edited due date is invalid
    }

    // update task object with new values
    taskObj.name = taskName;
    taskObj.priority = priority;
    taskObj.dueDate = editedDueDateObj;
    taskObj.details = details;

    // update task list
    updateTaskList();

    // close edit popup
    closeEditPopup();
});

// add event listener to cancel button in edit popup
cancelBtn.addEventListener("click", () => {
    // close edit popup
    closeEditPopup();
});

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

    // remove the event listener from the update button
    document
        .querySelector("#editTaskSubmitBtn")
        .removeEventListener("click", updateTask);
}

function updateTask(index, taskName, priority, dueDate) {
    // update task object with new values
    tasks[index].name = taskName;
    tasks[index].priority = priority;
    tasks[index].dueDate = new Date(dueDate);

    // update task list
    updateTaskList();

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

    // Map the priority value to the corresponding label
    const priorityLabels = {
        1: "High",
        2: "Medium",
        3: "Low",
    };

    // Populate task details in the popup
    detailsTaskName.textContent = task.name;
    detailsTaskPriority.textContent = priorityLabels[task.priority];
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
