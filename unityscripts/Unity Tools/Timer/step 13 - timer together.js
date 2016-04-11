//Everything
var anifont1 : GameObject;
var anifont2 : GameObject;
var anifont3 : GameObject;
var anifont4 : GameObject;

var marioGui: GUISkin;

var playTime	: float = 0.0;
var days 		: float = 0.0;
var hours 		: float = 0.0;
var minutes 	: float = 0.0;
var seconds 	: float = 0.0;
var fractions 	: float = 0.0;
//-----------------------
var startTime	: float = 0.0;
var fromStartTime	: float = 0.0;
var fromLoadTime 	: float = 0.0;
//-----------------------
var stopTime		: float = 0.0;
var pauseGameTime	: float = 0.0;
var continueTime	: float 	= 0.0;
//-----------------------
var countDownDelay	: float 	= 0.0;
var countDownAmount	: float 	= 0.0;
var countDownEnabled: boolean = false;
//-----------------------
var delayTime		: float		= 0.0;
var delayRate	: float		= 0.0;
var delayNum		: int		= 0;
//-----------------------
var addToTimeAmount	: float		= 0.0;
var timeAmount		: float 	= 0.0;
//-----------------------
var actualTime		: float 	= 0.0;
//-----------------------
var playTimeEnabled		: boolean = true;
var realTimeEnabled 	: boolean = false;
function Update ()
{
	days 		= (playTime / 86400) % 365;
	hours 		= (playTime / 3600) % 24;
	minutes 	= (playTime / 60) % 60;
	seconds 	= (playTime % 60);
	fractions 	= (playTime * 10) % 10;
//======================= part 1 - start time
	if (playTimeEnabled && !countDownEnabled){
		playTime = Time.time - startTime + addToTimeAmount;		//playTime = cufrent time
	}
	
	if(Input.GetKeyDown("1")){		
		startTime = Time.time;	
		addToTime = 0;
		continueTime = 0;
		playTimeEnabled = true;
		countDownEnabled = false;
	}

//======================= part 2 - from load time
	if(Input.GetKeyDown("2")){						// press to activate start of the level load time
		fromLoadTime = Time.timeSinceLevelLoad;		// starttime equals orig level start time
		startTime = 0;
		addtoTime = 0;
		playTimeEnabled = false;
		realTineEnabled = falsecountDownEnabled = false;
		fromLoadTimeEnabled = true;
	}
	if( fromLoadTimeEnabled && !playTimeEnabled)
		playTime = Time.timeSinceLevelLoad + addtoTime;
//======================= part 3 - stop time - stop and game pause
	if(Input.GetKeyDown("3")){	//stop time (play time)
		stopTime = Time.time;
		addToTime = 0;
		playTimeEnabled = false;
		continueTimeEnabled = false;
		realTineEnabled = false;
		countDownEnabled = false;
		fromLoadTimeEnabled = false;
	}
	
	if(Input.GetKeyDown("4")){	//pause time
		Time.timeScale = 0.0;
	}else if(Input.GetKeyUp("4")){	//unpause time
		Time.timeScale = 1.0;
	}

//======================= part  4 - continue time - continue from stopped time
	if(Input.GetKeyDown("5")){	//continue time
		continueTime = Time.time - playTime;
		playTimeEnabled = true;
		startTime = 0;
		addtoTime = 0;
		countDownEnabled = false;
	}
//======================= part 5 - reset time
	pauseGameTime = Time.time;
	if(Input.GetKeyDown("6")){	//reset time
		playTime = 0;
		stopTime = 0;
		continueTime = 0;
		addToTime = 0;
		continueTimeEnabled = false;
		realTineEnabled = false;
		fromLoadTimeEnabled = false;
		countDownEnabled = false;
		playTimeEnabled = false;
	}
//======================= part 6 - count down time (to and from need added)
	if(playTimeEnabled && countDownEnabled){
		playtime = countDownDelay - Time.time + countDownAmount;
	}
	if(Input.GetKeyDown("7")){	// countdown
		countDownDelay = Time.time;
		playTimeEnabled = false;
		countDownEnabled = true;
		addToTime = 0;
	}
	if(playTime < 0){
		playTimeEnabled = false;
		countDownEnabled = false;
	}
//======================= part 7 - delay time
	if(playTime > delayTime){	//delay time
		delayTime = Time.time + delayRate;
		print("Delayed for "+ delayRate + " seconds");
	}
//======================= part 8 - add to time
	if(Input.GetKeyDown("8")){	// press to activate add to timer single amt
		addToTimeAmount = timeAmount;
	}
	if(Input.GetKeyDown("9")){	// press to activate add to timer single amt
		addToTimeAmount += timeAmount;
	}
//=======================part 9 - actual time since start of game
	if (Input.GetKeyDown("0")){
		actualTime = Time.realtimeSinceStartup;
		startTime = 0;
		addToTime = 0;
		playTimeEnabled = false;
		realTineEnabled = true;
		fromLoadTimeEnabled = false;
	}
	if(realTimeEnabled && !playTimeEnabled && !fromLoadTimeEnabled){
		playTime = Time.realtimeSinceStartup + addToTime;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime.ToString("f4"));
	
	GUILayout.Label("1-Start Time");
	GUILayout.Label("2-From Load Time");
	GUILayout.Label("3-Stop Time");
	GUILayout.Label("4-Pause Game Time");
	GUILayout.Label("5-Continue Game Time");
	GUILayout.Label("6-Reset Time");
	GUILayout.Label("7-Count Down Time");
	GUILayout.Label("8-Add to Time Once");
	GUILayout.Label("9-Add to Time Multi");
	GUILayout.Label("0-Time Since Startup");


	GUILayout.Label("Minutes: "		+ minutes.ToString("f0"));
	GUILayout.Label("Seconds: "		+ seconds.ToString("f0"));
	GUILayout.Label("Fractions: "	+ fractions.ToString("f1"));
	
	GUILayout.Label("Delay Time: "+ delayTime.ToString("f0"));
}