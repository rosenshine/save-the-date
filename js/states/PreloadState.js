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
    this.load.image('sarah', 'assets/images/sarah.png');
    this.load.image('jason', 'assets/images/jason.png');
    this.load.image('testgirl', 'assets/images/testgirl.png');
    this.load.image('uhaul', 'assets/images/uhaul.png');
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
    this.load.spritesheet('heart','assets/images/heart.png', 240, 224, 3, 0, 0);
    this.load.spritesheet('box','assets/images/box.png', 150, 150, 6, 0, 0);
    this.load.spritesheet('gavel','assets/images/gavel.png', 173, 150, 6, 0, 0);
    this.load.spritesheet('tooth','assets/images/tooth.png', 141, 150, 6, 0, 0);
    this.load.spritesheet('fireball', 'assets/images/fireball.png', 40, 40, 4, 0, 0);

    this.load.audio('orchestra', ['assets/audio/JPEinstrumental.mp3', 'assets/audio/JPEinstrumental.ogg']);

    //load level data
    this.load.text('level1', 'assets/data/level1.json');
    this.load.text('level2', 'assets/data/level2.json');
    this.load.text('level3', 'assets/data/level3.json');
  },

  create: function() {
    this.state.start('HomeState');
  }

};
