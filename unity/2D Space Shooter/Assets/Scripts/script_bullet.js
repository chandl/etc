//Bullet script

//Inspector Vars
var bulletSpeed: float = 15.0;
var heightLimit: float = 10;
var explosion: Transform;
var sceneManager : GameObject;
var fxSound: AudioClip;
//Private Vars

function Update () {
	transform.Translate(0,bulletSpeed * Time.deltaTime,0);

	if(transform.position.y >= heightLimit){
		Destroy (gameObject);
	}
}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "asteroid"){
		other.transform.position.y = 8;
		other.transform.position.x = Random.Range(-6.1,6.1);
		
		//Make Explosion
		if(explosion){
			Instantiate(explosion, transform.position, transform.rotation);
			audio.PlayClipAtPoint(fxSound, transform.position);
		}
		//tell scene manager to add score
		sceneManager.transform.GetComponent("script_sceneManager").AddScore();
		//Get rid of bullet
		Destroy(gameObject);
	}

}