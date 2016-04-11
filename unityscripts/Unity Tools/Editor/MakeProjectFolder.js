import System.IO;

//generate folders in our project

//add menu item
//generate folder and names from the script

@MenuItem("Project Tools / Make Folders") // The Menu item

//The first static function
static function MakeFolder(){
	GenerateFolders();
}
static function GenerateFolders(){
	var projectPath: String = Application.dataPath + "/"; //Stores path for folders
	Debug.Log("Folders Created!"); // Print to console of success
	Directory.CreateDirectory(projectPath + "Audio"); //Creates folders >>
	Directory.CreateDirectory(projectPath + "Materials");
	Directory.CreateDirectory(projectPath + "Meshes");
	Directory.CreateDirectory(projectPath + "Fonts");
	Directory.CreateDirectory(projectPath + "Textures");
	Directory.CreateDirectory(projectPath + "Resources");
	Directory.CreateDirectory(projectPath + "Scripts");
	Directory.CreateDirectory(projectPath + "Shaders");
	Directory.CreateDirectory(projectPath + "Packages");
	Directory.CreateDirectory(projectPath + "Physics");
	Directory.CreateDirectory(projectPath + "Prefabs");
	
	AssetDatabase.Refresh(); //Refreshes Project Panel
}