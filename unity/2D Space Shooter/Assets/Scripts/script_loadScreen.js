//Load Screen Script

//Inspector Vars
var waitTime: float = 3.0;
function Update () {
	//wait timer
	if(Input.GetKeyDown("space")){
		Application.LoadLevel("level_01");
	}else{
		WaitTime();
	}
}

function OnGUI(){
	GUI.BeginGroup(Rect(Screen.width/2 -100, Screen.height/2 -100, 200, 200));
	
	//make a box to see the group on screen
	GUI.Box(Rect (0,0,200,200), "Instructions");
	
	//Instructions for player
	GUI.Label(Rect(10,30,140,40), "Arrow Keys to Move");
	GUI.Label(Rect(10,60,160,70), "Spacebar to Shoot");
	GUI.Label(Rect(10,90,160,90), "E for Shield");
	GUI.Label(Rect(10,120,200,110), "Win by Not Dying for 20sec!");
	
	//end the group previously started
	GUI.EndGroup();
}

function WaitTime(){
	yield WaitForSeconds(waitTime);
	Application.LoadLevel("level_01");
}