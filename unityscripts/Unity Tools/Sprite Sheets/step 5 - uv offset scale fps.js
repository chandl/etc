var column : int; 									//x (u) coord
var row : int; 										//y (v) coord
var fps : int = 8; 									//speed of animation
//var index : int = 1;
function Update ()
{
	var index: int = Time.time*fps;					//Time control on fps
	index = index % (column * row);					//modulating index, makes animation work
	
	var size = Vector2(1.0/column, 1.0/row);		//scale
	var offset = Vector2(index * size.x, row);		//offset
	
	renderer.material.mainTextureOffset = offset;	//texture offset
	renderer.material.mainTextureScale = size;		//texture size
}
