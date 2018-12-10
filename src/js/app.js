let level = document.querySelector("#level-counter").textContent;
let bestLevel = document.querySelector("#highest-level").textContent;    

let levelVal = Number(level);
let bestLevelVal = Number(bestLevel); 

var Enemy = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = randomSpeed(50, 75);
    this.sprite = 'dist/images/enemy-bug.png';
}

Enemy.prototype.update = function(dt){
    for(Enemy of allEnemies){
        if(Enemy.x < 505){
            Enemy.x += Enemy.speed * dt;
        } else {
            Enemy.x = -100;
        }
    }
}

Enemy.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

class Player{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    update(){
        if(player.y == -35){
            player.y = -36; 
            levelUp(); 
            setTimeout(function(){player.x = 200; player.y = 380;}, 500);
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e){
        if("left" == e){
            if(this.x < 505 && this.x > 0){
                this.x += -101;
            }
        } else if ("right" == e){
            if(this.x < 402 && this.x > -3){
                this.x += 101;
            }
        } else if ("up" == e){
            if(this.y < 381 && this.y > -36){
                this.y += -83;
            }
        } else if("down" == e){
            if(this.y < 379 && this.y > -36 ){
                this.y += 83;
            }
        }
    }
}

let allEnemies = [];
allEnemies.push(new Enemy(randomPos(-100, 500), 214));
allEnemies.push(new Enemy(randomPos(-100, 500), 132));
allEnemies.push(new Enemy(randomPos(-100, 500), 48));

let extraEnemies = [];
for(x = 1; x < 1000; x++){
    extraEnemies.push(new Enemy(randomPos(-100, 500), 214));
    extraEnemies.push(new Enemy(randomPos(-100, 500), 132));
    extraEnemies.push(new Enemy(randomPos(-100, 500), 48));
}

let player = new Player(200, 380, "dist/images/char-boy.png" );

document.addEventListener('keyup', function(e){
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    }

    player.handleInput(allowedKeys[e.keyCode]);
});

function increaseDifficulty(){
    if(levelVal > 3){
        if(allEnemies.length < 6){
            allEnemies.push(extraEnemies[0]);
            extraEnemies.splice(0, 1);

            for(Enemy of allEnemies){
                Enemy.speed = randomSpeed(50, 75);
            }
        } else {
            allEnemies.push(extraEnemies[0]);
            extraEnemies.splice(0, 1);

            for(Enemy of allEnemies){
                Enemy.speed = randomSpeed(30, 50);
            }
        }
    } else {
        for(Enemy of allEnemies){
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

function checkCollisions(){
    for(Enemy of allEnemies){
        let xval = parseInt(Enemy.x, ".");
        let yval = parseInt(Enemy.y, ".");

        if((xval > player.x - 75 && xval < player.x + 75) && (yval > player.y - 80 && yval < player.y + 80)){
            resestGame();
        }
    }
}

function resestGame(){
    player.x = 200;
    player.y = 380;
    for(x = 1; x < levelVal; x++){
        extraEnemies.push(extraEnemies);
        allEnemies.splice(3, 1);
    }

    levelVal = 1;

    for(Enemy of allEnemies){
        Enemy.speed = randomSpeed(50, 100);
    }

    document.querySelector("#level-counter").textContent = "1";
}

let levelUp = function(){
    if(levelVal == bestLevelVal){
        bestLevelVal += 1; 
    }
    
    levelVal += 1;
   
    document.querySelector("#level-counter").textContent = levelVal.toString();
    document.querySelector("#highest-level").textContent = bestLevelVal.toString();

    increaseDifficulty();
   }
