//Since Startup Time
var playTime		: float 	= 0.0;
var actualTime		: float 	= 0.0;
var timeActive		: boolean 	= true;

function Update (){
	if (timeActive){										
		playTime = Time.time;	// playTime = current time
	}
	if (Input.GetKeyDown("0")){
		actualTime = Time.realtimeSinceStartup;
	}
	if (Input.GetKeyDown("2")){
		Time.timeScale = 0.0;
	}
	if (Input.GetKeyUp("2")){
		Time.timeScale = 1.0;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Actual Time: "+ actualTime);
}