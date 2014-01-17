var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse')
var SceneManager = require('./index');

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f',
});

var mouse = new Mouse(game);

mouse.on('click', function(location){
  console.log(game)
  if (game.currentScene.name === 'first scene'){
    sceneManager.set(sceneTwo);
  } else {
    sceneManager.set(scene);
  }
});

var firstScene, secondScene;
game.on('update', function(interval){
  firstScene = sceneManager.get('first scene');
  console.log(firstScene)
  secondScene = sceneManager.get('second scene');
  console.log(secondScene)
});

var sceneManager = new SceneManager(game);

var scene = sceneManager.create({
  name: 'first scene',
  backgroundColor: '#e1f23f'
});

scene.on('start', sceneSwitch);

sceneManager.set(scene);

var sceneTwo = sceneManager.create({
  name: 'second scene',
  backgroundColor: '#7def71'
});

sceneTwo.on('start', sceneSwitch);

function setMessage(text){
  document.getElementById('scene-name').innerHTML = text;
}

function sceneSwitch(scene){
  console.log(scene.name)
  setMessage(scene.name);
}