//Reset time
//Desc: resets current time and/or stopped time to 0

var playTime		: float 	= 0.0;
var stopTime		: float 	= 0.0;
var continueTime	: float 	= 0.0;

var timeActive		: boolean 	= true;

function Update (){
	if (timeActive){										// enables time
		playTime = Time.time - continueTime;								// playTime = cufrent time
	}
	if(Input.GetKeyDown("3")){
		stopTime = Time.time;
		timeActive = false;
	}
	if(Input.GetKeyDown("5")){
		continueTime = Time.time - playTime;
		timeActive = true;
	}
	if(Input.GetKeyDown("6")){
		playTime = 0;
		stopTime = 0;
		timeActive = false;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Stop Time: "+ stopTime);
	GUILayout.Label("Time: "+ Time.time);
}