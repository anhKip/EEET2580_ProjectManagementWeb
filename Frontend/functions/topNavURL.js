function urlGen() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const projectId = urlParams.get("pId");

    const menu_container = document.querySelector(".menu-container")
    const menu_container_a = menu_container.querySelectorAll("a")

    menu_container_a.forEach(anchor => {
        let buffer = anchor.href
        anchor.setAttribute("href", buffer + "?pId=" + projectId)
    })

    const hide_menu = document.querySelector(".hide-menu")
    const hide_menu_a = hide_menu.querySelectorAll("a")

    hide_menu_a.forEach(anchor => {
        let buffer = anchor.href
        anchor.setAttribute("href", buffer + "?pId=" + projectId)
    })

    const settings = document.querySelector(".custom-toggle li:first-child")
    const settings_a = settings.querySelector("a")
    let buffer = settings_a.href
    settings_a.setAttribute("href", buffer + "?pId=" + projectId)
}

export {urlGen}