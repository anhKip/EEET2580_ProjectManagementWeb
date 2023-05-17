/**
 * 
 * @param {string} c_name Token name
 * @param {string} c_value Token value
 * @param {float} expire Expiration Time in Hour
 */
function setTokenCookies(cname, c_value, expire) {
    const d = new Date();
    d.setTime(d.getTime() + (expire*60*60*1000));
    let expires = " expires="+ d.toUTCString();
    document.cookie = cname + '=' + c_value + ';' + expires + '; path=/' + '; SameSite=None' + '; Secure';
}

function setIdToken(cname, c_value, expire) {
    const d = new Date();
    d.setTime(d.getTime() + (expire*60*60*1000));
    let expires = " expires="+ d.toUTCString();
    document.cookie = cname + '=' + c_value + ';' + expires + '; path=/' + '; SameSite=None' + '; Secure';
}

function getTokenCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault()

    let url = 'http://localhost:8080/api/auth/signin'

    let inputs = {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    }

    fetch (url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if (json.userId >= 0) {
            console.log("Log in successfully")
        }
        else {
            console.log("Log in fails")
        }
    })
    .catch(e => {
        console.log(e)
    })
})


