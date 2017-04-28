Bouffe.Select = function(game) {
    this.init = function(userData){
        this.userData = userData;
    }
    this.create = function() {
        this.add.sprite(0, 0, 'select');
        this.startButton = this.add.button(Bouffe._WIDTH*0.14, Bouffe._HEIGHT*0.5, 'button-start', this.selectOne, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        this.loadButton = this.add.button(Bouffe._WIDTH*0.70, Bouffe._HEIGHT*0.65, 'button-start', this.loadLevel, this, 2, 0, 1);
		this.loadButton.anchor.set(0.5,0);
		this.loadButton.input.useHandCursor = true
    }

    this.selectOne = function(){
        this.userData.level = 'level-one';
        this.startGame();
    }
     
    this.loadLevel = function(){
        let needCheck = prompt("Entrez un JSON ici");
        try {
            let userLevel = JSON.parse(needCheck);
            this.userData.level = "custom"
            this.userData.userLevel = userLevel;
            this.startGame();
        } catch (SyntaxError) {
            alert("Le format de votre JSON est incorrect, ou ce n'est pas un JSON");
        }
    }

    this.startGame = function() {
		this.game.state.start('Game',true,false,this.userData);
	};
}