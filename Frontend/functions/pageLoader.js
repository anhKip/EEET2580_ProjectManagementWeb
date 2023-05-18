function addWrapper() {
    const body = document.body;

    var spinner_wrapper_div = document.createElement("div");
    spinner_wrapper_div.classList.add("spinner-wrapper");

    var spinner_border_div = document.createElement("div");
    spinner_border_div.classList.add("spinner-border");
    spinner_border_div.setAttribute("role", "status");

    var hidden_span = document.createElement("span");
    hidden_span.classList.add("visually-hidden");
    hidden_span.innerText = "Loading...";

    body.appendChild(spinner_wrapper_div);
    spinner_wrapper_div.appendChild(spinner_border_div);
    spinner_border_div.appendChild(hidden_span);
}

function pageLoader() {
    const spinner_wrapper = document.querySelector(".spinner-wrapper");

    window.addEventListener("load", function() {
        spinner_wrapper.style.opacity = 0;

        this.setTimeout(() => {
            spinner_wrapper.style.display = "none";
        }, 1000)
    })
}
export {pageLoader, addWrapper}