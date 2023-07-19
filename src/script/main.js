const __winroot = document.querySelector(":root");
document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;

    __winroot.style.setProperty('--window-x', e.clientX + "px");
    __winroot.style.setProperty('--window-y', e.clientY + "px");
});
window.win = {};