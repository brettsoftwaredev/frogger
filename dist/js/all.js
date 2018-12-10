"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
  var resourceCache = {};
  var readyCallbacks = [];
  /* This is the publicly accessible image loading function. It accepts
   * an array of strings pointing to image files or a string for a single
   * image. It will then call our private image loading function accordingly.
   */

  function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      /* If the developer passed in an array of images
       * loop through each value and call our image
       * loader on that image file
       */
      urlOrArr.forEach(function (url) {
        _load(url);
      });
    } else {
      /* The developer did not pass an array to this function,
       * assume the value is a string and call our image loader
       * directly.
       */
      _load(urlOrArr);
    }
  }
  /* This is our private image loader function, it is
   * called by the public image loader function.
   */


  function _load(url) {
    if (resourceCache[url]) {
      /* If this URL has been previously loaded it will exist within
       * our resourceCache array. Just return that image rather than
       * re-loading the image.
       */
      return resourceCache[url];
    } else {
      /* This URL has not been previously loaded and is not present
       * within our cache; we'll need to load this image.
       */
      var img = new Image();

      img.onload = function () {
        /* Once our image has properly loaded, add it to our cache
         * so that we can simply return this image if the developer
         * attempts to load this file in the future.
         */
        resourceCache[url] = img;
        /* Once the image is actually loaded and properly cached,
         * call all of the onReady() callbacks we have defined.
         */

        if (isReady()) {
          readyCallbacks.forEach(function (func) {
            func();
          });
        }
      };
      /* Set the initial cache value to false, this will change when
       * the image's onload event handler is called. Finally, point
       * the image's src attribute to the passed in URL.
       */


      resourceCache[url] = false;
      img.src = url;
    }
  }
  /* This is used by developers to grab references to images they know
   * have been previously loaded. If an image is cached, this functions
   * the same as calling load() on that URL.
   */


  function get(url) {
    return resourceCache[url];
  }
  /* This function determines if all of the images that have been requested
   * for loading have in fact been properly loaded.
   */


  function isReady() {
    var ready = true;

    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }

    return ready;
  }
  /* This function will add a function to the callback stack that is called
   * when all requested images are properly loaded.
   */


  function onReady(func) {
    readyCallbacks.push(func);
  }
  /* This object defines the publicly accessible functions available to
   * developers by creating a global Resources object.
   */


  window.Resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();

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
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */


var Engine = function (global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas element's height/width and add it to the DOM.
   */
  var doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;
  canvas.width = 505;
  canvas.height = 586;
  doc.body.appendChild(canvas);
  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */

  function main() {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */

    update(dt);
    render();
    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */

    lastTime = now;
    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */

    win.requestAnimationFrame(main);
  }
  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */


  function init() {
    reset();
    lastTime = Date.now();
    main();
  }
  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */


  function update(dt) {
    updateEntities(dt);
    checkCollisions();
  }
  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */


  function updateEntities(dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    player.update();
  }
  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */


  function render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = ['images/water-block.png', // Top row is water
    'images/stone-block.png', // Row 1 of 3 of stone
    'images/stone-block.png', // Row 2 of 3 of stone
    'images/stone-block.png', // Row 3 of 3 of stone
    'images/grass-block.png', // Row 1 of 2 of grass
    'images/grass-block.png' // Row 2 of 2 of grass
    ],
        numRows = 6,
        numCols = 5,
        row,
        col; // Before drawing, clear existing canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }
  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */


  function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function (enemy) {
      enemy.render();
    });
    player.render();
  }
  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */


  function reset() {} // noop

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */


  Resources.load(['images/stone-block.png', 'images/water-block.png', 'images/grass-block.png', 'images/enemy-bug.png', 'images/char-boy.png']);
  Resources.onReady(init);
  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */

  global.ctx = ctx;
}(void 0);