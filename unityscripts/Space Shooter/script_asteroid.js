//Asteroid Script


//Inspector Vars
var astroidSpeed: float = 6.0;
var explosion: Transform;
var sceneManager : GameObject;
var shieldExplosionAudio: AudioClip;
var playerDamageAudio: AudioClip;
//Private Vars

function Update () {
	transform.Translate(Vector3.down*astroidSpeed*Time.deltaTime);
	
	if(transform.position.y <= -6){
		ResetEnemy();
	}
	
}

function OnTriggerEnter(other:Collider){
	if(other.gameObject.tag == "Player"){
		
		other.GetComponent("script_player").lives -= 1;
		sceneManager.transform.GetComponent("script_sceneManager").SubtractLife();
		if(explosion){
			Instantiate(explosion, transform.position, transform.rotation);
			audio.clip=playerDamageAudio;
			audio.Play();
		}
		
		ResetEnemy();
	 } 
	 if(other.gameObject.tag == "shield"){
		if(explosion){
			Instantiate(explosion, transform.position, transform.rotation);
			audio.clip=shieldExplosionAudio;
			audio.Play();
		}
		ResetEnemy();
	 } 
}

function ResetEnemy(){
	transform.position.y = 8;
	transform.position.x = Random.Range(-6.1,6.1);
}