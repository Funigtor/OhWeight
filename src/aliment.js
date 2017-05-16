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

var Volaille = function(){
    this.type = "Volaille";
}
Volaille.prototype = new Aliment;

var Fruits = function(){
    this.type = "Fruits"
}
Fruits.prototype = new Aliment;

var Legumes = function(){
    this.type = "Legumes";
}
Legumes.prototype = new Aliment;

var Poisson = function(){
    this.type = "Poisson"
}
Poisson.prototype = new Aliment;

var Feculents = function(){
    this.type = "Feculents";
}
Feculents.prototype = new Aliment;

var Legumineuses = function(){
    this.type = "Legumineuses";
}
Legumineuses.prototype = new Aliment;

var Sel = function(){
    this.type = "Sel";
}
Sel.prototype = new Aliment;


/// Définition des aliments en eux-même

// Viande
var steak = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 35;
    this.scale = [1.5,1.5];
    this.img = 'steak';
}
steak.prototype = new Viande;

// Volaille
var poulet = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 20;
    this.scale = [1.5,1.5];
    this.img = 'poulet';
}
poulet.prototype = new Volaille;

// Charcuterie
var saucisson = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 10;
    this.scale = [1.5,1.5];
    this.img = 'saucisson';
}
saucisson.prototype = new Charcuterie;

// Fruits
var banane = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 37;
    this.scale = [1.5,1.5];
    this.img = 'banane';
}
banane.prototype = new Fruits;

// Feculents
var patate = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 20;
    this.scale = [1.5,1.5];
    this.img = 'patate';
}
patate.prototype = new Feculents;

// Legumes
var carotte = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 40;
    this.scale = [1.5,1.5];
    this.img = 'carotte';
}
carotte.prototype = new Legumes;

// Poisson
var magikarp = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 35;
    this.scale = [1.5,1.5];
    this.img = 'magikarp';
}
magikarp.prototype = new Poisson;

// Legumineuses
var haricot = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 10;
    this.scale = [1.5,1.5];
    this.img = 'haricot';
}
haricot.prototype = new Legumineuses;

// Sel
var nicolas = function(posX,posY){
    this.pos = new Object();
    this.pos.x = posX;
    this.pos.y = posY;
    this.weight = 5;
    this.scale = [1.5,1.5];
    this.img = 'nicolas';
}
nicolas.prototype = new Sel;


/// Générateur (TODO : Rewrite me)
function alimentGenerator(type,posX,posY){
    if (type == "saucisson") return new saucisson(posX,posY);
    else if (type == "steak") return new steak(posX,posY);
    else if (type == "poulet") return new poulet(posX,posY);
    else if (type == "banane") return new banane(posX,posY);
    else if (type == "patate") return new patate(posX,posY);
    else if (type == "carotte") return new carotte(posX,posY);
    else if (type == "magikarp") return new magikarp(posX,posY);
    else if (type == "haricot") return new haricot(posX,posY);
    else if (type == "nicolas") return new nicolas(posX,posY);
    else return new Aliment;
}
