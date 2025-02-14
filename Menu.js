class MainMenuManager {
	static options = [];
	static completed = 0;
	static selector = 0;
	static listStart = 0;
	static toShow = 4;

	static activate(){
	//	MainMenuManager.selector = 0;
		
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(MainMenuManager.loop, 1000/100);
		document.addEventListener("keydown", MainMenuManager.keyPush);
		activeKeyRemover = MainMenuManager.keyRemover;
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", MainMenuManager.keyPush);
	}
	
	static setup(){
		CountingManager.createTask();
		MultiplicationManager.createTask();
		NextTenManager.createTask();
		ToNextManager.createTask();
		ToFiftyManager.createTask();
		ToTimeManager.createTask();
		IsLargerManager.createTask();
		AddingManager.createTask();
		TrippleAddingManager.createTask();
		SubtractingManager.createTask();
	}
	
	static loop (){
		MainMenuManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		
		// draw progression header
		ctx.textAlign = "left";
		ctx.fillStyle = "black";
		var startPoint = 3.23
		var completed = 0;
		for (var i = 0; i <= MainMenuManager.toShow; i += 1){
			ctx.drawImage(imageList[MainMenuManager.options[i + MainMenuManager.listStart][1]], colSize * 1.5, rowSize * (startPoint + i + .25), imgScale, imgScale);
			ctx.fillText(MainMenuManager.options[i + MainMenuManager.listStart][0], colSize * 2.25, rowSize * (startPoint + i + 1));
			
			if (MainMenuManager.options[i][1] == RIGHT){ completed += 1; }
			if (MainMenuManager.selector - MainMenuManager.listStart == i){ ctx.drawImage(imageList[INDICATOR], colSize * 1.5, rowSize * (startPoint + i + .25), imgScale, imgScale); }
		}
		
		var completionRate = completed/MainMenuManager.options.length;
		if (completionRate == 1){
			ctx.fillStyle = "green";
		} else if (completionRate < .5){
			ctx.fillStyle = "red";
		} else {
			ctx.fillStyle = "yellow";
		}
		ctx.fillRect(canv.width*.1, rowSize, canv.width*.8 * completionRate, rowSize);
		ctx.strokeRect(canv.width*.1, rowSize, canv.width*.8, rowSize);
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(completed + "/" + MainMenuManager.options.length, canv.width/2, rowSize*1.75);
		
		// draw more option arrows
		if (MainMenuManager.listStart != 0){
			ctx.drawImage(imageList[ARROWUP], colSize * 1.5, rowSize * (startPoint - .75), imgScale, imgScale);
		}
		
		if (MainMenuManager.listStart + MainMenuManager.toShow + 1 != MainMenuManager.options.length){
			ctx.drawImage(imageList[ARROWDOWN], colSize * 1.5, rowSize * (startPoint + MainMenuManager.toShow + 1.25), imgScale, imgScale);
		}
	}
	
	static menuNavidate(dir){
		if (dir == "up"){
			MainMenuManager.selector = (MainMenuManager.selector-1) >= 0 ? (MainMenuManager.selector-1) : (MainMenuManager.options.length-1);
		} else if (dir == "down"){
			MainMenuManager.selector = (MainMenuManager.selector+1) % MainMenuManager.options.length;
		}
		
		if (MainMenuManager.listStart + MainMenuManager.toShow < MainMenuManager.selector){ MainMenuManager.listStart = MainMenuManager.selector - MainMenuManager.toShow; }
		if (MainMenuManager.listStart > MainMenuManager.selector){ MainMenuManager.listStart = MainMenuManager.selector; }
	}
	
	static markComplete(task){
		for(var i = 0; i < MainMenuManager.options.length; i += 1){
			if (MainMenuManager.options[i][0] == task){
				MainMenuManager.options[i][1] = RIGHT;
//				MainMenuManager.completed += 1;
				return;
			}
		}
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 38: // up
			case 87: // w
				MainMenuManager.menuNavidate("up");
				break;
			case 40: //down
			case 83: // s
				MainMenuManager.menuNavidate("down");
				break;
			case 13: // enter
				MainMenuManager.options[MainMenuManager.selector][2]();
				break;
		}
	}
}