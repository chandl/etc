//Path Nodes
enum PathInstruction {moveLeft,moveRight,moveStop,jumpAir}
var pathInstruction = PathInstruction.moveStop;

var overrideJump : boolean = false;
var jumpOverride : float = 8.0;

var changePathInstructionTo : boolean = false;
enum ChangeTo {moveLeft,moveRight,moveStop,jumpAir, removeTrigger}
var changeTo = ChangeTo.moveRight;
var triggerCountDown : int = 2;
var removeOnTrigger : boolean = false;

private var getChangeTo : int;
function OnTriggerEnter(other:Collider){
	if(other.tag == "enemy"){
		if(changePathInstructionTo){
			if(triggerCountDown <= 0){
				if(changeTo == ChangeTo.removeTrigger){
					Destroy(gameObject);
				}
				else{
					getChangeTo = changeTo;
					pathInstruction = getChangeTo;
				}
			}
			else{
				triggerCountDown --;
			}
			if(removeOnTrigger){
				Destroy(gameObject);
			}
		}
	}
}