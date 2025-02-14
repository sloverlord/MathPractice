class TrippleAddingManager {
	static taskName = "Adding 3 Numbers";
	static num1;
	static num2;
	static num3;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	static finished = false;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(TrippleAddingManager.loop, 1000/100);
		document.addEventListener("keydown", TrippleAddingManager.keyPush);
		activeKeyRemover = TrippleAddingManager.keyRemover;
		
		TrippleAddingManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", TrippleAddingManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([TrippleAddingManager.taskName, EMPTY, TrippleAddingManager.activate]);
	}
	
	static setup(){
		TrippleAddingManager.correctCount = 0;
		TrippleAddingManager.toAnswer = 10;
		TrippleAddingManager.nextProblem();
	}
	
	static loop(){
		TrippleAddingManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < TrippleAddingManager.toAnswer; i += 1){
			if (i < TrippleAddingManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < TrippleAddingManager.correctCount + TrippleAddingManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*TrippleAddingManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("What is " + TrippleAddingManager.num1 + " + " + TrippleAddingManager.num2 + " + " + TrippleAddingManager.num3 + "?", midPoint.x, rowSize*4);
		ctx.fillText(TrippleAddingManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(TrippleAddingManager.currAns);
		
		if (toCheck == TrippleAddingManager.num1 + TrippleAddingManager.num2 + TrippleAddingManager.num3){
			TrippleAddingManager.correctCount += 1;
			
			TrippleAddingManager.nextProblem();
		} else {
			TrippleAddingManager.currAns = "";
			if (TrippleAddingManager.correctCount > 0){
				TrippleAddingManager.wrongCount += 1;
				TrippleAddingManager.correctCount -= 1;
			}
		}
	}
	
	static nextProblem(){
		if (TrippleAddingManager.correctCount == TrippleAddingManager.toAnswer && !TrippleAddingManager.finished){
			TrippleAddingManager.finished = true;
			CompletedManager.activate(TrippleAddingManager.taskName);
		}
		
		TrippleAddingManager.currAns = "";
		TrippleAddingManager.wrongCount = 0;
		
		TrippleAddingManager.num1 = TrippleAddingManager.getNextNum();
		TrippleAddingManager.num2 = TrippleAddingManager.getNextNum();
		TrippleAddingManager.num3 = TrippleAddingManager.getNextNum();
	}
	
	static getNextNum(maxNum){
		// highest of 2 numbers
		var first = Math.ceil(Math.random() * 90) + 10;
		var second = Math.ceil(Math.random() * 90) + 10;
		
		return Math.max(first, second);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//TrippleAddingManager.correctCount += 1;
				//TrippleAddingManager.num1 = TrippleAddingManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				TrippleAddingManager.currAns += "0";
				break;
			case 97:
			case 49:
				TrippleAddingManager.currAns += "1";
				break;
			case 98:
			case 50:
				TrippleAddingManager.currAns += "2";
				break;
			case 99:
			case 51:
				TrippleAddingManager.currAns += "3";
				break;
			case 100:
			case 52:
				TrippleAddingManager.currAns += "4";
				break;
			case 101:
			case 53:
				TrippleAddingManager.currAns += "5";
				break;
			case 102:
			case 54:
				TrippleAddingManager.currAns += "6";
				break;
			case 103:
			case 55:
				TrippleAddingManager.currAns += "7";
				break;
			case 104:
			case 56:
				TrippleAddingManager.currAns += "8";
				break;
			case 105:
			case 57:
				TrippleAddingManager.currAns += "9";
				break;
			case 13: // enter
				if (TrippleAddingManager.currAns != ""){ TrippleAddingManager.checkAnswer(); }
				break;
			case 8: // backspace
				TrippleAddingManager.currAns = TrippleAddingManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}

//taskList.push(TrippleAddingManager.createTask);
