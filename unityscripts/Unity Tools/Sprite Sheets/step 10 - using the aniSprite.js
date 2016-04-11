
function Update ()
{
	var aniPlay = GetComponent("aniSprite");
	if(Input.GetKey("d")){
		aniPlay.aniSprite(8,2,0,0,16,12);
	}
}
