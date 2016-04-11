var scrollSpeed = 0.1;

function Update ()
{
	var offset: float = Time.time * scrollSpeed;
	renderer.material.mainTextureOffset = Vector2(offset ,0);
}
