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

setTokenCookies('name2', 'Long', 0.05)
// console.log(getTokenCookie("name2"));

document.querySelector("#login-btn").addEventListener("click", function() {
    console.log("button pressed");

    let url = 'http://localhost:8080/api/auth/signup'
    let inputs = {
        email: "456789@emal.com",
        username: "long",
        password: "abcdef",
    }

    fetch (url, {
        // mode: "no-cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // if (json.userId >= 0) {
        //     console.log("Log in successfully")
        //     setTokenCookies('accessToken', json.accessToken, 0.2)
        //     setTokenCookies('refreshToken', json.refreshToken, 0.2)
        //     setIdToken('userId', json.userId, 0.2)
        //     document.location = 'home.html'
        // }
        // else {
        //     console.log("Log in fails")
        // }
    })
    .catch(e => {
        console.log(e)
    })
})


