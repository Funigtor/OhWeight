Bouffe.Preloader = function(game) {};
Bouffe.Preloader.prototype = {
	preload: function() {
						this.load.image('youdied', 'assets/youdied.png');
            this.load.image('sky', 'assets/sky.png');
            this.load.image('background1', 'assets/Background1.png');
						this.load.image('background2', 'assets/background2.png');
						this.load.image('background3', 'assets/background3.png');
						this.load.image('background4', 'assets/background4.png');
						this.load.image('background5', 'assets/Background5.png');
						this.load.image('background6', 'assets/background6.png');
                        this.load.image('background7', 'assets/background7.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('platform1', 'assets/platform1.png')
            this.load.image('platform2', 'assets/platform2.png')
            this.load.image('platform3', 'assets/platform3.png')
            this.load.image('platform4', 'assets/platform4.png')
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
			this.load.image('screen-mainmenu', 'assets/menu.png');
			this.load.image('select','assets/selection.png')
            this.load.image('Score0','assets/Score0.png')
            this.load.image('Score1','assets/Score1.png')
            this.load.image('Score2','assets/Score2.png')
            this.load.image('Score3','assets/Score3.png')
            this.load.image('button1','assets/button1.png');
            this.load.image('button2','assets/button2.png');
            this.load.image('button3','assets/button3.png');
            this.load.image('button4','assets/button4.png');
            this.load.image('button5','assets/button5.png');
            this.load.image('button6','assets/button6.png');
            this.load.image('button7','assets/button7.png');
			this.load.spritesheet('button-start', 'assets/button-start.png', 146, 51);
            this.load.spritesheet('button-restart', 'assets/button-restart.png', 190, 51);
            this.load.spritesheet('button-mainMenu', 'assets/button-mainMenu.png', 240, 51);
			this.load.spritesheet('button-dude', 'assets/boutondude.png', 100, 100);
			this.load.spritesheet('button-dudette', 'assets/boutondudette.png', 100, 100);
            this.load.spritesheet('dude', 'assets/dude.png', 32, 36);
			this.load.spritesheet('dudette', 'assets/dudette.png', 32, 36);
			this.load.json('level-one', 'levels/lvl1.json');
   			this.load.json('level-two', 'levels/lvl2.json');
			this.load.json('level-three', 'levels/lvl3.json');
			this.load.json('level-four', 'levels/lvl4.json');
			this.load.json('level-five', 'levels/lvl5.json');
			this.load.json('level-six', 'levels/lvl6.json');
			this.load.json('level-seven', 'levels/lvl7.json');
            this.load.audio('Bump','audio/Bump.ogg');
            this.load.audio('miam','audio/miam.ogg');
            this.load.audio('death','audio/yourefat.ogg');
            this.load.audio('nomnomnom','audio/nomnomnom.ogg');
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
