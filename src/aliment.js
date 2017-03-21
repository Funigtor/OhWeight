// aliment.js - Gestion des aliments

var Aliment = function(){
    this.pos = {"x" : 0, "y": 0};
    this.weight = 0;
    this.img = ''
};

/// Déclaration des types d'aliments

var Charcuterie = function(){
    this.type = "Charcuterie"
}
Charcuterie.prototype = new Aliment;

var Viande = function(){
    this.type = "Viande";
}
Viande.prototype = new Aliment;


/// Définition des aliments en eux-même

// Viande
var steak = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 10;
    this.scale = [0.1,0.1];
    this.img = 'steak'
}
steak.prototype = new Viande;

// Charcuterie
var saucisson = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 10;
    this.scale = [0.25,0.2]
    this.img = 'saucisson'
}
saucisson.prototype = new Charcuterie;


/// Générateur (TODO : Rewrite me)
function alimentGenerator(type,posX,posY){
    if (type == "saucisson") return new saucisson(posX,posY);
    else if (type == "steak") return new steak(posX,posY);
    else return new Aliment;
}