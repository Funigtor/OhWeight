Bouffe.EndLevel = function(game) {
	var phrases = ["Ne mange pas trop de viande","Les légumes sont bons pour la santé","La junkfood est mauvaise pour la santé","Essaye de limiter le gras et le sel"]
	this.init = function(userData){
        this.userData = userData;
    }

	this.create = function() {
		switch (this.userData.nbStars){
			case 1:
				this.add.sprite(0, 0, 'Score1');
				break;
			case 2:
				this.add.sprite(0, 0, 'Score2');
				break;
			case 3:
				this.add.sprite(0, 0, 'Score3');
				break;
			default:
				this.add.sprite(0, 0, 'Score0');
		}
		this.startButton = this.add.button(Bouffe._WIDTH*0.2, Bouffe._HEIGHT*0.1, 'button-mainMenu', this.returnMainMenu, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
		this.persoButton = this.add.button(Bouffe._WIDTH*0.80, Bouffe._HEIGHT*0.1, 'button-restart', this.restart, this, 2, 0, 1);
		this.persoButton.anchor.set(0.5,0);
		this.persoButton.input.useHandCursor = true;
		this.displaySentence();
	};

	this.displaySentence = function(){
		let styleText = {
			fontSize : 32,
		};
		let numberRandom = Math.random()*100;
		let numberSentence = Math.round(numberRandom) % phrases.length;
		let phrase = phrases[numberSentence];
		this.game.add.text(60,370,phrase,styleText);
	}

	this.returnMainMenu = function() {
		this.game.state.start('MainMenu',true,false,this.userData);
	};

	this.restart = function(){
		this.game.state.start('Game',true,false,this.userData);
	}

};
