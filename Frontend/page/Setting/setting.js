$(document).ready(function() {
    $('.menu-icon').click(function() {
      $('.menu-container, .hide-menu').toggleClass('open');
    });

    // click event handler for create project card
    $('#add-contributor').click(function(event) {
      // prevent the default click behavior, which is to navigate to a new page
      event.preventDefault();
  
      // show the gray overlay
      $('.overlay').fadeIn();
  
      // show the create project box
      $('.add-form').fadeIn();
    });
  
    // click event handler for close button and overlay
    $('#cancel-button').click(function() {
      // hide the gray overlay and create project box
      $('.overlay, .add-form').fadeOut();
    });
  
    // click event handler for submit button
    $('#confirm-button').click(function(event) {
      // prevent the default submit behavior, which is to refresh the page
      event.preventDefault();
  
      // hide the gray overlay and create project box
      $('.overlay, .add-form').fadeOut();
    });

    $('.contributor').append("<button type=\"button\" class=\"remove-btn\"> <i class=\"fa-solid fa-xmark\"></i> </button>")

    $('.remove-btn').click(function(event) {
      event.preventDefault();

      // Remove user from db
      
    })
})

const s = document.getElementById("save");
const c = document.getElementById("cancel");
const ch = document.getElementById("change");
const n = document.getElementById("project-name");
var nameBuffer

function buttonChange() {
  nameBuffer = n.value
  ch.style.display = "none"
  s.style.display = "block"
  c.style.display = "block"

  n.removeAttribute("readonly")
  n.style.outlineStyle = "solid"
  n.style.outlineWidth = "medium"
}

function buttonCancel() {
  ch.style.display = "block"
  s.style.display = "none"
  c.style.display = "none"

  n.setAttribute("readonly", "true")
  n.style.outline = "none"
  n.value = nameBuffer
}

function buttonSave() {

}

document.getElementById("change").addEventListener("click", buttonChange)
document.getElementById("cancel").addEventListener("click", buttonCancel)
document.getElementById("save").addEventListener("click", buttonSave)

