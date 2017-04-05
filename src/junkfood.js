// junkfood.js - Gestion des pièges

var Junkfood = function(){
    this.pos = {"x" : 0, "y": 0};
    this.img = '';
};


// Burger
var andrew = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.scale = [1.5,1.5];
    this.img = 'andrew';
}
andrew.prototype = new Junkfood;

// Gateau
var mensonge = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.scale = [1.5,1.5];
    this.img = 'mensonge';
}
mensonge.prototype = new Junkfood;

// Soda
var sprite = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.scale = [1,1.5];
    this.img = 'sprite';
}
sprite.prototype = new Junkfood;

// Glace
var cornetto = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.scale = [1.5,1.5];
    this.img = 'cornetto';
}
cornetto.prototype = new Junkfood;


/// Générateur (TODO : Rewrite me)
function junkfoodGenerator(type,posX,posY){
    if (type == "andrew") return new andrew(posX,posY);
    else if (type == "mensonge") return new mensonge(posX,posY);
    else if (type == "sprite") return new sprite(posX,posY);
    else if (type == "cornetto") return new cornetto(posX,posY);
    else return new Junkfood;
}
