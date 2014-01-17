var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomInt = require('./util/math').randomInt;
var randomRGB = require('./util/math').randomRGB;

module.exports = Player;

function Player(options){
  Entity.call(this);
  var self = this;

  this.game = options.game;
  this.position = options.position;

  this.keysDown = options.keysDown;
  this.upKey = options.upKey;
  this.downKey = options.downKey;

  this.size = { x: 20, y: 80 };
  this.velocity = { x: 0, y: 0 };

  this.speed = 8.5;
  this.friction = 0.5;
  this.health = 100;
  this.strength = 5;
  this.color = '#fff';
  this.direction = 'idle';
  this.visible = true;
  this.points = 00;
  
  this.particles = {
    jump: {
      size: 3,
      number: 10,
      color: '#b4b4ad'
    }
  }
  

  this.on('update', function(interval){ 
    self.input(self.keysDown);
    self.move();
    self.boundaries();
  });

  this.on('draw', function(c){
    c.save();
    c.fillStyle = self.color;
    c.fillRect(self.position.x, self.position.y, self.size.x, self.size.y);
    c.restore();
  });
}
 
inherits(Player, Entity);

Player.prototype.move = function(){
  /* update the position by the velocity of the entity */
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  /* slow the velocity using friction */
  this.velocity.x = parseInt(this.velocity.x * this.friction);
  this.velocity.y = parseInt(this.velocity.y * this.friction);
};

Player.prototype.boundaries = function(){
  /* left boundary */
  if (this.position.x <= 0) this.position.x = 0;

  /* right boundary */
  if (this.position.x >= this.game.width - this.size.x) this.position.x = this.game.width - this.size.x;

  /* top boundary */
  if (this.position.y <= 0) this.position.y = 0;

  /* bottom boundary */
  if (this.position.y >= this.game.height - this.size.y) this.position.y = this.game.height - this.size.y;
};

Player.prototype.input = function(keysdown){
  if (this.upKey in keysdown){
    this.velocity.y -= this.speed;
    this.direction = 'up';
  }

  if (this.downKey in keysdown){
    this.velocity.y += this.speed;
    this.direction = 'down';
  }
};