//camera smooth follow 2d - Optional Zooming
//desc: follows cameratarget w/ ability to zoom

var cameraTarget : GameObject;
var player : GameObject;

var smoothTime : float = 0.1;
var cameraFollowX : boolean = true;
var cameraFollowY : boolean = true;
var cameraFollowHeight : boolean = false;
var cameraHeight : float = 2.5;
var cameraZoom : boolean = false;
var cameraZoomMin: float = 2.5;
var cameraZoomMax: float = 4.0;
var cameraZoomTime : float = 0.03;

var velocity : Vector2;
private var thisTransform : Transform;
private var curPos : float = 0.0;
private var playerJumpHeight: float = 0.0;
function Start(){
	thisTransform = transform;
}

function Update (){
	if(cameraFollowX){
		thisTransform.position.x = Mathf.SmoothDamp (thisTransform.position.x, cameraTarget.transform.position.x, velocity.x,smoothTime);
	}
	if(cameraFollowY){
		thisTransform.position.y = Mathf.SmoothDamp (thisTransform.position.y, cameraTarget.transform.position.y, velocity.y,smoothTime);
	}
	if(!cameraFollowY && cameraFollowHeight){
		camera.transform.position.y = cameraHeight;
	}
	
	var playerControl = player.GetComponent (playerControls);
	if(cameraZoom){
		//get y pos, check pos to curpos and curjumpheight, adjust ortho size from cam = height jump dist
		curPos = player.transform.position.y;
		playerJumpHeight = curPos - playerControl.startPos;
		if (playerJumpHeight < 0){
			playerJumpHeight *= -1;
		}
		if (playerJumpHeight > cameraZoomMax){
			playerJumpHeight = cameraZoomMax;
		}
		this.camera.orthographicSize = Mathf.Lerp(this.camera.orthographicSize, playerJumpHeight + cameraZoomMin, Time.time * cameraZoomTime);
	}
}