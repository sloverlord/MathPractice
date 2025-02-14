class ToFiftyManager {
	static taskName = "To 50";
	static currNum;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(ToFiftyManager.loop, 1000/100);
		document.addEventListener("keydown", ToFiftyManager.keyPush);
		activeKeyRemover = ToFiftyManager.keyRemover;
		
		ToFiftyManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", ToFiftyManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([ToFiftyManager.taskName, EMPTY, ToFiftyManager.activate]);
	}
	
	static setup(){
		ToFiftyManager.correctCount = 0;
		ToFiftyManager.toAnswer = 10;
		ToFiftyManager.currNum = ToFiftyManager.getNextNum();
	}
	
	static loop(){
		ToFiftyManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < ToFiftyManager.toAnswer; i += 1){
			if (i < ToFiftyManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < ToFiftyManager.correctCount + ToFiftyManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*ToFiftyManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("How far is " + ToFiftyManager.currNum + " from 50?", midPoint.x, rowSize*4);
		ctx.fillText(ToFiftyManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(ToFiftyManager.currAns);
		
		if (toCheck + ToFiftyManager.currNum == 50){
			ToFiftyManager.correctCount += 1;
			
			ToFiftyManager.currNum = ToFiftyManager.getNextNum();
		} else {
			ToFiftyManager.currAns = "";
			ToFiftyManager.currAns = "";
			if (ToFiftyManager.correctCount > 0){
				ToFiftyManager.wrongCount += 1;
				ToFiftyManager.correctCount -= 1;
			}
		}
	}
	
	static getNextNum(){
		if (ToFiftyManager.correctCount == ToFiftyManager.toAnswer){
			CompletedManager.activate(ToFiftyManager.taskName);
		}
		
		ToFiftyManager.currAns = "";
		ToFiftyManager.wrongCount = 0;
		
		return Math.ceil(Math.random() * 30);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//ToFiftyManager.correctCount += 1;
				//ToFiftyManager.currNum = ToFiftyManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				ToFiftyManager.currAns += "0";
				break;
			case 97:
			case 49:
				ToFiftyManager.currAns += "1";
				break;
			case 98:
			case 50:
				ToFiftyManager.currAns += "2";
				break;
			case 99:
			case 51:
				ToFiftyManager.currAns += "3";
				break;
			case 100:
			case 52:
				ToFiftyManager.currAns += "4";
				break;
			case 101:
			case 53:
				ToFiftyManager.currAns += "5";
				break;
			case 102:
			case 54:
				ToFiftyManager.currAns += "6";
				break;
			case 103:
			case 55:
				ToFiftyManager.currAns += "7";
				break;
			case 104:
			case 56:
				ToFiftyManager.currAns += "8";
				break;
			case 105:
			case 57:
				ToFiftyManager.currAns += "9";
				break;
			case 13: // enter
				if (ToFiftyManager.currAns != ""){ ToFiftyManager.checkAnswer(); }
				break;
			case 8: // backspace
				ToFiftyManager.currAns = ToFiftyManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}