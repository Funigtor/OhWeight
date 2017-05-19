Bouffe.LevelEditor = function(game) {

	var levelData;
	var itemTaken;
  var platforms;
	var menu;
	var choiseLabel;
	var aliments;
	var junkfood;
	var bumpers;
	var cursors;

    this.init =  function(arg) {
        levelData = arg;
				cursors = game.input.keyboard.createCursorKeys();
		if (levelData.imported){
			delete levelData.imported;
            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.add.group();
            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;
            // Here we create the ground.
            this.ground = platforms.create(0, this.game.world.height - 16, 'ground');
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            this.ground.scale.setTo(10, 0.5);
            //  This stops it from falling away when you jump on it
            this.ground.body.immovable = true;

            platform = levelData.platforms;
            this.generateTerrain(platform) ;

            //The aliments
            aliments = this.add.group();
            aliments.enableBody = true;
			var alimStock = new Array();
            for(let aliment of levelData.food) {
              for (let typeOf of aliment.kindOfFood) {
                let createName  = typeOf.name;
                for (let itm of typeOf.positions){
                  var itemTmp = alimentGenerator(createName,itm.x,itm.y);
                  var item = aliments.create(itemTmp.pos.x,itemTmp.pos.y,itemTmp.img);
                  if (itemTmp.hasOwnProperty("scale")) item.scale.setTo(itemTmp.scale[0],itemTmp.scale[1]);
                  item.body.gravity.y = 0;
                  item.sortOfItem = aliment.name;
                  item.sizeOfItem = itemTmp.weight;
                  item.maxOf = aliment.max;
                  alimStock.push(item);
                }
              }
            }

            //Junk food
            junkfood = this.add.group();
            junkfood.enableBody = true;
			var Junky = new Array();
            for(let junk of levelData.junkfood) {
              let createName  = junk.name;
              for (let itm of junk.positions){
                var itemTmp = junkfoodGenerator(createName,itm.x,itm.y);
                var item = junkfood.create(itemTmp.pos.x,itemTmp.pos.y,itemTmp.img);
                if (itemTmp.hasOwnProperty("scale")) item.scale.setTo(itemTmp.scale[0],itemTmp.scale[1]);
                item.body.gravity.y = 0;
                Junky.push(item);
              }
            }

        //the bumpers
		    bumpers = this.add.group();
		    bumpers.enableBody = true;
			var Bumpers = new Array();
            for(let bump of levelData.bumpers) {
              for (let itm of bump.positions){
                var item = bumpers.create(itm.x,itm.y,'bumper');
                item.scale.setTo(2, 1.5);
				        item.body.immovable = true;
                Bumpers.push(item);
              }
            }
		}
    },

	this.create = function() {
		this.world.setBounds(0,0, 8000, 600);
		this.bg = this.add.tileSprite(0,0,8000,2000,levelData.background);
		this.player = this.add.sprite(32, this.game.world.height - 150, "dude"); // Spawnpoint
		if (!levelData.platforms) levelData.platforms = new Array();
		if (!levelData.food) levelData.food = [{"name" : "Charcuterie","max" : 20,"kindOfFood" : [{"name" : "saucisson","positions" : []}]},
																					{"name" : "Viande","max" : 70,"kindOfFood" : [{"name" : "steak","positions" : []}]},
																					{"name" : "Volaille","max" : 120,"kindOfFood" : [{"name" : "poulet","positions" : []}]},
																					{"name" : "Feculents","max" : 260,"kindOfFood" : [{"name" : "patate","positions" : []}]},
																					{"name" : "Legumes","max" : 280,"kindOfFood" : [{"name" : "carotte", "positions" : []}]},
																					{"name" : "Fruits","max" : 370,"kindOfFood" : [{"name" : "banane","positions" : [] }]	},
																					{"name" : "Legumineuses", "max" : 60, "kindOfFood" : [{ "name" : "haricot", "positions" : [] }]},
																					{"name" : "Sel","max" : 5,"kindOfFood" : [{ "name" : "nicolas", "positions" : []  }]},
																					{"name" : "Poisson","max" : 70,"kindOfFood" : [{"name" : "magikarp","positions" : [] }]	}];

		if (!levelData.junkfood) levelData.junkfood = [{"name" : "andrew","positions" : []},
																									{"name" : "mensonge","positions" : []},
																									{"name" : "cornetto","positions" : []},
																									{"name" : "sprite","positions" : []}];
		if (!levelData.bumpers) levelData.bumpers = [{"positions": []}];
		if (!platforms){
    	    platforms = this.add.group();
    	    platforms.enableBody = true;

    	    this.ground = platforms.create(0, this.game.world.height - 16, 'platform4');
    	    this.ground.body.immovable = true;
			}
			if (!aliments){
	   	    aliments = this.add.group();
	   	    aliments.enableBody = true;
			}
			if(!junkfood){
	   	    junkfood = this.add.group();
	   	    junkfood.enableBody = true;
			}
			if(!bumpers){
				bumpers = this.add.group();
				bumpers.enableBody = true;
			}

		this.drawMenu();
	};

	this.drawMenu = function(){
		var exportB = this.add.button(Bouffe._WIDTH-120, Bouffe._HEIGHT - 40, 'bExporter', this.exportJSON);
		exportB.fixedToCamera = true;
		var plateformB = this.add.button(110*0+10, 8, 'bPlateforme', this.drawmenuPlatform,this);
		plateformB.fixedToCamera = true;
		var bouffeB = this.add.button(Bouffe._WIDTH-230, 8, 'bBouffe', this.drawmenuBouffe,this);
		bouffeB.fixedToCamera = true;
		var junkB = this.add.button(110*1+10, 8, 'bJunkfood', this.drawmenuJunkfood,this);
		junkB.fixedToCamera = true;
		var bumpersB = this.add.button(Bouffe._WIDTH-120, Bouffe._HEIGHT - 80, 'bBumpers', this.createBumper,this);
		bumpersB.fixedToCamera = true;
		var deleteB = this.add.sprite(Bouffe._WIDTH-100, 0, 'bDelete');
		deleteB.fixedToCamera = true;
	};

	this.drawmenuPlatform = function() {
        menu = game.add.sprite(this.game.camera.x + 400, this.game.camera.y + 300, 'menuPlatform');
        menu.anchor.setTo(0.5, 0.5);
				menu.type = "platform";
				menu.height = 128;
				menu.length = 384;
				menu.choisemap = ['platform1','platform2','platform3','platform4'];
				menu.choises = 2;
				menu.paused = true;

        choiseLabel = game.add.text(this.game.camera.x + 400, this.game.camera.y + 450, 'Cliquer en dehors du menu pour fermer', { font: '30px Arial', fill: '#000' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    };

		this.drawmenuBouffe = function() {
	        menu = game.add.sprite(this.game.camera.x + 400, this.game.camera.y + 300, 'menuBouffe');
	        menu.anchor.setTo(0.5, 0.5);
					menu.type = "Bouffe";
					menu.height = 300;
					menu.length = 300;
					menu.choisemap = ['banane','carotte','haricot','patate','magikarp','poulet','nicolas','steak','saucisson'];
					menu.choises = 3;
					menu.paused = true;

	        choiseLabel = game.add.text(this.game.camera.x + 400, this.game.camera.y + 500, 'Cliquer en dehors du menu pour fermer', { font: '30px Arial', fill: '#000' });
	        choiseLabel.anchor.setTo(0.5, 0.5);
	    };

			this.drawmenuJunkfood = function() {

		        menu = game.add.sprite(this.game.camera.x + 400, this.game.camera.y + 300, 'menuJunkfood');
		        menu.anchor.setTo(0.5, 0.5);
						menu.type = "Junkfood";
						menu.height = 168;
						menu.length = 168;
						menu.choisemap = ['andrew','mensonge','cornetto','sprite'];
						menu.choises = 2;
						menu.paused = true;

		        choiseLabel = game.add.text(this.game.camera.x + 400, this.game.camera.y + 450, 'Cliquer en dehors du menu pour fermer', { font: '30px Arial', fill: '#000' });
		        choiseLabel.anchor.setTo(0.5, 0.5);
		    };

		this.unpause = function() {
			if(menu){
				if(menu.paused){
	            var x1 = 400 - menu.width/2, x2 = 400 + menu.width/2,
	                y1 = 300 - menu.height/2, y2 = 300 + menu.height/2;
	            if(this.input.activePointer.x > x1 && this.input.activePointer.x < x2 && this.input.activePointer.y > y1 && this.input.activePointer.y < y2 ){


									menu.paused = false;
	                var x = this.input.activePointer.x - x1,
	                    y = this.input.activePointer.y - y1;

	                var choise = Math.floor(x / (menu.length/menu.choises)) + menu.choises*Math.floor(y / (menu.height/menu.choises) );

	                //choiseLabel.text = 'You chose menu item n°' + (choise +1);

									if(menu.type == "platform"){this.createPlatform(menu.choisemap[choise]);}
									else {
										if(menu.type == "Bouffe"){this.createBouffe(menu.choisemap[choise]);}
										else{
											if(menu.type == "Junkfood"){this.createJunkfood(menu.choisemap[choise]);}
										}
									}

									delete menu.height;
									delete menu.length;
									delete menu.choisemap;
									delete menu.choises;
									delete menu.type;
	                menu.destroy();
	                choiseLabel.destroy();

	            }
	            else{
	                delete menu.height;
									delete menu.length;
									delete menu.choisemap;
									delete menu.choises;
	                menu.destroy();
	                choiseLabel.destroy();

	                menu.paused = false;
	            }
	        }
			}
		};

			this.update = function() {
				if(game.input.activePointer.isDown){
					this.unpause();
				}
				if (cursors.right.isDown || (game.input.pointer1.isDown && game.input.pointer2.isDown && (game.input.activePointer.x > Bouffe._WIDTH * 0.5)) ){
		        game.camera.x += 8;
		    }

		    if (cursors.left.isDown || (game.input.pointer1.isDown && game.input.pointer2.isDown && (game.input.activePointer.x <= Bouffe._WIDTH * 0.5)) ){
		        game.camera.x -= 8;
		    }
			};


			this.createPlatform = function(image){
				var previewPlatform = platforms.create(this.game.camera.x + 400, this.game.camera.y +10, image);
		    previewPlatform.idPlat = levelData.platforms.length;
				previewPlatform.image = image;
				previewPlatform.inputEnabled = true;
				previewPlatform.input.enableDrag();
				previewPlatform.events.onDragStop.add(this.onDragStopPlatform,this);

				levelData.platforms.push([image,previewPlatform.left,previewPlatform.top,1,1,true]);

			};

			this.createBouffe = function(image){
				var previewBouffe = aliments.create(this.game.camera.x + 400, this.game.camera.y + 10, image);
				previewBouffe.image = image;
				previewBouffe.inputEnabled = true;
				previewBouffe.input.enableDrag();
				previewBouffe.events.onDragStop.add(this.onDragStopBouffe,this);
				for(let alim in levelData.food){
					if(levelData.food[alim].kindOfFood[0].name == image){
						previewBouffe.alim = alim;
						previewBouffe.idPlat = levelData.food[alim].kindOfFood[0].positions.length;
						levelData.food[alim].kindOfFood[0].positions.push({"x" :previewBouffe.left,"y":previewBouffe.top});
					}
				}

			};

			this.createJunkfood = function(image){
				var previewJunkfood = junkfood.create(this.game.camera.x + 400, this.game.camera.y + 10, image);
		    previewJunkfood.idPlat = levelData.platforms.length;
				previewJunkfood.image = image;
				previewJunkfood.inputEnabled = true;
				previewJunkfood.input.enableDrag();
				previewJunkfood.events.onDragStop.add(this.onDragStopJunkfood,this);
				for(let jkf in levelData.junkfood){
					if(levelData.junkfood[jkf].name == image){
						previewJunkfood.jkf = jkf;
						previewJunkfood.idPlat = levelData.junkfood[jkf].positions.length;
						levelData.junkfood[jkf].positions.push({"x" :previewJunkfood.left,"y":previewJunkfood.top})
					}
				}

			};

			this.createBumper = function(){
				var previewBumper = bumpers.create(this.game.camera.x + 400, this.game.camera.y + 10, 'bumper');
		    previewBumper.idPlat = levelData.bumpers[0].positions.length;
				previewBumper.inputEnabled = true;
				previewBumper.input.enableDrag();
				previewBumper.events.onDragStop.add(this.onDragStopBumper,this);
				levelData.bumpers[0].positions.push({"x" :previewBumper.left,"y":previewBumper.top});

			};


	this.onDragStopPlatform = function(sprite,pointer){
		if(sprite.left > this.game.camera.x + 700 && sprite.top < this.game.camera.y + 35){
			sprite.destroy();
			levelData.platforms[sprite.idPlat] = [];
		}
		else{levelData.platforms[sprite.idPlat] = ([sprite.image,sprite.left,sprite.top,1,1,true]);}
	};
	this.onDragStopBouffe = function(sprite,pointer){
		if(sprite.left > this.game.camera.x + 700 && sprite.top < this.game.camera.y + 35){
			sprite.destroy();
			levelData.food[sprite.alim].kindOfFood[0].positions[sprite.idPlat] = {};
		}
		else{levelData.food[sprite.alim].kindOfFood[0].positions[sprite.idPlat] = {"x" :sprite.left,"y":sprite.top};}
	};
	this.onDragStopJunkfood = function(sprite,pointer){
		if(sprite.left > this.game.camera.x + 700 && sprite.top < this.game.camera.y + 35){
			sprite.destroy();
			levelData.junkfood[sprite.jkf].positions[sprite.idPlat] = {};
		}
		else{levelData.junkfood[sprite.jkf].positions[sprite.idPlat] = {"x" :sprite.left,"y":sprite.top};}
	};
	this.onDragStopBumper = function(sprite,pointer){
		if(sprite.left > this.game.camera.x + 700 && sprite.top < this.game.camera.y + 35){
			sprite.destroy();
			levelData.bumpers[0].positions[sprite.idPlat] = {};
		}
		else{levelData.bumpers[0].positions[sprite.idPlat] = ({"x" :sprite.left,"y":sprite.top});}
	};


	this.exportJSON = function() {
		document.getElementById("exported").innerHTML = JSON.stringify(levelData);
		alert("Objet exporté : Lance-le dans le jeu !")
	};

	this.createPlatformGeneration = function(platform){
         let ledge = platforms.create(platform[1], platform[2], platform[0]);
         ledge.body.immovable = platform[5];
         ledge.scale.setTo(platform[3], platform[4]);
       };
    this.generateTerrain = function(arg){
         for(let i in arg){
           this.createPlatformGeneration(arg[i]);
         }
       };
};
