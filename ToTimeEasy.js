class Time {
	constructor(hour, minute){
		this.hour = hour;
		this.minute = minute;
	}
	
	getTime = function(){
		var hour = this.hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		var minute = this.minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		
		return hour + ":" + minute;
	}
	
	getString = function(){
		var hour = this.hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		var minute = this.minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		
		return hour + ":" + minute;
	}
	
	add = function(toAdd){
		var result = new Time(this.hour, this.minute);
		
		result.hour += toAdd.hour;
		result.minute += toAdd.minute;
		if (result.minute >= 60){
			result.hour += 1;
			result.minute -= 60;
		}
		
		return result;
	}
	
	subtract = function(toSub){
		var result = new Time(this.hour, this.minute);
		
		result.hour -= toSub.hour;
		result.minute -= toSub.minute;
		
		return result;
	}
	
	isEqual = function(toCompare){
		var same = true;
		
		if (this.hour != toCompare.hour){ same = false; }
		if (this.minute != toCompare.minute){ same = false; }
		
		return same;
	}
}

class ToTimeManager {
	static taskName = "To Time (Easy)";
	static startNum;
	static endNum;
	static currAns;
	static wrongCount;
	static correctCount;
	static toAnswer;
	
	static activate (){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(ToTimeManager.loop, 1000/100);
		document.addEventListener("keydown", ToTimeManager.keyPush);
		activeKeyRemover = ToTimeManager.keyRemover;
		
		ToTimeManager.setup();
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", ToTimeManager.keyPush);
	}
	
	static createTask(){
		MainMenuManager.options.push([ToTimeManager.taskName, EMPTY, ToTimeManager.activate]);
	}
	
	static setup(){
		ToTimeManager.correctCount = 0;
		ToTimeManager.toAnswer = 10;
		ToTimeManager.endNum = ToTimeManager.getNextEndNum();
		ToTimeManager.startNum = ToTimeManager.getNextStartNum(ToTimeManager.endNum);
	}
	
	static loop(){
		ToTimeManager.draw();
	}
	
	static draw(){
		ctx.fillStyle = "white";
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.fillStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// draw icons
		var startPoint = 2.5
		for(var i = 0; i < ToTimeManager.toAnswer; i += 1){
			if (i < ToTimeManager.correctCount){
				ctx.drawImage(imageList[RIGHT], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else if (i < ToTimeManager.correctCount + ToTimeManager.wrongCount){
				ctx.drawImage(imageList[WRONG], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			} else {
				ctx.drawImage(imageList[EMPTY], colSize * (startPoint + (.5*i)), rowSize*5.25, imgScale, imgScale);
			}
		}
		ctx.drawImage(imageList[INDICATOR], colSize * (startPoint + (.5*ToTimeManager.correctCount)), rowSize*5.25, imgScale, imgScale);
		
		// set up text writing
		ctx.font = rowSize-10 + 'px serif';
		ctx.textAlign = "center";
		
		ctx.fillText("How far is " + ToTimeManager.startNum.getTime() + " from " + ToTimeManager.endNum.getTime() + "?", midPoint.x, rowSize*4);
		ctx.fillText(ToTimeManager.currAns, midPoint.x, rowSize*8);
	}
	
	static checkAnswer(){
		var toCheck = ToTimeManager.toTime(ToTimeManager.currAns);
		var same = ToTimeManager.endNum.isEqual(toCheck.add(ToTimeManager.startNum));
		
		if (same){
			ToTimeManager.correctCount += 1;
			
			ToTimeManager.endNum = ToTimeManager.getNextEndNum();
			ToTimeManager.startNum = ToTimeManager.getNextStartNum(ToTimeManager.endNum);
		} else {
			ToTimeManager.currAns = "";
			if (ToTimeManager.correctCount > 0){
				ToTimeManager.wrongCount += 1;
				ToTimeManager.correctCount -= 1;
			}
		}
	}
	
	static getNextEndNum(){
		if (ToTimeManager.correctCount == ToTimeManager.toAnswer){
			CompletedManager.activate(ToTimeManager.taskName);
		}
		
		ToTimeManager.currAns = "";
		ToTimeManager.wrongCount = 0;
		
		var hour = Math.ceil(Math.random() * 10) + 2;
		
		return new Time(hour, 0);
	}
	
	static getNextStartNum(max){
		if (ToTimeManager.correctCount == ToTimeManager.toAnswer){
			CompletedManager.activate(ToTimeManager.taskName);
		}
		
		ToTimeManager.currAns = "";
		ToTimeManager.wrongCount = 0;
		
		var hour = Math.ceil(Math.random() * (max.hour-2));
		var minute = Math.ceil(Math.random() * 59);
		
		return new Time(hour, minute);
	}
	
	static toTime(timeStr){
		var holder = timeStr.split(":", 2);
		
		return new Time(Number(holder[0]), Number(holder[1]));
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 32: // Spacebar ----------------------------------------------------------------------
				//ToTimeManager.correctCount += 1;
				//ToTimeManager.endNum = ToTimeManager.getNextEndNum();
				//ToTimeManager.startNum = ToTimeManager.getNextStartNum(ToTimeManager.endNum);
				break //-------------------------------------------------------------------------------
			case 96:
			case 48:
				ToTimeManager.currAns += "0";
				break;
			case 97:
			case 49:
				ToTimeManager.currAns += "1";
				break;
			case 98:
			case 50:
				ToTimeManager.currAns += "2";
				break;
			case 99:
			case 51:
				ToTimeManager.currAns += "3";
				break;
			case 100:
			case 52:
				ToTimeManager.currAns += "4";
				break;
			case 101:
			case 53:
				ToTimeManager.currAns += "5";
				break;
			case 102:
			case 54:
				ToTimeManager.currAns += "6";
				break;
			case 103:
			case 55:
				ToTimeManager.currAns += "7";
				break;
			case 104:
			case 56:
				ToTimeManager.currAns += "8";
				break;
			case 105:
			case 57:
				ToTimeManager.currAns += "9";
				break;
			case 13: // enter
				if (ToTimeManager.currAns != ""){ ToTimeManager.checkAnswer(); }
				break;
			case 59: // ;
				ToTimeManager.currAns += ":";
				break;
			case 8: // backspace
				ToTimeManager.currAns = ToTimeManager.currAns.slice(0, -1);
				break
			case 27: // escape
				MainMenuManager.activate();
				break
		}
	}
}