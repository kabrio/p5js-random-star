//variables for p5.gui
//must be global and have value assigned
// var rayColor = '#eeee00';
var rayColor = 180;
var minRays = 8;
var maxRays = 32;
var minLength = 0;
var maxLength = 0;
var minWeight = 0;
var maxWeight = 0;
var minPoint = 0;
var maxPoint = 0;
var framerate = 0;
var update = false;
///////////////////////////////////////

var mySeed = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	//some practical settings
	angleMode(DEGREES);
	colorMode(HSB, 360, 100, 100, 1);

	//create gui
	var myGUI = createGui('Settings');

	sliderRange(0, 360);
	myGUI.addGlobals('rayColor');
	
	//set slider range and add rays variables to gui	
	sliderRange(3, 200);
	myGUI.addGlobals('minRays', 'maxRays');

	//set slider range and add length variables to gui	
	sliderRange(20, width/3);
	//give maxLength a value so it doesn't load with 0
	maxLength = width/6;
	myGUI.addGlobals('minLength', 'maxLength');

	//set slider range 
	sliderRange(0, 100);	
	//give maxLength a value so it doesn't load with 0
	maxWeight = 10;
	//add some more global variables to gui
	myGUI.addGlobals('minWeight', 'maxWeight', 'minPoint', 'maxPoint', 'framerate', 'update'); 

}

function draw() {
	background(0, 0, 100);

	//set how many times per second draw loop updates
	frameRate(framerate);

	//prevents random values to change constantly
	//update value gets set in gui
	if (update == false) randomSeed(mySeed);

	//set rays between mix & max values;
	var rays = random(minRays, maxRays);
	//round rays value (otherwise for loop will misbehave)
	rays = round(rays);
	
	//calculate angle between rays
	var degrees = 360/rays;

	//just in case
	push() 
	//translate coordinate to middle of canvas
	translate(width/2, height/2);

	//create for loop that repeats as many times as there are rays
	for(var i = 0; i < rays; i=i+1) {
		//rotate coordinate system around 0, 0
		//accumulates
		rotate(degrees);

		//generate random length value and save in variable ..
		//.. so same value can be used for line and point
		var l = random(minLength, maxLength);

		//set stroke weight randomly between min & max values
		strokeWeight(random(minWeight, maxWeight));
		stroke(rayColor);

		//draw horizontal line
		line(0, 0, l, 0);	

		//set stroke weight randomly between min & max values
		strokeWeight(random(minPoint, maxPoint));

		stroke(rayColor/3, 100, 100);
		//draw point
		point(l, 0); 		
	}
	pop();
	
}

function mousePressed() {
	//set new seed for random function
	mySeed = millis();
}

function keyTyped() {
	if (key == 's') save("stern.jpg");
	else if (key == 'v') mySeed = millis();
}