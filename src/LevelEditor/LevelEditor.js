Bouffe.LevelEditor = function(game) {
    this.init =  function(arg) {
        this.levelData = arg;
    },

	this.create = function() {
		this.bg = this.add.tileSprite(0,0,4000,2000,this.levelData.background);
        this.bg.fixedToCamera = true;
	};

	this.update = function() {

	};

	this.exportJSON = function() {
		
	};
};
