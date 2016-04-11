//Mushroom setup for grow and 1up

var mushroomDirection : GameObject;
var mushroomSpeed : float = 1.0;
function Update ()
{
	moveDirection = mushroomDirection.GetComponent(mushroomCollider).mushroomDirection; //get collider info on mushroomcollider.js
	if(moveDirection){
		mushroomSpeed = 1;
	}else if (!moveDirection){
		mushroomSpeed = -1;
	}
	
	transform.Translate(mushroomSpeed * Time.deltaTime,0,0);
}