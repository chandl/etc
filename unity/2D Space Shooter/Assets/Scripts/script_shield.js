//Shield script

//Inspector vars
var shieldStrength: int =3;
function Update () {
	if (shieldStrength <= 0){
		Destroy(gameObject);
	}	
}
function OnTriggerEnter(other:Collider){
	if(other.tag == "asteroid"){
		shieldStrength -= 1;
	}
}