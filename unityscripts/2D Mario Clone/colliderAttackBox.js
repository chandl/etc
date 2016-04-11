//Player Collider Attack Component

var hitDistance : float = 3.0;
var hitTime : float = 0.2;
var hitSound : AudioClip;
var deadSound : AudioClip;

private var playerLink : GameObject;
private var hitLeft : boolean = false;
private var hitRight : boolean = false;
private var changeState : boolean = false;
private var soundRate : float = 0.0;
private var soundDelay : float = 0.0;
private var pProp;

function Start(){
	playerLink = GameObject.Find("player");
	pProp = playerLink.GetComponent(playerProperties);
}
function Update () {
	HitLeft();
	HitRight();
	HitDead();
	ChangePlayerState();
}
function OnTriggerEnter(other : Collider){
	if(other.tag == "enemyCollisionLeft"){
		hitLeft = true;
	}
	if(other.tag == "enemyCollisionRight"){
		hitRight = true;
	}
}
function OnTriggerExit(other : Collider){
	if(other.tag == "enemyCollisionLeft"){
		yield WaitForSeconds(hitTime);
		hitLeft = false;
		changeState = true;
	}
	if(other.tag == "enemyCollisionRight"){
		yield WaitForSeconds(hitTime);
		hitRight = false;
		changeState = true;
	}
}
function HitLeft(){
	if(hitLeft){
		PlaySound(hitSound, 0);
		playerLink.transform.Translate(-hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
		yield WaitForSeconds (hitTime);
	}
}
function HitRight(){
	if(hitRight){
		PlaySound(hitSound, 0);
		playerLink.transform.Translate(hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
		yield WaitForSeconds (hitTime);
	}
}
function HitDead(){
	if((hitRight || hitLeft) && pProp.playerState == 1){
		changeState = true;
	}
}
function ChangePlayerState(){
	if(changeState){
		if(pProp.playerState == 0){//chk if player is dead
			pProp.playerState = PlayerState.MarioSmall;
			pProp.changeMario = true;
		}else if (pProp.playerState == 1){//chk if player small
			pProp.dead = true;
			pProp.playerState = PlayerState.MarioDead;
			pProp.changeMario = true;
			PlaySound(deadSound, 0);
		}else if (pProp.playerState == 2){//chk if player large
			pProp.playerState = PlayerState.MarioSmall;
			pProp.changeMario = true;
		}else if (pProp.playerState == 3){//chk if player has fire
			pProp.playerState = PlayerState.MarioLarge;
			pProp.changeMario = true;
		}
		changeState = false;
	}
}
function PlaySound(soundName,soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds(audio.clip.length);
	}
}