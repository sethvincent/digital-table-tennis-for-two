# crtrdg scene
> entity module for games

## Goals for crtrdg-scene:
- A simple interface for handling different levels or screens of a game.

This is still an overly simple and naive implementation of a scene manager. Not quite ready for real use, but almost.

## Requirements
- node.js
- browserify / beefy
- crtrdg-gameloop (or possibly another method of animating the canvas with requestAnimationFrame that emits `update` and `draw` events)

## Getting started
Install node if you haven't already.

### Install browserify and beefy:
```
npm install -g browserify beefy
```

## Usage:
### Create an index.html file:
```
<!DOCTYPE html>
<html>
<head>
  <title>crtrdg scene test</title>
</head>
<body>

<canvas id="game"></canvas>

<script src="./bundle.js"></script>
</body>
</html>
```

### Create a game.js file:
```
var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse')
var SceneManager = require('crtrdg-scene');

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f',
});

var firstScene, secondScene;
game.on('update', function(interval){
  firstScene = sceneManager.get('first scene');
  console.log(firstScene)
  secondScene = sceneManager.get('second scene');
  console.log(secondScene)
});

var mouse = new Mouse(game);

mouse.on('click', function(location){
  if (game.currentScene.name === 'first scene'){
    sceneManager.set(sceneTwo);
  } else {
    sceneManager.set(scene);
  }
});

var sceneManager = new SceneManager({
  game: game
});

var scene = sceneManager.create({
  name: 'first scene',
  backgroundColor: '#e1f23f'
});

scene.on('init', sceneSwitch);

sceneManager.set(scene);

var sceneTwo = sceneManager.create({
  name: 'second scene',
  backgroundColor: '#7def71'
});

sceneTwo.on('init', sceneSwitch);

function setMessage(text){
  document.getElementById('scene-name').innerHTML = text;
}

function sceneSwitch(){
  console.log(this.name)
  setMessage(this.name);
}
```

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those components, I'm stuck with dead library weight, and sometimes it's difficult to replace a library's methods.

So what if each element of 2d games were broken up into it's own modules / repositories?

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games.

As I learned more about node.js, the core events module, and browserify, I realized the ideal api for making simple 2d games could be based on node's events module. So you'll see a lot of crtrdg modules exposing an api that includes `.on('some event', function(){})`, which seems to make a lot of sense for games.

## Other `crtrdg` modules:
- [crtrdg-gameloop](http://github.com/sethvincent/crtrdg-gameloop)
- [crtrdg-entity](http://github.com/sethvincent/crtrdg-entity)
- [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
- [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)


## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT