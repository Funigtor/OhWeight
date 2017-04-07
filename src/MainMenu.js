Bouffe.MainMenu = function(game) {
	var keyStart;
	var keySelect;
	var userData = new Object();
	userData.personnage='dude';

	this.create = function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.startButton = this.add.button(Bouffe._WIDTH*0.75, Bouffe._HEIGHT*0.66, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
		keyStart = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		keySelect = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.persoButton = this.add.button(Bouffe._WIDTH*0.80, Bouffe._HEIGHT*0.45, 'button-dude', this.changePerso, this, 2, 0, 1);
		this.persoButton.anchor.set(0.5,0);
		this.persoButton.input.useHandCursor = true;
	};

	this.update = function() {
		if (keyStart.isDown || keySelect.isDown) this.startGame();
	};

	this.startGame = function() {
		this.game.state.start('Select',false,false,userData);
	};

	this.changePerso = function(){
		(userData.personnage == "dude") ? userData.personnage = "dudette" : userData.personnage = "dude"
		let boutonACharger = 'button-'+userData.personnage;
		this.persoButton = this.add.button(Bouffe._WIDTH*0.80, Bouffe._HEIGHT*0.45, boutonACharger, this.changePerso, this, 2, 0, 1);
		this.persoButton.anchor.set(0.5,0);
	};
};
