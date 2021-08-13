
var sketchProc = function (p) {
  with (p) {
    // this line sets the size of the canvas
    size(500, 500)
    ///// WRITE YOUR CODE HERE /////////////////////

    /***********************
     * 
     * Global Variables
     * 
     * ********************/
    var platforms;
    var ground;
    var player;
    var score;
    var centerFocusY;
    var left;
    var right;
    var playing;
    var alphabet;
    var index;


    var setup = function () {
      playing = true;
      platforms = [
        {
          x: 100,
          y: 340,
          w: 100,
          h: 10,
          xspeed: 0
        },
        {
          x: 220,
          y: 240,
          w: 100,
          h: 10,
          xspeed: 1
        },
        {
          x: 80,
          y: 140,
          w: 100,
          h: 10,
          xspeed: 1
        }
      ];
      ground = {
        x: 0,
        y: 450,
        w: 500,
        h: 50,
        ground: color(81, 207, 62)
      };
      player = {
        x: 225,
        y: 400,
        w: 50,
        h: 50,
        img: loadImage("doodle.png"),
        xspeed: 3,
        yspeed: 0
      };
      score = 0;
      centerFocusY = 250;
      gravity = 0.1;
      left = false;
      right = false;
      playing = true;
      alphabet = "abcdefghijklmnopqrstuvwxyz";
      index = 0;
    };

    /***********************
     * 
     * Draw Function
     * 
     * ********************/

    var draw = function () {
      if (playing) {
        background(150, 150, 255);
        drawScore();
        moveCamera();
        doPlatforms();
        image(player.img, player.x, player.y, player.w, player.h);
      } else {
        drawGameOver();
      }
    };

    /***********************
    * 
    * Other Functions
    * 
    * ********************/

    /*var input = function(platform) {
    text(alphabet[0], platform.x, platform.y)
    } */

    var drawGameOver = function () {
      fill(0, 0, 0, 10);
      rect(0, 0, 500, 500);
      textAlign(CENTER);
      textSize(28);
      fill(255);
      text("Game Over", 250, 150);
      text("Score :" + score, 250, 250);
      text("Press Space to Restart", 250, 350);
    };

    var drawScore = function () {
      var playerHeight = round(ground.y - (player.y + player.h))
      if (playerHeight > score) {
        score = playerHeight;
      }
      fill(0);
      textAlign(LEFT);
      textSize(28);
      text(score, 50, 50);
    };

    var getTallestPlatform = function () {
      var tallestPlatform = null;
      var tallestHeight = 500;

      for (var platform of platforms) {
        if (platform.y < tallestHeight) {
          tallestPlatform = platform;
          tallestHeight = platform.y;
        }
      }


      return tallestPlatform;
    };

    var doPlatforms = function () {
      fill(ground.ground)
      rect(ground.x, ground.y, ground.w, ground.h);
      for (var platform of platforms) {
        fill(34, 139, 34);
        rect(platform.x, platform.y, platform.w, platform.h, 50);
        platform.x += platform.xspeed;
        if (platform.x < 0) {
          platform.xspeed *= -1
        }
        if (platform.x + platform.w > 500) {
          platform.xspeed *= -1
        }
      }
      platforms = platforms.filter(
        function (p) {
          return p.y <= 250 + centerFocusY;
        }
      )
      var tallestPlatform = getTallestPlatform();
      if (tallestPlatform !== null) {
        if (tallestPlatform.y > centerFocusY - 250) {
          platforms.push({
            x: random(0, 400),
            y: tallestPlatform.y - random(50, 100),
            w: 100,
            h: 10,
            xspeed: floor(random(-1, 1))
          });
        }
      }
    };

    var moveCamera = function () {
      translate(0, 250 - centerFocusY);
      if (player.y < centerFocusY) {
        centerFocusY = player.y;
      }
    };

    var movePlayer = function () {
      player.y += player.yspeed;
      player.yspeed += gravity;
      if (collision(player, ground) && player.yspeed >= 0) {
        player.yspeed = -5;
      }
      for (var platform of platforms) {
        if (collision(player, platform) && player.yspeed >= 0 && feet(player, platform)) {
          // input(platform)
          player.yspeed = -5;
        }
      }
      if (left && player.x - player.xspeed > 0) {
        player.x -= player.xspeed;
      }
      if (right && player.x + player.xspeed < 500 - player.w) {
        player.x += player.xspeed;
      }
      if (player.y > centerFocusY + 250) {
        playing = false;
      }

    };

    var feetOn = function (obj1, obj2) {
      return obj1.y + obj1.h < obj2.y + 10 &&
        obj1.y + obj1.h > obj2.y - 10;

    }
    var collision = function (obj1, obj2) {
      if (obj1.x + obj1.w >= obj2.x &&
        obj1.x <= obj2.x + obj2.w &&
        obj1.y + obj1.h >= obj2.y &&
        obj1.y <= obj2.y + obj2.h) {
        return true;
      } else {
        return false;
      }
    };

    var keyPressed = function () {
      if (keyCode == LEFT) {
        left = true;
      }
      if (keyCode == RIGHT) {
        right = true;
      }
      if (keyCode == 32 && playing === false) {
        setup();
      }
    };

    var keyReleased = function () {
      if (keyCode == LEFT) {
        left = false;
      }
      if (keyCode == RIGHT) {
        right = false;
      }
    };





    ////// WHERE YOUR CODE ENDS ////////////////////// 
  }
}
var canvas = document.getElementById("myCanvas");
var p = new Processing(canvas, sketchProc); 
