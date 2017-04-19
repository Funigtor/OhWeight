Bouffe.LevelEditor = function(game) {

	var levelData;
	var itemTaken;

    this.init =  function(arg) {
        levelData = arg;
		if (levelData.imported){
			// Todo : Gérer l'importation
		}
    },

	this.create = function() {
		this.bg = this.add.tileSprite(0,0,4000,2000,levelData.background);
        this.bg.fixedToCamera = true;
		this.player = this.add.sprite(32, this.game.world.height - 150, "dude"); // Spawnpoint
		//  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.add.group();
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        // Here we create the ground.
        this.ground = this.platforms.create(0, this.game.world.height - 16, 'ground');
		//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(0.1, 0.5);
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
		this.drawMenu();
	};

	this.drawMenu = function(){
		this.add.button(Bouffe._WIDTH-120, 8, 'bExporter', this.exportJSON);
		this.add.button(110*0+10, 8, 'bPlateforme', this.createPlatform,this);
	};
	this.createPlatform = function(){
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
};
