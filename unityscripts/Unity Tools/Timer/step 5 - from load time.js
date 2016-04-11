//From load time


var playTime		: float = 0.0;
var startTime		: float = 0.0;
var fromStartTime	: float = 0.0;
var fromLoadTime 	: float = 0.0;
var timeActive		= true;

function Update (){
	if (timeActive){										// enables time
		playTime = Time.time;								// playTime = cufrent time
	}
	if(Input.GetKeyDown("i")){								// press to activate starttime
		startTime = Time.time;								// starttime equals current time
	}
	fromStartTime = Time.time - startTime;					// starts at 0

	if(Input.GetKeyDown("2")){								// press to activate start of the level load time
		fromLoadTime = Time.timeSinceLevelLoad;				// starttime equals orig level start time
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Start Time: "+ startTime);
	GUILayout.Label("From Start Time: "+ fromStartTime);
	GUILayout.Label("From Load Time: "+ fromLoadTime);
}