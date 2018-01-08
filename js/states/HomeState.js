var SaveTheDate = SaveTheDate || {};

SaveTheDate.HomeState = {
  create: function() {
    var background = this.game.add.sprite(0,0,'background');
    background.inputEnabled = true;

    background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);

    var style = { font: '35px Arial', fill: '#fff' };
    this.game.add.text(30, this.game.world.centerY + 200, 'CLICK TO START', style);
  }
};
