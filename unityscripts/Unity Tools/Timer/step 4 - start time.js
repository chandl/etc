//Start time
//Desc: Start time simply starts playTime at zero and stores current time

var playTime	: float = 0.0;
var startTime	: float = 0.0;
var fromStartTime	: float = 0.0;

var timeActive	= true;

function Update (){
	if (timeActive){
		playTime = Time.time;		//playTime = cufrent time
	}
	if(Input.GetKeyDown("i")){
		startTime = Time.time;	
	}
	
	fromStartTime = Time.time - startTime;
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);
	GUILayout.Label("Start Time: "+ startTime);
	GUILayout.Label("From Start Time: "+ fromStartTime);

}