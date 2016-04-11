var column : int; //u
var row : int; //v
var index : int = 1;
function Update ()
{
	index = index % (column * row);					//modulating index, makes animation work
	
	var size = Vector2(1.0/column, 1.0/row);		//scale
	var offset = Vector2(index * size.x, row);		//offset
	
	renderer.material.mainTextureOffset = offset;	//texture offset
	renderer.material.mainTextureScale = size;		//texture size
}
