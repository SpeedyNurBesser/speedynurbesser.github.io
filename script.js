const darkBGColorRGB = (37, 37, 38); //"#252526";
const lightBGColorRGB = (244, 236, 216); //"#f4ecd8";
const darkBGColorHex = "#252526";
const lightBGColorHex = "#f4ecd8";

let aboutPage = document.createElement("div");
aboutPage.appendChild(aboutPageImage);
aboutPage.style.display = "none";
aboutPage.style.position = "absolute";
// 180 px is half the width of the image
aboutPage.style.left =
  (
    Math.round(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) / 2
    ) - 180
  ).toString() + "px";
// 132 px is half the height of the image
aboutPage.style.top =
  (
    Math.round(
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) / 2
    ) - 132
  ).toString() + "px";
document.body.insertBefore(aboutPage, document.body.childNodes[0]);

// Threshold at which a movement towards the right is rather classified as a movement towards the right top corner etc.
const upperAngleThreshold = 2.414; // =tan(67.5°) = Math.tan(67.5)
const lowerAngleThreshold = 0.414; // =tan(22.5°) = Math.tan(22.5)

let myGamePiece;
const playerSpeed = 1.5;
const maxPlayerSpeed = 10;

let obstacles = [];

function startGame() {
  myGamePiece = new component(
    playerWidth,
    playerHeight,
    "",
    Math.round(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) / 2
    ) -
      playerWidth / 2,
    Math.round(
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) / 2
    ) -
      playerHeight / 2,
    "animatedImage",
    "",
    {
      idle: [playerIdle1, playerIdle2, 25],
      up: [playerUp1, playerUp2, playerUp3, playerUp4, playerUp5, playerUp6, 5],
      "right-up": [
        playerRightUp1,
        playerRightUp2,
        playerRightUp3,
        playerRightUp4,
        playerRightUp5,
        playerRightUp6,
        5,
      ],
      right: [
        playerRight1,
        playerRight2,
        playerRight3,
        playerRight4,
        playerRight5,
        playerRight6,
        playerRight7,
        playerRight8,
        5,
      ],
      "right-down": [
        playerRightDown1,
        playerRightDown2,
        playerRightDown3,
        playerRightDown4,
        playerRightDown5,
        playerRightDown6,
        5,
      ],
      down: [
        playerDown1,
        playerDown2,
        playerDown3,
        playerDown4,
        playerDown5,
        playerDown6,
        5,
      ],
      "left-down": [
        playerLeftDown1,
        playerLeftDown2,
        playerLeftDown3,
        playerLeftDown4,
        playerLeftDown5,
        playerLeftDown6,
        5,
      ],
      left: [
        playerLeft1,
        playerLeft2,
        playerLeft3,
        playerLeft4,
        playerLeft5,
        playerLeft6,
        playerLeft7,
        playerLeft8,
        5,
      ],
      "left-up": [
        playerLeftUp1,
        playerLeftUp2,
        playerLeftUp3,
        playerLeftUp4,
        playerLeftUp5,
        playerLeftUp6,
        5,
      ],
    },
    "idle",
    function () {
      // plays different animations dependent on movement
      if (this.speedX == 0 && this.speedY == 0) {
        // idle
        this.startNewAnimation("idle");
        return;
      }

      let signX = Math.sign(this.speedX);
      let signY = Math.sign(this.speedY);
      let m = this.speedY / this.speedX; // yes, m (aka a) as in the slope of a linear function: f(x) = mx + b

      if (m > upperAngleThreshold) {
        // up or down
        if (signY != -1) {
          this.startNewAnimation("down");
        } else {
          this.startNewAnimation("up");
        }
      } else if (m > lowerAngleThreshold) {
        // right-down or left-up
        if (signX != -1) {
          this.startNewAnimation("right-down");
        } else {
          this.startNewAnimation("left-up");
        }
      } // else if (m > 0) {// right or left}
      else if (m > -lowerAngleThreshold) {
        // right or left
        if (signX != -1) {
          this.startNewAnimation("right");
        } else {
          this.startNewAnimation("left");
        }
      } else if (m > -upperAngleThreshold) {
        // right-up or left-down
        if (signX != -1) {
          this.startNewAnimation("right-up");
        } else {
          this.startNewAnimation("left-down");
        }
      } else {
        // up or down
        if (signY != -1) {
          this.startNewAnimation("down");
        } else {
          this.startNewAnimation("up");
        }
      }
    }
  );

  blog = new component(
    blogWidth,
    blogHeight,
    "",
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) -
      2 * blogBorderDistance -
      blogWidth,
    blogBorderDistance,
    "animatedImage",
    function () {
      resetPlayerPosition();
      window.open("https://speedynurbesser.github.io/blog/", "_self");
    },
    {
      idle: [
        blogSprite1,
        blogSprite2,
        blogSprite3,
        blogSprite4,
        blogSprite5,
        blogSprite6,
        blogSprite7,
        blogSprite8,
        5,
      ],
    },
    "idle",
    function () {
      return "idle";
    }
  );
  obstacles.push(blog);

  contactBox = new component(
    contactBoxWidth,
    contactBoxHeight,
    contactBoxSprite,
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) -
      contactBoxBorderDistance -
      contactBoxWidth,
    Math.round(
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
    ) -
      contactBoxBorderDistance -
      contactBoxHeight,
    "animatedImage",
    function () {
      resetPlayerPosition();

      window.location.href = "mailto:370.Ole@proton.me";

      this.currentAnimation = "letterInsert";
      setTimeout(function () {
        contactBox.startNewAnimation("idle");
      }, 500);
    },
    {
      idle: [contactBoxSprite, 10],
      letterInsert: [
        contactBoxInsertSprite1,
        contactBoxInsertSprite2,
        contactBoxInsertSprite3,
        contactBoxInsertSprite4,
        5,
      ],
    },
    "idle",
    function () {}
  );
  obstacles.push(contactBox);

  weekReport = new component(
    weekReportWidth,
    weekReportHeight,
    weekReportSprite,
    weekReportBorderDistanceX,
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) -
      weekReportBorderDistanceY -
      weekReportHeight,
    "image",
    function () {
      resetPlayerPosition();
      window.open("https://ole370.substack.com", "_self");
    }
  );
  obstacles.push(weekReport);

  displayButton = new component(
    buttonWidth,
    buttonHeight,
    "",
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) /
      2 -
      buttonWidth / 2,
    displayButtonBorderDistanceY,
    "animatedImage",
    function () {
      resetPlayerPosition();

      clickSound.play();

      let savedDisplayMode = localStorage.getItem("displayMode");

      if (savedDisplayMode == lightBGColorHex) {
        myGameArea.canvas.style.backgroundColor = darkBGColorHex;
        localStorage.setItem("displayMode", darkBGColorHex);

        this.currentAnimation = "darkPressed";
        setTimeout(function () {
          displayButton.currentAnimation = "light";
          clickSound.play();
        }, 1000);
      } else {
        myGameArea.canvas.style.backgroundColor = lightBGColorHex;
        localStorage.setItem("displayMode", lightBGColorHex);

        this.currentAnimation = "lightPressed";
        setTimeout(function () {
          displayButton.currentAnimation = "dark";
          clickSound.play();
        }, 1000);
      }
    },
    {
      light: [lightButton, 10],
      lightPressed: [lightButtonPressed, 10],
      dark: [darkButton, 10],
      darkPressed: [darkButtonPressed, 10],
    },
    (defaultAnimation =
      myGameArea.canvas.style.backgroundColor == lightBGColorRGB
        ? "dark"
        : "light"),
    function () {}
  );
  obstacles.push(displayButton);

  projects = new component(
    projectsWidth,
    projectsHeight,
    projectsSprite,
    projectsBorderDistanceX,
    projectsBorderDistanceY,
    "image",
    function () {
      alert("PROJECTS?!");
      resetPlayerPosition();
    }
  );
  obstacles.push(projects);

  myGameArea.start();
}

let myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    this.canvas.height = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    let savedDisplayMode = localStorage.getItem("displayMode");
    if (savedDisplayMode == null) {
      this.canvas.style.backgroundColor = darkBGColorHex;
      localStorage.setItem("displayMode", darkBGColorHex);
    } else if (savedDisplayMode == lightBGColorHex) {
      this.canvas.style.backgroundColor = lightBGColorHex;
    } else {
      this.canvas.style.backgroundColor = darkBGColorHex;
    }

    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(
  width,
  height,
  color,
  x,
  y,
  type,
  func,
  animations,
  defaultAnimation,
  animationSelection
) {
  this.type = type;
  this.color = color; // color is dependent on the component's type either the text color, the image or the rectangle's color
  this.width = width;
  this.height = height;
  this.func = func;

  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.centerX = this.x + this.width / 2;
  this.centerY = this.y + this.height / 2;
  this.autoMove = false;
  this.targetX = 0;
  this.targetY = 0;

  this.defaultAnimation = defaultAnimation;
  this.animations = animations; // array: {"animation1": ["step1.png", "step2.png", ..., interval (every n frames)]}
  this.currentAnimation = defaultAnimation;
  this.animationStep = 0;
  this.animationSelection = animationSelection;

  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else if (this.type == "image") {
      ctx.drawImage(this.color, this.x, this.y, this.width, this.height);
    } else if (this.type == "animatedImage") {
      this.animationSelection();

      ctx.drawImage(
        this.animations[this.currentAnimation][this.animationStep],
        this.x,
        this.y,
        this.width,
        this.height
      );

      if (
        everyinterval(
          this.animations[this.currentAnimation][
            this.animations[this.currentAnimation].length - 1
          ],
          myGameArea.frameNo
        )
      ) {
        this.animationStep += 1;
        if (
          this.animations[this.currentAnimation].length - 1 ==
          this.animationStep
        ) {
          this.animationStep = 0;
        }
      }
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.hitBorder();

    if (this.autoMove) {
      if (
        this.targetX + maxPlayerSpeed > this.centerX &&
        this.centerX > this.targetX - maxPlayerSpeed &&
        this.targetY + maxPlayerSpeed > this.centerY &&
        this.centerY > this.targetY - maxPlayerSpeed
      ) {
        this.manualMove();
      }
    }
  };
  this.hitBorder = function () {
    let leftBorder = 0;
    let rightBorder = myGameArea.canvas.width - this.width;
    let topBorder = 0;
    let bottomBorder = myGameArea.canvas.height - this.height;

    if (this.x < leftBorder) {
      this.x = leftBorder;
      this.speedX = 0;
      if (this.autoMove == true) {
        this.manualMove();
      }
    }
    if (this.x > rightBorder) {
      this.x = rightBorder;
      this.speedX = 0;
      if (this.autoMove == true) {
        this.manualMove();
      }
    }
    if (this.y < topBorder) {
      this.y = topBorder;
      this.speedY = 0;
      if (this.autoMove == true) {
        this.manualMove();
      }
    }
    if (this.y > bottomBorder) {
      this.y = bottomBorder;
      this.speedY = 0;
      if (this.autoMove == true) {
        this.manualMove();
      }
    }
  };
  this.moveTo = function (targetX, targetY) {
    this.autoMove = true;
    this.targetX = targetX;
    this.targetY = targetY;
    let pathX = this.targetX - this.centerX;
    let pathY = this.targetY - this.centerY;
    let distanceX = Math.abs(pathX);
    let distanceY = Math.abs(pathY);
    // becomes either 1 or -1 giving the speed's direction when later multiplied
    pathX = pathX / distanceX;
    pathY = pathY / distanceY;

    if (distanceX > distanceY) {
      this.speedX = maxPlayerSpeed * pathX;
      this.speedY = (distanceY / distanceX) * maxPlayerSpeed * pathY;
    } else if (distanceY > distanceX) {
      this.speedX = (distanceX / distanceY) * maxPlayerSpeed * pathX;
      this.speedY = maxPlayerSpeed * pathY;
    } else {
      //distanceY === distanceX
      this.speedX = maxPlayerSpeed * pathX;
      this.speedY = maxPlayerSpeed * pathY;
    }
  };
  this.manualMove = function () {
    this.speedX = 0;
    this.speedY = 0;
    this.autoMove = false;
  };
  this.startNewAnimation = function (animation) {
    if (this.currentAnimation == animation) {
      return;
    }

    this.currentAnimation = animation;
    this.animationStep = 0;
  };
  this.overlapWith = function (otherObj) {
    let myLeft = this.x;
    let myRight = this.x + this.width;
    let myTop = this.y;
    let myBottom = this.y + this.height;
    let otherLeft = otherObj.x;
    let otherRight = otherLeft + otherObj.width;
    let otherTop = otherObj.y;
    let otherBottom = otherTop + otherObj.height;

    if (
      ((otherBottom > myTop && myTop > otherTop) ||
        (otherBottom > myBottom && myBottom > otherTop)) &&
      ((otherLeft < myLeft && myLeft < otherRight) ||
        (otherLeft < myRight && myRight < otherRight))
    ) {
      otherObj.func();
    }
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.frameNo += 1;

  blog.update();
  contactBox.update();
  weekReport.update();
  displayButton.update();
  projects.update();

  myGamePiece.newPos();
  myGamePiece.update();
  for (let i = 0; i < obstacles.length; i++) {
    myGamePiece.overlapWith(obstacles[i]);
  }
}

function everyinterval(n, timer) {
  if ((timer / n) % 1 == 0) {
    return true;
  }
  return false;
}

function resetPlayerPosition() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  myGamePiece.x =
    Math.round(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) / 2
    ) -
    playerWidth / 2;
  myGamePiece.y =
    Math.round(
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) / 2
    ) -
    playerHeight / 2;
}

document.addEventListener("keydown", function (event) {
  if (myGamePiece.autoMove == true) {
    myGamePiece.manualMove();
  } else {
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
      //LEFT
      myGamePiece.speedX += -playerSpeed;
      if (myGamePiece.speedX < -maxPlayerSpeed) {
        myGamePiece.speedX = -maxPlayerSpeed;
      }
    }
    if (event.code == "KeyW" || event.code == "ArrowUp") {
      //UP
      myGamePiece.speedY += -playerSpeed;
      if (myGamePiece.speedY < -maxPlayerSpeed) {
        myGamePiece.speedY = -maxPlayerSpeed;
      }
    }
    if (event.code == "KeyD" || event.code == "ArrowRight") {
      //RIGHT
      myGamePiece.speedX += playerSpeed;
      if (myGamePiece.speedX > maxPlayerSpeed) {
        myGamePiece.speedX = maxPlayerSpeed;
      }
    }
    if (event.code == "KeyS" || event.code == "ArrowDown") {
      //DOWN
      myGamePiece.speedY += playerSpeed;
      if (myGamePiece.speedY > maxPlayerSpeed) {
        myGamePiece.speedY = maxPlayerSpeed;
      }
    }
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code == "KeyA" || event.code == "ArrowLeft") {
    //LEFT
    myGamePiece.speedX = 0;
  }
  if (event.code == "KeyW" || event.code == "ArrowUp") {
    //UP
    myGamePiece.speedY = 0;
  }
  if (event.code == "KeyD" || event.code == "ArrowRight") {
    //RIGHT
    myGamePiece.speedX = 0;
  }
  if (event.code == "KeyS" || event.code == "ArrowDown") {
    //DOWN
    myGamePiece.speedY = 0;
  }
});

window.addEventListener("resize", function (event) {
  // Update Canvas Size when resizing
  let windowWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let windowHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  myGameArea.canvas.width = windowWidth;
  myGameArea.canvas.height = windowHeight;

  if (windowWidth < 800 || windowHeight < 720) {
    weekReportWidth = 160;
    weekReportHeight = 96;
    contactBoxWidth = 38;
    contactBoxHeight = 70;
    buttonWidth = 36;
    buttonHeight = 32;
    blogWidth = 122;
    blogHeight = 182;
    playerWidth = 22;
    playerHeight = 34;
    blogBorderDistance = 20;
    contactBoxBorderDistance = 70;
    weekReportBorderDistanceX = 40;
    weekReportBorderDistanceY = 60;
    projectsWidth = 142;
    projectsHeight = 82;
  } else {
    weekReportWidth = 320;
    weekReportHeight = 192;
    contactBoxWidth = 76;
    contactBoxHeight = 140;
    buttonWidth = 72;
    buttonHeight = 64;
    blogWidth = 244;
    blogHeight = 364;
    playerWidth = 44;
    playerHeight = 68;
    blogBorderDistance = 40;
    contactBoxBorderDistance = 140;
    weekReportBorderDistanceX = 80;
    weekReportBorderDistanceY = 120;
    projectsWidth = 284;
    projectsHeight = 164;
  }

  weekReport.width = weekReportWidth;
  weekReport.height = weekReportHeight;
  contactBox.width = contactBoxWidth;
  contactBox.height = contactBoxHeight;
  displayButton.width = buttonWidth;
  displayButton.height = buttonHeight;
  blog.width = blogWidth;
  blog.height = blogHeight;
  projects.width = projectsWidth;
  projects.height = projectsHeight;
  myGamePiece.width = playerWidth;
  myGamePiece.height = playerHeight;

  // Player / Object Repositioning when resizing (this resets the player position)
  resetPlayerPosition();

  blog.x = windowWidth - 2 * blogBorderDistance - blogWidth;
  blog.y = blogBorderDistance;

  contactBox.x = windowWidth - contactBoxBorderDistance - contactBoxWidth;
  contactBox.y = windowHeight - contactBoxBorderDistance - contactBoxHeight;

  (weekReport.x = weekReportBorderDistanceX),
    (weekReport.y =
      windowHeight - weekReportBorderDistanceY - weekReportHeight);

  // 180 px is half the width of the image
  aboutPage.style.left = (windowWidth / 2 - 180).toString() + "px";
  // 132 px is half the height of the image
  aboutPage.style.top = (windowHeight / 2 - 132).toString() + "px";

  displayButton.x = windowWidth / 2 - buttonWidth / 2;
  displayButton.y = displayButtonBorderDistanceY;
});

window.addEventListener("click", function (event) {
  if (
    event.x >= myGamePiece.x &&
    event.x <= myGamePiece.x + myGamePiece.width &&
    event.y >= myGamePiece.y &&
    event.y <= myGamePiece.y + myGamePiece.height
  ) {
    aboutPage.style.display = "block";
    return;
  }

  if (aboutPage.style.display == "block") {
    aboutPage.style.display = "none";
    return;
  } else {
    myGamePiece.moveTo(event.x, event.y);
  }
});
