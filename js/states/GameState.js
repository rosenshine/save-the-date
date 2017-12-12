var SaveTheDate = SaveTheDate || {};

SaveTheDate.GameState = {
  //initiate some game-level settings
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.PLAYER_SPEED = 500;
    this.BULLET_SPEED = -1000;
  },

  preload: function(){
    this.load.image('background', 'assets/images/background.png');
    this.load.image('sarah', 'assets/images/sarah.png');
    this.load.image('jason', 'assets/images/jason.png');
    this.load.image('testgirl', 'assets/images/testgirl.png');
  },

  create: function(){
    this.background = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background');
    this.background.autoScroll(-30, 0);


    //player
    this.player = this.add.sprite(this.game.world.width * .15, this.game.world.centerY, 'sarah');
    this.player.anchor.setTo(0.5);
    this.player.scale.x = 0.5;
    this.player.scale.y = 0.5;
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    //     this.player.anchor.setTo(0.5);
    //     this.game.physics.arcade.enable(this.player);
    //     this.player.body.collideWorldBounds = true;
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
        this.player.body.velocity.y = directionY * this.PLAYER_SPEED;
      }
    }
  }
};
//
// var SpaceHipster = SpaceHipster || {};
//
// SpaceHipster.GameState = {
//   //initiate some game-level settings
//   init: function(currentLevel){
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.game.physics.startSystem(Phaser.Physics.ARCADE);
//
//     this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//
//     this.PLAYER_SPEED = 200;
//     this.BULLET_SPEED = -1000;
//
//     //level data
//     this.numLevels = 3;
//     this.currentLevel = currentLevel ? currentLevel : 1;
//     console.log('current level:' + this.currentLevel);
//   },
//
//   preload: function(){
//     this.load.image('space','assets/images/space.png');
//     this.load.image('player','assets/images/player.png');
//     this.load.image('bullet','assets/images/bullet.png');
//     this.load.image('enemyParticle','assets/images/enemyParticle.png');
//     this.load.spritesheet('yellowEnemy','assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
//     this.load.spritesheet('redEnemy','assets/images/red_enemy.png', 50, 46, 3, 1, 1);
//     this.load.spritesheet('greenEnemy','assets/images/green_enemy.png', 50, 46, 3, 1, 1);
//
//     //load level data
//     this.load.text('level1', 'assets/data/level1.json');
//     this.load.text('level2', 'assets/data/level2.json');
//     this.load.text('level3', 'assets/data/level3.json');
//
//     //load audio
//     this.load.audio('orchestra', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.ogg']);
//   },
//
//   create: function(){
//     //add scrolling background using tiles
//     this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
//     this.background.autoScroll(0, 30);
//
//     //player
//     this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
//     this.player.anchor.setTo(0.5);
//     this.game.physics.arcade.enable(this.player);
//     this.player.body.collideWorldBounds = true;
//
//     //implement pool of bullets
//     this.initBullets();
//
//     //loop to create bullets every second
//     this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5,
//       this.createPlayerBullet, this);
//
//     //initiate enemies
//     this.initEnemies();
//
//     this.loadLevel();
//
//     this.orchestra = this.add.audio('orchestra');
//     this.orchestra.play();
//   },
//
//   loadLevel: function(){
//
//     this.currentEnemyIndex = 0;
//
//     this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
//
//     //end of the level Timer
//     this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, ()=>{
//       console.log('level ended!');
//
//       this.orchestra.stop();
//
//       if(this.currentLevel < this.numLevels){
//         this.currentLevel++;
//       }
//       else {
//         this.currentLevel = 1;
//       }
//
//       this.game.state.start('GameState', true, false, this.currentLevel);
//     })
//
//     this.scheduleNextEnemy();
//   },
//
//   scheduleNextEnemy: function(){
//     var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];
//
//     if(nextEnemy){
//       var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex -1].time));
//       this.nextEnemyTimer = this.game.time.events.add(nextTime, () =>{
//         this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);
//         this.currentEnemyIndex++;
//         this.scheduleNextEnemy();
//       });
//     }
//   },
//
//   update: function(){
//
//     this.game.physics.arcade.overlap(this.playerBullets, this.enemies,
//       this.damageEnemy, null, this);
//
//     this.game.physics.arcade.overlap(this.enemyBullets, this.player,
//       this.killPlayer, null, this);
//
//     this.player.body.velocity.x = 0;
//
//     if(this.game.input.activePointer.isDown){
//       var targetX = this.game.input.activePointer.position.x;
//       var direction = targetX >= this.game.world.centerX ? 1 : -1;
//
//       this.player.body.velocity.x = this.PLAYER_SPEED * direction;
//     }
//   },
//
//   initBullets: function(){
//     this.playerBullets = this.add.group();
//     this.playerBullets.enableBody = true;
//   },
//
//   createPlayerBullet: function(){
//     //search for an existing bullet, if none create one
//     var bullet = this.playerBullets.getFirstExists(false);
//
//     if(!bullet){
//       bullet = new SpaceHipster.PlayerBullet(this.game, this.player.x, this.player.top);
//       this.playerBullets.add(bullet);
//     }
//     else {
//       //reset position
//       bullet.reset(this.player.x, this.player.top);
//     }
//     //set velocity
//     bullet.body.velocity.y = this.BULLET_SPEED;
//   },
//
//   initEnemies: function(){
//     this.enemies = this.add.group();
//     this.enemies.enableBody = true;
//
//     //initiate pool of enemy bullets
//     this.enemyBullets = this.add.group();
//     this.enemyBullets.enableBody = true;
//
//   },
//
//   damageEnemy: function(bullet, enemy){
//     enemy.damage(1);
//     bullet.kill();
//   },
//
//   killPlayer: function(bullet, player){
//     this.player.kill();
//     this.orchestra.stop();
//     this.game.state.start('GameState');
//   },
//
//   createEnemy: function(x, y, health, key, scale, speedX, speedY){
//     var enemy = this.enemies.getFirstExists(false);
//
//     if(!enemy){
//       enemy = new SpaceHipster.Enemy(this.game, x, y, key, health, this.enemyBullets);
//       this.enemies.add(enemy);
//     }
//
//     enemy.reset(x, y, health, key, scale, speedX, speedY);
//   }
// };
