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
const opacityRange = document.getElementById('opacity-range');
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
var shapeDimX = 20;
var shapeDimY = 20;
var dimensionsLocked = false;
var curPosX;
var curPosY;
var mxPrev = 0;
var myPrev = 0;
var dx;
var dy;
var biggestZIndex = 0;
var opacity = 1;
var argList = {
    rotation : 45
}

//dimensions vars

dimensionX.value = shapeDimX;
dimensionY.value = shapeDimY;
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
    },
    "bringToFront" : {
        "icon" : `<i class="bi bi-front"></i>`,
        "enabled" : false,
        "options" : ""
    },
    "sendToBack" : {
        "icon" : `<i class="bi bi-back"></i>`,
        "enabled" : false,
        "options" : ""
    }
};
var shapeColorList = ["#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#008000", "#ffa500", "#800080", "#000000", "#ffffff",];
var backgroundColorList = ["#ffffff", "#a9a9a9", "#000000"];

var shape = "square";
var shapeColor = hexToRGBA(shapeColorList[0]);
var previewColor = shapeColorList[0];

//initialization start
canvas.style.backgroundColor = backgroundColorList[0];
preview.style.backgroundColor = backgroundColorList[0];

setPreview();

for(let i = 0; i < shapeBtns.length; i++){
    shapeBtns[i].addEventListener("click", setShape);
}

function print(s){
    console.log(s);
}

//dimensions

dimensionX.addEventListener("change", () => {
    shapeDimX = dimensionX.value;
    if(dimensionsLocked){
        shapeDimY = shapeDimX;
    }
    setPreview();
})

dimensionY.addEventListener("change", () => {
    shapeDimY = dimensionY.value;
    setPreview();
})

lockDimensionsBtn.addEventListener("click", lockDimensions);

function lockDimensions() {
    lockDimensionsBtn.classList.toggle('active');
    dimensionsLocked = !dimensionsLocked;
    dimensionY.disabled = !dimensionY.disabled;
    if(dimensionsLocked){
        shapeDimY = shapeDimX;
    }
    else{
        shapeDimY = dimensionY.value;
    }
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

//opacity start
opacityRange.addEventListener('input', (e) => {
    opacity = e.target.value * 0.01;
    shapeColor = hexToRGBA(previewColor);
    setPreview();
});
//opacity end

var curPosX;
var curPosY;
var mxPrev = 0;
var myPrev = 0;
var dx;
var dy;

onmousemove = (e) => {
    if(e.clientX < controls.offsetWidth){
        overControls = true;
    }
    else{
        overControls = false;
    }
    if (moving) {
        //movechange
        // selectedObject.style.top = e.clientY + "px";
        // selectedObject.style.left = e.clientX + "px";
        dx = e.clientX - mxPrev;
        dy = e.clientY - myPrev;
        selectedObject.style.top = (curPosY + dy) + "px";
        selectedObject.style.left = (curPosX + dx) + "px";
        curPosY = curPosY + dy;
        curPosX = curPosX + dx;
    }
    mxPrev = e.clientX;
    myPrev = e.clientY;
    
}

onclick = (e) => {
    if (moving) {
        if(moveClicked && selectedObject){
            toggleMove(false);
            if(overControls){
                deselectObject(initX, initY);
            }
            else{
                //movechange deselectObject(e.clientX + "px", e.clientY + "px");
                deselectObject(curPosX, curPosY);
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
    newObject.style.top = `${canvas.offsetHeight / 2 - shapeDimY / 2}px`;
    newObject.style.left = `${canvas.offsetWidth / 2 - shapeDimX / 2}px`;
    newObject.style.width = shapeDimX + "px";
    newObject.style.height = shapeDimY + "px";
    newObject.style.backgroundColor = shapeColor;
    newObject.style.zIndex = biggestZIndex;
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
    if(tools.bringToFront.enabled){
        bringToFront(e.target);
        return;
    }
    if(tools.sendToBack.enabled){
        sendToBack(e.target);
        return;
    }
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
        initX = Number(selectedObject.style.left.match(/(\d+)/g)[0]);
        initY = Number(selectedObject.style.top.match(/(\d+)/g)[0]);
        print(selectedObject.style.left);
        print(initX);
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
    let x = e.clientX;
    let y = e.clientY;
    if(canvas.offsetWidth - x < ctxMenu.offsetWidth){
        x -= ctxMenu.offsetWidth;
    }
    if(canvas.offsetHeight - y < ctxMenu.offsetHeight){
        y -= ctxMenu.offsetHeight;
    }
    ctxMenu.style.left = x + "px";
    ctxMenu.style.top = y + "px";
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
        selectedObject.style.left = x + "px";
        selectedObject.style.top = y + "px";
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
    //opacity changes
    previewColor = c
    shapeColor = hexToRGBA(c);
    setPreview();
}

function hexToRGBA(c){
    let result = "rgba(";
    for(let i = 1; i < c.length; i += 2){
        result += parseInt(`${c[i]}${c[i + 1]}}`, 16) + ",";
    }
    result += `${opacity})`; 
    console.log()
    return result;
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
    previewShape.style.backgroundColor = previewColor;
    previewShape.style.width = Math.round(20 * (shapeDimX / shapeDimY)) + "px";
    previewShape.style.opacity = opacity;
    preview.appendChild(previewShape);
}

function toggleMove(b){
    if(b){
        moving = true;
        selectedObject.classList.add("moving");
        canvas.classList.add("moving");
        selectedObject.classList.remove("selected");
        curPosX = initX;
        curPosY = initY;
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

function bringToFront(obj){
    let zIndex = obj.style.zIndex;
    if(zIndex == ''){
        obj.style.zIndex = 1;
    }
    else{
        obj.style.zIndex =  Number(zIndex) + 1;
    }
    biggestZIndex++;
}

function sendToBack(obj){
    let zIndex = obj.style.zIndex;
    if(zIndex == ''){
        obj.style.zIndex = -1;
    }
    else{
        obj.style.zIndex =  Number(zIndex) - 1;
    }
}

function centerObject(){
    let centerX = canvas.offsetWidth / 2 - selectedObject.offsetWidth / 2;
    let centerY = canvas.offsetHeight / 2 - selectedObject.offsetHeight / 2;
    deselectObject(centerX, centerY);
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
    else if (option == 4){
        bringToFront(selectedObject);
    }
    else if (option == 5){
        sendToBack(selectedObject);
    }
    else if (option == 6){
        centerObject();
    }
    else if(option == 7){
        selectedObject.remove();
        deselectObject(0, 0);
        hideCtxMenu();
    }
}