class MultiplicationManager {
	static taskName = "Multiplication";
	static num1;
	static num2;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	static finished = false;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(MultiplicationManager.loop, 1000/100);
		document.addEventListener("keydown", MultiplicationManager.keyPush);
		activeKeyRemover = MultiplicationManager.keyRemover;
		
		MultiplicationManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", MultiplicationManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([MultiplicationManager.taskName, EMPTY, MultiplicationManager.activate]);
	}
	
	static setup(){
		MultiplicationManager.correctCount = 0;
		MultiplicationManager.toAnswer = 10;
		MultiplicationManager.num1 = MultiplicationManager.getNextNum();
		MultiplicationManager.num2 = MultiplicationManager.getNextNum();
	}
	
	static loop(){
		MultiplicationManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < MultiplicationManager.toAnswer; i += 1){
			if (i < MultiplicationManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < MultiplicationManager.correctCount + MultiplicationManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*MultiplicationManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("What is " + MultiplicationManager.num1 + " x " + MultiplicationManager.num2 + "?", midPoint.x, rowSize*4);
		ctx.fillText(MultiplicationManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(MultiplicationManager.currAns);
		
		if (toCheck == MultiplicationManager.num1 * MultiplicationManager.num2){
			MultiplicationManager.correctCount += 1;
			
			MultiplicationManager.num1 = MultiplicationManager.getNextNum();
			MultiplicationManager.num2 = MultiplicationManager.getNextNum();
		} else {
			MultiplicationManager.currAns = "";
			if (MultiplicationManager.correctCount > 0){
				MultiplicationManager.wrongCount += 1;
				MultiplicationManager.correctCount -= 1;
			}
		}
	}
	
	static getNextNum(){
		if (MultiplicationManager.correctCount == MultiplicationManager.toAnswer && !MultiplicationManager.finished){
			MultiplicationManager.finished = true;
			CompletedManager.activate(MultiplicationManager.taskName);
		}
		
		MultiplicationManager.currAns = "";
		MultiplicationManager.wrongCount = 0;
		
		// highest of 2 numbers
		var first = Math.ceil(Math.random() * 10);
		var second = Math.ceil(Math.random() * 10);
		
		return Math.max(first, second);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//MultiplicationManager.correctCount += 1;
				//MultiplicationManager.num1 = MultiplicationManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				MultiplicationManager.currAns += "0";
				break;
			case 97:
			case 49:
				MultiplicationManager.currAns += "1";
				break;
			case 98:
			case 50:
				MultiplicationManager.currAns += "2";
				break;
			case 99:
			case 51:
				MultiplicationManager.currAns += "3";
				break;
			case 100:
			case 52:
				MultiplicationManager.currAns += "4";
				break;
			case 101:
			case 53:
				MultiplicationManager.currAns += "5";
				break;
			case 102:
			case 54:
				MultiplicationManager.currAns += "6";
				break;
			case 103:
			case 55:
				MultiplicationManager.currAns += "7";
				break;
			case 104:
			case 56:
				MultiplicationManager.currAns += "8";
				break;
			case 105:
			case 57:
				MultiplicationManager.currAns += "9";
				break;
			case 13: // enter
				if (MultiplicationManager.currAns != ""){ MultiplicationManager.checkAnswer(); }
				break;
			case 8: // backspace
				MultiplicationManager.currAns = MultiplicationManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}