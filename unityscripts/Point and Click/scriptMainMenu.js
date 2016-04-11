//Main Menu Script

//Inspector Vars
//var buttonSize : float = 90;

//Private Vars

function OnGUI () 
{
	GUI.Label(Rect(10,10,1000,40),"To Play: Click the shapes as fast as possible, 15 points to win!");
	if(GUI.Button(Rect(10,60,90,50), "Start Game"))
	{
		Application.LoadLevel("sceneLevel1");
	}
	if(GUI.Button(Rect(10,130,90,50), "Exit Game"))
	{
		Application.Quit();
	}
	GUI.Label(Rect(10,200,1000,40),"Game by Chandler Severson - YHS Senior Project");
}