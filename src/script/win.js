
/**
 * modals
 */

window.win.modal = (query) => {
    let mod = document.querySelector(query);
    mod.classList.add("visible");

    let lightbox = document.createElement("div");
    lightbox.id = "wininternal--el-lightbox";
    document.querySelector("body").appendChild(lightbox);

    lightbox.classList.add("visible");
}

window.win.dismissModal = (query) => {
    document.querySelector("#wininternal--el-lightbox").remove();
    document.querySelector(query).classList.remove("visible");
};

window.win.dismissModals = () => {
    document.querySelector("#wininternal--el-lightbox").remove();
    document.querySelectorAll('.win-modal').forEach(e => {
        e.classList.remove("visible");
    });
};

/**
 * context menu
 */

document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

window.win.contextMenu = (options) => {
    let body = document.querySelector("body");
    let behind = document.createElement("div");
    behind.id = "win-context-menu-clickarea";
    behind.addEventListener("click", window.win.dismissContextMenu);

    let menu = document.createElement("div");
    menu.classList.add("win-context-menu");
    menu.style.left = window.mouseX + "px";
    menu.style.top = window.mouseY + "px";

    for (const item of options) {
        var menuItem = document.createElement("a");
        menuItem.classList.add("context-menu-item");
        menuItem.addEventListener('click', window.win.dismissContextMenu);

        if (typeof item.onclick !== 'undefined') {
            menuItem.addEventListener('click', item.onclick);
        }

        if (item.enabled == false) {
            menuItem.classList.add("disabled");
        }

        let img = '';
        if (typeof item.img !== 'undefined') {
            img = /*html*/`<img src="${item.img}" />`;
        }

        menuItem.innerHTML = /*html*/`
            <div class="icon">
                ${img}
            </div>
            <div>
                ${item.text}
            </div>
        `;

        menu.appendChild(menuItem);
    }

    body.appendChild(behind);
    body.appendChild(menu);

    setTimeout(() => {
        menu.classList.add("visible");
    }, 50);
}

window.win.dismissContextMenu = () => {
    document.querySelector("#win-context-menu-clickarea").remove();
    document.querySelectorAll('.win-context-menu').forEach(e => {
        e.classList.remove("visible");
        setTimeout(() => e.remove(), 500);
    });
}