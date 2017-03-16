Bouffe.MainMenu = function(game) {};
Bouffe.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.startButton = this.add.button(Bouffe._WIDTH*0.75, Bouffe._HEIGHT*0.66, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;

		// button to "read the article"
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};