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

    this.initEnemies();

    // create fireballs
    this.initFireballs();
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND,
      this.createPlayerFireball, this);

    // create hearts
    this.hearts = this.add.group();
    this.hearts.enableBody = true;
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

  //create enemy
  createEnemy: function(type) {
    let sprite;
    //random y position:
    let randY = Math.floor(Math.random() * this.game.world.height);
    if(type === 'uhaul') {
      this.sprite = this.add.sprite(this.game.world.width, randY, 'uhaul');
      this.sprite.anchor.setTo(0.5);
      this.sprite.scale.x = -0.7;
      this.sprite.scale.y = 0.7;
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.velocity.x = this.UHAUL_SPEED;
    }
  },

  initEnemies: function() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;

    var enemy = new SaveTheDate.Enemy(this.game, this.game.world.width, this.game.world.height/2, 'box', 5, []);
    this.enemies.add(enemy);

    enemy.body.velocity.x = this.UHAUL_SPEED;
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
  }

};
