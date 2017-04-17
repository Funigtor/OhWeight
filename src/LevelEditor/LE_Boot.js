var Bouffe = {
	_WIDTH: 800,
	_HEIGHT: 600
};
Bouffe.LE_Boot = function(game) {};
Bouffe.LE_Boot.prototype = {
    init: function(arg) {
        this.levelData = arg;
    },
	preload: function() {
	
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('LE_Preloader',false,false,this.levelData);
	}
};