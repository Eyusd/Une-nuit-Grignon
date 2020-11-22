var infini = 2**64-1;

function Scene () {
	this.collection = [];
	this.total = {};
	this.pause = false;

/// Scenes Utils

	this.update = function() {
		if (this.pause == false) {
			for (i = 0; i < this.collection.length; i++) {
				this.collection[i].update()
			}
		}
		else {
			for (i = 0; i < this.collection.length; i++) {
				this.collection[i].update()
			}
		}
	}
	this.resize = function() {
		for (i = 0; i < this.collection.length; i++) {
			this.collection[i].resize()
		}
	}
	this.unload = function(key) {
		console.log(this.collection);
		this.total[key] = Array.from(this.collection);
		for (i = 0; i < this.collection.length; i++) {delete this.collection[i]}
		this.collection = []
	}
	this.sort = function() {
		this.collection = trier(this.collection);
	}

/// Declare Scenes

	this.startup = function() {
		console.log('startup');
		if ("startup" in this.total) {
			this.collection = Array.from(this.total["startup"])
		} 
		else {
		this.collection = [	new Collectible("simplekey", 10, "key",10,10,10,10),
							new Door("door", 0, ["door1","door2"],30,10,10,20,"simplekey", function() {gui.textBox(['Bite','Un texte très long qui sert à voir des trucs de ouf','Encore bite','Teub','Truc'])} )];
		this.sort()
		}
	}

	this.carriere = function() {
		if ("carriere" in this.total) {
			this.collection = Array.from(this.total["carriere"])
		}
		else {
		this.collection = [ new Img("carriere1",0,"carriere1",0,0,100,900/16),
							new Button("vcarriere2",1,"button",10,10,10,10,infini,function () {gui.textBox(["texte 1"]), 
																								gui.choicesBox([["bite"],
																								["Choix 1", function() {gui.setTimer(10, function () {})}],
																								["Choix 2", function() {gui.textBox(['Choix 2'])}],
																								["Choix 3", function() {gui.textBox(['Choix 3'])}],
																								["Choix 4", function() {gui.textBox(['Choix 4'])}]
																							])})];
		this.sort()
		}
	}
}
