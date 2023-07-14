window.win.flyout = (query) => {
    let body = document.querySelector("body");
    let from = document.querySelector(query);
    let flyout = from.cloneNode(true);

    flyout.style.left = (window.mouseX + 10) + "px";
    flyout.style.top = (window.mouseY + 10) + "px";

    let lightbox = document.createElement("div");
    lightbox.id = "wininternal--el-flyout";
    lightbox.addEventListener("click", window.win.dismissFlyout);
    flyout.addEventListener("click", window.win.dismissFlyout);

    body.appendChild(lightbox);
    body.appendChild(flyout);

    setTimeout(() => {
        lightbox.classList.add("visible");
        flyout.classList.add("visible");
    }, 1);
}

window.win.dismissFlyout = () => {
    document.querySelector("#wininternal--el-flyout").remove();
    document.querySelectorAll('.win-flyout.visible').forEach(e => {
        e.classList.remove("visible");
        setTimeout(() => e.remove(), 500);
    });
}