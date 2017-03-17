Bouffe.Game = function(game) {};
Bouffe.Game.prototype = {
	create: function(){
            //  We're going to be using physics, so enable the Arcade Physics system
            this.physics.startSystem(Phaser.Physics.ARCADE);
						this.world.setBounds(0,0, 4000, 600);
						this.movementForce = 5;
            //  A simple background for our game
            this.sky = this.add.tileSprite(0, 0, 4000, 2000, 'sky');
						this.sky.fixedToCamera = true;
            this.steakScore = 0;
            this.saucissonScore = 0;
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

            this.platform = [
              ['ground', 450, 500, 0.3, 0.5, true],
              ['ground', 250, 400, 0.3, 0.5, true],
              ['ground', -50, 250, 0.5, 0.5, true],
              ['ground', 100, 100, 1, 0.5, true],
              ['ground', 600, 200, 1.5, 0.5, true],
            ]
            this.generateTerrain() ;


            // The player and its settings
            this.player = this.add.sprite(32, this.game.world.height - 150, 'dude');
            //  We need to enable physics on the player
            this.physics.arcade.enable(this.player);
            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.gravity.y = 1500;
            this.player.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);

						this.camera.follow(this.player);
            this.steaks = this.add.group();
            this.steaks.enableBody = true;
            for (var i = 0; i < 8; i++)
            {
                var steak = this.steaks.create(i * 70, 0, 'steak');
								steak.scale.setTo(0.1,0.1);
                steak.body.gravity.y = 300;
            }

            this.saucissons = this.add.group();
            this.saucissons.enableBody = true;
            for (var i = 0; i < 3; i++)
            {
                var saucisson = this.saucissons.create(i * 70 + 500, 0, 'saucisson');
								saucisson.scale.setTo(0.25,0.2);
                saucisson.body.gravity.y = 300;
            }

            //  The score
            this.scoreSteak = this.add.text(8, 8, 'Viande: 0/70g', { fontSize: '16px', fill: '#000' });
            this.scoreSteak.fontSize = '16px';
						this.scoreSteak.fixedToCamera = true;
            this.scoreSaucisson = this.add.text(8, 24, 'Charcuterie: 0/20g', { fontSize: '16px', fill: '#000' });
            this.scoreSaucisson.fontSize = '16px';
						this.scoreSaucisson.fixedToCamera = true;

            //  Our controls.
            this.cursors = this.input.keyboard.createCursorKeys();

	},
	update: function() {
            //  Collide the player and the steaks with the platforms
            this.physics.arcade.collide(this.player, this.platforms);
            this.physics.arcade.collide(this.steaks, this.platforms);
            this.physics.arcade.collide(this.saucissons, this.platforms);
            //  Checks to see if the player overlaps with any of the steaks, if he does call the collectSteak function
            this.physics.arcade.overlap(this.player, this.steaks, this.collectSteak, null, this);
            this.physics.arcade.overlap(this.player, this.saucissons, this.collectSaucissons, null, this);

            //  Reset the players velocity (movement)

            if (this.cursors.left.isDown){
                if (this.player.body.touching.down){
                	if(this.player.body.velocity.x > -300){
										this.player.body.velocity.x -= 300;
									}
								}
								else{
									if(this.player.body.velocity.x > -300){
										this.player.body.velocity.x -= 50;
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
									this.player.body.velocity.x += 50;
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
      collectSteak: function(player, steak){
          steak.kill();
          this.steakScore += 10;
          this.scoreSteak.text = 'Viande: ' + this.steakScore + '/70g';
          if(this.steakScore > 70){this.scoreSteak.fill = '#ff0000';}
      },
      collectSaucissons: function(player, saucisson){
          saucisson.kill();
          this.saucissonScore += 10;
          this.scoreSaucisson.text = 'Charcuterie: ' + this.saucissonScore + '/20g';
          if(this.saucissonScore > 20){this.scoreSaucisson.fill = '#ff0000';}
      },
       createPlatform: function(platform){
         this.ledge = this.platforms.create(platform[1], platform[2], platform[0]);
         this.ledge.body.immovable = platform[5];
         this.ledge.scale.setTo(platform[3], platform[4]);
       },
       generateTerrain: function(){
         for(let i in this.platform){
           this.createPlatform(this.platform[i]);
         }
       }
};
