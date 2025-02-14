class SubtractingManager {
	static taskName = "Subtracting 2 Numbers";
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
		
		activeInterval = setInterval(SubtractingManager.loop, 1000/100);
		document.addEventListener("keydown", SubtractingManager.keyPush);
		activeKeyRemover = SubtractingManager.keyRemover;
		
		SubtractingManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", SubtractingManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([SubtractingManager.taskName, EMPTY, SubtractingManager.activate]);
	}
	
	static setup(){
		SubtractingManager.correctCount = 0;
		SubtractingManager.toAnswer = 10;
		SubtractingManager.nextProblem();
	}
	
	static loop(){
		SubtractingManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < SubtractingManager.toAnswer; i += 1){
			if (i < SubtractingManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < SubtractingManager.correctCount + SubtractingManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*SubtractingManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("What is " + SubtractingManager.num1 + " - " + SubtractingManager.num2 + "?", midPoint.x, rowSize*4);
		ctx.fillText(SubtractingManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(SubtractingManager.currAns);
		
		if (toCheck == SubtractingManager.num1 - SubtractingManager.num2){
			SubtractingManager.correctCount += 1;
			
			SubtractingManager.nextProblem();
		} else {
			SubtractingManager.currAns = "";
			if (SubtractingManager.correctCount > 0){
				SubtractingManager.wrongCount += 1;
				SubtractingManager.correctCount -= 1;
			}
		}
	}
	
	static nextProblem(){
		if (SubtractingManager.correctCount == SubtractingManager.toAnswer && !SubtractingManager.finished){
			SubtractingManager.finished = true;
			CompletedManager.activate(SubtractingManager.taskName);
		}
		
		SubtractingManager.currAns = "";
		SubtractingManager.wrongCount = 0;
		
		var maxNum = Math.ceil(Math.random() * 900) + 100;
		SubtractingManager.num1 = SubtractingManager.getNextNum(maxNum);
		SubtractingManager.num2 = SubtractingManager.getNextNum(SubtractingManager.num1 - 1);
	}
	
	static getNextNum(maxNum){
		// highest of 2 numbers
		var first = Math.ceil(Math.random() * (maxNum-100)) + 100;
		var second = Math.ceil(Math.random() * (maxNum-100)) + 100;
		
		return Math.max(first, second);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//SubtractingManager.correctCount += 1;
				//SubtractingManager.num1 = SubtractingManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				SubtractingManager.currAns += "0";
				break;
			case 97:
			case 49:
				SubtractingManager.currAns += "1";
				break;
			case 98:
			case 50:
				SubtractingManager.currAns += "2";
				break;
			case 99:
			case 51:
				SubtractingManager.currAns += "3";
				break;
			case 100:
			case 52:
				SubtractingManager.currAns += "4";
				break;
			case 101:
			case 53:
				SubtractingManager.currAns += "5";
				break;
			case 102:
			case 54:
				SubtractingManager.currAns += "6";
				break;
			case 103:
			case 55:
				SubtractingManager.currAns += "7";
				break;
			case 104:
			case 56:
				SubtractingManager.currAns += "8";
				break;
			case 105:
			case 57:
				SubtractingManager.currAns += "9";
				break;
			case 13: // enter
				if (SubtractingManager.currAns != ""){ SubtractingManager.checkAnswer(); }
				break;
			case 8: // backspace
				SubtractingManager.currAns = SubtractingManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}

taskList.push(SubtractingManager.createTask);