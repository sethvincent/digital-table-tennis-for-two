/*
* crtrdg.js modules
*/

var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var Mouse = require('crtrdg-mouse');
var SceneManager = require('crtrdg-scene');
var Goals = require('crtrdg-goal');


/*
* custom modules
*/

var Player = require('./player');
var Ball = require('./ball');
var randomInt = require('./util/math').randomInt;
var randomRGB = require('./util/math').randomRGB;
var randomRGBA = require('./util/math').randomRGBA;


/*
* create game object
*/

var game = new Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: randomRGBA(122, 256, 22, 256, 0, 256, 0.4)
});

game.on('pause', function(){
	console.log('paused');
});

game.on('resume', function(){
	console.log('resumed');
});

game.on('update', function(interval){
	if (playerOne.points == 10) game.pause();
	if (playerTwo.points == 10) game.pause();
})

game.on('draw', function(c){
	c.save();
	c.fillStyle = '#ffffff';
	c.font = "bold 50px sans-serif";
	c.fillText(playerOne.points, 100, 100);
	c.fillText(playerTwo.points, this.width - 140, 100);
	c.restore();
});


/*
* Keyboard
*/

var keyboard = new Keyboard(game);


/*
* Mouse
*/

var mouse = new Mouse(game);

mouse.on('click', function(){
	if (game.paused) scene.set(match);
	else game.pause();
});


/*
* Player one
*/

var playerOne = new Player({
  game: game,
  keysDown: keyboard.keysDown,
  upKey: 'W',
  downKey: 'S',
  position: { x: 20, y: game.height / 2 - 50 }
}).addTo(game);


/*
* Player two
*/

var playerTwo = new Player({
  game: game,
  keysDown: keyboard.keysDown,
  upKey: '<up>',
  downKey: '<down>',
  position: { x: game.width - 40, y: game.height / 2 - 50 }
}).addTo(game);


/*
* Ball
*/

var ball = new Ball({ 
	game: game 
});

ball.addTo(game);

ball.on('update', function(){
	ball.hitPaddle(playerOne);
	ball.hitPaddle(playerTwo);
});

ball.on('goal', function(side){
	console.log(side)
	if (side == 'left') playerTwo.points++;
	if (side == 'right') playerOne.points++
	resetMatch();
});


/*
* Scenes
*/

var scene = new SceneManager(game);


/*
* Menu Scene
*/

var menu = scene.create({
	name: 'menu',
	backgroundColor: randomRGBA(100, 255, 100, 255, 100, 255, 0.5)
});

menu.on('start', function(){
	console.log('menu started');
	game.pause();
});

menu.on('update', function(){
	console.log('menu updated');
});

menu.on('draw', function(c){
	crazyBackground(c);
});


/*
* Match scene
*/

var match = scene.create({
	name: 'match'
});

match.on('start', function(){
	console.log('match started');
	game.resume();
})

match.on('update', function(){
	console.log('player one points:', playerOne.points);
	console.log('player two points:', playerTwo.points);
	this.backgroundColor = randomRGBA(100, 255, 100, 255, 100, 255, 0.5);
});

match.on('draw', function(c){
	crazyBackground(c);
});

scene.set(menu);

function resetMatch(){
	ball.position = { 
		x: game.width / 2 - ball.size.x / 2, 
		y: game.height / 2 - ball.size.y / 2
	};
}

function crazyBackground(c){
	var size = 5;
	var columns = game.width / size;
	var rows = game.height / size;

	for (var h=0; h<rows; h+=randomInt(5, 20)){
    c.save();
    c.translate(game.width / 2, 0);
    c.rotate(Math.PI / randomInt(20, -180));
    c.fillStyle = randomRGBA(100, 255, 200, 255, 200, 255, 0.1);
    c.fillRect(-game.width/2-50, size*h-30, game.width+100, randomInt(100, 1000));
    c.restore();
  }

  for (var w=0; w<columns; w+=randomInt(5, 20)){
    c.fillStyle = randomRGBA(100, 255, 100, 200, 100, 211, .6);
    c.fillRect(size*w, randomInt(0, game.height), randomInt(1, 3), randomInt(1, 3));    
  }
}