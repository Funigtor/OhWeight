Bouffe.Select = function(game) {
    this.init = function(userData){
        this.userData = userData;
    }
    this.create = function() {
        this.add.sprite(0, 0, 'select');
        // 1
        this.startButton = this.add.button(60+0*100, Bouffe._HEIGHT*0.5, 'button1', this.selectOne, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 2
        this.startButton = this.add.button(60+1*100, Bouffe._HEIGHT*0.5, 'button2', this.selectTwo, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 3
        this.startButton = this.add.button(60+2*100, Bouffe._HEIGHT*0.5, 'button3', this.selectThree, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 4
        this.startButton = this.add.button(60+3*100, Bouffe._HEIGHT*0.5, 'button4', this.selectFour, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 5
        this.startButton = this.add.button(60+4*100, Bouffe._HEIGHT*0.5, 'button5', this.selectFive, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 6
        this.startButton = this.add.button(60+5*100, Bouffe._HEIGHT*0.5, 'button6', this.selectSix, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // 7
        this.startButton = this.add.button(60+6*100, Bouffe._HEIGHT*0.5, 'button7', this.selectSeven, this);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
        // Custom
        this.game.add.text(Bouffe._WIDTH*0.25,Bouffe._HEIGHT*0.65, "Charger un niveau →",{fontsize: "32px"})
        this.loadButton = this.add.button(Bouffe._WIDTH*0.70, Bouffe._HEIGHT*0.65, 'button-start', this.loadLevel, this, 2, 0, 1);
		this.loadButton.anchor.set(0.5,0);
		this.loadButton.input.useHandCursor = true
    }

    this.selectOne = function(){
        this.userData.level = 'level-one';
        this.startGame();
    }

    this.selectTwo = function(){
        this.userData.level = 'level-two';
        this.startGame();
    }

    this.selectThree = function(){
        this.userData.level = 'level-three';
        this.startGame();
    }

    this.selectFour = function(){
        this.userData.level = 'level-four';
        this.startGame();
    }

    this.selectFive = function(){
        this.userData.level = 'level-five';
        this.startGame();
    }

    this.selectSix = function(){
        this.userData.level = 'level-six';
        this.startGame();
    }

    this.selectSeven = function(){
        this.userData.level = 'level-seven';
        this.startGame();
    }
     
    this.loadLevel = function(){
        let needCheck = prompt("Entrez un JSON ici");
        try {
            let userLevel = JSON.parse(needCheck);
            this.userData.level = "custom"
            this.userData.userLevel = userLevel;
            if (needCheck) this.startGame();
        } catch (SyntaxError) {
            alert("Le format de votre JSON est incorrect, ou ce n'est pas un JSON");
        }
    }

    this.startGame = function() {
		this.game.state.start('Game',true,false,this.userData);
	};
}