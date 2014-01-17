var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomInt = require('./util/math').randomInt;
var randomRGB = require('./util/math').randomRGB;

module.exports = Ball;

function Ball(options){
  Entity.call(this);
  var self = this;

  this.game = options.game;

  this.size = { x: 20, y: 20 };
  this.position = { x: game.width/2 - this.size.x, y: game.height/2 - this.size.y };
  this.velocity = { x: 10, y: 0 };

  this.speed = 8.5;
  this.friction = 0.5;
  this.color = '#fff';
  this.direction = 'idle';

  this.particles = {
    jump: {
      size: 3,
      number: 10,
      color: '#ffffff'
    }
  }
  
  this.on('update', function(interval){ 
    self.move();
    self.boundaries();
  });

  this.on('draw', function(c){
    c.save();
    if (this.game.currentScene.name === 'match'){
      c.fillStyle = self.color;
      c.fillRect(self.position.x, self.position.y, self.size.x, self.size.y);
    }
    c.restore();
  });
}
 
inherits(Ball, Entity);

Ball.prototype.move = function(){
  /* update the position by the velocity of the entity */
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

Ball.prototype.boundaries = function(){
  /* top boundary */
  if (this.position.y <= 0){ 
    this.velocity.y *= -1;
  }

  /* bottom boundary */
  if (this.position.y >= this.game.height - this.size.y){
    this.velocity.y *= -1;
  }

  /* left */
  if (this.position.x <= 0){
    this.emit('goal', 'left');
  }

  /* right */
  if (this.position.x >= this.game.width - this.size.x){
    this.emit('goal', 'right');
  }
};

Ball.prototype.hitPaddle = function(paddle){
  if (this.touches(paddle)){
    console.log('touched', this.velocity.x, this.position.x)
    this.velocity.x *= -1;
    if (this.velocity.y === 0) this.velocity.y = 3;
    if (this.position.y / 2 > paddle.position.y / 2) this.velocity.y *= 1;
    if (this.position.y / 2 < paddle.position.y / 2) this.velocity.y *= -1;
  }
}