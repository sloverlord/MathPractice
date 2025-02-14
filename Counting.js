class CountingManager {
	static taskName = "Counting";
	static currNum;
	static currCount;
	static currAns;
	static multiples;
	static answerState;
	static restart;
	static completedCounts;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(CountingManager.loop, 1000/100);
		document.addEventListener("keydown", CountingManager.keyPush);
		activeKeyRemover = CountingManager.keyRemover;
		
		CountingManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", CountingManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([CountingManager.taskName, EMPTY, CountingManager.activate]);
	}
	
	static setup(){
		CountingManager.multiples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		CountingManager.currNum = CountingManager.getNextNum();
		CountingManager.completedCounts = [];
	}
	
	static loop(){
		CountingManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
			
		// draw progression header
		var startPoint = 2.23
		for (var i = 1; i <= 10; i += 1){
			ctx.fillText(i, colSize * (startPoint + (.5*i)), rowSize*2);
			
			if (CountingManager.currNum == i){ ctx.drawImage(imageList[INDICATOR], colSize * (2.5 + (.5*(CountingManager.currNum - 1))), rowSize*1.25, imgScale, imgScale); }
		}
		
		for (var i = 0; i <= CountingManager.completedCounts.length; i += 1){
			ctx.drawImage(imageList[RIGHT], colSize * (2.5 + (.5*(CountingManager.completedCounts[i] - 1))), rowSize*1.25, imgScale, imgScale);
		}
		
		// draw icons
		startPoint = 2.5
		for(var i = 0; i < CountingManager.answerState.length; i += 1){
			ctx.drawImage(imageList[CountingManager.answerState[i]], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*(CountingManager.currCount - 1))), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("Count By: " + CountingManager.currNum, midPoint.x, rowSize*4);
		ctx.fillText(CountingManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(CountingManager.currAns);
		
		if (toCheck == CountingManager.currNum * CountingManager.currCount){
			CountingManager.answerState[CountingManager.currCount-1] = RIGHT;
			
			if (CountingManager.restart){
				CountingManager.restartCount();
				return;
			}
			
			if (CountingManager.currCount == CountingManager.answerState.length){
				CountingManager.completedCounts.push(CountingManager.currNum);
				CountingManager.currNum = CountingManager.getNextNum();
			} else {
				CountingManager.currCount += 1;
				CountingManager.currAns = "";
				CountingManager.restart = false;
			}
		} else {
			CountingManager.answerState[CountingManager.currCount-1] = WRONG;
			CountingManager.currAns = "";
			CountingManager.restart = true;
		}
	}
	
	static getNextNum(){
		if (CountingManager.multiples.length == 0){
			//TODO end program (show/log results)
			//clearInterval(activeInterval);
			//activeInterval = setInterval(CountingManager.completedInterval, 1000/100);
			CompletedManager.activate(CountingManager.taskName);
		}
		
		CountingManager.answerState = [0,0,0,0,0,0,0,0,0,0];
		CountingManager.currCount = 1;
		CountingManager.currAns = "";
		CountingManager.restart = false;
		
		var idx = Math.floor(Math.random() * CountingManager.multiples.length);
		
		return CountingManager.multiples.splice(idx, 1);
	}
	
	static restartCount(){
		CountingManager.answerState = [0,0,0,0,0,0,0,0,0,0];
		CountingManager.currCount = 1;
		CountingManager.currAns = "";
		CountingManager.restart = false;
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//CountingManager.completedCounts.push(CountingManager.currNum);
				//CountingManager.currNum = CountingManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				CountingManager.currAns += "0";
				break;
			case 97:
			case 49:
				CountingManager.currAns += "1";
				break;
			case 98:
			case 50:
				CountingManager.currAns += "2";
				break;
			case 99:
			case 51:
				CountingManager.currAns += "3";
				break;
			case 100:
			case 52:
				CountingManager.currAns += "4";
				break;
			case 101:
			case 53:
				CountingManager.currAns += "5";
				break;
			case 102:
			case 54:
				CountingManager.currAns += "6";
				break;
			case 103:
			case 55:
				CountingManager.currAns += "7";
				break;
			case 104:
			case 56:
				CountingManager.currAns += "8";
				break;
			case 105:
			case 57:
				CountingManager.currAns += "9";
				break;
			case 13: // enter
				if (CountingManager.currAns != ""){ CountingManager.checkAnswer(); }
				break;
			case 8: // backspace
				CountingManager.currAns = CountingManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}