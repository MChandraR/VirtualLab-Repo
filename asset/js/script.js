let bgm = new Audio();
let muted = 0;
let volume = .1;
let antiA = document.getElementById("antiA");
let antiB = document.getElementById("antiB");
let sample1 = document.getElementById("sample1");
let sample2 = document.getElementById("sample2");
let sample3 = document.getElementById("sample3");
let kapas = document.getElementById("kapas");
let tabung = document.getElementById("tabung");
let palette = document.getElementById("palette");
let toolsArea = document.getElementById("toolsArea");
let speaker = document.getElementById("speaker");
let body = document.getElementById("body");
let selectedArea = 0;
let tombol_start = document.getElementById("mulai");
let text_area_start = document.getElementById("start-text");
bgm.src = "asset/musik/bgm1.mp3";
bgm.loop = true;
bgm.volume = volume;

let golDarah = ["a","b","ab","o"];

let samples = 
[
    golDarah[Math.floor(Math.random() * golDarah.length)],
    golDarah[Math.floor(Math.random() * golDarah.length)],
    golDarah[Math.floor(Math.random() * golDarah.length)]
];
console.log(samples);
let selectedItem = -1;

function start() {
    console.log("Hallo");
    if (bgm.played) bgm.play();
    tombol_start.classList.toggle("hide");
    text_area_start.classList.toggle("hide");
    body.classList.toggle("start");
    toolsArea.classList.remove("hide");
    palette.classList.remove("hide");
}

function mute() {
    if (muted) {
        muted = 0;
        bgm.volume = volume;
        speaker.src = "asset/gambar/speaker.png";
    } else {
        bgm.volume = 0;
        speaker.src = "asset/gambar/speaker-muted.png";
        muted = 1;
    }
}

antiA.addEventListener("dragstart", () => {
    selectedItem = 3;
});

antiB.addEventListener("dragstart", () => {
    selectedItem = 4;
});

kapas.addEventListener("dragstart", () => {
    selectedItem = 5;
});

sample1.addEventListener("dragstart", () => {
    selectedItem = 0;
});

sample2.addEventListener("dragstart", () => {
    selectedItem = 1;
});

sample3.addEventListener("dragstart", () => {
    selectedItem = 2;
});


let paletteArea = [
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "normal"
];

let areaList = [];
let imgList = [];

for (let idx in paletteArea) {
    let area = document.createElement("div");
    area.classList.add("area");
    area.setAttribute("draggable", "true");
    let img = document.createElement("img");
    img.classList.add("palette-img");
    img.src = "asset/gambar/white.png";
    area.appendChild(img);

    area.addEventListener("mouseover", () => {
        //console.log("area " + idx.toString());
        selectedArea = idx;
    });

    area.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", idx);
        e.dataTransfer.effectAllowed = "move";
        setTimeout(() => {
            area.classList.add('dragging');
        }, 0);
    });

    area.addEventListener("dragend", () => {
        area.classList.remove('dragging');
    });

    imgList.push(img);
    areaList.push(area);
    palette.appendChild(area);
}

document.addEventListener("dragover", (e) => {
    e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    tabung.style.left = (x - 250).toString() + "px";
    tabung.style.top = (y - 450).toString() + "px";

    let elements = document.elementsFromPoint(x, y);
    elements.forEach(el => {
        if (el.classList.contains('area')) {
            let idx = areaList.indexOf(el);
            if (idx !== -1) {
                selectedArea = idx;
                // console.log("area " + idx.toString());
            }
        }
    });
});

function putItem(newIdx){
    if(!selectedItem && selectedItem >= 0)imgList[newIdx].src = "asset/gambar/darah.png";
    else if(selectedItem == 1 )imgList[newIdx].src = "asset/gambar/darah.png";
    else if(selectedItem == 2 )imgList[newIdx].src = "asset/gambar/darah.png";
    else if(selectedItem == 3 ){
        if(paletteArea[newIdx].includes("a")){
            imgList[newIdx].src = "asset/gambar/clot-blood.png";
        }
    }
    else if(selectedItem == 4 ){
        if(paletteArea[newIdx].includes("b")){
            imgList[newIdx].src = "asset/gambar/clot-blood.png";
        }
    }  
    else if(selectedItem == 5 ){
        imgList[newIdx].src = "asset/gambar/white.png";
        paletteArea[newIdx] = "normal";
    }    
    
    if(selectedItem == 0 || selectedItem == 1 || selectedItem == 2){
        paletteArea[newIdx] = samples[selectedItem];
    }
    

    console.log(paletteArea);
}

document.addEventListener("drop", (e) => {
    e.preventDefault();
    let droppedIdx = e.dataTransfer.getData("text/plain");
    console.log("Dropped item index: " + droppedIdx);

    // Detecting the drop location
    let x = e.pageX;
    let y = e.pageY;
    let elements = document.elementsFromPoint(x, y);
    let newIdx = -1;
    elements.forEach(el => {
        if (el.classList.contains('area')) {
            newIdx = areaList.indexOf(el);
        }
    });

    if (newIdx !== -1) {
        putItem(newIdx);
    } 
});


// document.addEventListener("click",()=>{
//     bgm.play();
// })
