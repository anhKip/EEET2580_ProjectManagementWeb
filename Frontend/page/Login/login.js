/**
 * 
 * @param {string} cname Token name
 * @param {string} cvalue Token value
 * @param {float} expire Expiration Time in Hour
 */
function setTokenCookies(cname, cvalue, expire) {
    const d = new Date();
    d.setTime(d.getTime() + (expire*60*60*1000));
    let expires = " expires="+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/' + '; SameSite=None' + '; Secure';
    // document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/' + '; SameSite=None' + '; Secure' + '; HttpOnly';
}

function setIdToken(cname, cvalue, expire) {
    const d = new Date();
    d.setTime(d.getTime() + (expire*60*60*1000));
    let expires = " expires="+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/' + '; SameSite=None' + '; Secure';
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

// setTokenCookies('name2', 'Long', 0.05)
// console.log(getTokenCookie("name2"));

document.querySelector("#login-btn").addEventListener("click", async function() {
    console.log("button pressed");

    let url = 'http://localhost:8080/api/auth/signin'

    const username = await document.querySelector('#username').value
    const password = await document.querySelector('#password').value

    let inputs = {
        username: username,
        password: password
    }

    console.log(inputs)
    console.log(JSON.stringify(inputs))

    fetch (url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // console.log('userId is' + json.userId);
        if (json.userId >= 0) {
            console.log("Log in successfully")
            // setTokenCookies('accessToken', json.accessToken, 0.1)
            // setTokenCookies('refreshToken', json.refreshToken, 0.1)
            // window.location.assign('../Home/home.html')
        }
        else {
            console.log("Log in fails")
        }
    })
    .catch(e => {
        console.log(e)
    })
})


