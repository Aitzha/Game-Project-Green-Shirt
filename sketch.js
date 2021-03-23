// This is my final game project names “Green Shirt”
//
// Firstly, I want you to pay attention to the fact that I made this project using classes and arrays of classes.
// Because I’ve already had experience with OOP, I wanted to make my first project with classes.
//
// 	Here I have 7 main classes that are elements of the path and the main feature of the game.
// 	They are Game, Player, Path, Platform, Ground, Canyon and Physics.
// 	And also 5 other additional classes. They are Cloud, Tree, Mountain, Coin and Enemy.
//
// 	To see their attributes and functions you can check yourself in the code or just look at the diagram I’ve included in .zip file.
//
// 	Now let me explain how the 3 extensions I added works.


//1)The first one is Platforms. In the class “Path”, there is a function called “createPath()” and an array of classes
// 	called “wholePath”.The “createPath()” function is creating a path randomly considering the length of the path.
// 	It means you can change the length of the path in the menu which you will see after starting the code on the browser.
// 	The function I mentioned before chooses what element will be next on the path and push it inside “wholePath”
// 	by giving each class their posX, posY and velocity. Now in the class “Platform”, it has attributes: posX, posY,
// 	velocity, width, height and collisionShape, and also functions “movePlatform()” and “drawObject()”.
//  “drawObject()” draws a platform on the current position, “movePlatform()” moves a platform with its velocity
//  and change velocity when a platform reaches its highest and lowest position. It has “collisionShape” variable
//  which is always true, it needed because not every object has a collision shape.


//2)The second one is the sounds. This game has 7 various sounds which are: jumpSound, deathSound, collectCoinSound,
// 	gameOverSound, youWonSound, backGroundMusic, selectDifficultySound.
// 	jumpSound - uses when the player jumps.
// 	deathSound - uses when the player dies by falling or killed by an enemy.
// 	collectCoinSound - uses when the player collects a coin.
// 	gameOverSound - uses when the player has 0 lives left.
// 	youWonSound - uses when the player reaches the finish.
// 	backGroundMusic - plays as backgroundMusic when difficulty is chosen. (music is Avenza - Game on)
//  selectDifficultySound - uses when the user presses any button on the menu.
// 	The sounds and music use the attribute of the class Game called soundVolume which be set up on the menu of the game.
// 	(notice: wait several seconds after starting the game on the browser. That gives a little time for music to load)


//3)The third extension is Enemies. Which setups almost the same way as Platform.
// In the class “Path” enemies creates in the function “decorate()” and saves in an array of classes of class “Game”.
// In the class “Enemy” there are three 3 functions. The first and easiest one is “killPlayer()”
// which just calls a function “death()” of class “Player” when the player is too close to the enemy.
// The next is “drawObject()” which uses attributes currentPosX, posY and proportion of the same class “Enemy”.
// The last one is “moveObject()” which changes currentPosX with velocityX each frame
// and check if the enemy is too far from its initialPosX.


//main elements of the game
class Game {
	constructor() {}
	showMenu = true;
	customiseMap = false;
	backGroundDarkness = 50;
	setupPath = false;
	gameOverSoundPlayed = false;
	youWonSoundPlayed = false;
	enemiesExist = false;
	collisionShape = false;
	soundVolume = 0.3;
	coins = [];
	enemies = [];

	scrollPos = 0;
	menuOfGame() {
		if(this.customiseMap) {
			fill(115, 115, 115);
			noStroke();
			rect(width / 2 - 200, height / 2 - 200, 400, 600, 50);

			fill(0);
			textSize(25);
			text("Show collision shapes", width / 2 - 180, height / 2 - 150);
			text("Length of path", width / 2 - 180, height / 2);
			text("Add enemies", width / 2 - 180, height / 2 + 150);
			text("Sound volume", width / 2 - 180, height / 2 + 300);


//first line
			stroke(0);
			strokeWeight(2);
			if(this.collisionShape) {
				fill(0);
			} else {
				noFill();
			}
			rect(width / 2 + 130, height / 2 - 170, 20, 20);
//second line
			textSize(15);
			noFill();
			rect(width / 2 + 90, height / 2 - 20, 20, 20);
			line(width / 2 + 90, height / 2 - 10, width / 2 + 110, height / 2 - 10);
			rect(width / 2 + 175, height / 2 - 20, 20, 20);
			line(width / 2 + 175, height / 2 - 10, width / 2 + 195, height / 2 - 10);
			line(width / 2 + 185, height / 2 - 20, width / 2 + 185, height / 2);
			fill(0);
			noStroke();
			text(path.lengthOfPath, width / 2 + 120, height / 2 - 5);
//third line
			stroke(0);
			strokeWeight(2);
			if(this.enemiesExist) {
				fill(0);
			} else {
				noFill();
			}
			rect(width / 2 + 130, height / 2 + 130, 20, 20);
//forth line
			textSize(15);
			noFill();
			rect(width / 2 + 90, height / 2 + 280, 20, 20);
			line(width / 2 + 90, height / 2 + 290, width / 2 + 110, height / 2 + 290);
			rect(width / 2 + 175, height / 2 + 280, 20, 20);
			line(width / 2 + 175, height / 2 + 290, width / 2 + 195, height / 2 + 290);
			line(width / 2 + 185, height / 2 + 280, width / 2 + 185, height / 2 + 300);
			fill(0);
			noStroke();
			text(this.soundVolume, width / 2 + 130, height / 2 + 295);

//"start" button
			textSize(25);
			text("Start", width / 2 - 30, height / 2 + 380);
		} else {
			//menu
			fill(115, 115, 115);
			noStroke();
			rect(width / 2 - 200, height / 2 - 200, 400, 550, 50);

			//text
			fill(0);
			textSize(30);
			text("Choose difficulty", width / 2 - 115, height / 2 - 160);
			textSize(20);
			text("please wait 10 sec to let game load sounds", width / 2 - 190, height / 2 - 135);

			//difficulties buttons
			fill(90, 90, 90);
			rect(width / 2 - 170, height / 2 - 120, 340, 80, 10);
			rect(width / 2 - 170, height / 2 - 20, 340, 80, 10);
			rect(width / 2 - 170, height / 2 + 80, 340, 80, 10);
			rect(width / 2 - 170, height / 2 + 180, 340, 80, 10);

			//make buttons lighter
			fill(105, 105, 105);
			if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 120 && mouseY < height / 2 - 40) {
				rect(width / 2 - 170, height / 2 - 120, 340, 80, 10);
			} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 20 && mouseY < height / 2 + 60) {
				rect(width / 2 - 170, height / 2 - 20, 340, 80, 10);
			} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 80 && mouseY < height / 2 + 160) {
				rect(width / 2 - 170, height / 2 + 80, 340, 80, 10);
			} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 180 && mouseY < height / 2 + 260) {
				rect(width / 2 - 170, height / 2 + 180, 340, 80, 10);
			}

			//their descriptions
			fill(0);
			textSize(25);
			text("Easy", width / 2 - 30, height / 2 - 90);
			text("Normal", width / 2 - 40, height / 2 + 10);
			text("Hard", width / 2 - 30, height / 2 + 110);
			text("Customise map", width / 2 - 90, height / 2 + 210);

			text("Short path and no enemies", width / 2 - 150, height / 2 - 55);
			text("Long path and no enemies", width / 2 - 148, height / 2 + 45);
			text("Long path with enemies", width / 2 - 130, height / 2 + 145);

			text("Sound volume", width / 2 - 180, height / 2 + 300);
			stroke(0);
			strokeWeight(2);
			textSize(15);
			noFill();
			rect(width / 2 + 90, height / 2 + 280, 20, 20);
			line(width / 2 + 90, height / 2 + 290, width / 2 + 110, height / 2 + 290);
			rect(width / 2 + 175, height / 2 + 280, 20, 20);
			line(width / 2 + 175, height / 2 + 290, width / 2 + 195, height / 2 + 290);
			line(width / 2 + 185, height / 2 + 280, width / 2 + 185, height / 2 + 300);
			fill(0);
			noStroke();
			text(this.soundVolume, width / 2 + 130, height / 2 + 295);
		}

	}

	indicator() {
		fill(0);
		stroke(0);
		textSize(20);
		text("Lives left: ", 50, 50)
		text(player.livesLeft, 50 + textWidth("Lives left: "), 50);
		text("Coins collected: ", 50, 70);
		text(player.coinsCollected, 50 + textWidth("Coins collected: "), 70);
	}

	gameOver() {
		fill(0);
		stroke(0);
		textSize(80);
		text("Game Over", 800, 500);
		this.backGroundDarkness = 50;
		backGroundMusic.stop();
		if(!this.gameOverSoundPlayed) {
			gameOverSound.play();
			this.gameOverSoundPlayed = true;
		}
	}

	youWon() {
		fill(0);
		stroke(0);
		textSize(80);
		text("You Won", 850, 500);
		this.backGroundDarkness = 50;
		backGroundMusic.stop();
		if(!this.youWonSoundPlayed) {
			youWonSound.play();
			this.youWonSoundPlayed = true;
		}
	}

	playMusic() {
		if(!backGroundMusic.isPlaying()) {
			backGroundMusic.play();
		}
	}
}

class Player {
	livesLeft = 3;
	coinsCollected = 0;
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
		deathSound.play();
	}

	takeCoin(index) {
		this.coinsCollected += 1;
		game.coins[index].taken = true;
	}

	drawGameChar() {
		stroke(0);
		strokeWeight(1);
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
}

class Path {
	constructor() {}
	//attributes needed to make and setup path
	lengthOfPath = 2000;
	wholePath = [];
	decorations = [];

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

	decorate() {
		for(var i = 0; i < this.wholePath.length; i++) {
			if(this.wholePath[i] instanceof Ground) {
				//decorating Ground with clouds, trees and mountains
				var numberOfClouds = round(random(0, 3));
				var numberOfTrees = round(random(0, 2));
				var numberOfMountains = round(random(0, 1));
//adding clouds over ground
				var currentPosX = this.wholePath[i].posX + round(random(0, 50));
				for(var j = 0; j < numberOfClouds; j++) {
					this.decorations.push(new Cloud(currentPosX, round(random(100, 200)), random(1, 2)));
					currentPosX += round(random(50, 150));
				}
//adding trees on the ground
				currentPosX = this.wholePath[i].posX + round(random(0, 100));
				for(var j = 0; j < numberOfTrees; j++) {
					this.decorations.push(new Tree(currentPosX, this.wholePath[i].posY, random(1, 1.5)));
					currentPosX += round(random(100, 300));
				}
//adding mountains on the ground
				currentPosX = this.wholePath[i].posX + round(random(0, 125));
				for(var j = 0; j < numberOfMountains; j++) {
					this.decorations.push(new Mountain(currentPosX, this.wholePath[i].posY, random(1, 1.5)));
					currentPosX += round(random(50, 300));
				}
//adding coins and enemies on the ground
				if(i != this.wholePath.length - 1 && i != 1) {
					game.coins.push(new Coin(this.wholePath[i].posX + (this.wholePath[i].width / 2), 675));

					if(game.enemiesExist) {
						game.enemies.push(new Enemy(this.wholePath[i].posX + (this.wholePath[i].width / 2),
						this.wholePath[i].posY - 20, 1, round(random(1, 4))));
					}
				}
			} else if(this.wholePath[i] instanceof Platform) {
				//decorating Platform with clouds
				var numberOfClouds = round(random(0, 2));
//adding clouds over platforms
				var currentPosX = this.wholePath[i].posX + round(random(0, 50));
				for(var j = 0; j < numberOfClouds; j++) {
					this.decorations.push(new Cloud(currentPosX, round(random(100, 200)), random(1, 2)));
					currentPosX += round(random(50, 100));
				}
			} else if(this.wholePath[i] instanceof Canyon) {
				//decorating Canyon with clouds
				var numberOfClouds = round(random(0, 1));
//adding clouds over canyons
				var currentPosX = this.wholePath[i].posX + round(random(0, 100));
				for(var j = 0; j < numberOfClouds; j++) {
					this.decorations.push(new Cloud(currentPosX, round(random(100, 200)), random(1, 2)));
					currentPosX += round(random(50, 100));
				}
			}
		}
	}

	drawFinish() {
		fill(139, 69, 19);
		rect(this.lengthOfPath - 500, 500, 10, 175, 50);
		fill(255, 0, 0);
		rect(this.lengthOfPath - 495, 505, 100, 50);
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
		noStroke();
		fill(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness);
		rect(this.posX, 675, this.width, 225);
		fill(210 - game.backGroundDarkness, 105 - game.backGroundDarkness, 30 - game.backGroundDarkness);
		rect(this.posX + 10, this.posY, this.width - 20, this.height, 50);

	}
}

class Ground {
	constructor(posX, posY, velocity) {
		this.posX = posX;
		this.posY = posY;
		this.velocity = velocity;
	}

	posX = 0;
	posY = 675;
	velocity = 0;
	width = 500;
	height = 225;
	collisionShape = true;

	drawObject() {
		noStroke();
		fill(0 - game.backGroundDarkness, 155 - game.backGroundDarkness, 0 - game.backGroundDarkness);
		rect(this.posX, this.posY, this.width, this.height); // draw some green ground
		//grass

	}
}

class Canyon {
	constructor(posX) {
		this.posX = posX;
	}
	// posX_array = [];
	collisionShape = false;
	posX = 0;
	width = 200;

	drawObject() {
		noStroke();
		fill(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness);
		rect(this.posX, height * 3 / 4, this.width, height / 4);
	}
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

//decorations
class Cloud {
	constructor(posX, posY, proportion) {
		this.posX = posX;
		this.posY = posY;
		this.proportion = proportion;
	}
	posX;
	posY;
	proportion;

	drawObject() {
		noStroke();
		fill (255, 255, 255);
		ellipse(this.posX, this.posY, 50 * this.proportion);
		ellipse(this.posX + (30 * this.proportion), this.posY + (10 * this.proportion), 70 * this.proportion);
		ellipse(this.posX + (50 * this.proportion), this.posY + (5 * this.proportion), 50 * this.proportion);
		ellipse(this.posX - (30 * this.proportion), this.posY + (15 * this.proportion), 65 * this.proportion);
		ellipse(this.posX, this.posY + (30 * this.proportion), 50 * this.proportion);

	}
}

class Tree {
	constructor(posX, posY, proportion) {
		this.posX = posX;
		this.posY = posY;
		this.proportion = proportion;
	}
	posX;
	posY;
	proportion = 1;

	drawObject() {
	//tree body
	beginShape();
	fill(210, 105, 30);
	noStroke();
	vertex(this.posX, this.posY);
	vertex(this.posX + (20 * this.proportion), this.posY - (30 * this.proportion));
	vertex(this.posX + (30 * this.proportion), this.posY - (100 * this.proportion));
	vertex(this.posX + (15 * this.proportion), this.posY - (150 * this.proportion));
	vertex(this.posX - (30 * this.proportion), this.posY - (220 * this.proportion));
	vertex(this.posX + (130 * this.proportion), this.posY - (200 * this.proportion));
	vertex(this.posX + (85 * this.proportion), this.posY - (150 * this.proportion));
	vertex(this.posX + (65 * this.proportion), this.posY - (100 * this.proportion));
	vertex(this.posX + (75 * this.proportion), this.posY - (30 * this.proportion));
	vertex(this.posX + (100 * this.proportion), this.posY);
	endShape();

	//tree head
	beginShape();
	fill(0, 255, 0);
	vertex(this.posX + (15 * this.proportion), this.posY - (185 * this.proportion));
	vertex(this.posX - (15 * this.proportion), this.posY - (170 * this.proportion));
	vertex(this.posX - (45 * this.proportion), this.posY - (185 * this.proportion));
	vertex(this.posX - (60 * this.proportion), this.posY - (220 * this.proportion));
	vertex(this.posX - (55 * this.proportion), this.posY - (240 * this.proportion));
	vertex(this.posX - (60 * this.proportion), this.posY - (280 * this.proportion));
	vertex(this.posX - (50 * this.proportion), this.posY - (330 * this.proportion));
	vertex(this.posX, this.posY - (370 * this.proportion));
	vertex(this.posX + (50 * this.proportion), this.posY - (400 * this.proportion));
	vertex(this.posX + (80 * this.proportion), this.posY - (390 * this.proportion));
	vertex(this.posX + (130 * this.proportion), this.posY - (350 * this.proportion));
	vertex(this.posX + (150 * this.proportion), this.posY - (320 * this.proportion));
	vertex(this.posX + (170 * this.proportion), this.posY - (300 * this.proportion));
	vertex(this.posX + (150 * this.proportion), this.posY - (200 * this.proportion));
	vertex(this.posX + (100 * this.proportion), this.posY - (150 * this.proportion));
	endShape();
	}
}

class Mountain {
	constructor(posX, posY, proportion) {
		this.posX = posX;
		this.posY = posY;
		this.proportion = proportion;
	}
	posX;
	posY;
	proportion;

	drawObject() {
		noStroke();
		fill(150, 150, 150);
		triangle(this.posX, this.posY,
		this.posX + (150 * this.proportion), this.posY,
		this.posX + (100 * this.proportion), this.posY - (200 * this.proportion));

		triangle(this.posX + (75 * this.proportion), this.posY,
		this.posX + (250 * this.proportion), this.posY,
		this.posX + (150 * this.proportion), this.posY - (250 * this.proportion));

		fill(255, 255, 255);
		triangle(this.posX + (100 * this.proportion), this.posY - (200 * this.proportion),
		this.posX + (75 * this.proportion), this.posY - (150 * this.proportion),
		this.posX + (113 * this.proportion), this.posY - (150 * this.proportion));

		triangle(this.posX + (150 * this.proportion), this.posY - (250 * this.proportion),
		this.posX + (135 * this.proportion), this.posY - (200 * this.proportion),
		this.posX + (171 * this.proportion), this.posY - (200 * this.proportion));
	}
}

class Coin {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY
	}
	posX;
	posY
	taken = false;

	drawObject() {
		fill (255, 223, 0);
		ellipse(this.posX,  645, 50, 50);

		textSize(35);
		stroke(1);
		strokeWeight(2);
		text('1', this.posX - 9, 657);
		strokeWeight(0);
	}
}

class Enemy {
	constructor(posX, posY, proportion, velocityX) {
		this.currentPosX = posX;
		this.initialPosX = posX;
		this.posY = posY;
		this.proportion = proportion;
		this.velocityX = velocityX;
	}
	currentPosX;
	posY;
	proportion;
	initialPosX;
	velocityX;

	drawObject() {
		noStroke();
//body
		fill(255, 255, 255);
		ellipse(this.currentPosX, this.posY, 50 * this.proportion);
		ellipse(this.currentPosX + (30 * this.proportion), this.posY + (10 * this.proportion), 70 * this.proportion);
		ellipse(this.currentPosX + (50 * this.proportion), this.posY + (5 * this.proportion), 50 * this.proportion);
		ellipse(this.currentPosX - (30 * this.proportion), this.posY + (15 * this.proportion), 65 * this.proportion);
		ellipse(this.currentPosX, this.posY + (30 * this.proportion), 50 * this.proportion);
//eyes
		fill(0);
		ellipse(this.currentPosX - 15, this.posY, 30 * this.proportion);
		ellipse(this.currentPosX + 40, this.posY, 30 * this.proportion);
//mouth
		fill(255,  0, 0);
		beginShape();
		vertex(this.currentPosX - 3, this.posY + 15);
		vertex(this.currentPosX + 6, this.posY + 20);
		vertex(this.currentPosX + 13, this.posY + 15);
		vertex(this.currentPosX + 20, this.posY + 20);
		vertex(this.currentPosX + 28, this.posY + 15);

		vertex(this.currentPosX + 28, this.posY + 40);
		vertex(this.currentPosX + 20, this.posY + 45);
		vertex(this.currentPosX + 13, this.posY + 40);
		vertex(this.currentPosX + 6, this.posY + 45);
		vertex(this.currentPosX - 3, this.posY + 40);
		endShape();
	}

	moveObject() {
		if(abs(this.currentPosX - this.initialPosX) >= 150) {
			this.velocityX = this.velocityX * (-1);
		}
		this.currentPosX += this.velocityX;
	}

	killPlayer() {
		player.death();
	}
}

var game = new Game();
var player = new Player();
var path = new Path();
var physics = new Physics();


var jumpSound;
var deathSound;
var collectCoinSound;
var gameOverSound;
var youWonSound;
var backGroundMusic;
var selectDifficultySound;

function preload() {
	soundFormats('mp3', 'wav');
	collectCoinSound = loadSound("assets/coinCollect.wav");
	youWonSound = loadSound("assets/youWon.wav");
	selectDifficultySound = loadSound("assets/selectDifficulty.wav");
	backGroundMusic = loadSound("assets/background.mp3");
	jumpSound = loadSound('assets/jump.wav');
	deathSound = loadSound('assets/death.mp3');
	gameOverSound = loadSound('assets/gameOver.wav');

}


function setup() {
	createCanvas(1900, 900);
}


function draw() {
	background(100 - game.backGroundDarkness, 155 - game.backGroundDarkness, 255 - game.backGroundDarkness); // fill the sky blue
	noStroke();

	push();
	translate((-1) * game.scrollPos, 0);

	if(!game.showMenu) {
		game.backGroundDarkness = 0;
//setup ground, platform and canyon classes and add decorations (Because it doesn't work in setup function)
		if(!game.setupPath) {
			path.createPath();
			path.decorate();
			game.setupPath = true;
		}
//drawing decorations
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < path.decorations.length; j++) {
				if(i == 0 && path.decorations[j] instanceof Cloud) {
					path.decorations[j].drawObject();
				} else if(i == 1 && path.decorations[j] instanceof Mountain) {
					path.decorations[j].drawObject();
				} else if(i == 2 && path.decorations[j] instanceof Tree) {
					path.decorations[j].drawObject();
				}
			}
		}

		path.drawFinish();

//drawing main parts
		for(var i = 0; i < path.wholePath.length; i++) {
			path.wholePath[i].drawObject();
		}

		for(var i = 0; i < game.coins.length; i++) {
			if(abs(player.posX - game.coins[i].posX) <= 20 && abs(player.posY - game.coins[i].posY) <= 20 && !game.coins[i].taken) {
				player.takeCoin(i);
			}
			if(!game.coins[i].taken) {
				game.coins[i].drawObject();
			}
		}

		for(var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].moveObject();
			game.enemies[i].drawObject();
			if(abs(player.posX - game.enemies[i].currentPosX) <= 50 && abs(player.posY - game.enemies[i].posY) <= 50) {
				game.enemies[i].killPlayer();
			}
		}

		player.drawGameChar();

//physics and so on
		if(game.collisionShape) {
			physics.showCollisionShape();
		}
		physics.moveObjects();
		game.playMusic();

	} else if(game.showMenu) {
		collectCoinSound.setVolume(game.soundVolume);
		youWonSound.setVolume(game.soundVolume);
		selectDifficultySound.setVolume(game.soundVolume);
		backGroundMusic.setVolume(game.soundVolume - 0.15);
		jumpSound.setVolume(game.soundVolume);
		deathSound.setVolume(game.soundVolume);
		gameOverSound.setVolume(game.soundVolume);
		game.menuOfGame();
	}
	pop();

//shows how many coins player collected and lives left
	game.indicator();

//Game Over when player died 3 times
	if(player.livesLeft <= 0) {
		game.gameOver();
	}
//Player won when pass through finish
	if(player.posX > path.lengthOfPath - 490) {
		game.youWon();
	}

}


function keyPressed() {
	if((key == 'A' || keyCode == 37) && !game.showMenu && player.livesLeft > 0 && !(player.posX > path.lengthOfPath - 490)) {
		player.velocityX = -10;
	} else if((key == 'D' || keyCode == 39) && !game.showMenu && player.livesLeft > 0 && !(player.posX > path.lengthOfPath - 490)) {
		player.velocityX = 10;
	} else if(key == ' ' && !game.showMenu && player.jumpsLeft > 0 && player.livesLeft > 0 && !(player.posX > path.lengthOfPath - 490)) { // make changes
		player.velocityY += -13;
		player.jumpsLeft--;
		jumpSound.play();
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
	if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 120 && mouseY < height / 2 - 40
	&& game.showMenu && !game.customiseMap) {
		path.lengthOfPath = 5000;
		game.showMenu = false;
		selectDifficultySound.play();
	} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 - 20 && mouseY < height / 2 + 60
	&& game.showMenu && !game.customiseMap) {
		path.lengthOfPath = 10000;
		game.showMenu = false;
		selectDifficultySound.play();
	} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 80 && mouseY < height / 2 + 160
	&& game.showMenu && !game.customiseMap) {
		game.showMenu = false;
		path.lengthOfPath = 10000;
		game.enemiesExist = true;
		selectDifficultySound.play();
	} else if(mouseX > width / 2 - 170 && mouseX < width / 2 + 170 && mouseY > height / 2 + 180 && mouseY < height / 2 + 260
	&& game.showMenu && !game.customiseMap) {
		game.customiseMap = true;
		selectDifficultySound.play();
	} else if(mouseY > height / 2 - 20 && mouseY < height / 2 && game.customiseMap) {
		if(mouseX > width / 2 + 90 && mouseX < width / 2 + 110 && path.lengthOfPath > 2000) {
			path.lengthOfPath -= 1000;
			selectDifficultySound.play();
		} else if(mouseX > width / 2 + 175 && mouseX < width / 2 + 195 && path.lengthOfPath < 99000) {
			path.lengthOfPath += 1000;
			selectDifficultySound.play();
		}
	} else if(mouseX > width / 2 + 130 && mouseX < width / 2 + 150 && game.customiseMap) {
		if(mouseY > height / 2 - 170 && mouseY < height / 2 - 150) {
			if(game.collisionShape) {
				game.collisionShape = false;
			} else {
				game.collisionShape = true;
			}
			selectDifficultySound.play();
		} else if(mouseY > height / 2 + 130 && mouseY < height / 2 + 150) {
			if(game.enemiesExist) {
				game.enemiesExist = false;
			} else {
				game.enemiesExist = true;
			}
			selectDifficultySound.play();
		}
	} else if(mouseY > height / 2 + 280 && mouseY < height / 2 + 300) {
		if(mouseX > width / 2 + 90 && mouseX < width / 2 + 110 && game.soundVolume > 0.2) {
			game.soundVolume -= 0.1;
			selectDifficultySound.play();
		} else if(mouseX > width / 2 + 175 && mouseX < width / 2 + 195 && game.soundVolume < 1) {
			game.soundVolume += 0.1;
			selectDifficultySound.play();
		}
	} else if(mouseX > width / 2 - 30 && mouseX < width / 2 + 25 && mouseY > height / 2 + 360 && mouseY < height / 2 + 380
	&& game.customiseMap) {
		game.showMenu = false;
	}
}
