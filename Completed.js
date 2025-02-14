class CompletedManager {
	static finishedTask;
	
	static activate (task){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(CompletedManager.loop, 1000/100);
		document.addEventListener("keydown", CompletedManager.keyPush);
		activeKeyRemover = CompletedManager.keyRemover;
		
		CompletedManager.finishedTask = task;
		MainMenuManager.markComplete(task);
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", CompletedManager.keyPush);
	}
	
	static loop (){
		CompletedManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("You Finished Your " + CompletedManager.finishedTask + " Practice!", midPoint.x, rowSize*4);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 13: // enter
				MainMenuManager.activate();
				break;
		}
	}
}