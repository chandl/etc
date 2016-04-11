//Enemy Script

//Inspector Vars
var numberOfClicks 	: int 		= 2;		// How many times to click on obj
var respawnWaitTime : float 	= 2.0;		// Wait time after object is destroyed
var shapeColor 		: Color[];				// Color of Objects
var explosion 		: Transform;			// Load particle effect
var enemyPoints 	: int 		= 1;		// Value of the enemy object
var blink			: boolean	= false;
var blinkTime		: float		= 3.0;
var blinkPeriod		: float		= 0.5;
//Private Vars
private var storeClicks : int = 0;

//Start only called once @ beginning
function Start()
{
	storeClicks = numberOfClicks;
	var startposition = Vector3 (Random.Range(-6,6),Random.Range(-4,4),0);//New random pos for gameObject
	transform.position=startposition;
	RandomColor();
}
//Update is called every frame
function Update () 
{
	if(numberOfClicks <= 0)
	{
		if(explosion)
		{
			Instantiate(explosion, transform.position, transform.rotation); // create explosion
		}
		var position = Vector3 (Random.Range(-6,6),Random.Range(-4,4),0);//New random pos for gameObject
		RespawnWaitTime();
		transform.position=position;//relocate obj to new loc
		numberOfClicks=storeClicks;
	}
}

function RespawnWaitTime()//Respawn object after time
{
	renderer.enabled = false;
	RandomColor();
	yield WaitForSeconds(respawnWaitTime);
	renderer.enabled = true;
}

function Blink()
{
	if(blink)
	{
		renderer.enabled = false;
		yield WaitForSeconds(blinkTime);
		renderer.enabled = true;
		yield WaitForSeconds(blinkPeriod);

	}else{
	
	}
}

function RandomColor()//Generates random color after respawn/click
{
	if(shapeColor.Length > 0){
		var newColor = Random.Range(0, shapeColor.length);
		renderer.material.color = shapeColor[newColor];	
	}
	else{
	}
}
