Bouffe.Select = function(game) {
    this.init = function(userData){
        this.userData = userData;
    }
    this.create = function() {
        this.add.sprite(0, 0, 'select');
        this.startButton = this.add.button(Bouffe._WIDTH*0.14, Bouffe._HEIGHT*0.5, 'button-start', this.selectOne, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
    }

    this.selectOne = function(){
        this.userData.level = 'level-one';
        this.startGame();
    }
     

    this.startGame = function() {
		this.game.state.start('Game',true,false,this.userData);
	};
}