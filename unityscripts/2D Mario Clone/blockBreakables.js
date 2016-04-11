//Block Breakables Component

var breakableTime : float = 2.5;
var soundBumpBreak : AudioClip;

function FixedUpdate (){
	rigidbody.AddForce(Vector3.up * 250);
	BreakableWait();
	rigidbody.AddForce(Vector3.up * -200);
	Destroy (this.gameObject, breakableTime);
}

function BreakableWait(){
	yield WaitForSeconds(breakableTime);
}

function Start(){
	audio.clip = soundBumpBreak;
	audio.Play();
}