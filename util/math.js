function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRGBA(rmin, rmax, gmin, gmax, bmin, bmax, alpha){
  var r = randomInt(rmin, rmax);
  var g = randomInt(gmin, gmax);
  var b = randomInt(bmin, bmax);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

function randomGray(min, max){
  var num = randomInt(min, max);
  return 'rgb(' + num + ', ' + num + ', ' + num + ')';
}

function randomGrayAlpha(min, max, alpha){
  var num = randomInt(min, max);
  return 'rgb(' + num + ', ' + num + ', ' + num + ', ' + alpha + ')';
}

function randomRGB(rmin, rmax, gmin, gmax, bmin, bmax){
  var r = randomInt(rmin, rmax);
  var g = randomInt(gmin, gmax);
  var b = randomInt(bmin, bmax);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

module.exports = {
  randomInt: randomInt,
  randomRGB: randomRGB,
  randomRGBA: randomRGBA,
  randomGray: randomGray,
  randomGrayAlpha: randomGray
};