var SaveTheDate = SaveTheDate || {};

SaveTheDate.Boss = function(game, x, y, type, health) {
  Phaser.Sprite.call(this, game, x, y, type);
  this.category = 'boss';
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.health = 20;
  this.animations.add('walk', [0,1], 3, true);
  this.animations.add('damaged', [2,3], 3, false);
  this.animations.add('blink', [0, 4, 0, 4], 2, false);
  this.play('walk');

  // set boss state - 'start', 'reverse'
  this.bossState = 'start';
};

SaveTheDate.Boss.prototype = Object.create(Phaser.Sprite.prototype);
SaveTheDate.Boss.prototype.constructor = SaveTheDate.Boss;

SaveTheDate.Boss.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  this.play('damaged');

  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('enemyParticle');
    emitter.minParticleSpeed.setTo(-400, -400);
    emitter.maxParticleSpeed.setTo(400, 400);
    emitter.gravity = false;
    emitter.start(true, 500, null, 100);

    // create heart
    SaveTheDate.GameState.createHeart(this.x, this.y, 2);
    SaveTheDate.GameState.currentLevel++;
    SaveTheDate.GameState.loadLevel();
  }

  setTimeout(() => {
    this.play('walk');
  }, 1000);
};

SaveTheDate.Boss.prototype.update = function() {
  let playerY = SaveTheDate.GameState.player.centerY;
  let bossY = this.body.center.y;
  let distance = Math.abs(playerY - bossY);
  let bossBelowPlayer = playerY < bossY;
  let direction = bossBelowPlayer ? -1 : 1;
  if(this.bossState === 'start'){
    if(distance > 15){
      this.body.velocity.y = 300 * direction;
    } else {
      this.play('blink');
      this.bossState = 'blink';
    }
  }
  if(this.bossState === 'blink'){
    this.body.velocity.y = 0;
    setTimeout(() => {
      this.body.velocity.y = 0;
      this.play('walk');
      this.bossState = 'charge';
    }, 1000);
  }
  if(this.bossState === 'charge'){
    if(this.body.center.x > 200){
      this.body.velocity.x = -1500;
    } else {
      this.body.velocity.x = 0;
      setTimeout(() =>{
        this.play('blink');
        this.bossState = 'reverse';
      }, 1000);
    }
  }
  if(this.bossState === 'reverse'){
    if(this.body.center.x < 1300){
      this.body.velocity.x = 1000;
    } else {
      this.body.velocity.x = 0;
      setTimeout(() =>{
        this.play('walk');
        this.bossState = 'start';
      }, 1000);
    }
  }
};
