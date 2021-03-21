//Final game project named "Green Shirt"

class Game {
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
		text(player.livesLeft, 50 + textWidth("Lives left: "), 50);
	}
}

class Player {
	livesLeft = 3;
	posX = 0;
	posY = 0;
	velocityX = 0;
	velocityY = 0;
	momentumVelocity = 0;
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
		this.livesLeft--;
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

	createPath() {
		var allowedToChangePath = this.lengthOfPath - 2000;
		var numberOfEachElement = allowedToChangePath / 1000;

		//starting place
		this.wholePath.push(new Ground(0, 675, 0));
		this.wholePath.push(new Ground(500, 675, 0));

		//path between start and finish
		var currentPosX = 1000;
		for(var i = 0; i < numberOfEachElement; i++) {
			var pathElements = ["canyon", "ground", "platform"];
			for(var j = 0; j < 3; j++) {
				var index = round(random(0, pathElements.length - 1));
				if(pathElements[index] == "ground") {
					this.wholePath.push(new Ground(currentPosX, 675, 0));
					currentPosX += 500;
				} else if(pathElements[index] == "platform") {
					var posY = round(random(675 - 380, 675 + 100));
					var velocity = round(random(3, 10));
					this.wholePath.push(new Platform(currentPosX, posY, velocity));
					currentPosX += 300;
				} else if(pathElements[index] == "canyon") {
					this.wholePath.push(new Canyon(currentPosX));
					currentPosX += 200;
				}
				pathElements.splice(index, 1);
			}
		}

		//finish
		this.wholePath.push(new Ground(this.lengthOfPath - 1000, 675, 0));
		this.wholePath.push(new Ground(this.lengthOfPath - 500, 675, 0));
	}

}

class Platform {
	constructor(posX, posY, velocity) {
		this.posX = posX;
		this.posY = posY;
		this.velocity = velocity;
	}
	posX = 0;
	posY = 0;
	velocity = 0;
	width = 300;
	height = 50;
	collisionShape = true;

	movePlatform() {
		this.posY += this.velocity;
		if(this.posY <= 275 || this.posY >= 775) {
			this.velocity = this.velocity * (-1);
		}
	}

	drawObject() {
		fill(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness);
		rect(this.posX, this.posY, this.width, 225);
		fill(210 - game.backGroundDarkness, 105 -game.backGroundDarkness, 30 - game.backGroundDarkness);
		rect(this.posX + 10, this.posY, this.width - 20, this.height, 50);

	}
}

class Ground {
	constructor(posX, posY, velocity) {
		this.posX = posX;
		this.posY = posY;
		this.velocity = velocity;
	}
	// posX_array = [];
	posX = 0;
	posY = 675;
	velocity = 0;
	width = 500;
	height = 225;
	collisionShape = true;
	drawObject() {
		fill(0 - game.backGroundDarkness, 155 - game.backGroundDarkness, 0 - game.backGroundDarkness);
		rect(this.posX, this.posY, this.width, this.height); // draw some green ground
	}
} // a bit later

class Canyon {
	constructor(posX) {
		this.posX = posX;
	}
	// posX_array = [];
	collisionShape = false;
	posX = 0;
	width = 200;

	drawObject() {
		fill(100, 155, 255);
		rect(this.posX, height * 3 / 4, this.width, height / 4);
	}
}


var game = new Game();
var player = new Player();
var path = new Path();


function setup() {
	createCanvas(1900, 900);
}


class Physics {
	constructor() {}
	gravitation = 0.5;

	showCollisionShape() {
		stroke(255, 0, 0);
		strokeWeight(2);
		noFill();
		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i].collisionShape) {
				rect(path.wholePath[i].posX, path.wholePath[i].posY, path.wholePath[i].width, path.wholePath[i].height);
			}
		}
		//collision shape of character
		rect(player.posX - 20, player.posY - 85, 40, 85);
	}

	checkRight() {
		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i].collisionShape) {
				if(path.wholePath[i].posX == player.posX + 20
				&& !(player.posY <= path.wholePath[i].posY)
				&& !(player.posY - 85 >= path.wholePath[i].posY + path.wholePath[i].height)) {
					player.rightBlocked = true;
					return;
				}
			}
		}
		//Player can't move if reached the barrier on the right
		if(player.posX == path.lengthOfPath) {
			player.rightBlocked = true;
			return;
		}

		player.rightBlocked = false;
	}

	checkLeft() {
		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i].collisionShape) {
				if(path.wholePath[i].posX + path.wholePath[i].width == player.posX - 20
				&& !(player.posY <= path.wholePath[i].posY)
				&& !(player.posY - 85 >= path.wholePath[i].posY + path.wholePath[i].height)) {
					player.leftBlocked = true;
					return;
				}
			}
		}
		//Player can't move the left if reached the barrier on the left
		if(player.posX == 0) {
			player.leftBlocked = true;
			return;
		}

		player.leftBlocked = false;
	}

	checkDown() {
		//check if down is blocked

		// //by platforms
		// for(var i = 0 ; i < platforms.numberOfPlatforms; i++) {
		// 	if((player.posY >= platforms.posY_array[i] && player.posY <= platforms.posY_array[i] + 25)
		// 	&& !(player.posX + 20 <= platforms.posX_array[i])
		// 	&& !(player.posX - 20 >= platforms.posX_array[i] + platforms.width)
		// 	&& player.isFalling) {
		//
		// 		player.downBlocked = true;
		// 		player.posY = platforms.posY_array[i];
		// 		player.velocityY = 0;
		// 		player.jumpsLeft = 1;
		// 		return;
		// 	}
		// }
		// //by ground
		// for(var i = 0; i < ground.numberOfGround; i++) {
		// 	if((player.posY >= ground.posY && player.posY <= ground.posY + 50)
		// 	&& !(player.posX + 20 <= ground.posX_array[i])
		// 	&& !(player.posX - 20 >= ground.posX_array[i] + ground.width)
		// 	&& player.isFalling) {
		//
		// 		player.downBlocked = true;
		// 		player.posY = ground.posY;
		// 		player.velocityY = 0;
		// 		player.jumpsLeft = 1;
		// 		return;
		// 	}
		// }

		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i] instanceof Platform) {
				if((player.posY >= path.wholePath[i].posY - 3 && player.posY <= path.wholePath[i].posY + 25)
				&& !(player.posX + 20 <= path.wholePath[i].posX)
				&& !(player.posX - 20 >= path.wholePath[i].posX + path.wholePath[i].width)
				&& player.velocityY >= 0) {

					player.downBlocked = true;
					player.posY = path.wholePath[i].posY;
					player.jumpsLeft = 1;
					player.velocityY = 0;
					// player.momentumVelocity = path.wholePath[i].velocity;
					if(path.wholePath[i].velocity <= 0) {
						player.momentumVelocity = path.wholePath[i].velocity;
					}

					return;
				}
			}
		}

		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i] instanceof Ground) {
				if ((player.posY >= path.wholePath[i].posY && player.posY <= path.wholePath[i].posY + 50)
					&& !(player.posX + 20 <= path.wholePath[i].posX)
					&& !(player.posX - 20 >= path.wholePath[i].posX + path.wholePath[i].width)
					&& player.velocityY >= 0) {

					player.downBlocked = true;
					player.posY = path.wholePath[i].posY;
					player.jumpsLeft = 1;
					player.velocityY = 0;
					// player.momentumVelocity = path.wholePath[i].velocity;
					if(path.wholePath[i].velocity <= 0) {
						player.momentumVelocity = path.wholePath[i].velocity;
					}
					return;
				}
			}
		}

		player.jumpsLeft = 0;
		player.downBlocked = false;
	}

	checkUp() {
		//check if up is blocked
		//by platform
		// for(var i = 0 ; i < platforms.numberOfPlatforms; i++) {
		// 	if((player.posY - 85 >= platforms.posY_array[i] + 25 && player.posY - 70 <= platforms.posY_array[i] + 50)
		// 		&& !(player.posX + 20 <= platforms.posX_array[i])
		// 		&& !(player.posX - 20 >= platforms.posX_array[i] + platforms.width)) {
		//
		// 		player.upBlocked = true;
		// 		player.posY = platforms.posY_array[i] + 135;
		// 		player.velocityY = 0;
		// 		return;
		// 	}
		// }

		for(var i = 0; i < path.wholePath.length; i++) {
			if((player.posY - 85 > path.wholePath[i].posY + path.wholePath[i].height - 25
			&& player.posY - 85 < path.wholePath[i].posY + path.wholePath[i].height)
			&& !(player.posX + 20 <= path.wholePath[i].posX)
			&& !(player.posX - 20 >= path.wholePath[i].posX + path.wholePath[i].width)) {

				player.upBlocked = true;
				player.posY = path.wholePath[i].posY + path.wholePath[i].height + 85;
				player.velocityY = 0;
				if(path.wholePath[i].velocity > 0) {
					player.momentumVelocity = path.wholePath[i].velocity;
				}
				return;
			}
		}

		player.upBlocked = false;
	}

	moveObjects() {
		for(var i = 0; i < path.wholePath.length; i++) {
			if(path.wholePath[i] instanceof Platform) {
				path.wholePath[i].movePlatform();
			}
		}

		this.checkDown();
		this.checkUp();
		this.checkRight();
		this.checkLeft();




		//move game character horizontally
		if(!(player.leftBlocked && player.velocityX < 0) && !(player.rightBlocked && player.velocityX > 0)) {
			player.posX += player.velocityX;
			if(player.posX - game.scrollPos <= 500 || player.posX - game.scrollPos >= 1400) {
				game.scrollPos += player.velocityX
			}
		}

		if(player.velocityY >= 0) {
			player.isFalling = true;
		} else if(player.velocityY < 0) {
			player.isFalling = false;
		}

		//move game character vertically
		if(!player.downBlocked) {
			player.velocityY += player.momentumVelocity;
			player.momentumVelocity = 0;
			player.velocityY += this.gravitation;
		} else {
			player.velocityY = 0;
		}
		player.posY += player.velocityY;




		//check if game character is lose
		if(player.posY > 975) {
			player.death();
		}
	}
}


var physics = new Physics();



function draw() {
	background(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness); // fill the sky blue
	noStroke();


	push();
	translate((-1) * game.scrollPos, 0);

	if(!game.showMenu) {
		game.backGroundDarkness = 0;
		//setup ground, platform and canyon classes (Because it doesn't work in setup function)
		if(!game.setupPath) {
			path.createPath();
			game.setupPath = true;
		}

		for(var i = 0; i < path.wholePath.length; i++) {
			path.wholePath[i].drawObject();
		}
		player.drawGameChar();
		//moves objects
		physics.showCollisionShape();
		physics.moveObjects();
	} else if(game.showMenu) {
		game.menuOfGame();
	}
	pop();

	//shows how many coins player collected and lives left
	game.indicator();

	//Game Over when player died 3 times
	if(player.livesLeft == 0) {
		fill(0);
		stroke(0);
		textSize(80);
		text("Game Over", 800, 500);
		game.backGroundDarkness = 50;
	}
}


function keyPressed() {
	if((key == 'A' || keyCode == 37) && !game.showMenu && player.livesLeft > 0) {
		player.velocityX = -10;
	} else if((key == 'D' || keyCode == 39) && !game.showMenu && player.livesLeft > 0) {
		player.velocityX = 10;
	} else if(key == ' ' && !game.showMenu && player.jumpsLeft > 0 && player.livesLeft > 0) { // make changes
		player.velocityY += -13;
		player.jumpsLeft--;
	}
}

function keyReleased() {
	if(key == 'A' || keyCode == 37) {
		player.velocityX = 0;
	} else if(key == 'D' || keyCode == 39) {
		player.velocityX = 0;
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

