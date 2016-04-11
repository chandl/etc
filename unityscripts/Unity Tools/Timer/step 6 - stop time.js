//Stop time

var playTime		: float = 0.0;
var stopTime		: float = 0.0;
var pauseGameTime	: float = 0.0;

var timeActive		= true;

function Update (){
	if (timeActive){										// enables time
		playTime = Time.time;								// playTime = cufrent time
	}
	if(Input.GetKeyDown("3")){
		stopTime = Time.time;
		timeActive = false;
	}
	if(Input.GetKeyDown("4")){
		Time.timeScale = 0.0;
	}
		if(Input.GetKeyUp("4")){
		Time.timeScale = 1.0;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Stop Time: "+ stopTime);
	GUILayout.Label("Pause Game Time: "+ pauseGameTime);
}