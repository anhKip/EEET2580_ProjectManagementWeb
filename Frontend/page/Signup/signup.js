import { pageLoader, addWrapper } from "../../functions/pageLoader.js";

// Set href for top-nav anchors
addWrapper()
pageLoader()

document.addEventListener("DOMContentLoaded", function() {
    let pass1 = document.getElementById("password");
    let pass2 = document.getElementById("password-confirm");
    let passwordError = document.getElementById("password-error");
  
    pass1.addEventListener("input", validatePassword);
    pass2.addEventListener("input", validatePassword);
  
    function validatePassword() {
      if (pass1.value !== pass2.value) {
        passwordError.style.display = "block";
        pass1.classList.add("is-invalid");
        pass2.classList.add("is-invalid");
      } else {
        passwordError.style.display = "none";
        pass1.classList.remove("is-invalid");
        pass2.classList.remove("is-invalid");
      }
    }
  
    document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();
  
      if (pass1.value === pass2.value) {
        let url = 'http://localhost:8080/api/auth/signup';
        let inputs = {
          email: document.querySelector('#email').value,
          username: document.querySelector("#username").value,
          password: pass1.value
        };
  
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(json => {
          // console.log(json.message);
          document.getElementById("invalid-email").style.display = 'none';
          document.getElementById("invalid-username").style.display = 'none';
          if (json.message == 'User registered successfully.') {
            window.location.assign('../Login/login.html');
          }
          else if (json.message == "Email is already taken.") {
            document.getElementById("invalid-email").style.display = 'block';
          }
          else if (json.message == "Username is already taken.") {
            document.getElementById("invalid-username").style.display = 'block';
          }
        })
        .catch(e => {
          console.log(e);
        });
      }
    });
  });

var username_check = document.getElementById("username")
username_check.addEventListener("change", function() {
  if (!username_check.checkValidity()) {
    document.querySelector("#invalid-username").style.display = "block";
    document.querySelector("#invalid-username").innerHTML = "Username must contain 3 to 32 characters";
  }
  else {
    document.querySelector("#invalid-username").style.display = "none";
    document.querySelector("#invalid-username").innerHTML = "";
  }
})