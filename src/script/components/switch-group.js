window.win.switch = (query) => {
    let from = document.querySelector(query);
    let group = from.getAttribute("data-switch-group");

    document.querySelectorAll(`[data-switch-group="${group}"][open]`).forEach((e, i) => {
        e.removeAttribute("open");
    });

    from.setAttribute("open", "");
}