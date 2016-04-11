//Credit scene scripts

function Update () {

}

function OnGUI(){
	GUI.BeginGroup(Rect(Screen.width/2 -100, Screen.height/2 -100, 200, 200));
	
	//make a box to see the group on screen
	GUI.Box(Rect (0,0,200,200), "Credits");
	
	//Instructions for player
	GUI.Label(Rect(10,40,200,50), "		Game by: ");
	GUI.Label(Rect(10,70,200,80), "		Chandler Severson");
	GUI.Label(Rect(10,100,200,110), "		YHS Senior Project");
	GUI.Label(Rect(10,130,200,140), "	Music by teknoaxe.com");
	
	//Buttons here
	if(GUI.Button(Rect(60,165,80,30), "Back")){
		Application.LoadLevel("mainMenu");
	}
	
	//end the group previously started
	GUI.EndGroup();
}