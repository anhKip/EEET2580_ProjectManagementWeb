/**
 * Create/Set cookie for UserId
 * @param {string} cname Cookie name
 * @param {string} c_value Cookie value
 * @param {float} expire Expiration Time in Hour
 */
function setIdCookies(cname, c_value, expire) {
    const d = new Date();
    d.setTime(d.getTime() + expire * 60 * 60 * 1000);
    let expires = " expires=" + d.toUTCString();
    document.cookie =
        cname +
        "=" +
        c_value +
        ";" +
        expires +
        "; path=/" +
        "; SameSite=None" +
        "; Secure";
}

/**
 * Get the value of cookie given the cookie name
 * @param {string} cname Cookie name
 * @returns {string} Cookie value
 */
function getIdCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Check if the cookie is still valid or has not expired.
 * If not, redirect back to login page.
 * If yes, do nothing.
 */
function reLog() {
    const userId = getIdCookie('userId')
    if (userId == '') {
        window.location.assign('../Login/login.html');
    }
}

export {setIdCookies, getIdCookie, reLog}