/**
 * modals
 */
window.win.modal = (query) => {
    let body = document.querySelector("body");
    let from = document.querySelector(query);
    let modal = from.cloneNode(true);

    let lightbox = document.createElement("div");
    lightbox.id = "wininternal--el-lightbox";

    body.appendChild(lightbox);
    body.appendChild(modal);

    setTimeout(() => {
        lightbox.classList.add("visible");
        modal.classList.add("visible");
    }, 1);
}

window.win.dismissModal = () => {
    document.querySelector("#wininternal--el-lightbox").remove();
    document.querySelectorAll('.win-modal.visible').forEach(e => {
        e.classList.remove("visible");
        setTimeout(() => e.remove(), 500);
    });
};