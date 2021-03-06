var SaveTheDate = SaveTheDate || {};

SaveTheDate.PreloadState = {

  //load the game assets before the game starts
  preload: function(){

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 75, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 256, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);


    this.load.image('background', 'assets/images/background.png');
    this.load.image('living_room', 'assets/images/living_room.png');
    this.load.spritesheet('sarah', 'assets/images/sarah.png', 240, 318, 6, 0, 0);
    this.load.image('jason', 'assets/images/jason.png');
    this.load.image('testgirl', 'assets/images/testgirl.png');
    this.load.image('replay', 'assets/images/replay.png');
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
    this.load.spritesheet('pew','assets/images/pew.png', 200, 100, 2, 0, 0);
    this.load.spritesheet('uhaul','assets/images/uhaul.png', 435, 330, 5, 0, 0);
    this.load.spritesheet('judge','assets/images/judge.png', 310, 381, 4, 0, 0);
    this.load.spritesheet('heart','assets/images/heart.png', 240, 224, 3, 0, 0);
    this.load.spritesheet('battery','assets/images/battery.png', 50, 75, 3, 0, 0);
    this.load.spritesheet('box','assets/images/box.png', 150, 150, 6, 0, 0);
    this.load.spritesheet('gavel','assets/images/gavel.png', 180, 150, 6, 0, 0);
    this.load.spritesheet('bossGavel','assets/images/bossGavel.png', 180, 180, 4, 0, 0);
    this.load.spritesheet('tooth','assets/images/tooth.png', 150, 180, 6, 0, 0);
    this.load.spritesheet('fireball', 'assets/images/fireball.png', 40, 40, 4, 0, 0);
    this.load.spritesheet('doctopus', 'assets/images/doctopus.png', 558, 600, 4, 0, 0);
    this.load.spritesheet('floss','assets/images/floss.png', 1200, 100, 2, 0, 0);


    this.load.audio('orchestra', ['assets/audio/JPEinstrumental.mp3', 'assets/audio/JPEinstrumental.ogg']);
    this.load.audio('highScore', ['assets/audio/high_score.wav']);

    //load level data
    this.load.text('level1', 'assets/data/level1.json');
    this.load.text('level2', 'assets/data/level2.json');
    this.load.text('level3', 'assets/data/level3.json');
    this.load.text('level4', 'assets/data/level4.json');
    this.load.text('level5', 'assets/data/level5.json');
    this.load.text('level6', 'assets/data/level6.json');
  },

  create: function() {
    this.state.start('HomeState');
  }

};
