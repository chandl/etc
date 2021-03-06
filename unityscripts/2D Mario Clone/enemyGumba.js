﻿// Gumba Controller

enum GumbaState {moveLeft, moveRight, moveStop, jumpAir, enemyDie, goHome}
var moveSpeed : float = 20.0;
var attackMoveSpeed : float = 35.0;
var jumpSpeed : float = 3.0;
var gumbaState = GumbaState.moveStop;
var attackRange : float = 1.0;
var searchRange : float = 3.0;
var returnHomeRange : float =4.0;
var chaseTarget : Transform;
var homePosition : Transform;
var deathForce : float = 3.0;
var gizmoToggle : boolean = true;
var changeDirectionDistance : float = 1.0;

var bounceHit : AudioClip;

private var velocity : Vector3 = Vector3.zero;
private var gravity : float = 20.0;
private var currentState;
private var aniPlay;
private var isRight : boolean = false;
private var myTransform : Vector3;
private var resetMoveSpeed : float = 0.0;
private var distanceToHome : float = 0.0;
private var distanceToTarget : float = 0.0;
private var controller : CharacterController;

//====================================
function Start(){
	myTransform = transform.position;
	resetMoveSpeed = moveSpeed;
	linkToPlayerProperties = GetComponent(playerProperties);
	controller = GetComponent (CharacterController);
	aniPlay = GetComponent (aniSprite);
}
//====================================
function Update () {
	distanceToTarget = Vector3.Distance(chaseTarget.transform.position, transform.position);
	if(distanceToTarget <= searchRange){
		ChasePlayer();
		if(distanceToTarget <= attackRange){
			ChasePlayer();
			moveSpeed = attackMoveSpeed;
		}
		if(distanceToTarget >= attackRange){
			ChasePlayer();
			moveSpeed = resetMoveSpeed;
		}
	}else{
		distanceToHome = Vector3.Distance(homePosition.position,transform.position);
		if(distanceToHome > returnHomeRange){
			GoHome();
		}
	}
	if(controller.isGrounded){
		switch(gumbaState){
			case GumbaState.moveLeft:
				PatrolLeft();
				break;
			case GumbaState.moveRight:
				PatrolRight();
				break;
			case GumbaState.moveStop:
				if(isRight){
					IdleRight();
				}else{
					IdleLeft();
				}
				break;
			case GumbaState.jumpAir:
				if(isRight){
					JumpRight();
				}else{
					JumpLeft();
				}
				
				break;
			case GumbaState.enemyDie:
				if(isRight){
					DieRight();
				}else{
					DieLeft();
				}
				break;
			case GumbaState.goHome:
				GoHome();
				break;
		}
	}
	//Apply Gravity
	velocity.y -= gravity * Time.deltaTime;
	controller.Move(velocity * Time.deltaTime);
}
//====================================
private var getPathInstruction : int;
function OnTriggerEnter(other:Collider){
	if(other.tag == "pathNode"){
		
		var linkToPathNode = other.GetComponent(pathNode);
		getPathInstruction = linkToPathNode.pathInstruction;
		gumbaState = getPathInstruction;
		if(linkToPathNode.overrideJump){
			jumpSpeed = linkToPathNode.jumpOverride;
		}	
	}
	if(other.tag == "collisionBoxFeet"){
		var playerLink : GameObject;
		playerLink = GameObject.Find ("player");
		playerLink.GetComponent(playerControls).velocity.y = deathForce;
		
		audio.clip = bounceHit;
		audio.Play();
		
		var boxCollider = GetComponent(BoxCollider) as BoxCollider;
		if(boxCollider){
			boxCollider.size = Vector3(0,0,0);
			gumbaState = GumbaState.enemyDie;
		}
		else{
			Debug.Log("Could not load box collider");
		}
	}
	if(other.tag == "enemy"){
		if(other.collider != collider){
			Physics.IgnoreCollision(other.collider, collider);
		}
	}
}
//====================================
function PatrolRight(){
	currentState = gumbaState;
	velocity.x = moveSpeed * Time.deltaTime;
	aniPlay.aniSprite(16,16,0,6,16,24);
	isRight = true;
}
//====================================
function PatrolLeft(){
	currentState = gumbaState;
	velocity.x = -moveSpeed * Time.deltaTime;
	aniPlay.aniSprite(16,16,0,7,16,24);
	isRight = false;
}
//====================================
function IdleRight(){
	currentState = gumbaState;
	velocity.x = 0;
	aniPlay.aniSprite(16,16,0,0,29,24);
	isRight = true;
}
//====================================
function IdleLeft(){
	currentState = gumbaState;
	velocity.x = 0;
	aniPlay.aniSprite(16,16,0,2,31,24);
	isRight = false;
}
//====================================
function JumpRight(){
	gumbaState = currentState;
	velocity.y = jumpSpeed;
	aniPlay.aniSprite(16,16,7,8,1,24);
	isRight = true;
}
//====================================
function JumpLeft(){
	gumbaState = currentState;
	velocity.y = jumpSpeed;
	aniPlay.aniSprite(16,16,7,9,1,24);
	isRight = false;
}
//====================================
function DieRight(){
	velocity.x =0;
	yield WaitForSeconds(0.1);
	aniPlay.aniSprite(16,16,0,10,16,24);
	yield WaitForSeconds(0.4);
	Destroy(gameObject);
}
//====================================
function DieLeft(){
	velocity.x =0;
	yield WaitForSeconds(0.1);
	aniPlay.aniSprite(16,16,0,11,16,24);
	yield WaitForSeconds(0.4);
	Destroy(gameObject);
}
//====================================
function ChasePlayer(){
	if(transform.position.x <= chaseTarget.position.x - changeDirectionDistance){
		gumbaState = GumbaState.moveRight;
	}
	if(transform.position.x >= chaseTarget.position.x + changeDirectionDistance){
		gumbaState = GumbaState.moveLeft;
	}
}
//====================================
function GoHome(){
	if(transform.position.x <= homePosition.position.x){
		gumbaState = GumbaState.moveRight;
	}
	if(transform.position.x >= homePosition.position.x){
		gumbaState = GumbaState.moveLeft;
	}

}
//====================================
function OnDrawGizmos(){
	if(gizmoToggle){
		Gizmos.color = Color.red;
		Gizmos.color = Color.red;
		Gizmos.DrawWireSphere(transform.position,attackRange);
		Gizmos.color = Color.blue;
		Gizmos.DrawWireSphere(transform.position,searchRange);
		Gizmos.color = Color.green;
		Gizmos.DrawWireSphere (homePosition.position, returnHomeRange);
	}

}
//====================================
