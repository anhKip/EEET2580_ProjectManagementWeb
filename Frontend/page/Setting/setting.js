import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";
import {
  reLog,
  logOut,
  getIdCookie,
  checkProjectAccess,
} from "../../functions/authentications.js";

// Check login info
reLog();
// Set href for top-nav anchors
urlGen();
// Page spinner
addWrapper();
pageLoader();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

// Check project access
checkProjectAccess(pId);

document.getElementById("logOut-btn").addEventListener("click", logOut);

document.querySelector(".fa-rotate").addEventListener("click", function () {
  location.reload();
});

document
  .querySelector(".delete-project-btn")
  .addEventListener("click", deleteProject);
var memberId;

getContributors();
getProjectName();

$(document).ready(function () {
  $(".menu-icon").click(function () {
    $(".menu-container, .hide-menu").toggleClass("open");
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

  // Pop-up form for changing project name
  $("#change").click(function (event) {
    event.preventDefault();

    $(".overlay").fadeIn();

    $(".name-change-form").fadeIn();

    $("#name-input").val($("#project-name").text().trim());
  });

  $("#confirm-change-button").click(function (event) {
    event.preventDefault();

    changeProjectName();
    $(".overlay, .name-change-form").fadeOut();
  });

  $("#cancel-change-button").click(function () {
    $(".overlay, .name-change-form").fadeOut();
  });

  $("#confirm-button").click(function (event) {
    event.preventDefault();

    $(".overlay, .name-change-form").fadeOut();
  });

  // Pop-up form for add contributors
  $("#add-contributor").click(function (event) {
    event.preventDefault();

    $(".overlay").fadeIn();

    $(".add-form").fadeIn();
  });

  $("#cancel-button").click(function () {
    $(".overlay, .add-form").fadeOut();
  });

  $("#confirm-button").click(function (event) {
    event.preventDefault();
    addContributors();
    $(".overlay, .add-form").fadeOut();
  });
});

function getContributors() {
  const url = `http://localhost:8080/api/project/${pId}/members`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((contributors) => {
      renderContributors(contributors);
    })
    .catch((error) => {
      console.error("Error getting contributors", error);
    });
}

function renderContributors(contr) {
  const contributorsList = document.querySelector(".contributors");

  // Clear previous list items
  contributorsList.innerHTML = "";

  // Add each contributor to the list
  contr.forEach((contributor) => {
    const listItem = document.createElement("li");
    listItem.classList.add("contributor");
    listItem.innerHTML =
      contributor.userId == getIdCookie("userId")
        ? `<h5>${contributor.username}</h5> <button type="button" id="remove-${contributor.memberId}" class="leave-btn"> Leave </button>`
        : `<h5>${contributor.username}</h5> <button type="button" id="remove-${contributor.memberId}" class="remove-btn"> Remove </button>`;
    if (contributor.userId == getIdCookie("userId")) {
      memberId = contributor.memberId;
    }

    // Append the list item to the contributors list
    contributorsList.appendChild(listItem);
  });

  const buttons = document.querySelectorAll(".remove-btn");
  document.querySelector(".leave-btn").addEventListener("click", removeMember);
  buttons.forEach((button) => {
    button.addEventListener("click", removeMember);
  });

  checkAdmin(memberId);
}

function getProjectName() {
  const fetch_url = `http://localhost:8080/api/project/${pId}`;

  fetch(fetch_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((project) => {
      const projectName = document.getElementById("project-name");
      projectName.textContent = project.name;

      const contentContainer = document.querySelector(".content");
      contentContainer.insertBefore(projectName, contentContainer.firstChild);
    })
    .catch((error) => {
      console.error("Error getting project name", error);
    });
}

function changeProjectName() {
  const fetch_url = "http://localhost:8080/api/project/" + pId + "/change-name";

  const input = {
    newName: document.getElementById("name-input").value,
  };

  fetch(fetch_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => res.text())
    .then((data) => {
      if (data == "Project's name has been updated.") {
        getProjectName();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function addContributors() {
  const fetch_url = `http://localhost:8080/api/project/${pId}/add-member`;
  const name = document.getElementById("user-input").value;

  const member = {
    username: name,
  };

  fetch(fetch_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
    .then((response) => response.text())
    .then((contributors) => {
      if (contributors === "Member has been added") {
        getContributors();
      } else {
        alert("Member does not exist");
      }
    })
    .catch((error) => {
      console.error("Error getting user", error);
    });
}

function checkAdmin(id) {
  const fetch_url = "http://localhost:8080/api/member/" + id + "/isAdmin";

  fetch(fetch_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      // console.log(typeof data);
      const remove_buttons = document.querySelectorAll(".remove-btn");
      const delete_button = document.querySelector(".delete-project-btn");
      const change_button = document.getElementById("change");
      const leave_button = document.querySelector(".leave-btn");

      // If user is not an admin, remove-member and delete-project buttons are disable
      if (data === "false") {
        remove_buttons.forEach((btn) => {
          btn.style.backgroundColor = "grey";
          btn.disabled = true;
          btn.removeEventListener("click", removeMember);
        });

        delete_button.style.backgroundColor = "grey";
        delete_button.disabled = true;
        delete_button.removeEventListener("click", deleteProject);

        change_button.style.backgroundColor = "grey";
        change_button.disabled = true;
      }
      // Else if user is an admin, the their leave-project will become a delete-project button
      else {
        leave_button.removeEventListener("click", removeMember);
        leave_button.addEventListener("click", removeMember);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function deleteProject() {
  const fetch_url = "http://localhost:8080/api/project/" + pId;

  fetch(fetch_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      location.assign("../Home/home.html");
    } else {
      console.log(response);
      alert("Something went wrong");
    }
  });
}

function removeMember(event) {
  const id = event.target.id.split("-")[1];
  const btnClass = event.target.classList[0];

  console.log("test", btnClass);

  const fetch_url =
    "http://localhost:8080/api/project/" + pId + "/remove-member/" + id;

  fetch(fetch_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        if (btnClass === "remove-btn") {
          location.reload();
        } else {
          location.assign("../Home/home.html");
        }
      } else {
        location.reload();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
