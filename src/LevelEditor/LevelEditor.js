Bouffe.LevelEditor = function(game) {

	var levelData;
	var itemTaken;
  var platforms;

    this.init =  function(arg) {
        levelData = arg;
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
            this.aliments = this.add.group();
            this.aliments.enableBody = true;
			var alimStock = new Array();
            for(let aliment of levelData.food) {
              for (let typeOf of aliment.kindOfFood) {
                let createName  = typeOf.name;
                for (let itm of typeOf.positions){
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

            //Junk food
            this.junkfood = this.add.group();
            this.junkfood.enableBody = true;
			var Junky = new Array();
            for(let junk of levelData.junkfood) {
              let createName  = junk.name;
              for (let itm of junk.positions){
                var itemTmp = junkfoodGenerator(createName,itm.x,itm.y);
                var item = this.junkfood.create(itemTmp.pos.x,itemTmp.pos.y,itemTmp.img);
                if (itemTmp.hasOwnProperty("scale")) item.scale.setTo(itemTmp.scale[0],itemTmp.scale[1]);
                item.body.gravity.y = 0;
                Junky.push(item);
              }
            }

        //the bumpers
		    this.bumpers = this.add.group();
		    this.bumpers.enableBody = true;
			var Bumpers = new Array();
            for(let bump of levelData.bumpers) {
              for (let itm of bump.positions){
                var item = this.bumpers.create(itm.x,itm.y,'bumper');
                item.scale.setTo(2, 1.5);
				        item.body.immovable = true;
                Bumpers.push(item);
              }
            }
		}
    },

	this.create = function() {
		this.bg = this.add.tileSprite(0,0,4000,2000,levelData.background);
    this.bg.fixedToCamera = true;
		this.player = this.add.sprite(32, this.game.world.height - 150, "dude"); // Spawnpoint
		if (!platforms){
			//  The platforms group contains the ground and the 2 ledges we can jump on
    	    platforms = this.add.group();
    	    //  We will enable physics for any object that is created in this group
    	    platforms.enableBody = true;
    	    // Here we create the ground.
    	    this.ground = platforms.create(0, this.game.world.height - 16, 'ground');
			//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    	    this.ground.scale.setTo(0.1, 0.5);
    	    	//  This stops it from falling away when you jump on it
    	    this.ground.body.immovable = true;
		}
		this.drawMenu();
	};

	this.drawMenu = function(){
		this.add.button(Bouffe._WIDTH-120, 8, 'bExporter', this.exportJSON);
		this.add.button(110*0+10, 8, 'bPlateforme', this.createPlatform,this);
	};
	this.createPlatform = function(){
		console.log("bite");
		var previewPlatform = this.platforms.create(this.input.mousePointer.x, this.input.mousePointer.y, 'ground');
		previewPlatform.inputEnabled = true;
		previewPlatform.events.onInputDown.add(function() {
			var xOfPlatform = this.input.mousePointer.worldX;
			var yOfPlatform = this.input.mousePointer.worldY;
			xOfPlatform = Math.round(xOfPlatform);
			yOfPlatform = Math.round(yOfPlatform);
			console.log("X set to " + xOfPlatform);
			console.log("Y set to " + yOfPlatform);
			if (!levelData.platforms) levelData.platforms = new Array();
			levelData.platforms.push(["ground",xOfPlatform,yOfPlatform,0.3,0.5,true]);
		},this);
	};

	this.update = function() {
		
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
