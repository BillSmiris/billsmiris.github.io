//reference UI elements
var controls = document.getElementById("controls");
var canvas = document.getElementById("canvas");
var preview = document.getElementById("preview");
var palettes = document.querySelectorAll(".palette");
var shapeBtns = document.querySelectorAll(".shape-btn");
var toolsElement = document.getElementById("tools");
var ctxMenu = document.getElementById("ctxMenu");
var toolBtns = null;

//helper variables
var ctxShow = false;
var moving = false;
var selectedObject = null;
var moveClicked = false;
var initX = 0;
var initY = 0;
var overControls = false;

var tools = {
    "rotate" : {
        "icon" : "&#8635;", 
        "enabled" : false
    }, 
    "delete" : {
        "icon" : "X", 
        "enabled" : false
    }, 
    "paint" : {
        "icon" : "P", 
        "enabled" : false
    },
    "move" : {
        "icon" : "M",
        "enabled" : false
    }
};

var shapeColorList = ["green", "blue", "yellow", "red", "white", "black", "magenta", "orange"];
var backgroundColorList = ["white", "darkgray", "black"];

var shape = "square";
var shapeColor = shapeColorList[0];

//initialization start
canvas.style.backgroundColor = backgroundColorList[0];
preview.style.backgroundColor = backgroundColorList[0];

setPreview();


for(let i = 0; i < shapeBtns.length; i++){
    shapeBtns[i].addEventListener("click", setShape);
}

for(let i = 0; i < shapeColorList.length; i++){
    palettes[0].innerHTML += `<div class="color" style="background-color:${shapeColorList[i]}" onclick="setShapeColor(\'${shapeColorList[i]}\')"></div>`
}

for(let i = 0; i < backgroundColorList.length; i++){
    palettes[1].innerHTML += `<div class="color" style="background-color:${backgroundColorList[i]}" onclick="setBackgroundColor(\'${backgroundColorList[i]}\')"></div>`
}

for(var tool in tools){
    toolsElement.innerHTML += `<button class="toolBtn" data-tool="${tool}" onclick="toggleTool(event)">${tools[tool].icon}</button>`
}
toolBtns = document.querySelectorAll(".toolBtn");

onmousemove = (e) => {
    if(e.clientX < controls.offsetWidth){
        overControls = true;
    }
    else{
        overControls = false;
    }
    if (moving) {
        selectedObject.style.top = e.clientY + "px";
        selectedObject.style.left = e.clientX + "px";
    }
}

onclick = (e) => {
    if (moving) {
        if(moveClicked && selectedObject){
            toggleMove(false);
            if(overControls){
                deselectObject(initX, initY);
            }
            else{
                deselectObject(e.clientX + "px", e.clientY + "px");
            }
            moveClicked = false;
        }
        else{
            moveClicked = true;
        }
        return;
    }
    if(!e.target.classList.contains("object")){
        hideCtxMenu();
        if(selectObject){
            deselectObject(initX, initY);
        }
    }
}

onkeydown = (e) => {
    if(e.key == "Escape"){
        if(selectedObject){
            if(moving){
                toggleMove(false);
                moveClicked = false;
            }
            deselectObject(initX, initY);
        }
        hideCtxMenu();
    }
}

//initialization end

function addObject(){
    let newObject = document.createElement("div");
    newObject.classList.add("object", shape);
    newObject.style.top = "50%";
    newObject.style.left = "50%";
    newObject.style.backgroundColor = shapeColor;
    newObject.addEventListener("click", selectObject);
    newObject.addEventListener("contextmenu", showCtxMenu);
    canvas.appendChild(newObject);
}

function duplicateObject(obj){
    let dupe = obj.cloneNode(false);
    if(obj == selectedObject){
        dupe.classList.remove("selected");
    }
    dupe.addEventListener("click", selectObject);
    dupe.addEventListener("contextmenu", showCtxMenu);
    canvas.appendChild(dupe);
}

function selectObject(e){
    if(tools.rotate.enabled){
        rotateObject(e.target, 45);
        return;
    }
    if(tools.delete.enabled){
        e.target.remove();
        return;
    }
    if(tools.paint.enabled){
        e.target.style.backgroundColor = shapeColor;
        return;
    }
    if(selectedObject != e.target && !moving){
        if(selectedObject){
            deselectObject(initX, initY);
        }
        selectedObject = e.target;
        initX = selectedObject.style.left;
        initY = selectedObject.style.top;
        selectedObject.classList.add("selected");
        if(tools.move.enabled && !moving){
            toggleMove(true);
        }
        else{
            showCtxMenu(e);
        }
        return;
    }
    hideCtxMenu();
    if(!moving){
        deselectObject(initX, initY); //if it is not moving, the deselction is handled by the global click event
    }
}

function showCtxMenu(e){
    ctxMenu.style.display = "block";
    ctxMenu.style.left = e.clientX + "px";
    ctxMenu.style.top = e.clientY + "px";
    ctxShow = true;
}

function hideCtxMenu(){
    if(ctxShow){
        ctxMenu.style.display = "none";
        ctxShow = false;
    }
}

function deselectObject(x, y){
    selectedObject.style.left = x;
    selectedObject.style.top = y;
    selectedObject.classList.remove("selected");
    selectedObject = null;
}

function rotateObject(obj, deg){
    let rotate = obj.style.transform.match(/rotate\((\d+)([^)]+)\)/);
    if(rotate){
        obj.style.transform = `rotate(${(Number(rotate[1]) + deg) % 360}deg)`;
        return;
    }
    obj.style.transform = `rotate(${deg}deg)`;
}

function setShape(e){
    shape = e.target.dataset["shape"];
    setPreview();
}

function setShapeColor(c){
    shapeColor = c;
    setPreview();
}

function setBackgroundColor(c){
    canvas.style.backgroundColor = c;
    preview.style.backgroundColor = c;
}

function toggleTool(e){
    let tool  = e.target.dataset.tool;
    if(tools[tool].enabled){
        tools[tool].enabled = false;
        e.target.style.backgroundColor = "#ddd";
        return;
    }
    for(let i = 0; i < toolBtns.length; i++){
        tools[toolBtns[i].dataset.tool].enabled = false;
        toolBtns[i].style.backgroundColor = "#ddd";
    }

    e.target.style.backgroundColor = "lightgreen";
    tools[tool].enabled = true;
}

function setPreview(){
    preview.innerHTML = `<div class="${shape}" style="background-color:${shapeColor}"></div>`;
}

function toggleMove(b){
    if(b){
        moving = true;
        selectedObject.classList.add("moving");
        canvas.classList.add("moving");
        selectedObject.classList.remove("selected");
        return;
    }
    moving = false;
    selectedObject.classList.remove("moving");
    canvas.classList.remove("moving");
    selectedObject.classList.add("selected");
}

function ctxMenuClick(option){
    if(option == 0){
        toggleMove(true);
        hideCtxMenu();
    }
    else if (option == 1){
        duplicateObject(selectedObject);
    }
    else if (option == 2){
        rotateObject(selectedObject, 45);
    }
    else if (option == 3){
        rotateObject(selectedObject, 90);
    }
    else if(option == 4){
        selectedObject.remove();
        deselectObject(0, 0);
        hideCtxMenu();
    }
}