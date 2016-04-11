//Win Screen

//Inspector Vars
//var buttonSize : float = 90;

//Private Vars

function OnGUI () 
{
	GUI.Label(Rect(10,10,1000,40),"YOU WIN!!! (You Got 15+ Points!)");
	if(GUI.Button(Rect(10,60,90,50), "Play Again"))
	{
		Application.LoadLevel("sceneLevel1");
	}
	if(GUI.Button(Rect(10,130,90,50), "Exit Game"))
	{
		Application.Quit();
	}
	GUI.Label(Rect(10,200,1000,40),"Game by Chandler Severson - YHS Senior Project");
}