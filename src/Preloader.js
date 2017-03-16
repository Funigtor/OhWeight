Bouffe.Preloader = function(game) {};
Bouffe.Preloader.prototype = {
	preload: function() {
            this.load.image('sky', 'assets/sky.jpg');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('star', 'assets/Steak.png');
            this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
	create: function() {
		this.game.state.start('Game');
	}
};