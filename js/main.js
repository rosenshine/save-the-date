//create game
var SaveTheDate = SaveTheDate || {};
SaveTheDate.game = new Phaser.Game(1600, 900, Phaser.AUTO);

SaveTheDate.game.state.add('GameState', SaveTheDate.GameState);
SaveTheDate.game.state.add('HomeState', SaveTheDate.HomeState);
SaveTheDate.game.state.add('PreloadState', SaveTheDate.PreloadState);
SaveTheDate.game.state.add('BootState', SaveTheDate.BootState);
SaveTheDate.game.state.start('BootState');


// var SpaceHipster = SpaceHipster || {};
//
// //initiate the Phaser framework
// SpaceHipster.game = new Phaser.Game('100%', '100%', Phaser.AUTO);
//
// SpaceHipster.game.state.add('GameState', SpaceHipster.GameState);
// SpaceHipster.game.state.start('GameState');
