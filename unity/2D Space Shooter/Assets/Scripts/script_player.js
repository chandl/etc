//Player script

//Inspector Vars

var lives:					int	  = 3;
var playerSpeedVertical: 	float = 10.0;	//Vert speed limit
var playerSpeedHorizontal: 	float = 10.0;	//Horiz speed limit
var horMin:					float = -6.7;	//Low point player can travel x-axis
var horMax: 				float = 6.7;	//High point player can travel x-axis
var vertMin: 				float = -4.0;	//Low point player can travel y-axis
var vertMax: 				float = 6.0;	//High point player can travel y-axis
var projectile:				Transform;
var socketProjectile:		Transform;

//Shield
var shieldNum: 				int   = 4;
var shieldMesh:				Transform;
var shieldKeyInput:			KeyCode;
//Private Vars
private var shieldOn: boolean =false;
//

function Update () {
	//Move player based on input
	var transV: float = Input.GetAxis("Vertical")*playerSpeedVertical*Time.deltaTime;
	var transH: float = Input.GetAxis("Horizontal")*playerSpeedHorizontal*Time.deltaTime;
	
	//Move from imput 
	transform.Translate(transH,transV,0);
	
	//Limit player from going off screen
	transform.position.x = Mathf.Clamp(transform.position.x,horMin,horMax);
	transform.position.y = Mathf.Clamp(transform.position.y,vertMin,vertMax);

	//Create bullet
	if(Input.GetKeyDown("space")){
		Instantiate(projectile, socketProjectile.position, socketProjectile.rotation);
		audio.Play();
	}
	//create shield
	if(Input.GetKeyDown(shieldKeyInput)){
		if(!shieldOn){
			var clone = Instantiate(shieldMesh, transform.position, transform.rotation);
			clone.transform.parent = gameObject.transform;
			shieldOn = true;
		}else{
			
		}
	}
}

