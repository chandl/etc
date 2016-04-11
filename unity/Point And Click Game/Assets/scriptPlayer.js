//Player Script

//Inspector Vars
var tagName 		: String;			//let designer set tag in inspector
var rayDistance 	: float 	= 0;	//length of ray for Raycast
var score 			: int 		= 0;	//score for player
var gameTime		: float		= 20.0; //Length of game
var loadWaitTime	: float		= 3.0; 	//Time to wait after game
var pointsToWin		: int		= 15;	//The number of points to win a game
//Private Vars

function Start()
{
	InvokeRepeating("CountDown",1.0,1.0); //repeat countdown every second
}

//Update is called every frame
function Update () 
{
	//Use mouse button to select on gameObjects in scene
	if(Input.GetMouseButtonDown(0))//0 is LMB
	{
		var hit: RaycastHit;
		var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition); //get mouse position
		//Casts ray against all colliders in scene
		if(Physics.Raycast(ray, hit, rayDistance))//if the mouse clicks on something
		{
			if(hit.transform.tag == tagName)
			{
				//var position = Vector3 (Random.Range(-6,6),Random.Range(-4,4),0);//New random pos for gameObject
				//hit.transform.position=position;//relocate obj to new loc
				var enemyScript = hit.transform.GetComponent(scriptEnemy);//get scriptEnemy file and store it in var enenyScript
				enemyScript.numberOfClicks -= 1;  //Reduce num each click
				//Check that the object is at 0 for adding the points to score
				if(enemyScript.numberOfClicks == 0)
				{
					score += enemyScript.enemyPoints; //Adds points to overall score
				}
			}
			else{ // if not enemy
				print("This is NOT an enemy!");
			}	
		}
	}
}

function CountDown()
{
	if(--gameTime == 0)//subtract from gametime
	{
		CancelInvoke("CountDown"); //cancel countdown 
		//yield.WaitForSeconds(loadWaitTime);
		if(score >= pointsToWin)
		{
			Application.LoadLevel("sceneScreenWin");
		}
		else
		{
			Application.LoadLevel("sceneScreenLose");
		}
	}
}

function OnGUI()
{
	GUI.Label(Rect(10,10,100,20), "Score: " + score);
	GUI.Label(Rect(10,25,100,35), "Time: " + gameTime);
	GUI.Label(Rect(10,500,1000,40),"Game by Chandler Severson - YHS Senior Project");
}