window.win={}
document.addEventListener("mousemove",e=>{window.mouseX=e.clientX,window.mouseY=e.clientY});window.win.contextMenu=options=>{let body=document.querySelector("body"),behind=document.createElement("div");behind.id="win-context-menu-clickarea";behind.addEventListener("click",window.win.dismissContextMenu);let menu=document.createElement("div");menu.classList.add("win-context-menu");menu.style.left=window.mouseX+"px";menu.style.top=window.mouseY+"px";for(const item of options){var menuItem=document.createElement("a");menuItem.classList.add("context-menu-item");menuItem.addEventListener("click",window.win.dismissContextMenu);typeof item.onclick!="undefined"&&menuItem.addEventListener("click",item.onclick);item.enabled==!1&&menuItem.classList.add("disabled");let img="";typeof item.img!="undefined"&&(img=`<img src="${item.img}" />`);menuItem.innerHTML=`
            <div class="icon">
                ${img}
            </div>
            <div>
                ${item.text}
            </div>
        `;menu.appendChild(menuItem)}body.appendChild(behind);body.appendChild(menu);setTimeout(()=>{menu.classList.add("visible")},50)};window.win.dismissContextMenu=()=>{document.querySelector("#win-context-menu-clickarea").remove(),document.querySelectorAll(".win-context-menu").forEach(e=>{e.classList.remove("visible"),setTimeout(()=>e.remove(),500)})}
window.win.modal=query=>{let body=document.querySelector("body"),from=document.querySelector(query),modal=from.cloneNode(!0),lightbox=document.createElement("div");lightbox.id="wininternal--el-lightbox";body.appendChild(lightbox);body.appendChild(modal);setTimeout(()=>{lightbox.classList.add("visible"),modal.classList.add("visible")},1)};window.win.dismissModal=()=>{document.querySelector("#wininternal--el-lightbox").remove(),document.querySelectorAll(".win-modal.visible").forEach(e=>{e.classList.remove("visible"),setTimeout(()=>e.remove(),500)})}
