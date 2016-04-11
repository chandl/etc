var tileX : int; //u
var tileY : int; //v

function Update ()
{
	renderer.material.mainTextureOffset = Vector2(0.25, 0);
	var size = Vector2(1.0/tileX, 1.0/tileY);
	renderer.material.mainTextureScale = size;
	print(size);
}
