var columnSize : int; 									//x (u) coord
var rowSize : int; 										//y (v) coord
var fps : int = 8.0; 									//speed of animation

var rowFrameStart: int = 0;
var colFrameStart: int = 0;
var totalFrames: int = 1;
function Update ()
{
	var index: int = Time.time*fps;					//Time control on fps
	//index = index % (columnSize * rowSize);					//modulating index, makes animation work
	
	index = index % totalFrames;
	
	var size = Vector2(1.0/columnSize, 1.0/rowSize);		//scale
	
	var u : int = index % columnSize;
	var v : int = index / columnSize;
	
	//var offset = Vector2(u * size.x, (1-size.y) - (v * size.y) );		//offset
	var offset = Vector2((u+colFrameStart) * size.x, (1-size.y) - ((v+rowFrameStart) * size.y) );		//offset
	
	renderer.material.mainTextureOffset = offset;	//texture offset
	renderer.material.mainTextureScale = size;		//texture size

	renderer.material.SetTextureOffset("_BumpMap", offset);
	renderer.material.SetTextureScale("_BumpMap", size);
}
