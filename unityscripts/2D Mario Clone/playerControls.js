//Player Controller - 2d Mario Clone
// Description: Provides a 2D character with basic movement (idle, crouch, walk, run, jump (walk, run, crouch), and fall)
// Designed to quickly get up and going with a super mario bros style control scheme
// Uses Input and is set for joystick and keyboard (w,a,s,d, arrows, spacebar, control) 
// Control Scheme: 
// a or left arrow    - Move Left
// d or right arrow   - Move Right
// s or down arrow    - Crouch
// spacebar           - Standard Jump - 'Jump'  button
// ctrl + spacebar    - Run Jump      - 'Fire1' button
// s + spacebar       - Crouch Jump
// press down on tube - Tube Activate


var walkSpeed : float = 1.5;
var runSpeed : float = 2.0;
var fallSpeed : float = 2.0;
var walkJump : float = 6.2;
var runJump : float = 9.0;
var crouchJump : float = 10.0;
var gravity : float = 20.0;
var startPos : float = 0.0;
var moveDirection : int = 1;

var particleJump : Transform;

var soundJump : AudioClip;
var soundCrouchJump : AudioClip;

private var soundRate : float = 0.0;
private var soundDelay : float = 0.0;
var velocity : Vector3 = Vector3.zero;
private var jumpEnable : boolean = false;
private var runJumpEnable : boolean = false;
private var crouchJumpEnable : boolean = false;
private var afterHitForceDown : float = 1.0;

function PlaySound (soundName, soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds (audio.clip.length);
	}
}

function Update ()
{
	var particlePlacement : Vector3= Vector3(transform.position.x,  transform.position.y - .5, transform.position.z);
	var aniPlay = GetComponent ("aniSprite");	
	
	var controller : CharacterController = GetComponent ( CharacterController );
	
	if(controller.isGrounded){
		jumpEnable = false;
		runJumpEnable = false;
		crouchJumpEnable = false;
		
		startPos = transform.position.y; //for camera to zoom
		
		velocity = Vector3 (Input.GetAxis("Horizontal"), 0,0);
		
//===============================================================idles
		if(velocity.x == 0 && moveDirection == 1){ //idle right
			aniPlay.aniSprite (16,16,0,0,16,12);
		}
		if(velocity.x == 0 && moveDirection == 0){ //idle left
			aniPlay.aniSprite (16,16,0,1,16,12);
		}
//===============================================================walks
		if(velocity.x < 0 ){//left walking
			velocity *= walkSpeed; //left ani based on walk speed
			aniPlay.aniSprite(16,16,0,3,10,15);
		}	
		if(velocity.x > 0 ){//right walking
			velocity *= walkSpeed; //right ani based on walk speed
			aniPlay.aniSprite(16,16,0,2,10,15);
		}		
//===============================================================runs
		if(velocity.x < 0 && Input.GetButton ("Fire1")){ //run left
			velocity *= runSpeed;
			aniPlay.aniSprite(16,16,0,5,16,24);
		}
		if(velocity.x > 0 && Input.GetButton ("Fire1")){ //run right
			velocity *= runSpeed;
			aniPlay.aniSprite(16,16,0,4,16,24);
		}
//===============================================================crouches
		if(velocity.x == 0 && Input.GetAxis ("Vertical") < 0){
			if(moveDirection == 0){ //left
				velocity.x = 0; //keep player from moving
				aniPlay.aniSprite (16,16,0,9,16,24); // crouch ani
			}else if(moveDirection == 1){//right
				velocity.x = 0; //keep player from moving
				aniPlay.aniSprite (16,16,0,8,16,24); // crouch ani
			}
		}

//===============================================================jumps
		if(Input.GetButton ("Jump") && (!Input.GetButton ("Fire1") || Input.GetButton("Fire1") && velocity.x == 0) && Input.GetAxis("Vertical") >=0){
			velocity.y = walkJump;
			Instantiate(particleJump, particlePlacement, transform.rotation);
			PlaySound(soundJump, 0);
			jumpEnable = true;	
		}
		if(Input.GetButton ("Jump") && Input.GetButton ("Fire1") && velocity.x !=0){
			velocity.y = runJump;
			Instantiate(particleJump, particlePlacement, transform.rotation);
			PlaySound(soundJump, 0);
			runJumpEnable = true;	
		}
		if(Input.GetButton ("Jump") && velocity.x == 0 && Input.GetAxis ("Vertical") < 0){
			velocity.y = crouchJump;
			Instantiate(particleJump, particlePlacement, transform.rotation);
			PlaySound(soundCrouchJump, 0);
			crouchJumpEnable = true;	
		}
//===============================================================
	}
	
	if (!controller.isGrounded){
		velocity.x = Input.GetAxis ("Horizontal");
		//velocity.x *= walkSpeed;
		if (Input.GetButtonUp("Jump")){
			velocity.y = velocity.y - fallSpeed;
		}
//===============================================================left jump
		if(moveDirection == 0){//left direction jump anims
			if(jumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite (16,16,11,3,4,12);
			}
			if(runJumpEnable){
				velocity.x *= runSpeed;
				aniPlay.aniSprite (16,16,11,3,4,12);
			}
			if(crouchJumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite (16,16,12,11,4,12);
			}
		}
//===============================================================right jump
		if(moveDirection == 1){//right direction jump anims
			if(jumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite (16,16,11,2,4,12);
			}
			if(runJumpEnable){
				velocity.x *= runSpeed;
				aniPlay.aniSprite (16,16,11,2,4,12);
			}
			if(crouchJumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite (16,16,12,10,4,12);
			}
		}
//===============================================================setting move directions
	}
	if(velocity.x < 0){
		moveDirection = 0; //movedir left
	}
	if(velocity.x > 0){
		moveDirection = 1;	//movedir right
	}	
//===============================================================
	if(controller.collisionFlags == CollisionFlags.Above){
		velocity.y =0;
		velocity.y -= afterHitForceDown;//apply downward force
	}
	velocity.y -= gravity * Time.deltaTime;
	controller.Move (velocity * Time.deltaTime);
}




