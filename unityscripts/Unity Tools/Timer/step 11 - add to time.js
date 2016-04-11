//Add to Time
var playTime		: float 	= 0.0;
var addToTimeAmount	: float		= 0.0;
var timeAmount		: float 	= 0.0;
var timeActive		: boolean 	= true;

function Update (){
	if (timeActive){										
		playTime = Time.time + addToTimeAmount;	// playTime = current time
	}
	if(Input.GetKeyDown("8")){	// press to activate add to timer single amt
		addToTimeAmount = timeAmount;
	}
	if(Input.GetKeyDown("9")){	// press to activate add to timer single amt
		addToTimeAmount += timeAmount;
	}
}

function OnGUI(){
	GUILayout.Label("PlayTime: "+ playTime);

}