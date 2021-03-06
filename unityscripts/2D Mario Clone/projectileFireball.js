//Fireball Projectile

var moveSpeed : float = 1.0;
var bounceHeight : float = .25;
var lifespan : float = 2.0;
var hitPosition : float = 0.0;
var bounceUp : boolean = false;
var heightDifference : float = 0.0;

var smokePuff : Transform;

function Start (){
	KillFireball();
}
function Update (){
	if(bounceUp == true){
		transform.Translate(moveSpeed * Time.deltaTime, .75 * Time.deltaTime, 0);
		heightDifference = transform.position.y - hitPosition;
		if(bounceHeight <= heightDifference){
			bounceUp = false;
		}
	}
	else{
		transform.Translate(moveSpeed * Time.deltaTime, -1.0 * Time.deltaTime, 0);
	}
}
function OnTriggerEnter (other: Collider){
	if(other.transform.tag == "Untagged"){
		var hit : RaycastHit;
		if(Physics.Raycast(transform.position, Vector3(1,0,0), hit, 0.1) || Physics.Raycast(transform.position, Vector3(-1,0,0), hit, 0.1)){
			ParticlePlay();
			Destroy(gameObject);
		}else{
			bounceUp = true;
			hitPosition = transform.position.y;
		}
	}
	if(other.transform.tag == "enemy"){
		ParticlePlay();
		Destroy(other.gameObject);
		Destroy(gameObject);
	}
}
function KillFireball(){
	ParticlePlay();
	Destroy(gameObject,lifespan);
}
function ParticlePlay(){
	if(smokePuff)
		Instantiate (smokePuff, transform.position,transform.rotation);
	else
		Debug.Log("SmokePuff not loaded!");
}