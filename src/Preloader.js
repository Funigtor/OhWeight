Bouffe.Preloader = function(game) {};
Bouffe.Preloader.prototype = {
	preload: function() {
						this.load.image('youdied', 'assets/youdied.png');
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('bumper', 'assets/Bumper.png');
            this.load.image('steak', 'assets/Steak.png');
            this.load.image('banane', 'assets/banana.png');
            this.load.image('patate', 'assets/patate.png');
            this.load.image('carotte', 'assets/carotte.png');
            this.load.image('magikarp', 'assets/poisson.png');
            this.load.image('poulet', 'assets/poulet.png');
            this.load.image('nicolas', 'assets/sel.png');
            this.load.image('haricot', 'assets/flageolaient.png');
            this.load.image('saucisson', 'assets/saucisson test.png');
            this.load.image('andrew', 'assets/Burger.png');
            this.load.image('cornetto', 'assets/glace.png');
            this.load.image('mensonge', 'assets/GATAL.png');
            this.load.image('sprite', 'assets/sodo.png');
						this.load.image('Bed', 'assets/bed.png');
			this.load.image('screen-mainmenu', 'assets/MainMenu.png');
			this.load.image('select','assets/select.png')
            this.load.image('Score0','assets/Score0.png')
            this.load.image('Score1','assets/Score1.png')
            this.load.image('Score2','assets/Score2.png')
            this.load.image('Score3','assets/Score3.png')
			this.load.spritesheet('button-start', 'assets/button-start.png', 146, 51);
            this.load.spritesheet('button-restart', 'assets/button-restart.png', 190, 51);
            this.load.spritesheet('button-mainMenu', 'assets/button-mainMenu.png', 240, 51);
			this.load.spritesheet('button-dude', 'assets/boutondude.png', 100, 100);
			this.load.spritesheet('button-dudette', 'assets/boutondudette.png', 100, 100);
            this.load.spritesheet('dude', 'assets/dude.png', 32, 36);
			this.load.spritesheet('dudette', 'assets/dudette.png', 32, 36);
			this.load.json('level-one', 'levels/lvl1.json');
            this.load.audio('Ah','audio/AH.ogg');
            this.load.audio('miam','audio/miam.ogg');
            this.load.audio('death','audio/yourefat.ogg');
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
