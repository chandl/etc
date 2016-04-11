//Item Pickup Component
//=======================================
enum PickupType
{
	Grow = 0,
	Key = 1,
	Coin = 2,
	Fireball =3,
	ExtraLife =4,
	GameTime =5
}
//=======================================
var pickupType = PickupType.Grow;
var pickupValue : int  = 0;
var itemParticle : Transform;
var soundItemPickup : AudioClip;
var soundDelay : float = 0.0;
var soundRate : float = 0.0;
var hudGameObject;
//=======================================
private var playerGameObject : GameObject;
private var extraLifeEnabled : boolean = false;
//=======================================
function Start(){
	playerGameObject = GameObject.FindWithTag("Player");
	hudGameObject = GameObject.FindWithTag("hud");
}
//=======================================
function OnTriggerEnter (other: Collider){
	if(other.tag == "collisionBoxBody"){
		var pProp = playerGameObject.GetComponent(playerProperties);
		ApplyPickup(pProp);
		renderer.enabled = false;
		
		if(itemParticle){
			Instantiate (itemParticle, transform.position, transform.rotation);
		}
		if(soundItemPickup){
			PlaySound(soundItemPickup,0);
		}
		yield WaitForSeconds(audio.clip.length);
		if(extraLifeEnabled){
			pProp.lives += pickupValue;
			extraLifeEnabled = false;
		}
		Destroy(gameObject);
	}
}
//=======================================
function ApplyPickup (playerStatus : playerProperties){ 
	var hudConnect = hudGameObject.GetComponent(hudController);
	switch(pickupType){
		case PickupType.Grow:
			if(playerStatus.playerState != PlayerState.MarioFire){
				playerStatus.playerState = PlayerState.MarioLarge;
				playerStatus.changeMario = true;
			}
			break;
		case PickupType.Key:
			playerStatus.AddKeys(pickupValue);
			break;
		case PickupType.Coin:
			playerStatus.AddCoin(pickupValue);
			hudConnect.coin += pickupValue;
			break;
		case PickupType.Fireball:
			playerStatus.playerState = PlayerState.MarioFire;
			playerStatus.hasFire = true;
			playerStatus.changeMario = true;
			break;
		case PickupType.ExtraLife:
			extraLifeEnabled = true;
			break;
		case PickupType.GameTime:
		//playerStatus.AddTime(pickupValue);
			break;
	}
}
//=======================================
function PlaySound(soundName, soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
	}
}
//=======================================
function Update(){
	
}
//=======================================
@script AddComponentMenu("Chandler/Interactive/Pickup Script")
