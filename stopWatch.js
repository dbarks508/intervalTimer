/* 
	Author: Dylan Barks
	Last edited: 12/27/21
	Description: External JS for index.html, a stopwatch and interval workout timer.
 */

// Containers
var dateContainer = document.getElementById("time");
var clockContainer = document.getElementById("runningClock");
var workContainer = document.getElementById("workTime");
var restContainer = document.getElementById("restTime");
var repNumContainer = document.getElementById("repNum");
var plankImage = document.getElementById("plankImg");
var pushImage = document.getElementById("pushImg");
var squatImage = document.getElementById("squatImg");
var totalTimeContainer = document.getElementById("totalTime");
// Buttons
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var plankButton = document.getElementById("startPlank");
var pushButton = document.getElementById("startPushup");
var squatButton = document.getElementById("startSquat");
var splitButton = document.getElementById("split");
// Global Variables
var startTime;
var endTime;
var elapsedTimeMil;
var elapsedTime;
var workTime;
var restTime;
var repTotal;
var repNum;
var splitStart;
// Initialized Global Variables
var countUp = 0;
var digit = 0;
var repCount = 61000;
// Interval IDs
var timeoutID;
var repNumberID;
var intervalID; 
var workIntervalID;
var restIntervalID;

// Function Declarations
function play() {
	var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
	audio.play();
} // end FUNCTION

var TimedWorkout = function(theRepNumber, theRepTime, theRestTime)
{
	this.repNumber = theRepNumber;
	this.repTime = theRepTime;
	this.restTime = theRestTime
	this.setTimer = setUpTimer;
	this.setRestTimer = setUpRestTimer;
	this.displayReps = displayTheReps;
	
	function setUpTimer()
	{
		restTime = this.restTime;
		restContainer.innerHTML = restTime;
		workTime = this.repTime;
		workContainer.innerHTML = workTime;
		workIntervalID = setInterval(decreaseWorkTime, 1000);
		play();
	} // end METHOD
	
	function decreaseWorkTime()
	{	
		workTime = workTime - 1;
		workContainer.innerHTML = workTime;
		if(workTime == 0){
			clearInterval(workIntervalID);
			setUpRestTimer();
		} // end IF
	} // end METHOD
	
	function setUpRestTimer()
	{
		play();
		restIntervalID = setInterval(decreaseRestTime, 1000);
	} // end METHOD
	
	function decreaseRestTime()
	{
		restTime = restTime - 1;
		restContainer.innerHTML = restTime;
		if(restTime == 0){
			clearInterval(restIntervalID);
		} // end IF
	} // end METHOD
	
	function displayTheReps()
	{
		 repTotal = this.repNumber;
		 repNumContainer.innerHTML = repTotal;
	} // end METHOD
} // end CONSTRUCTOR TimedWorkout

function createObjects(workout)
{
	if (workout == "plank"){
		var plank = new TimedWorkout(10, 40, 20);
		plank.setTimer();
		plank.displayReps();
		plankImage.style.background = "FireBrick";
		plankButton.disabled = true;
		pushButton.disabled = true;
		squatButton.disabled = true;
		for(var i=0; i<10; i++){
			timeoutID = setTimeout(function(){plank.setTimer(); repTotal -= 1; 
									repNumContainer.innerHTML = repTotal;}, repCount);
			repCount += 61000;
		}// end FOR
	} else if (workout == "push"){
		var push = new TimedWorkout(12, 20, 40);
		push.setTimer();
		push.displayReps();
		pushImage.style.background = "FireBrick";
		plankButton.disabled = true;
		pushButton.disabled = true;
		squatButton.disabled = true;
		for(var i=0; i<10; i++){
		timeoutID = setTimeout(function(){push.setTimer(); repTotal -= 1; 
								repNumContainer.innerHTML = repTotal;}, repCount);
		repCount += 61000;
		} // end FOR
	} else if (workout == "squat"){
		var squat = new TimedWorkout(8, 30, 30);
		squat.setTimer();
		squat.displayReps();
		squatImage.style.background = "FireBrick";
		plankButton.disabled = true;
		pushButton.disabled = true;
		squatButton.disabled = true;
		for(var i=0; i<10; i++){
		timeoutID = setTimeout(function(){squat.setTimer(); repTotal -= 1; 
								repNumContainer.innerHTML = repTotal;}, repCount);
		repCount += 61000;
		} 
	} // end ELSE IF
} // end FUNCTION createObjects

function setStartTime(){
	intervalID = setInterval(runningClock, 1000);
	startTime = new Date();
	splitStart = new Date();
} // end FUNCTION

function runningClock()
{
	if (countUp >= 10 && countUp != 60){
		countUp += 1;
		clockContainer.innerHTML = digit + ":" + countUp;
	} else if (countUp == 9){
		countUp += 1;
		clockContainer.innerHTML = digit + ":" + countUp;
	} else if (countUp < 9 && countUp != 60){
		countUp += 1;
		clockContainer.innerHTML = digit + ":0" + countUp;
	} else if (countUp == 60){
		countUp = 0;
		digit += 1;
		clockContainer.innerHTML = digit + ":" + countUp;
	} // end ELSE IF
} // end FUNCTION runningClock

function splitTime()
{
	var splitEnd = new Date();
	var elapsedSplitMil = splitEnd - splitStart;
	var elapsedSplit = elapsedSplitMil / 1000;
	dateContainer.innerHTML = elapsedSplit ;
	splitStart = new Date();
} // end Function

function calculateTime(startTime){
	clearInterval(intervalID);
	endTime = new Date();
	elapsedTimeMil = endTime - startTime;
	elapsedTime = elapsedTimeMil / 1000;
	totalTimeContainer.innerHTML = elapsedTime ;
} // end FUNCTION

function eventListeners()
{
	if (startButton.addEventListener)
	{ startButton.addEventListener("click", setStartTime, false); }

	if (stopButton.addEventListener)
	{ stopButton.addEventListener("click", function(){calculateTime(startTime);}, false); }

	if (plankButton.addEventListener)
	{ plankButton.addEventListener("click", function(){createObjects("plank");}, false); }

	if(pushButton.addEventListener)
	{ pushButton.addEventListener("click", function(){createObjects("push");}, false); }

	if(squatButton.addEventListener)
	{ squatButton.addEventListener("click", function(){createObjects("squat");}, false); }

	if(splitButton.addEventListener)
	{ splitButton.addEventListener("click", function(){splitTime();}, false) }
} // end FUNCTION displayTime

function init ()
{
	eventListeners();
} // end FUNCTION init

//XBCEL
if (window.addEventListener)
{ window.addEventListener("load", init, false); }
else if (window.attachEvent)
{ window.attachEvent("onload", init); }
