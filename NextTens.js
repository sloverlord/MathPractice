class NextTenManager {
	static taskName = "Next 10's";
	static currNum;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(NextTenManager.loop, 1000/100);
		document.addEventListener("keydown", NextTenManager.keyPush);
		activeKeyRemover = NextTenManager.keyRemover;
		
		NextTenManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", NextTenManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([NextTenManager.taskName, EMPTY, NextTenManager.activate]);
	}
	
	static setup(){
		NextTenManager.correctCount = 0;
		NextTenManager.toAnswer = 10;
		NextTenManager.currNum = NextTenManager.getNextNum();
	}
	
	static loop(){
		NextTenManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < NextTenManager.toAnswer; i += 1){
			if (i < NextTenManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < NextTenManager.correctCount + NextTenManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*NextTenManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("Next 10's Place For: " + NextTenManager.currNum, midPoint.x, rowSize*4);
		ctx.fillText(NextTenManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(NextTenManager.currAns);
		
		if (toCheck == Math.ceil(NextTenManager.currNum/10)*10){
			NextTenManager.correctCount += 1;
			
			NextTenManager.currNum = NextTenManager.getNextNum();
		} else {
			NextTenManager.currAns = "";
			if (NextTenManager.correctCount > 0){
				NextTenManager.wrongCount += 1;
				NextTenManager.correctCount -= 1;
			}
		}
	}
	
	static getNextNum(){
		if (NextTenManager.correctCount == NextTenManager.toAnswer){
			CompletedManager.activate(NextTenManager.taskName);
		}
		
		NextTenManager.currAns = "";
		NextTenManager.wrongCount = 0;
		
		return Math.ceil(Math.random() * 10) * 10 - Math.ceil(Math.random() * 9);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//NextTenManager.correctCount += 1;
				//NextTenManager.currNum = NextTenManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				NextTenManager.currAns += "0";
				break;
			case 97:
			case 49:
				NextTenManager.currAns += "1";
				break;
			case 98:
			case 50:
				NextTenManager.currAns += "2";
				break;
			case 99:
			case 51:
				NextTenManager.currAns += "3";
				break;
			case 100:
			case 52:
				NextTenManager.currAns += "4";
				break;
			case 101:
			case 53:
				NextTenManager.currAns += "5";
				break;
			case 102:
			case 54:
				NextTenManager.currAns += "6";
				break;
			case 103:
			case 55:
				NextTenManager.currAns += "7";
				break;
			case 104:
			case 56:
				NextTenManager.currAns += "8";
				break;
			case 105:
			case 57:
				NextTenManager.currAns += "9";
				break;
			case 13: // enter
				if (NextTenManager.currAns != ""){ NextTenManager.checkAnswer(); }
				break;
			case 8: // backspace
				NextTenManager.currAns = NextTenManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}