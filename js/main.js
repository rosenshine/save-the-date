//create game
var game = new Phaser.Game(640, 360, Phaser.AUTO);


game.state.add('GameState', GameState);
game.state.start('GameState');
