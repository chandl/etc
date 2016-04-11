//Player Properties Component
//Desc: Set and store pickup and state of player

enum PlayerState{ //player state enumeration
	MarioDead=0,
	MarioSmall=1,
	MarioLarge=2,
	MarioFire=3
}
//========================================inspector vars
var playerState = PlayerState.MarioSmall;	//set playerstate of mario in inspector
var lives : int = 3;
var key : int = 0;
var coins : int = 0;
var projectileFire : GameObject;
var projectileSocketRight : Transform;
var projectileSocketLeft : Transform;
var materialMarioStandard : Material;
var materialMarioFire : Material;
var changeMario : boolean = false;
var hasFire : boolean = false;
//----------------------------------------

//========================================private vars
private var coinLife : int = 20;
private var canShoot : boolean = false;
private var dead : boolean = false;
//----------------------------------------

//========================================update function
function Update (){
	var playerControls = GetComponent ("playerControls");
	PlayerLives();
	if (changeMario){
		SetPlayerState();
	}
	if(canShoot){
		var clone;
		if(Input.GetButtonDown ("Fire1") && projectileFire && playerControls.moveDirection == 0){
			clone = Instantiate (projectileFire, projectileSocketLeft.transform.position, transform.rotation);
			//clone.rigidbody.AddForce(-90,0,0);
			clone.GetComponent(projectileFireball).moveSpeed = -2.0;
		}
		if(Input.GetButtonDown ("Fire1") && projectileFire && playerControls.moveDirection == 1){
			clone = Instantiate (projectileFire, projectileSocketRight.transform.position, transform.rotation);
			//clone.rigidbody.AddForce(90,0,0);
			clone.GetComponent(projectileFireball).moveSpeed = 2.0;
		}
	}else return;
}
//----------------------------------------

//========================================Adds Keys
function AddKeys(numKey : int){
	key += numKey;
}
//----------------------------------------

//========================================Adds Coins
function AddCoin( numCoin : int){
	coins = coins + numCoin;
}
//----------------------------------------

//========================================player state options
function SetPlayerState(){
	var playerControls = GetComponent ("playerControls");
	var charController = GetComponent (CharacterController);
	
	switch(playerState){
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	small mario	
		case PlayerState.MarioSmall :
			playerControls.gravity = 0.0;
			transform.Translate(0,.2,0);
			transform.localScale = Vector3 (1.0,0.75,1.0);
			charController.height = 0.45;
			transform.renderer.material = materialMarioStandard;
			playerControls.gravity = 20.0;
			canShoot = false;
			changeMario = false;
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ large mario
		case PlayerState.MarioLarge :
			playerControls.gravity = 0.0;
			transform.Translate(0,.2,0);
			charController.height = 0.50;
			transform.localScale = Vector3 (1.0,1.0,1.0);
			transform.renderer.material = materialMarioStandard;
			playerControls.gravity = 20.0;
			canShoot = false;
			changeMario = false;
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	fireball mario		
		case PlayerState.MarioFire :
			playerControls.gravity = 0.0;
			transform.Translate(0,.2,0);
			charController.height = 0.50;
			transform.localScale = Vector3 (1.0,1.0,1.0);
			transform.renderer.material = materialMarioFire;
			canShoot = true;
			playerControls.gravity = 20.0;
			changeMario = false;
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	dead mario		
		case PlayerState.MarioDead :
			playerControls.gravity = 0.0;
			this.transform.Translate (0,3 * Time.deltaTime,0);
			this.transform.position.z =-1;
			yield WaitForSeconds(.4);
			playerControls.gravity = 20.0;
			yield WaitForSeconds(2);
			if(dead){
				lives --;
				this.transform.position = GetComponent (spawnSaveSetup).curSavePos;
				playerState = PlayerState.MarioSmall;
				changeMario = true;
				dead = false;
			}
			changeMario = false;
			break;
	}
	
}
//----------------------------------------

var soundDie : AudioClip;
private var soundRate :float = 0.0;
private var soundDelay :float = 0.0;

function PlayerLives(){
	if(lives == 0){
		PlaySound(soundDie, 0);
		yield WaitForSeconds(3);
		Application.LoadLevel ("2D Mario Screen Lose");
	}
}


//========================================adds menu item
@script AddComponentMenu ("Chandler/Actor/Player Properties Script")
//----------------------------------------

function PlaySound(soundName,soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds(audio.clip.length);
	}
}