$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".hide-menu, .menu-container").toggleClass("open");
    });
});

// initialize task array
let tasks = [];
// initialize completed task array
let completedTasks = [];

// function to add a new task
function addTask() {
    // get input values
    const taskName = document.querySelector("#taskNameInput").value;
    const priority = document.querySelector("#prioritySelect").value;

    // create new task object
    const task = {
        name: taskName,
        priority: priority,
        date: new Date(),
    };

    if (taskName == null || taskName == "") {
        window.alert("Empty task name is not allowed!")
    } else {
        // add new task to array
        tasks.push(task);

        // update task list
        updateTaskList();
    }
}

// function to sort tasks
function sortTasks(sortBy) {
    if (sortBy === "date") {
        // sort by date
        tasks.sort((a, b) => b.date - a.date);
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

// function to update task list
function updateTaskList() {
    // get task list element
    const taskList = document.querySelector("#taskList");

    // clear task list
    taskList.innerHTML = "";

    // add each task to list
    tasks.forEach((task, index) => {
        // create task list item
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item");
        taskItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${task.name}</h6>
            <small>Priority: ${task.priority}</small>
          </div>
          <div>
            <button type="button" class="btn btn-success take-task-btn" data-task-index="${index}">Take Task</button>
            <small>${task.date.toLocaleString()}</small>
            <a href="#" class="edit-task">
            <div class="edit-task-icon"><i class="fa-regular fa-pen-to-square"></i></div>
            </a>
          </div>
        </div>
      `;

        // add task list item to task list
        taskList.appendChild(taskItem);
    });

    // attach click event listeners to take task buttons
    const takeTaskBtns = document.querySelectorAll(".take-task-btn");
    takeTaskBtns.forEach((btn) => {
        btn.addEventListener("click", takeTask);
    });
}

function updateCompletedTaskList() {
    // get completed task list element
    const completedTaskList = document.querySelector("#completedTaskList");

    // clear completed task list
    completedTaskList.innerHTML = "";

    // add each completed task to list
    completedTasks.forEach((task) => {
        // create completed task list item
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item");
        taskItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${task.name}</h6>
            <small>Priority: ${task.priority}</small>
          </div>
          <small>${task.date.toLocaleString()}</small>
        </div>
      `;

        // add completed task list item to completed task list
        completedTaskList.appendChild(taskItem);
    });
}

function takeTask(event) {
    // get the task index
    const taskIndex = event.target.dataset.taskIndex;

    // move the task from tasks array to completedTasks array
    const completedTask = tasks.splice(taskIndex, 1)[0];
    completedTasks.push(completedTask);

    // update task list and completed task list
    updateTaskList();
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
    $(".overlay, #cancelBtn").click(function () {
        // hide the gray overlay and create project box
        $(".overlay, .add-task-popup").fadeOut();
    });
});
