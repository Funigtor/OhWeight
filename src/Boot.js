var Bouffe = {
	_WIDTH: 800,
	_HEIGHT: 600
};
Bouffe.Boot = function(game) {};
Bouffe.Boot.prototype = {
	preload: function() {
		// TODO Ajouter des images pour le chargement 
		//this.load.image('preloaderBg', 'img/loading-bg.png');
		//this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preloader');
	}
};