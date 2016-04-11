//Generate a prefab from a selection

@MenuItem("Project Tools / Make Prefab") // The Menu item

static function CreatePrefab(){ // Main Function
	var selectedObjects : GameObject[] = Selection.gameObjects; // 
	//Debug.Log(selectedObjects[0].name); - Used to debug at start
	
	//Loop through selection
	for(var go: GameObject in selectedObjects){
		var name: String = go.name; //store selection name
		var localPath:String = "Assets/" + name + ".prefab"; //create path to save file 
		if(AssetDatabase.LoadAssetAtPath(localPath, GameObject)){ //Checks if file exists, if so - popup, else just create the file
			if(EditorUtility.DisplayDialog("Caution!", "Prefab already exists. Overwrite?", "Yes", "No")){
				createNew(go, localPath); //overwrites the prefab(s)
			}
		}else{
			createNew(go, localPath); //creates the prefab(s)
		}
	}
}

static function createNew( selectedObject: GameObject, localPath: String){
	var prefab:Object = PrefabUtility.CreateEmptyPrefab(localPath);	
	PrefabUtility.ReplacePrefab(selectedObject, prefab);
	AssetDatabase.Refresh(); //Refreshes Project Panel
	
	DestroyImmediate(selectedObject); // destroys the original object
	var clone : GameObject = PrefabUtility.InstantiatePrefab(prefab); //creates the prefab as gameobject in the hierarchy
}