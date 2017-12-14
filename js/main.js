//create game
var SaveTheDate = SaveTheDate || {};
SaveTheDate.game = new Phaser.Game(1600, 900, Phaser.AUTO);

SaveTheDate.game.state.add('GameState', SaveTheDate.GameState);
SaveTheDate.game.state.start('GameState');


// var SpaceHipster = SpaceHipster || {};
//
// //initiate the Phaser framework
// SpaceHipster.game = new Phaser.Game('100%', '100%', Phaser.AUTO);
//
// SpaceHipster.game.state.add('GameState', SpaceHipster.GameState);
// SpaceHipster.game.state.start('GameState');
