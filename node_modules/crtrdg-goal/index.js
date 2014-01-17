var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function (game){
  return new Goals(game);
};

function Goals(game){
  this.game = game || {};
  this.game.goals = {};
  this.game.activeGoals = {};
  this.game.metGoals = {};
}

Goals.prototype.create = function create(settings){
  var goal = new Goal(settings);
  this.game.goals[goal.name] = goal;

  return goal;
};

Goals.prototype.all = function all(){
  return this.game.goals;
};

Goals.prototype.find = function find(goalName, callback){
  for (var goal in this.game.goals){
    if (goalName === goal.name){
      return callback(true, goal, this.game.goals);
    }
    else {
      return callback(false);
    }
  }
};

Goals.prototype.set = function set(goal){
  var oldGoal = this.game.activeGoal;

  this.game.activeGoal = goal;
  this.game.activeGoal.emit('active', this.game.activeGoal);
}

Goals.prototype.met = function met(goal){
  goal.emit('met', goal);
};

Goals.prototype.isActive = function isActive(goal){
  if (goal.name === this.game.activeGoal.name){
    return true;
  } else {
    return false;
  }
};

Goals.prototype.isMet = function isMet(_goal){
  var goalName = _goal.name;

  for (var goal in this.game.metGoals){
    if (goalName === goal.name){
      return callback(true, goal, this.game.metGoals);
    }
    else {
      return callback(false);
    }
  }
}

inherits(Goal, EventEmitter);

function Goal(settings){
  this.name = settings.name;
}