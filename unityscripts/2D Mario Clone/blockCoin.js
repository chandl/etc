//Coin Setup for blocks

var coinValue : int = 1;
var coinParticle : Transform;
var soundCoinPickup : AudioClip;
var playerGameObject;
var hudGameObject;

private var coinTime : float = 0.2;

function KillCoin(){
	yield WaitForSeconds(coinTime);
	Instantiate (coinParticle, transform.position,transform.rotation);
	Destroy(gameObject);
}

function Update (){
	var aniPlay = GetComponent("aniSprite");
	aniPlay.aniSprite(16,2,0,0,21,12);
	transform.Translate(0,Time.deltaTime *5, 0);
	KillCoin();
}
