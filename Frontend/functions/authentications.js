/**
 * Create/Set cookie for UserId
 * @param {string} c_name Cookie name
 * @param {string} c_value Cookie value
 * @param {float} expire Expiration Time in Hour
 */
function setIdCookies(c_name, c_value, expire) {
    const d = new Date();
    d.setTime(d.getTime() + expire * 60 * 60 * 1000);
    let expires = " expires=" + d.toUTCString();
    document.cookie =
    c_name +
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
 * @param {string} c_name Cookie name
 * @returns {string} Cookie value
 */
function getIdCookie(c_name) {
    let name = c_name + "=";
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

/**
 * Function to delete cookie upon clicking
 */
function logOut() {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("projectList");
}

/**
 * Function to check if a user is a  member.
 * If not, return them to home.html.
 * If yes, let them proceed
 */
function checkProjectAccess(projectId) {
    var storedProjectList = localStorage.getItem("projectList");
    var storedProjectArray = JSON.parse(storedProjectList);

    if (!storedProjectArray.includes(parseInt(projectId))) {
        location.assign("../Home/home.html");
    }
}

export {setIdCookies, getIdCookie, reLog, logOut, checkProjectAccess}