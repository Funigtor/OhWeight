Bouffe.Preloader = function(game) {};
Bouffe.Preloader.prototype = {
	preload: function() {
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('steak', 'assets/Steak.png');
            this.load.image('saucisson', 'assets/saucisson.png',243,207);
			this.load.image('screen-mainmenu', 'assets/MainMenu.png');
			this.load.spritesheet('button-start', 'assets/button-start.png', 146, 51);
            this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
