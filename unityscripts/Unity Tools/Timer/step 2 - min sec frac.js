var playTime	: float = 0.0;
var days 		: float = 0.0;
var hours 		: float = 0.0;
var minutes 	: float = 0.0;
var seconds 	: float = 0.0;
var fractions 	: float = 0.0;
function Update ()
{
	playTime = Time.time;
	days 		= (playTime / 86400) % 365;
	hours 		= (playTime / 3600) % 24;
	minutes 	= (playTime / 60) % 60;
	seconds 	= (playTime % 60);
	fractions 	= (playTime * 10) % 10;
	
	print("Minutes: " + minutes + " Seconds: " + seconds + " Fractions: " + fractions);

	if(seconds >= 30){
		print("30 second mark!");
	}
	if(minutes >= 1){
		print("1 min mark!");
	}
}
