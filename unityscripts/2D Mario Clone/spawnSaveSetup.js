//Spawn Save Player Location Setup

//desc: saves player pos/loc (save pts) for spawning after death(killbox)
//instruction: place save points (gameobjs with collision) in the scene with tag names
// place killboxes in scene with tag name 'killbox' - currently sends player to spawn

var startPoint : Transform;
var soundDie : AudioClip;
private var soundRate : float = 0.0;
private var soundDelay : float = 0.0;
var curSavePos : Vector3;
private var loseLife : boolean = false;

function PlaySound(soundName, soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds (audio.clip.length);
	}
}
private var pProp; 
function OnTriggerEnter(other: Collider){
	if (other.tag == "savePoint"){
		curSavePos = transform.position;
	}
	if(other.tag == "killbox"){
		PlaySound(soundDie, 0);
		loseLife = true;
		yield WaitForSeconds(3);
		renderer.enabled = false;
		pProp.changeMario = true;
		pProp.playerState = PlayerState.MarioSmall;
		if(pProp.lives == 0)
			return;
		renderer.enabled = true;
		transform.position = curSavePos;
	}
}
function Start (){
	pProp = GetComponent(playerProperties);
	if(startPoint != null){
		this.transform.position = startPoint.position;
	}
}
function Update(){
	if(loseLife){
		pProp.lives -=1;
		loseLife =false;
	}
}