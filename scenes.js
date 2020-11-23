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

	this.carriere1= function() {
		if ("carriere1" in this.total) {
			this.collection = Array.from(this.total["carriere1"])
		}
		else {
		this.collection = [ new Img("carriere1",0,"carriere1",0,0,100,900/16),
							new Button("vcarriere12",1,"lumiere",5,30,10,10,infini,function () {scene.unload("carriere1"); scene.carriere2()},
							new Button("vcarriere13",2,"lumiere",50,50,10,10,infini,function () {scene.unload("carriere1"); scene.carriere3()} ) )];
		this.sort()
		}
	}

	this.carriere2= function() {
		if ("carriere2" in this.total) {
			this.collection = Array.from(this.total["carriere2"])
		}
		else {
		this.collection = [ new Img("carriere2",0,"carriere2",0,0,100,900/16),
							new Button("vcarriere21",1,"lumiere",20,85,1,1,infini,function () {scene.unload("carriere2"); scene.carriere1()} )];
		this.sort()
		}
	}

	this.carriere3= function() {
		if ("carriere3" in this.total) {
			this.collection = Array.from(this.total["carriere3"])
		}
		else {
		this.collection = [ new Img("carriere3",0,"carriere3",0,0,100,900/16),
							new Button("vcarriere31",1,"lumiere",50,85,1,1,infini,function () {scene.unload("carriere3"); scene.carriere1()}),
							new Button("vcarriere34",1,"lumiere",85,20,1,1,infini,function () {scene.unload("carriere3"); scene.carriere4()} )];
		this.sort()
		}
	}

	this.carriere4= function() {
		if ("carriere4" in this.total) {
			this.collection = Array.from(this.total["carriere4"])
		}
		else {
		this.collection = [ new Img("carriere4",0,"carriere4",0,0,100,900/16),
							new Button("vcarriere43",1,"lumiere",50,85,1,1,infini,function () {scene.unload("carriere4"); scene.carriere3()}),
							new Button("vcarriere45",1,"lumiere",10,10,1,1,infini,function () {scene.unload("carriere4"); scene.carriere5()}),
							new Button("vcarriere46",1,"lumiere",10,10,1,1,infini,function () {scene.unload("carriere4"); scene.carriere6()} ) ];
		this.sort()
		}
	}
	
	this.carriere5= function() {
		if ("carriere5" in this.total) {
			this.collection = Array.from(this.total["carriere5"])
		}
		else {
		this.collection = [ new Img("carriere5",0,"carriere5",0,0,100,900/16),
							new Button("vcarriere54",1,"lumiere",70,85,1,1,infini,function () {scene.unload("carriere5"); scene.carriere6()} )];
		this.sort()
		}
	}

	this.carriere6= function() {
		if ("carriere6" in this.total) {
			this.collection = Array.from(this.total["carriere6"])
		}
		else {
		this.collection = [ new Img("carriere6",0,"carriere6",0,0,100,900/16),
							new Button("vcarriere64",1,"lumiere",50,85,1,1,infini,function () {scene.unload("carriere6"); scene.carriere4()}),
							new Button("vcarriere67",1,"lumiere",80,15,10,10,infini,function () {scene.unload("carriere6"); scene.carriere7()} )];
		this.sort()
		}
	}

	this.carriere7= function() {
		if ("carriere7" in this.total) {
			this.collection = Array.from(this.total["carriere7"])
		}
		else {
		this.collection = [ new Img("carriere7",0,"carriere7",0,0,100,900/16),
							new Button("vcarriere2",1,"lumiere",50,85,1,1,infini,function () {scene.unload("carriere7"); scene.carriere6()}), 
							new Button ("fin",1,"key",20,50,1,1,infini, function () {Img("carriere8",2,"carriere8",0,0,100,900/16)}) ];
		this.sort()
		}
	}
}

// Pour se téléporter, button avec function () {scene.unload("scene actuelle"); scene.scenenouvelle()}
// Pour texte, gui.textBox([''])

// new Button("vcarriere2",1,"button",10,10,10,10,infini,function () {gui.choicesBox([["bite"],
//["Choix 1", function() {gui.setTimer(10, function () {})}],
//["Choix 2", function() {gui.textBox(['Choix 2'])}],
//["Choix 3", function() {gui.textBox(['Choix 3'])}],
//["Choix 4", function() {gui.textBox(['Choix 4'])}]
// Pour image, new Img("carriere1",0,"carriere1",0,0,100,900/16)
// gui.stupidity +=nb