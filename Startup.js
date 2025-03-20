const EMPTY = 0;
const WRONG = 1;
const RIGHT = 2;
const INDICATOR = 3;
const ARROWUP = 4;
const ARROWDOWN = 5;

var midPoint = { x:0, y:0 };
var rowSize;
var colSize;

var activeInterval;
var activeKeyRemover;
var imageList = [];
var loadedImgs;
var imgScale;

var bgColor = "white";

var taskList = [];

window.onload = function() {
//	loadImages();
	
	canv = document.getElementById("gc");
	canv.width = window.innerWidth-30;
	canv.height = window.innerHeight-30;
	
	if (canv.width * 21 < canv.height * 10){
		canv.height = canv.width * 10 / 21;
	} else {
		canv.width = canv.height * 21 / 10;
	}
	
	ctx = canv.getContext("2d");
	
	window.addEventListener("blur", () => onBlurFunc);
	
	load();
	
	activeKeyRemover = function(){};
	activeInterval = setInterval(loadInterval, 1000/100);
}

function loadInterval(){
	if (loadedImgs = imageList.length){
		MainMenuManager.setup();
		MainMenuManager.activate();
	}
}

function load(){
	midPoint.x = canv.width/2;
	midPoint.y = canv.height/2;
	
	rowSize = canv.height/10;
	colSize = canv.width/10;
	imgScale = Math.min(rowSize,colSize)
	
	loadedImgs = 0
	imageList.push("imgs/empty.png");
	imageList.push("imgs/wrong.png");
	imageList.push("imgs/right.png");
	imageList.push("imgs/indicator.png");
	imageList.push("imgs/arrow_up.png");
	imageList.push("imgs/arrow_down.png");
	imageList = loadImages(imageList);
}

function loadImages(imagePaths){
	toLoad = imagePaths.length;
	var imgObjs = [];
	
	for (var i = 0; i < toLoad; i += 1){
		imgObjs[i] = new Image();
		imgObjs[i].onload = function() { loadedImgs++; }
		imgObjs[i].src = imagePaths[i];
	}
	
	return imgObjs;
}

function onBlurFunc(evt){
	console.log(evt.keyCode);
	bgColor = "red";
}
