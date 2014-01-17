var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse');
var goals = require('./index')(game);

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f',
});

var mouse = new Mouse(game);

mouse.on('click', function(location){
  goals.met(goalOne);
});

goalOne = goals.create({
  name: 'first goal'
});

console.log(goals)

goalOne.on('active', function(goal){
  console.log(goal.name + ' is active');
});

goalOne.on('met', function(goal){
  console.log(goal.name + ' is met!');
});

goals.set(goalOne);

