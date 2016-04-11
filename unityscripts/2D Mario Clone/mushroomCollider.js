//Mushroom Collider Direction
var mushroomDirection : boolean = true;

function OnTriggerEnter (other : Collider){
	if(other.tag == "block" || other.tag == "pickup_mushroom"){
		mushroomDirection = !mushroomDirection;
	}
}