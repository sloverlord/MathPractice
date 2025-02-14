class ToNextManager {
	static taskName = "To 10";
	static currNum;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(ToNextManager.loop, 1000/100);
		document.addEventListener("keydown", ToNextManager.keyPush);
		activeKeyRemover = ToNextManager.keyRemover;
		
		ToNextManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", ToNextManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([ToNextManager.taskName, EMPTY, ToNextManager.activate]);
	}
	
	static setup(){
		ToNextManager.correctCount = 0;
		ToNextManager.toAnswer = 10;
		ToNextManager.currNum = ToNextManager.getNextNum();
	}
	
	static loop(){
		ToNextManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < ToNextManager.toAnswer; i += 1){
			if (i < ToNextManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < ToNextManager.correctCount + ToNextManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*ToNextManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("Distance To Next 10: " + ToNextManager.currNum, midPoint.x, rowSize*4);
		ctx.fillText(ToNextManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(ToNextManager.currAns);
		
		if (toCheck + ToNextManager.currNum == Math.ceil(ToNextManager.currNum/10)*10){
			ToNextManager.correctCount += 1;
			
			ToNextManager.currNum = ToNextManager.getNextNum();
		} else {
			ToNextManager.currAns = "";
			if (ToNextManager.correctCount > 0){
				ToNextManager.wrongCount += 1;
				ToNextManager.correctCount -= 1;
			}
		}
	}
	
	static getNextNum(){
		if (ToNextManager.correctCount == ToNextManager.toAnswer){
			CompletedManager.activate(ToNextManager.taskName);
		}
		
		ToNextManager.currAns = "";
		ToNextManager.wrongCount = 0;
		
		return Math.ceil(Math.random() * 10) * 10 - Math.ceil(Math.random() * 9);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//ToNextManager.correctCount += 1;
				//ToNextManager.currNum = ToNextManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				ToNextManager.currAns += "0";
				break;
			case 97:
			case 49:
				ToNextManager.currAns += "1";
				break;
			case 98:
			case 50:
				ToNextManager.currAns += "2";
				break;
			case 99:
			case 51:
				ToNextManager.currAns += "3";
				break;
			case 100:
			case 52:
				ToNextManager.currAns += "4";
				break;
			case 101:
			case 53:
				ToNextManager.currAns += "5";
				break;
			case 102:
			case 54:
				ToNextManager.currAns += "6";
				break;
			case 103:
			case 55:
				ToNextManager.currAns += "7";
				break;
			case 104:
			case 56:
				ToNextManager.currAns += "8";
				break;
			case 105:
			case 57:
				ToNextManager.currAns += "9";
				break;
			case 13: // enter
				if (ToNextManager.currAns != ""){ ToNextManager.checkAnswer(); }
				break;
			case 8: // backspace
				ToNextManager.currAns = ToNextManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}

taskList.push(ToNextManager.createTask);