document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();
  
      let pass1 = document.getElementById("password");
      let pass2 = document.getElementById("password-confirm");
      let passwordError = document.getElementById("password-error");
  
      if (pass1.value !== pass2.value) {
          passwordError.style.display = "block";  // Show the error message
          pass1.value = "";
          pass2.value = "";
      } else {
          passwordError.style.display = "none";   // Hide the error message
  
          let url = 'http://localhost:8080/api/auth/signup';
          let inputs = {
              email: document.querySelector('#email').value,
              username: document.querySelector("#username").value,
              password: document.querySelector('#password').value
          };
  
          console.log(inputs);
  
          fetch(url, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(inputs)
          })
          .then(response => response.json())
          .then(json => {
              console.log(json.message);
              window.location.assign('../Login/login.html');
          })
          .catch(e => {
              console.log(e);
          });
      }
    });
  });
  