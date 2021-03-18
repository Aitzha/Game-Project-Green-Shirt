//Final game project named "Green Shirt"

class gameSettings {
	constructor() {}
	showMenu = true;
	backGroundDarkness = 50;
	setupPath = false;

	enemies = false;

	scrollPos = 0;
	menuOfGame() {
		//menu
		fill(115, 115, 115);
		noStroke();
		rect(width / 2 - 200, height / 2 - 200, 400, 400, 50);

		//text
		fill(0);
		textSize(30);
		text("Choose difficulty", width / 2 - 115, height / 2 - 160);

		//difficulties buttons
		fill(90, 90, 90);
		rect(width / 2 - 170, height / 2 - 120, 340, 80, 10);
		rect(width / 2 - 170, height / 2 - 20, 340, 80, 10);
		rect(width / 2 - 170, height / 2 + 80, 340, 80, 10);

		//make buttons lighter
		fill(105, 105, 105);
		if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 120 && mouseY < height / 2 - 40) {
			rect(width / 2 - 170, height / 2 - 120, 340, 80, 10);
		} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 20 && mouseY < height / 2 + 60) {
			rect(width / 2 - 170, height / 2 - 20, 340, 80, 10);
		} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 80 && mouseY < height / 2 + 160) {
			rect(width / 2 - 170, height / 2 + 80, 340, 80, 10);
		}

		//their descriptions
		fill(0);
		textSize(25);
		text("Easy", width / 2 - 30, height / 2 - 90);
		text("Normal", width / 2 - 40, height / 2 + 10);
		text("Hard", width / 2 - 30, height / 2 + 110);

		text("Short path and no enemies", width / 2 - 150, height / 2 - 55);
		text("Long path and no enemies", width / 2 - 148, height / 2 + 45);
		text("Long path with enemies", width / 2 - 130, height / 2 + 145);
	}

	indicator() {
		fill(0);
		stroke(0);
		textSize(20);
		text("Lives left: ", 50, 50)
		text(gameChar.livesLeft, 50 + textWidth("Lives left: "), 50);
	}
}

class GameChar {
	livesLeft = 3;
	posX = 0;
	posY = 0;
	velocityX = 0;
	velocityY = 0;
	isFalling = false;
	jumpsLeft = 0;

	rightBlocked = false;
	leftBlocked = false;
	downBlocked = false;
	upBlocked = false;


	constructor() {
		this.posX = 950;
		this.posY = 675;
	}

	death() {
		gameChar.livesLeft--;
		this.posX = 950;
		this.posY = 675;
		this.velocityY = 0;
		game.scrollPos = 0;
	}

	drawGameChar() {
		if(this.velocityX < 0 && this.isFalling && this.livesLeft > 0) {
			// add your jumping-left code
			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 10, this.posY - 40);
			rotate(210, 1);
			ellipse(0, 0, 30, 10); 							//right arm
			pop();

			push();
			translate(this.posX + 10, this.posY - 10);
			rotate(60, 1);
			ellipse(0, 0, 30, 10);							// left leg
			pop();

			fill(0, 255, 150);
			rect(this.posX - 10, this.posY - 57.5, 20, 50, 50); //body
			fill(255, 255, 150);

			push();
			translate(this.posX - 10, this.posY - 10);
			rotate(210, 1);
			ellipse(0, 0, 30, 10);
			pop()                                			//right leg

			push();
			translate(this.posX + 10, this.posY - 40);
			rotate(60, 1);
			ellipse(0, 0, 30, 10); 							//left arm
			pop();

		} else if(this.velocityX > 0 && this.isFalling && this.livesLeft > 0) {
			// add your jumping-right code
			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 10, this.posY - 10);
			rotate(210, 1);
			ellipse(0, 0, 30, 10);
			pop()                                			//right leg


			push();
			translate(this.posX + 10, this.posY - 40);
			rotate(60, 1);
			ellipse(0, 0, 30, 10); 							//left arm
			pop();

			fill(0, 255, 150);
			rect(this.posX - 10, this.posY - 57.5, 20, 50, 50); //body
			fill(255, 255, 150);

			push();
			translate(this.posX - 10, this.posY - 40);
			rotate(210, 1);
			ellipse(0, 0, 30, 10); 							//right arm
			pop();

			push();
			translate(this.posX + 10, this.posY - 10);
			rotate(60, 1);
			ellipse(0, 0, 30, 10);							// left leg
			pop();

		} else if(this.velocityX < 0 && this.livesLeft > 0) {
			// add your walking left code
			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 10, this.posY);
			rotate(225, 1);
			ellipse(0, 0, 30, 10);
			pop()                                			//right leg


			push();
			translate(this.posX + 8, this.posY - 40);
			rotate(45, 1);
			ellipse(0, 0, 30, 10);
			pop();										    //left arm

			fill(0, 255, 150);
			rect(this.posX - 10, this.posY - 57.5, 20, 50, 50); //body
			fill(255, 255, 150);

			push();
			translate(this.posX - 8, this.posY - 35);
			rotate(200, 1);
			ellipse(0, 0, 30, 10);
			pop();											//right arm

			push();
			translate(this.posX + 10, this.posY);
			rotate(45, 1);
			ellipse(0, 0, 30, 10);
			pop();											//left leg

		} else if(this.velocityX > 0 && this.livesLeft > 0) {
			// add your walking right code
			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 8, this.posY - 35);
			rotate(200, 1);
			ellipse(0, 0, 30, 10);
			pop();										//right arm

			push();
			translate(this.posX + 10, this.posY);
			rotate(45, 1);
			ellipse(0, 0, 30, 10);
			pop();										//left leg

			fill(0, 255, 150);
			rect(this.posX - 10, this.posY - 57.5, 20, 50, 50); //body
			fill(255, 255, 150);

			push();
			translate(this.posX - 10, this.posY);
			rotate(225, 1);
			ellipse(0, 0, 30, 10);
			pop();                               			//right leg

			push();
			translate(this.posX + 8, this.posY - 35);
			rotate(45, 1);
			ellipse(0, 0, 30, 10);
			pop();											//left arm

		} else if(this.isFalling && this.livesLeft > 0 && !this.downBlocked) {
			// add your jumping facing forwards code
			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 15, this.posY - 40);
			rotate(225, 1);
			ellipse(0, 0, 15, 10);
			pop();                                			//right arm

			ellipse(this.posX + 8, this.posY - 5, 10, 15); //left leg

			fill(0, 255, 150);
			rect(this.posX - 15, this.posY - 57.5, 30, 50, 50); //body
			fill(255, 255, 150);

			ellipse(this.posX - 8, this.posY - 5, 10, 15); //right leg

			push();
			translate(this.posX + 15, this.posY - 40);
			rotate(45, 1);
			ellipse(0, 0, 15, 10);
			pop();											//left arm

		} else {
			// add your standing front facing code

			fill(255, 255, 150);
			ellipse(this.posX, this.posY - 70, 25, 25); //head

			push();
			translate(this.posX - 20, this.posY - 35);
			rotate(225, 1);
			ellipse(0, 0, 30, 10);
			pop()                                			//right arm

			push();
			translate(this.posX + 20, this.posY - 35);
			rotate(45, 1);
			ellipse(0, 0, 30, 10);
			pop();											//left arm


			ellipse(this.posX - 8, this.posY + 5, 10, 30);
			ellipse(this.posX + 8, this.posY + 5, 10, 30); //legs

			fill(0, 255, 150);
			rect(this.posX - 15, this.posY - 57.5, 30, 50, 50); //body

		}
	}
} // a bit later

class Path {
	constructor() {}
	//attributes needed to make and setup path
	lengthOfPath = 2000;
	wholePath = [];
	wholePathCorX = [];
	//attributes needed to make decorations for path
	numberOfClouds;
	cloud_posX = [];
	cloud_posY = [];
	proportion_cloud = [];

	pathCreator() {
		var allowedToChangePath = this.lengthOfPath - 2000;
		var numberOfEachElement = allowedToChangePath / 1000;

		//starting place
		this.wholePath.push("ground"); this.wholePath.push("ground");

		//path between start and finish
		for(var i = 0; i < numberOfEachElement; i++) {
			var pathElements = ["canyon", "ground", "platform"];
			for(var j = 0; j < 3; j++) {
				var index = round(random(0, pathElements.length - 1));
				this.wholePath.push(pathElements[index]);
				pathElements.splice(index, 1);
			}
		}

		//finish
		this.wholePath.push("ground"); this.wholePath.push("ground");
	}

	setupClouds() {
		var currentPosX = -500
		for(var i = 0; i < this.numberOfClouds; i++) {
			currentPosX += round(random(150, 750));
			this.cloud_posX.push(currentPosX);
			this.cloud_posY.push(round(random(100, 200)));
			this.proportion_cloud.push(random(1, 2));
		}
	}

	setupPath() {
		this.pathCreator();
		var currentPosX = 0;
		for(var i = 0; i < this.wholePath.length; i++) {
			path.wholePathCorX.push(currentPosX);
			if(this.wholePath[i] == "ground") {
				ground.posX_array.push(currentPosX);
				currentPosX += ground.width;
			} else if(this.wholePath[i] == "canyon") {
				canyons.posX_array.push(currentPosX);
				currentPosX += canyons.width;
			} else if(this.wholePath[i] == "platform") {
				platforms.posX_array.push(currentPosX);
				currentPosX += platforms.width;
			}
		}
		game.setupPath = true;
		//setup platform class
		platforms.numberOfPlatforms = platforms.posX_array.length;
		platforms.setupPlatforms();
		//setup ground class
		ground.numberOfGround = ground.posX_array.length;
		//setup clouds(own attribute)
		this.numberOfClouds = (this.lengthOfPath / 500) * 1.5
		this.setupClouds();
	}

	cloud(index) {
		fill (255, 255, 255);
		ellipse(this.cloud_posX[index], this.cloud_posY[index], 50 * this.proportion_cloud[index]);
		ellipse(this.cloud_posX[index] + (30 * this.proportion_cloud[index]), this.cloud_posY[index] + (10 * this.proportion_cloud[index]), 70 * this.proportion_cloud[index]);
		ellipse(this.cloud_posX[index] + (50 * this.proportion_cloud[index]), this.cloud_posY[index] + (5 * this.proportion_cloud[index]), 50 * this.proportion_cloud[index]);
		ellipse(this.cloud_posX[index] - (30 * this.proportion_cloud[index]), this.cloud_posY[index] + (15 * this.proportion_cloud[index]), 65 * this.proportion_cloud[index]);
		ellipse(this.cloud_posX[index], this.cloud_posY[index] + (30 * this.proportion_cloud[index]), 50 * this.proportion_cloud[index]);
	}

	drawClouds() {
		for(var i = 0; i < this.numberOfClouds; i++) {
			this.cloud(i);
		}
	}
}

class Platforms {
	constructor() {}
	posX_array = [];
	posY_array = [];
	velocity_array = [];
	width = 300;
	height = 50;

	numberOfPlatforms = 0;

	setupPlatforms() {
		for(var i = 0; i < this.numberOfPlatforms; i++) {
			var posY = round(random(ground.floorPosY - 380, ground.floorPosY + 100));
			this.posY_array.push(posY);
			this.velocity_array.push(round(random(3, 10)));
		}
	}


	movePlatforms() {
		for(var i = 0; i < this.numberOfPlatforms; i++) {
			this.posY_array[i] += this.velocity_array[i];
			if(ground.floorPosY - 400 >= this.posY_array[i] || ground.floorPosY + 100 <= this.posY_array[i]) {
				this.velocity_array[i] = this.velocity_array[i] * (-1);
			}
		}
	}

	platform(index) {
		fill(100, 155, 255);
		rect(this.posX_array[index], ground.floorPosY, 300, height / 4);
		fill(210, 105, 30);
		rect(this.posX_array[index] + 10, this.posY_array[index], 280, 50, 50);
	}

	drawPlatforms() {
		for(var i = 0; i < this.posX_array.length; i++) {
			this.platform(i);
		}
	}


}

class Ground {
	constructor() {}
	posX_array = [];
	floorPosY = 675;
	width = 500;
	height = 225;
	numberOfGround = 0;
} // a bit later

class Canyons {
	constructor() {}
	posX_array = [];
	width = 200;
	canyon(posX) {
		fill(100, 155, 255);
		rect(posX, ground.floorPosY, 200, height / 4);
	}

	drawCanyons() {
		for(var i = 0; i < this.posX_array.length; i++) {
			this.canyon(this.posX_array[i])
		}
	}
}


var game = new gameSettings();
var gameChar = new GameChar();
var path = new Path();
var platforms = new Platforms();
var ground = new Ground();
var canyons = new Canyons();


function setup() {
	createCanvas(1900, 900);
}


class Physics {
	constructor() {}
	gravitation = 0.5;

	showCanvasShapes() {
		stroke(255, 0, 0);
		strokeWeight(2);
		noFill();

		//canvasShape of gameChar
		rect(gameChar.posX - 20, gameChar.posY - 85, 40, 85);
		//canvasShape of platforms
		for(var i = 0; i < platforms.numberOfPlatforms; i++) {
			rect(platforms.posX_array[i], platforms.posY_array[i], platforms.width, platforms.height);
		}
		//canvasShape of ground
		for(var i = 0; i < ground.posX_array.length; i++) {
			rect(ground.posX_array[i], ground.floorPosY, ground.width, ground.height);
		}

	}

	checkRight() {
		//check if right is blocked
		//by platforms
		for(var i = 0; i < platforms.numberOfPlatforms; i++) {
			if(platforms.posX_array[i] == gameChar.posX + 20
			&& !(gameChar.posY <= platforms.posY_array[i])
			&& !(gameChar.posY - 70 >= platforms.posY_array[i] + platforms.height)) {
				gameChar.rightBlocked = true;
				return;
			}
		}
		//by ground
		for(var i = 0; i < ground.numberOfGround; i++) {
			if(ground.posX_array[i] == gameChar.posX + 20
			&& !(gameChar.posY <= ground.floorPosY)
			&& !(gameChar.posY - 70 >= ground.floorPosY + ground.height)) {
				gameChar.rightBlocked = true;
				return;
			}
		}
		//if Game Over player can't move or player reached barrier of the map
		if(gameChar.livesLeft == 0 || gameChar.posX == path.lengthOfPath) {
			gameChar.rightBlocked = true;
			return;
		}

		gameChar.rightBlocked = false;
	}

	checkLeft() {
		//check if left is blocked
		//by platforms
		for(var i = 0; i < platforms.numberOfPlatforms; i++) {
			if(platforms.posX_array[i] + platforms.width == gameChar.posX - 20
			&& !(gameChar.posY <= platforms.posY_array[i])
			&& !(gameChar.posY - 70 >= platforms.posY_array[i] + platforms.height)) {
				gameChar.leftBlocked = true;
				return;
			}
		}
		//by ground
		for(var i = 0; i < ground.numberOfGround; i++) {
			if(ground.posX_array[i] + ground.width == gameChar.posX - 20
			&& !(gameChar.posY <= ground.floorPosY)
			&& !(gameChar.posY - 70 >= ground.floorPosY + ground.height)) {
				gameChar.leftBlocked = true;
				return;
			}
		}
		//if Game Over player can't move or player reached barrier of the map
		if(gameChar.livesLeft == 0 || gameChar.posX == 0) {
			gameChar.leftBlocked = true;
			return;
		}

		gameChar.leftBlocked = false;
	}

	checkDown() {
		//check if down is blocked
		if(gameChar.velocityY > 0) {
			gameChar.isFalling = true;
		} else if(gameChar.velocityY < 0) {
			gameChar.isFalling = false;
		}

		//by platforms
		for(var i = 0 ; i < platforms.numberOfPlatforms; i++) {
			if((gameChar.posY >= platforms.posY_array[i] && gameChar.posY <= platforms.posY_array[i] + 25)
			&& !(gameChar.posX + 20 <= platforms.posX_array[i])
			&& !(gameChar.posX - 20 >= platforms.posX_array[i] + platforms.width)
			&& gameChar.isFalling) {

				gameChar.downBlocked = true;
				gameChar.posY = platforms.posY_array[i];
				gameChar.velocityY = 0;
				gameChar.jumpsLeft = 1;
				return;
			}
		}
		//by ground
		for(var i = 0; i < ground.numberOfGround; i++) {
			if((gameChar.posY >= ground.floorPosY && gameChar.posY <= ground.floorPosY + 50)
			&& !(gameChar.posX + 20 <= ground.posX_array[i])
			&& !(gameChar.posX - 20 >= ground.posX_array[i] + ground.width)
			&& gameChar.isFalling) {

				gameChar.downBlocked = true;
				gameChar.posY = ground.floorPosY;
				gameChar.velocityY = 0;
				gameChar.jumpsLeft = 1;
				return;
			}
		}

		gameChar.jumpsLeft = 0;
		gameChar.downBlocked = false;
	}

	checkUp() {
		//check if up is blocked
		//by platform
		for(var i = 0 ; i < platforms.numberOfPlatforms; i++) {
			if((gameChar.posY - 85 >= platforms.posY_array[i] + 25 && gameChar.posY - 70 <= platforms.posY_array[i] + 50)
				&& !(gameChar.posX + 20 <= platforms.posX_array[i])
				&& !(gameChar.posX - 20 >= platforms.posX_array[i] + platforms.width)) {

				gameChar.upBlocked = true;
				gameChar.posY = platforms.posY_array[i] + 135;
				gameChar.velocityY = 0;
				return;
			}
		}

		gameChar.upBlocked = false;
	}

	moveObjects() {
		platforms.movePlatforms();
		this.checkRight();
		this.checkLeft();
		this.checkDown();
		this.checkUp();

		//move game character horizontally
		if(!(gameChar.leftBlocked && gameChar.velocityX < 0) && !(gameChar.rightBlocked && gameChar.velocityX > 0)) {
			gameChar.posX += gameChar.velocityX;
			if(gameChar.posX - game.scrollPos <= 500 || gameChar.posX - game.scrollPos >= 1400) {
				game.scrollPos += gameChar.velocityX
			}
		}

		//move game character vertically
		if(!gameChar.downBlocked) {
			gameChar.velocityY += this.gravitation;
		}
		gameChar.posY += gameChar.velocityY;

		//check if game character is lose
		if(gameChar.posY > ground.floorPosY + 300) {
			gameChar.death();
		}
	}
}


var physics = new Physics();



function draw() {
	background(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness); // fill the sky blue
	noStroke();
	fill(0 - game.backGroundDarkness, 155 - game.backGroundDarkness, 0 - game.backGroundDarkness);
	rect(0, ground.floorPosY, width, height/4); // draw some green ground


	push();
	translate((-1) * game.scrollPos, 0);

	if(!game.showMenu) {
		game.backGroundDarkness = 0;
		//setup ground, platform and canyon classes (Because it doesn't work in setup function)
		if(!game.setupPath) {
			path.setupPath();
		}
		path.drawClouds();
		//draws objects
		canyons.drawCanyons();
		platforms.drawPlatforms();
		gameChar.drawGameChar();
		//moves objects
		physics.showCanvasShapes();
		physics.moveObjects();
	} else if(game.showMenu) {
		game.menuOfGame();
	}
	pop();

	//shows how many coins player collected and lives left
	game.indicator();

	//Game Over when player died 3 times
	if(gameChar.livesLeft == 0) {
		fill(0);
		stroke(0);
		textSize(80);
		text("Game Over", 800, 500);
		game.backGroundDarkness = 50;
	}
}


function keyPressed() {
	if((key == 'A' || keyCode == 37) && !game.showMenu) {
		gameChar.velocityX = -10;
	} else if((key == 'D' || keyCode == 39) && !game.showMenu) {
		gameChar.velocityX = 10;
	} else if(key == ' ' && !game.showMenu && gameChar.jumpsLeft > 0) { // make changes
		gameChar.velocityY = -13;
		gameChar.jumpsLeft--;
	}
}

function keyReleased() {
	if(key == 'A' || keyCode == 37) {
		gameChar.velocityX = 0;
	} else if(key == 'D' || keyCode == 39) {
		gameChar.velocityX = 0;
	}
}

function mousePressed() {
	if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 120 && mouseY < height / 2 - 40) {
		path.lengthOfPath = 5000;
		game.showMenu = false;
	} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 20 && mouseY < height / 2 + 60) {
		path.lengthOfPath = 10000;
		game.showMenu = false;
	} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 80 && mouseY < height / 2 + 160) {
		game.showMenu = false;
		path.lengthOfPath = 10000;
		game.enemies = true;
	}
}

// function tree(index) {
// 	//tree body
// 	beginShape();
// 	fill(210, 105, 30);
// 	vertex(trees_x[index], floorPosY);
// 	vertex(trees_x[index] + 20, floorPosY - 30);
// 	vertex(trees_x[index] + 30, floorPosY - 100);
// 	vertex(trees_x[index] + 15, floorPosY - 150);
// 	vertex(trees_x[index] - 30, floorPosY - 220);
// 	vertex(trees_x[index] + 130, floorPosY - 200);
// 	vertex(trees_x[index] + 85, floorPosY - 150);
// 	vertex(trees_x[index] + 65, floorPosY - 100);
// 	vertex(trees_x[index] + 75, floorPosY - 30);
// 	vertex(trees_x[index] + 100, floorPosY);
// 	endShape();
//
// 	//tree head
// 	beginShape();
// 	fill(0, 255, 0);
// 	vertex(trees_x[index] + 15, floorPosY - 185);
// 	vertex(trees_x[index] - 15, floorPosY - 170);
// 	vertex(trees_x[index] - 45, floorPosY - 185);
// 	vertex(trees_x[index] - 60, floorPosY - 220);
// 	vertex(trees_x[index] - 55, floorPosY - 240);
// 	vertex(trees_x[index] - 60, floorPosY - 280);
// 	vertex(trees_x[index] - 50, floorPosY - 330);
// 	vertex(trees_x[index], floorPosY - 370);
// 	vertex(trees_x[index] + 50, floorPosY - 400);
// 	vertex(trees_x[index] + 80, floorPosY - 390);
// 	vertex(trees_x[index] + 130, floorPosY - 350);
// 	vertex(trees_x[index] + 150, floorPosY - 320);
// 	vertex(trees_x[index] + 170, floorPosY - 300);
// 	vertex(trees_x[index] + 150, floorPosY - 200);
// 	vertex(trees_x[index] + 100, floorPosY - 150);
// 	endShape();
// }



// function mountain(index) {
// 	fill(150, 150, 150);
// 	triangle(mountains[index], floorPos_y,
// 		mountains[index] + 150, floorPos_y,
// 		mountains[index] + 100, floorPos_y - 200);
//
// 	triangle(mountains[index] + 75, floorPos_y,
// 		mountains[index] + 250, floorPos_y,
// 		mountains[index] + 150, floorPos_y - 250);
//
// 	fill(255, 255, 255);
// 	triangle(mountains[index] + 100, floorPos_y - 200,
// 		mountains[index] + 75, floorPos_y - 150,
// 		mountains[index] + 113, floorPos_y - 150);
//
// 	triangle(mountains[index] + 150, floorPos_y - 250,
// 		mountains[index] + 135, floorPos_y - 200,
// 		mountains[index] + 171, floorPos_y - 200);
// }
//
// function coin(index) {
// 	fill (255, 223, 0);
// 	ellipse(collectables[index], floorPos_y - 30, 50, 50);
//
// 	textSize(35);
// 	stroke(1);
// 	strokeWeight(2);
// 	text('1', collectables[index] - 9, floorPos_y - 18);
// 	strokeWeight(0);
// }

