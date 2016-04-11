//Block Component
//--------------------------------------
enum BlockType {blockBounce,blockCoin,blockBreakable,blockSolid,blockQuestion}
enum PickUpType{pickupMushroomGrow, pickupMushroomLife,pickupFireFlower}
enum BreakType{breakableGeometry, breakableParticles}
//--------------------------------------
var BlockState : BlockType;
var BlockStateAfter : BlockType;
var PickupState : PickUpType;
var BreakState : BreakType;
//--------------------------------------
var blockCoinAmount : int = 3;
var blockQuestionScrollSpeed : float = 0.5;
//--------------------------------------
var materialBlock1 : Material;//regular
var materialBlock2 : Material;//solid
var materialBlock3 : Material;//brick piece
var materialBlock4 : Material;//question block
//--------------------------------------
var pickupCoin : Transform; //prefab coin
var pickupMushroomGrow : Transform; // prefab mushroom grow
var pickupMushroomLife : Transform; //prefab mushroom life
var pickupFireFlower : Transform; //prefab fire flower
var breakableGeometry : Transform; // prefab for breakables as geometry
var breakableParticles : Transform; // prefab for breakables as particles
//--------------------------------------
var soundBump : AudioClip;
var soundPickup : AudioClip;
var soundCoin : AudioClip;
//--------------------------------------
private var breakablePos : Vector3; 
private var pickupPos : Vector3;
private var coinPos : Vector3;
private var blockAni : boolean = false;
private var coinMove : boolean = false;
private var blockCoinAmountReset : int;
//--------------------------------------Coins to gui>
var coinValue : int = 1;
var playerGameObject;
var hudGameObject;
private var coinTime : float = 0.2;
//--------------------------------------
//======================================
function OnTriggerEnter(other: Collider){
	if(other.tag == "collisionBoxHead"){
		blockAni = true;
	}
}
//======================================
function Start(){
	hudGameObject = GameObject.FindWithTag ("hud");
	playerGameObject = GameObject.FindWithTag("Player");
	coinPos = Vector3(transform.position.x,transform.position.y,transform.position.z+.2);
	breakablePos=Vector3(transform.position.x , transform.position.y +.25, transform.position.z - 9);
	pickupPos = Vector3(transform.position.x, transform.position.y + .45, transform.position.z -.1);
	audio.clip = soundBump;
	var blockCoinAmountReset = blockCoinAmount;
}
//======================================
function Update ()
{
	switch(BlockState){
		
		
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		case BlockState.blockBounce:
			renderer.material = materialBlock1;
			if(blockAni){
				animation.Play("blockBounce");
				blockAni = false;
				audio.Play();
			}
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		case BlockState.blockCoin:
			if(blockAni){
				animation.Play("blockBounce");
				var coin = Instantiate (pickupCoin, coinPos, transform.rotation);
				blockCoinAmount --;
				blockAni = false;
				audio.clip = soundCoin;
				audio.Play();
				var hudConnect = hudGameObject.GetComponent (hudController);
				hudConnect.coin += coinValue;
				var playerConnect = playerGameObject.GetComponent ( playerProperties);
				playerConnect.coins += coinValue;
			}
			if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockCoin){
				BlockState = BlockStateAfter;
				BlockStateAfter = BlockStateAfter.blockBreakable;
			}
			if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockSolid){
				BlockState = BlockStateAfter;
			}
			if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockBreakable){
				BlockState = BlockStateAfter;
			}
			if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockBounce){
				BlockState = BlockStateAfter;
			}
			if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockQuestion){
				BlockState = BlockStateAfter;
			}
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		case BlockState.blockBreakable:
			renderer.material = materialBlock1;
			if(blockAni){
				animation.Play("blockBounce");
				if(BreakState == BreakState.breakableGeometry){
					Instantiate (breakableGeometry,breakablePos, transform.rotation );
				}
				if(BreakState == BreakState.breakableParticles){
					Instantiate (breakableParticles, transform.position, transform.rotation);
				}
				Destroy(transform.parent.gameObject);
				blockAni = false;
			}
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		case BlockState.blockSolid:
			renderer.material = materialBlock2;
			if(blockAni){
				audio.Play();
				blockAni = false;
			}
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		case BlockState.blockQuestion:
			renderer.material = materialBlock4;
			if(blockAni && PickupState == PickupState.pickupMushroomGrow){
				animation.Play("blockBounce");
				Instantiate (pickupMushroomGrow, pickupPos,transform.rotation);
				audio.Play ();
				blockAni = false;
				BlockState = BlockStateAfter;
			}
			if(blockAni && PickupState == PickupState.pickupMushroomLife){
				animation.Play("blockBounce");
				Instantiate (pickupMushroomLife, pickupPos,transform.rotation);
				audio.clip = soundPickup;
				audio.Play ();
				blockAni = false;
				BlockState = BlockStateAfter;
			}
			if(blockAni && PickupState == PickupState.pickupFireFlower){
				animation.Play("blockBounce");
				Instantiate (pickupFireFlower, pickupPos,transform.rotation);
				audio.clip = soundPickup;
				audio.Play ();
				blockAni = false;
				BlockState = BlockStateAfter;
			}

			//var offset : float = Time.time * blockQuestionScrollSpeed;
			//renderer.material.mainTextureOffset = Vector2 (offset , 0);
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		default:
			break;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
			
	}
}