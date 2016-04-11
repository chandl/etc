//Lose screen scripts

//Inspector vars
var loseQuote: String = "You Lose!";

function OnGUI(){
	GUI.BeginGroup(Rect(Screen.width/2 -100, Screen.height/2 -100, 200, 100));
	
	//make a box to see the group on screen
	GUI.Box(Rect (0,0,200,100), loseQuote);
	
	//Instructions for player
	GUI.Label(Rect(10,30,200,50), "Score: "+ PlayerPrefs.GetInt("SCORE"));

	
	//Buttons here
	if(GUI.Button(Rect(60,60,80,30), "Main Menu")){
		Application.LoadLevel("mainMenu");
	}
	
	//end the group previously started
	GUI.EndGroup();
}