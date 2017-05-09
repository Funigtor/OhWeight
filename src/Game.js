Bouffe.Game = function(game) {};
Bouffe.Game.prototype = {
  init: function(userData){
    this.userData = userData;
  },
	create: function(){
            // Loading an object describing the level
            this.levelData = this.cache.getJSON(this.userData.level);
            //  We're going to be using physics, so enable the Arcade Physics system
            this.physics.startSystem(Phaser.Physics.ARCADE);
						this.world.setBounds(0,0, 4000, 600);
						this.movementForce = 5;
            //  A simple background for our game
            this.bg = this.add.tileSprite(0,0,4000,2000,this.levelData.background);
            this.bg.fixedToCamera = true;
            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.add.group();
            //  We will enable physics for any object that is created in this group
            this.platforms.enableBody = true;
            // Here we create the ground.
            this.ground = this.platforms.create(0, this.game.world.height - 16, 'ground');
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            this.ground.scale.setTo(10, 0.5);
            //  This stops it from falling away when you jump on it
            this.ground.body.immovable = true;

            this.platform = this.levelData.platforms;
            this.generateTerrain() ;


            // The player and its settings
            this.player = this.add.sprite(32, this.game.world.height - 150, this.userData.personnage);
            //  We need to enable physics on the player
            this.physics.arcade.enable(this.player);
            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.gravity.y = 1500;
            this.player.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);

						this.camera.follow(this.player);

            //The aliments
            this.aliments = this.add.group();
            this.aliments.enableBody = true;
			var alimStock = new Array();
            for(let aliment of this.levelData.food) {
              for (let typeOf of aliment.kindOfFood) {
                let createName  = typeOf.name;
                for (let itm of typeOf.positions){
                  if(itm.x){
                    var itemTmp = alimentGenerator(createName,itm.x,itm.y);
                    var item = this.aliments.create(itemTmp.pos.x,itemTmp.pos.y,itemTmp.img);
                    if (itemTmp.hasOwnProperty("scale")) item.scale.setTo(itemTmp.scale[0],itemTmp.scale[1]);
                    item.body.gravity.y = 0;
                    item.sortOfItem = aliment.name;
                    item.sizeOfItem = itemTmp.weight;
                    item.maxOf = aliment.max;
                    alimStock.push(item);
                  }
                }
              }
            }

            //Junk food
            this.junkfood = this.add.group();
            this.junkfood.enableBody = true;
			var Junky = new Array();
            for(let junk of this.levelData.junkfood) {
              let createName  = junk.name;
              for (let itm of junk.positions){
                if(itm.x){
                  var itemTmp = junkfoodGenerator(createName,itm.x,itm.y);
                  var item = this.junkfood.create(itemTmp.pos.x,itemTmp.pos.y,itemTmp.img);
                  if (itemTmp.hasOwnProperty("scale")) item.scale.setTo(itemTmp.scale[0],itemTmp.scale[1]);
                  item.body.gravity.y = 0;
                  Junky.push(item);
                }
              }
            }

        //the bumpers
		    this.bumpers = this.add.group();
		    this.bumpers.enableBody = true;
			var Bumpers = new Array();
            for(let bump of this.levelData.bumpers) {
              for (let itm of bump.positions){
                if(itm.x){
                  var item = this.bumpers.create(itm.x,itm.y,'bumper');
                  item.scale.setTo(2, 1.5);
  				        item.body.immovable = true;
                  Bumpers.push(item);
                }
              }
            }


            //  The score
            this.score = new Object();
            this.score.value = new Map();
            this.score.max = new Map();
            this.score.text = new Map();
            for (let aliment of this.levelData.food){
              this.score.value.set(aliment.name,0);
              this.score.max.set(aliment.name,aliment.max);
              let text = this.add.text(8,8+16*this.score.value.size -1, aliment.name+': ' + 0+'/'+aliment.max+'g',{ fontSize: '16px', fill: '#000' })
              text.fontSize = '16px';
              text.fixedToCamera = true;
              this.score.text.set(aliment.name,text)
            }

            //  Our controls.
            this.cursors = this.input.keyboard.createCursorKeys();

	},
	update: function() {
            //  Collide the player and the steaks with the platforms
            this.physics.arcade.collide(this.player, this.platforms);
            this.physics.arcade.collide(this.aliments, this.platforms);
            this.physics.arcade.collide(this.player, this.bumpers,this.bumpUp, this.checkBump, this);
            //  Checks to see if the player overlaps with any of the steaks, if he does call the collectSteak function
            this.physics.arcade.overlap(this.player, this.aliments, this.collectAliment, null, this);


            if (this.cursors.left.isDown){
                if (this.player.body.touching.down){
                	if(this.player.body.velocity.x > -300){
										this.player.body.velocity.x -= 300;
									}
								}
								else{
									if(this.player.body.velocity.x > -300){
										this.player.body.velocity.x -= 25;
									}
								}
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown){
							if (this.player.body.touching.down){
								if(this.player.body.velocity.x < 300){
									this.player.body.velocity.x += 300;
								}
							}
							else{
								if(this.player.body.velocity.x < 300){
									this.player.body.velocity.x += 25;
								}
							}
                this.player.animations.play('right');
            }
						else if (this.cursors.left.isUp && this.player.body.velocity.x < 0){
								if (this.player.body.touching.down){this.player.body.velocity.x = 0;}
                else{this.player.body.velocity.x += this.movementForce;}
            }
            else if (this.cursors.right.isUp && this.player.body.velocity.x > 0){
							if (this.player.body.touching.down){this.player.body.velocity.x = 0;}
							else{this.player.body.velocity.x -= this.movementForce;}
            }
            else{
                //  Stand still
                this.player.animations.stop();

                this.player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.body.velocity.y = -700;
            }
            if (this.cursors.down.isDown && !this.player.body.touching.down)
            {
                this.player.body.velocity.y = 700;
                this.player.body.velocity.x = 0;
                this.player.frame = 4;
            }
	},
      collectAliment: function(player, aliment){
          aliment.kill();
          this.score.value.set(aliment.sortOfItem,this.score.value.get(aliment.sortOfItem) + aliment.sizeOfItem)
          // text generation
          let text = aliment.sortOfItem+': ' +this.score.value.get(aliment.sortOfItem) +'/'+aliment.maxOf+'g';
          this.score.text.get(aliment.sortOfItem).setText(text);
          if (this.score.value.get(aliment.sortOfItem) > aliment.maxOf){this.score.text.get(aliment.sortOfItem).fill = '#ff0000';}
      },
       createPlatform: function(platform){
         this.ledge = this.platforms.create(platform[1], platform[2], platform[0]);
         this.ledge.body.immovable = platform[5];
         this.ledge.scale.setTo(platform[3], platform[4]);
       },
       generateTerrain: function(){
         for(let i in this.platform){
           if(this.platform[i][0]){
             this.createPlatform(this.platform[i]);
           }
         }
       },
			 bumpUp: function(){
				 this.player.body.velocity.y = -1000;
			 },
			 checkBump: function(player,bumper){
				 if(player.body.touching.down == true && (player.body.touching.left == false && player.body.touching.right == false && player.body.touching.up == false)){
					 return false;
				 }
				 return true;
			 }
};
