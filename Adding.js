class AddingManager {
	static taskName = "Adding 2 Numbers";
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
		
		activeInterval = setInterval(AddingManager.loop, 1000/100);
		document.addEventListener("keydown", AddingManager.keyPush);
		activeKeyRemover = AddingManager.keyRemover;
		
		AddingManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", AddingManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([AddingManager.taskName, EMPTY, AddingManager.activate]);
	}
	
	static setup(){
		AddingManager.correctCount = 0;
		AddingManager.toAnswer = 10;
		AddingManager.nextProblem();
	}
	
	static loop(){
		AddingManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < AddingManager.toAnswer; i += 1){
			if (i < AddingManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < AddingManager.correctCount + AddingManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*AddingManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("What is " + AddingManager.num1 + " + " + AddingManager.num2 + "?", midPoint.x, rowSize*4);
		ctx.fillText(AddingManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(AddingManager.currAns);
		
		if (toCheck == AddingManager.num1 + AddingManager.num2){
			AddingManager.correctCount += 1;
			
			AddingManager.nextProblem();
		} else {
			AddingManager.currAns = "";
			if (AddingManager.correctCount > 0){
				AddingManager.wrongCount += 1;
				AddingManager.correctCount -= 1;
			}
		}
	}
	
	static nextProblem(){
		if (AddingManager.correctCount == AddingManager.toAnswer && !AddingManager.finished){
			AddingManager.finished = true;
			CompletedManager.activate(AddingManager.taskName);
		}
		
		AddingManager.currAns = "";
		AddingManager.wrongCount = 0;
		
		var maxNum = Math.ceil(Math.random() * 900);
		AddingManager.num1 = AddingManager.getNextNum(maxNum);
		AddingManager.num2 = AddingManager.getNextNum(maxNum);
	}
	
	static getNextNum(maxNum){
		// highest of 2 numbers
		var first = Math.ceil(Math.random() * maxNum) + 100;
		var second = Math.ceil(Math.random() * maxNum) + 100;
		
		return Math.max(first, second);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//AddingManager.correctCount += 1;
				//AddingManager.num1 = AddingManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				AddingManager.currAns += "0";
				break;
			case 97:
			case 49:
				AddingManager.currAns += "1";
				break;
			case 98:
			case 50:
				AddingManager.currAns += "2";
				break;
			case 99:
			case 51:
				AddingManager.currAns += "3";
				break;
			case 100:
			case 52:
				AddingManager.currAns += "4";
				break;
			case 101:
			case 53:
				AddingManager.currAns += "5";
				break;
			case 102:
			case 54:
				AddingManager.currAns += "6";
				break;
			case 103:
			case 55:
				AddingManager.currAns += "7";
				break;
			case 104:
			case 56:
				AddingManager.currAns += "8";
				break;
			case 105:
			case 57:
				AddingManager.currAns += "9";
				break;
			case 13: // enter
				if (AddingManager.currAns != ""){ AddingManager.checkAnswer(); }
				break;
			case 8: // backspace
				AddingManager.currAns = AddingManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}