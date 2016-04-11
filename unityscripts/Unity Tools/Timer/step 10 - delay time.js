//Delay Time
var playTime		: float 	= 0.0;
var delayTime		: float		= 0.0;
var delayedAmount	: float		= 0.0;
var delayNum		: int		= 0;

var timeActive		: boolean 	= true;

function Update (){
	if (timeActive){										
		playTime = Time.time;	// playTime = current time
	}
	if(playTime > delayTime){
		delayTime = Time.time + delayedAmount;
		print("Delayed for "+ delayNum++);
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Delay Time: "+ delayTime.ToString("f0"));
}