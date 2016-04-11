//Main Menu Script

function Update () {

}
function OnGUI(){
	GUI.BeginGroup(Rect(Screen.width/2 -50, Screen.height/2 -50, 100, 175));
	
	//make a box to see the group on screen
	GUI.Box(Rect (0,0,100,175), "Main Menu");
	
	//Add buttons
	if(GUI.Button (Rect(10,30,80,30), "Start Game")){
		Application.LoadLevel("loadScreen");
	}
	if(GUI.Button (Rect(10,65,80,30), "Credits")){
		Application.LoadLevel("creditScreen");
	}
	if(GUI.Button (Rect(10,100,80,30), "Exit")){
		Application.Quit();
	}
	if(GUI.Button (Rect(10,135,80,30), "Homepage")){
		Application.OpenURL("http://chandler.airedigital.net/");
	}
	GUI.EndGroup();
}