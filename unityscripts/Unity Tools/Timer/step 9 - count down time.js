//Count Down Time


var playTime		: float 	= 0.0;
var countDownDelay	: float 	= 0.0;
var countDownAmount	: float 	= 0.0;

var timeActive		: boolean 	= false;

function Update (){
	if (timeActive){										
		playTime = countDownDelay - Time.time + countDownAmount;								// playTime = cufrent time
	}
	if(Input.GetKeyDown("7")){
		countDownDelay = Time.time;
		timeActive = true;
	}
	if(playTime < 0){
		timeActive = false;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);

}