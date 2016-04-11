//Scene Manager Script

//Inspector Vars
var gameTime:float =20;
static var score:int=0;
static var lives:int=3;
var labelRight : float = 75;
//Private Vars
function Start(){
	InvokeRepeating("CountDown",1.0,1.0);
}
//Game Loop
function Update () {
	if(lives <= 0){
		Application.LoadLevel("loseScreen");
		lives =3;
		gameTime =20;
		PlayerPrefs.SetInt("SCORE",score);
		score =0;
	}
	if(gameTime <= 0){
		Application.LoadLevel("winScreen");
		gameTime = 20;
		lives =3;
		PlayerPrefs.SetInt("SCORE",score);
		score=0;
	}
}

function AddScore(){
	score+=1;
}
function SubtractLife(){
	lives -=1;
}
function OnGUI(){
	GUI.Label(Rect(10,10,100,20),"Score: " + score);
	GUI.Label(Rect(10,25,100,20),"Lives: " + lives);
	GUI.Label(Rect(Screen.width - labelRight,10,100,20),"Time: " + gameTime);
}
function CountDown(){
	if(--gameTime == 0){
		CancelInvoke("CountDown");
	}
}