"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var level = document.querySelector("#level-counter").textContent;
var bestLevel = document.querySelector("#highest-level").textContent;
var levelVal = Number(level);
var bestLevelVal = Number(bestLevel);

var Enemy = function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.speed = randomSpeed(50, 75);
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allEnemies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      Enemy = _step.value;

      if (Enemy.x < 505) {
        Enemy.x += Enemy.speed * dt;
      } else {
        Enemy.x = -100;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player =
/*#__PURE__*/
function () {
  function Player(x, y, sprite) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (player.y == -35) {
        player.y = -36;
        levelUp();
        setTimeout(function () {
          player.x = 200;
          player.y = 380;
        }, 500);
      }
    }
  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: "handleInput",
    value: function handleInput(e) {
      if ("left" == e) {
        if (this.x < 505 && this.x > 0) {
          this.x += -101;
        }
      } else if ("right" == e) {
        if (this.x < 402 && this.x > -3) {
          this.x += 101;
        }
      } else if ("up" == e) {
        if (this.y < 381 && this.y > -36) {
          this.y += -83;
        }
      } else if ("down" == e) {
        if (this.y < 379 && this.y > -36) {
          this.y += 83;
        }
      }
    }
  }]);

  return Player;
}();

var allEnemies = [];
allEnemies.push(new Enemy(randomPos(-100, 500), 214));
allEnemies.push(new Enemy(randomPos(-100, 500), 132));
allEnemies.push(new Enemy(randomPos(-100, 500), 48));
var extraEnemies = [];

for (x = 1; x < 1000; x++) {
  extraEnemies.push(new Enemy(randomPos(-100, 500), 214));
  extraEnemies.push(new Enemy(randomPos(-100, 500), 132));
  extraEnemies.push(new Enemy(randomPos(-100, 500), 48));
}

var player = new Player(200, 380, "images/char-boy.png");
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

function increaseDifficulty() {
  if (levelVal > 3) {
    if (allEnemies.length < 6) {
      allEnemies.push(extraEnemies[0]);
      extraEnemies.splice(0, 1);

      for (var _i = 0; _i < allEnemies.length; _i++) {
        Enemy = allEnemies[_i];
        Enemy.speed = randomSpeed(50, 75);
      }
    } else {
      allEnemies.push(extraEnemies[0]);
      extraEnemies.splice(0, 1);

      for (var _i2 = 0; _i2 < allEnemies.length; _i2++) {
        Enemy = allEnemies[_i2];
        Enemy.speed = randomSpeed(30, 50);
      }
    }
  } else {
    for (var _i3 = 0; _i3 < allEnemies.length; _i3++) {
      Enemy = allEnemies[_i3];
      Enemy.speed *= 1.2;
    }
  }
}

function randomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPos(min, max) {
  return Math.random() * (max - min) + min;
}

function checkCollisions() {
  for (var _i4 = 0; _i4 < allEnemies.length; _i4++) {
    Enemy = allEnemies[_i4];
    var xval = parseInt(Enemy.x, ".");
    var yval = parseInt(Enemy.y, ".");

    if (xval > player.x - 75 && xval < player.x + 75 && yval > player.y - 80 && yval < player.y + 80) {
      resestGame();
    }
  }
}

function resestGame() {
  player.x = 200;
  player.y = 380;

  for (x = 1; x < levelVal; x++) {
    extraEnemies.push(extraEnemies);
    allEnemies.splice(3, 1);
  }

  levelVal = 1;

  for (var _i5 = 0; _i5 < allEnemies.length; _i5++) {
    Enemy = allEnemies[_i5];
    Enemy.speed = randomSpeed(50, 100);
  }

  document.querySelector("#level-counter").textContent = "1";
}

var levelUp = function levelUp() {
  if (levelVal == bestLevelVal) {
    bestLevelVal += 1;
  }

  levelVal += 1;
  document.querySelector("#level-counter").textContent = levelVal.toString();
  document.querySelector("#highest-level").textContent = bestLevelVal.toString();
  increaseDifficulty();
};