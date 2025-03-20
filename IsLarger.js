class IsLargerManager {
	static taskName = "Larger Number";
	static num1;
	static num2;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	static finished = false;
	static log = [];
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(IsLargerManager.loop, 1000/100);
		document.addEventListener("keydown", IsLargerManager.keyPush);
		activeKeyRemover = IsLargerManager.keyRemover;
		
		IsLargerManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", IsLargerManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([IsLargerManager.taskName, EMPTY, IsLargerManager.activate]);
	}
	
	static setup(){
		IsLargerManager.correctCount = 0;
		IsLargerManager.toAnswer = 10;
		IsLargerManager.nextProblem(0);
	}
	
	static loop(){
		IsLargerManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < IsLargerManager.toAnswer; i += 1){
			if (i < IsLargerManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < IsLargerManager.correctCount + IsLargerManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*IsLargerManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// draw log
	/*	ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "left";
		ctx.fillText("Log", colSize*8.5, rowSize);
		startPoint = 1.5;
		for (var i = 0; i < Math.min(8, IsLargerManager.log.length); i += 1){
			ctx.drawImage(imageList[IsLargerManager.log[i][0]], colSize*8.5, rowSize*(startPoint + i), imgScale, imgScale);
			ctx.fillText(IsLargerManager.log[i][1], colSize*9, rowSize*(startPoint + .75 + i));
		}*/
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("Which is larger " + IsLargerManager.num1 + " or " + IsLargerManager.num2 + "?", midPoint.x, rowSize*4);
		ctx.fillText(IsLargerManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = Number(IsLargerManager.currAns);
		
		if (toCheck == Math.max(IsLargerManager.num1, IsLargerManager.num2)){
			IsLargerManager.correctCount += 1;
			IsLargerManager.log.unshift([RIGHT, toCheck]);
			IsLargerManager.nextProblem(0);
		} else {
			IsLargerManager.log.unshift([WRONG, toCheck]);
			IsLargerManager.currAns = "";
			if (IsLargerManager.correctCount > 0){
				IsLargerManager.wrongCount += 2;
				IsLargerManager.correctCount -= 2;
			}
			IsLargerManager.nextProblem(IsLargerManager.wrongCount);
		}
	}
	
	static nextProblem(wrongs){
		if (IsLargerManager.correctCount == IsLargerManager.toAnswer && !IsLargerManager.finished){
			IsLargerManager.finished = true;
			CompletedManager.activate(IsLargerManager.taskName);
		}
		
		IsLargerManager.currAns = "";
		IsLargerManager.wrongCount = wrongs;
		
		var maxNum = Math.ceil(Math.random() * 1000);
		IsLargerManager.num1 = IsLargerManager.getNextNum(maxNum);
		IsLargerManager.num2 = IsLargerManager.getNextNum(maxNum);
		
		if (IsLargerManager.num2 == IsLargerManager.num1){ IsLargerManager.num2 -= 1; }
	}
	
	static getNextNum(maxNum){
		// highest of 2 numbers
		var first = Math.ceil(Math.random() * maxNum);
		var second = Math.ceil(Math.random() * maxNum);
		
		return Math.max(first, second);
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//IsLargerManager.correctCount += 1;
				//IsLargerManager.num1 = IsLargerManager.getNextNum();
				//break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				IsLargerManager.currAns += "0";
				break;
			case 97:
			case 49:
				IsLargerManager.currAns += "1";
				break;
			case 98:
			case 50:
				IsLargerManager.currAns += "2";
				break;
			case 99:
			case 51:
				IsLargerManager.currAns += "3";
				break;
			case 100:
			case 52:
				IsLargerManager.currAns += "4";
				break;
			case 101:
			case 53:
				IsLargerManager.currAns += "5";
				break;
			case 102:
			case 54:
				IsLargerManager.currAns += "6";
				break;
			case 103:
			case 55:
				IsLargerManager.currAns += "7";
				break;
			case 104:
			case 56:
				IsLargerManager.currAns += "8";
				break;
			case 105:
			case 57:
				IsLargerManager.currAns += "9";
				break;
			case 13: // enter
				if (IsLargerManager.currAns != ""){ IsLargerManager.checkAnswer(); }
				break;
			case 8: // backspace
				IsLargerManager.currAns = IsLargerManager.currAns.slice(0, -1); 
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}

taskList.push(IsLargerManager.createTask);
