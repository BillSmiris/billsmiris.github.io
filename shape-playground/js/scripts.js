const loadingScreen = document.getElementById('loading-screen');

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        loadingScreen.style.visibility = "visible";
    } else {
        loadingScreen.style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};

//reference UI elements
const controls = document.getElementById("controls");
const canvas = document.getElementById("canvas");
const shapeBtns = document.querySelectorAll(".shape-btn");
const preview = document.getElementById("preview");
const dimensionX = document.getElementById('dimension-x');
const lockDimensionsBtn = document.querySelector('.lock-dimensions-btn');
const dimensionY = document.getElementById('dimension-y');
const palettes = document.querySelectorAll(".palette");
const toolsElement = document.getElementById("tools");
const toolOptions = document.getElementById("tools-options");
const ctxMenu = document.getElementById("ctxMenu");
var toolBtns = null;

//helper variables
var ctxShow = false;
var moving = false;
var selectedObject = null;
var moveClicked = false;
var initX = 0;
var initY = 0;
var overControls = false;
var shapeX = 20;
var shapeY = 20;
var dimensionsLocked = false;
var argList = {
    rotation : 45
}

//dimensions vars

dimensionX.value = shapeX;
dimensionY.value = shapeY;
//dimesnions vars end

var tools = {
    "rotate" : {
        "icon" : `<i class="bi bi-arrow-clockwise"></i>`, 
        "enabled" : false,
        "options" : "<div class=\"dimension-input-group\">Rotation: <input type=\"number\" value=\"{{rotation}}\" onchange=\"(setRotation(event))\"> deg</div>"
    }, 
    "delete" : {
        "icon" : `<i class="bi bi-x-lg"></i>`, 
        "enabled" : false,
        "options" : ""
    }, 
    "paint" : {
        "icon" : `<i class="bi bi-paint-bucket"></i>`, 
        "enabled" : false,
        "options" : ""
    },
    "move" : {
        "icon" : `<i class="bi bi-arrows-move"></i>`,
        "enabled" : false,
        "options" : ""
    }
};
var shapeColorList = ["red", "green", "blue", "cyan", "magenta", "yellow", "lime", "orange", "purple", "black", "white",];
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

//dimensions

dimensionX.addEventListener("change", () => {
    shapeX = dimensionX.value;
    if(dimensionsLocked){
        shapeY = shapeX;
    }
    setPreview();
})

dimensionY.addEventListener("change", () => {
    shapeY = dimensionY.value;
    setPreview();
})

lockDimensionsBtn.addEventListener("click", lockDimensions);

function lockDimensions() {
    lockDimensionsBtn.classList.toggle('active');
    dimensionsLocked = !dimensionsLocked;
    dimensionY.disabled = !dimensionY.disabled;
    if(dimensionsLocked){
        shapeY = shapeX;
        return;
    }
    shapeY = dimensionY.value;
    setPreview();
} 

//dimensions end

class Palette {
    constructor(paletteElement, colors, colorFunction, renderControls = false){
        this.paletteElement = paletteElement;
        this.colors = colors;
        this.colorFunction = colorFunction;
        this.renderControls = renderControls;
        this.render();
    }

    render(){
        this.paletteElement.innerHTML = '';
        for(let i = 0; i < this.colors.length; i++){
            this.paletteElement.innerHTML += `<div class="color" style="background-color:${this.colors[i]}" onclick="${this.colorFunction}(\'${this.colors[i]}\')"></div>`
        }
        if(this.renderControls){
            let btnRem = document.createElement("button");
            btnRem.classList.add("color");
            btnRem.innerHTML = "-";
            btnRem.onclick = () => {
                this.removeColor();
            }
            this.paletteElement.appendChild(btnRem);

            //append
            let colorPickerDiv = document.createElement('div');
            colorPickerDiv.classList.add("color");

            colorPickerDiv.innerHTML  = "<div>+</div>"

            let colorPicker = document.createElement("input");
            colorPicker.type = "color";
            colorPicker.onchange = (e) => {
                this.appendColor(e.target.value);
            }
            colorPickerDiv.appendChild(colorPicker)
            this.paletteElement.appendChild(colorPickerDiv);
        }
    }

    appendColor(newColor){
        this.colors.push(newColor);
        this.render();
    }

    removeColor(){
        this.colors.pop();
        this.render();
    }
}

const p1 = new Palette(palettes[0], shapeColorList, "setShapeColor", true);
const p2 = new Palette(palettes[1], backgroundColorList, "setBackgroundColor", true)

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
        if(selectedObject){
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
    newObject.style.width = shapeX + "px";
    newObject.style.height = shapeY + "px";
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
        rotateObject(e.target, argList.rotation);
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
    if(selectedObject){
        selectedObject.style.left = x;
        selectedObject.style.top = y;
        selectedObject.classList.remove("selected");
        selectedObject = null;
    }
}

function rotateObject(obj, deg){
    let rotate = obj.style.transform.match(/rotate\((\d+)([^)]+)\)/);
    if(rotate){
        obj.style.transform = `rotate(${(Number(rotate[1])) + deg % 360}deg)`;
        return;
    }
    obj.style.transform = `rotate(${deg}deg)`;
}

function setShape(e){
    shape = e.target.dataset.shape;
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
        toolOptions.innerHTML = "<b>No tool selected.</b>";
        return;
    }
    for(let i = 0; i < toolBtns.length; i++){
        tools[toolBtns[i].dataset.tool].enabled = false;
        toolBtns[i].style.backgroundColor = "#ddd";
    }

    e.target.style.backgroundColor = "lightgreen";
    tools[tool].enabled = true;
    if(tools[tool].options == ""){
        toolOptions.innerHTML = "<b>No options for this tool.</b>";
        return;
    }
    let htmlToAdd = tools[tool].options;
    let args = [...htmlToAdd.match(/(\{\{[a-zA-Z0-9-_]+\}\})/g)];
    for(let i = 0; i < args.length; i++){
        htmlToAdd = htmlToAdd.replaceAll(args[i], argList[args[i].match(/([a-zA-Z0-9-_]+)/g)[0]]);
    }
    toolOptions.innerHTML = htmlToAdd;
}

function setPreview(){
    preview.innerHTML = "";
    let previewShape = document.createElement('div');
    previewShape.classList.add(shape);
    previewShape.style.backgroundColor = shapeColor;
    previewShape.style.width = Math.round(20 * (shapeX / shapeY)) + "px";
    preview.appendChild(previewShape);
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

function setRotation(e){
    argList.rotation = e.target.value;
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
    else if(option == 6){
        selectedObject.remove();
        deselectObject(0, 0);
        hideCtxMenu();
    }
}