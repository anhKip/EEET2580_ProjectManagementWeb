import { pageLoader, addWrapper } from "../../functions/pageLoader.js";
import { urlGen } from "../../functions/topNavURL.js";
import { reLog, logOut, checkProjectAccess } from "../../functions/authentications.js";

reLog()
// Set href for top-nav anchors
urlGen()

addWrapper()
pageLoader()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pId = urlParams.get("pId");

checkProjectAccess(pId)

document.getElementById("logOut-btn").addEventListener("click", logOut)

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});


$(document).ready(function () {
    $(".menu-icon").click(function () {
        $(".menu-container, .hide-menu").toggleClass("open");
    });

    // click event handler to close menu-container
    $(document).click(function(event) {
        if(!$('.menu-container').is(event.target) && !$('.menu-icon').is(event.target) && !$("#menu-i").is(event.target)) {
            $('.menu-container').removeClass("open");
            $('.hide-menu').removeClass("open");
        }
    })
});

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();
        const bColText = b
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();

        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-asc", asc);
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table th").forEach((headerCell) => {
    headerCell.addEventListener("click", () => {
        const tableElement =
            headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(
            headerCell.parentElement.children,
            headerCell
        );
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

document.querySelector(".fa-rotate").addEventListener("click", function () {
    location.reload();
});

document.getElementById("logOut-btn").addEventListener("click", logOut)

// ...

// Add event listener to the upload button
document.getElementById("upload").addEventListener("change", handleFileUpload);

// Add event listener to the delete buttons
document.querySelectorAll("#file-table tbody tr").forEach((row) => {
    const deleteButton = row.querySelector("button");
    deleteButton.addEventListener("click", handleFileDelete);
});

function handleFileUpload(event) {
    const fileInput = event.target;
    const fileList = fileInput.files;
    
    // Loop through the uploaded files
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        
        // Create a new row in the table for the uploaded file
        const newRow = document.createElement("tr");
        
        const deleteButtonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fa-regular fa-trash-can'></i>";
        deleteButton.addEventListener("click", handleFileDelete);
        deleteButtonCell.appendChild(deleteButton);
        newRow.appendChild(deleteButtonCell);
        
        const nameCell = document.createElement("td");
        nameCell.textContent = file.name;
        newRow.appendChild(nameCell);
        
        const dateCell = document.createElement("td");
        dateCell.textContent = new Date().toLocaleDateString();
        newRow.appendChild(dateCell);
        
        const sizeCell = document.createElement("td");
        sizeCell.textContent = file.size;
        newRow.appendChild(sizeCell);
        
        const ownerCell = document.createElement("td");
        ownerCell.textContent = "Current User";
        newRow.appendChild(ownerCell);
        
        // Append the new row to the table
        const tableBody = document.querySelector("#file-table tbody");
        tableBody.appendChild(newRow);
    }
    
    // Clear the file input
    fileInput.value = "";
}

function handleFileDelete(event) {
    const deleteButton = event.target;
    const row = deleteButton.closest("tr");
    
    // Remove the row from the table
    row.remove();
}
