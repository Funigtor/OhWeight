Bouffe.MainMenu = function(game) {
	var keyStart;
	this.create = function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.startButton = this.add.button(Bouffe._WIDTH*0.75, Bouffe._HEIGHT*0.66, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
		keyStart = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	};

	this.update = function() {
		if (keyStart.isDown) this.startGame();
	};

	this.startGame = function() {
		this.game.state.start('Game');
	};

};