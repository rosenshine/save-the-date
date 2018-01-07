var SaveTheDate = SaveTheDate || {};

SaveTheDate.GameState = {

  create: function() {
    this.PLAYER_SPEED = 500;
    this.FIREBALL_SPEED = 1000;
    this.UHAUL_SPEED = -200;
    this.BACKGROUND_SPEED = -100;


    this.background = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background');
    this.background.autoScroll(this.BACKGROUND_SPEED, 0);

    // set the score
    this.score = 0;
    var style = { font: '60px "Press Start 2P"', fill: "#000" };
    this.scoreText = this.game.add.text(50, 50, "Score:" + this.score, style);

    //player
    this.player = this.add.sprite(this.game.world.width * .15, this.game.world.centerY, 'sarah');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // this.createEnemy('uhaul');
    // this.game.time.events.loop(20000, this.createEnemy('uhaul'));

    // create fireballs
    this.initFireballs();
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND,
      this.createPlayerFireball, this);

    // create hearts
    this.hearts = this.add.group();
    this.hearts.enableBody = true;

    // start awesome music
    this.orchestra = this.add.audio('orchestra');
    this.orchestra.play();

    // set up level
    this.initEnemies();
    this.numLevels = 3;
    this.currentLevel = 1;
    this.loadLevel();
  },

  update: function(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if(this.game.input.activePointer.isDown){
      //X
      var targetX = this.game.input.activePointer.position.x;
      let playerX = this.player.body.center.x;
      let xDiff = targetX > playerX ? targetX - playerX : playerX - targetX;
      var directionX = targetX >= this.player.body.center.x ? 1 : -1;
      if (xDiff > 25) {
        this.player.body.velocity.x = directionX * this.PLAYER_SPEED;
      }
      //Y
      var targetY = this.game.input.activePointer.position.y;
      let playerY = this.player.body.center.y;
      let yDiff = targetY > playerY ? targetY - playerY : playerY - targetY;
      var directionY = targetY >= this.player.body.center.y ? 1 : -1;
      if (yDiff > 25){
        // set bounds so player does not walk off ground
        if (directionY === -1 && this.player.body.bottom > 410){
          this.player.body.velocity.y = directionY * this.PLAYER_SPEED;
        }
        else if (directionY === 1){
          this.player.body.velocity.y = directionY * this.PLAYER_SPEED;
        }
      }
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { this.player.body.velocity.x = -1 * this.PLAYER_SPEED }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { this.player.body.velocity.x = 1 * this.PLAYER_SPEED }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) { this.player.body.velocity.y = -1 * this.PLAYER_SPEED }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) { this.player.body.velocity.y = 1 * this.PLAYER_SPEED }

    // check for overlap between fireballs and enemies
    this.game.physics.arcade.overlap(this.playerFireballs, this.enemies, this.damageEnemy, null, this);

    // check for overlap between player and hearts
    this.game.physics.arcade.overlap(this.player, this.hearts, this.collectHeart, null, this);

    // check for overlap between enemies and player

  },

  initEnemies: function() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
  },

  damageEnemy: function(fireball, enemy) {
    enemy.damage(1);
    fireball.kill();
  },

  initFireballs: function() {
    this.playerFireballs = this.add.group();
    this.playerFireballs.enableBody = true;
    this.playerFireballs.allowRotation = true;
  },

  createPlayerFireball: function() {
    var fireball = this.playerFireballs.getFirstExists(false);

    if(!fireball) {
      fireball = new SaveTheDate.PlayerFireball(this.game, this.player.x, this.player.y);
      this.playerFireballs.add(fireball);
    }
    else {
      // reset position
      fireball.reset(this.player.x, this.player.y);
    }

    // set velocity
    fireball.body.velocity.x = this.FIREBALL_SPEED;
  },

  createHeart: function(x, y) {
    var heart = this.hearts.getFirstExists(false);

    if(!heart) {
      heart = new SaveTheDate.Heart(this.game, x, y);
      this.hearts.add(heart);
    }
    else {
      // reset position
      heart.reset(x, y);
    }

    // set velocity
    heart.body.velocity.x = this.BACKGROUND_SPEED;
  },

  collectHeart: function(player, heart) {
    heart.damage(1);
    this.score += 100;
    this.scoreText.text = "Score:" + this.score;
  },

  loadLevel: function(){

    if(this.currentLevel > this.numLevels){
      this.game.state.start('GameOverState', true, false, this.score);
    }
    else {
      this.currentEnemyIndex = 0;
      this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));

      this.scheduleNextEnemy();
    }
  },

  //create enemy
  createEnemy: function(health, type, speed) {
    let sprite;
    // find random valid y
    let randY = Math.floor(Math.random()*490) + 335;

    var enemy = new SaveTheDate.Enemy(this.game, this.game.world.width, randY, type, health);
    this.enemies.add(enemy);

    enemy.body.velocity.x = speed * (-.4 * this.currentLevel);
  },

  scheduleNextEnemy: function(){
    var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

    if(nextEnemy){
      var nextTime = 1500 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex -1].time));
      this.nextEnemyTimer = this.game.time.events.add(nextTime, () =>{
        this.createEnemy(nextEnemy.health, nextEnemy.key, nextEnemy.speedX);
        this.currentEnemyIndex++;
        this.scheduleNextEnemy();
      });
    }
    else {
      setTimeout(() =>{
        this.currentLevel++;
        this.loadLevel();
      }, 4000);
    }
  },

};
