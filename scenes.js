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
				this.collection[i].draw()
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
							new Door("door", 0, ["door1","door2"],30,10,10,20,"simplekey", function() {gui.textBox(['Bite','Un texte très long qui sert à voir des trucs de ouf','Encore bite','Teub'],["test"])} ),
							new Chest("chest", -1000, "simon_red", 40,40,30,30,function (name) {if (name == "simplekey") {console.log('loul')}})];
		this.sort()
		}
	}

	this.porte= function() {
		if ("porte" in this.total) {
			this.collection = Array.from(this.total["porte"])
		}
		else {
		this.collection = [ new Img("porte",0,"porte",0,0,100,900/16),
							new Button("portesasha",1,"lumiere",30,57,10,10,infini,function () {gui.textBox(["[Sasha]","Oh putain ça s’ouvre pas…","Qu’est-ce que j’ai foutu de mes clés ? Bon. ","Calme-toi Sasha. Réfléchis deux secondes..","Où est-ce que tu aurais pu ranger tes PUTAIN clés ?"])}),
							new Button("portealex",2,"lumiere",65,45,10,10,infini,function () {gui.textBox(["[Alex]","Bah alors Sasha on a la tête dans le cul ce matin ? En même ","temps, t’étais vraiment un déchet hier soir, c’était pas beau à voir.","Mais trêve de bavardages, une meuf a oublié son éco-cup","chez moi hier. Comme t’es chargé de nettoyage", "et que j’ai la flemme de bouger mon cul, je te la file.","Eh sans rancune, hein !","","Sasha","Euuuuuuh... ok ? O_O"])} ), 
							new Button("vporteU",1,"lumiere",80,87,10,10,infini,function () {scene.unload("porte"); scene.U()}) ];
		this.sort()
		}
	}

	this.U= function() {
		if ("U" in this.total) {
			this.collection = Array.from(this.total["U"])
		}
		else {
		this.collection = [ new Img("U",0,"U",0,0,100,900/16),
							new Button("vUporte",1,"lumiere",22,48,5,5,infini,function () {scene.unload("U"); scene.porte()}),
							new Button("vUDEP",2,"lumiere",10,80,5,5,infini,function () {scene.unload("U"); scene.dep()} )];
		this.sort()
		}
	}

	this.dep= function() {
		if ("dep" in this.total) {
			this.collection = Array.from(this.total["dep"])
		}
		else {
		this.collection = [ new Img("dep",0,"dep",0,0,100,900/16),
							new Button("vdepu",1,"lumiere",20,85,5,5,infini,function () {scene.unload("dep"); scene.U()}),
							new Button("vdepamphitheatre",2,"lumiere",60,55,5,5,infini,function () {scene.unload("dep"); scene.amphitheatre()} )];
		this.sort()
		}
	}

	this.amphitheatre= function() {
		if ("amphitheatre" in this.total) {
			this.collection = Array.from(this.total["amphitheatre"])
		}
		else {
		this.collection = [ new Img("amphitheatre",0,"amphitheatre",0,0,100,900/16),
							new Button("vamphitheatredep",1,"lumiere",15,85,5,5,infini,function () {scene.unload("amphitheatre"); scene.dep()}),
							new Button("vamphitheatreamphi",2,"lumiere",40,50,5,5,infini,function () {scene.unload("amphitheatre"); scene.amphi()} )];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,80,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} )];
		this.sort()
		}
	}






	this.jardin0= function() {
		if ("jardin0" in this.total) {
			this.collection = Array.from(this.total["jardin0"])
		}
		else {
		this.collection = [ new Img("jardin0",0,"jardin0",0,0,100,900/16),
							new Button("vjardin01",1,"lumiere",30,30,5,5,infini,function () {scene.unload("jardin0"); scene.jardin5()}),
							new Button("vjardin0porteserre",2,"lumiere",80,50,5,5,infini,function () {scene.unload("jardin0"); scene.porteserre()})];
		this.sort()
		}
	}

	this.jardin5= function() {
		if ("jardin5" in this.total) {
			this.collection = Array.from(this.total["jardin5"])
		}
		else {
		this.collection = [ new Img("jardin5",0,"jardin5",0,0,100,900/16),
							new Button("vjardin50",1,"lumiere",80,30,5,5,infini,function () {scene.unload("jardin5"); scene.jardin0()}),
							new Button("vjardin51",1,"lumiere",30,40,5,5,infini,function () {scene.unload("jardin5"); scene.jardin1()}),
							new Button("vjardin52",1,"lumiere",70,40,5,5,infini,function () {scene.unload("jardin5"); scene.jardin2()}),
							new Button("vjardin53",2,"lumiere",20,75,5,5,infini,function () {scene.unload("jardin5"); scene.jardin3()}),
							new Button("vjardin54",1,"lumiere",80,85,5,5,infini,function () {scene.unload("jardin5"); scene.jardin4()})];
		this.sort()
		}
	}

	this.jardin2= function() {
		if ("jardin2" in this.total) {
			this.collection = Array.from(this.total["jardin2"])
		}
		else {
		this.collection = [ new Img("jardin2",0,"jardin2",0,0,100,900/16),
							new Button("vjardin25",1,"lumiere",20,80,5,5,infini,function () {scene.unload("jardin2"); scene.jardin5()} )];
		this.sort()
		}
	}

	this.jardin3= function() {
		if ("jardin3" in this.total) {
			this.collection = Array.from(this.total["jardin3"])
		}
		else {
		this.collection = [ new Img("jardin3",0,"jardin3",0,0,100,900/16),
							new Button("vjardin35",1,"lumiere",80,80,5,5,infini,function () {scene.unload("jardin3"); scene.jardin5()}),
							new Collectible("cleserre",9,"key",30,30,1,1)];
		this.sort()
		}
	}

	this.jardin1= function() {
		if ("jardin1" in this.total) {
			this.collection = Array.from(this.total["jardin1"])
		}
		else {
		this.collection = [ new Img("jardin1",0,"jardin1",0,0,100,900/16),
							new Button("vjardin15",1,"lumiere",20,80,5,5,infini,function () {scene.unload("jardin1"); scene.jardin5()} )];
		this.sort()
		}
	}

	this.jardin4= function() {
		if ("jardin4" in this.total) {
			this.collection = Array.from(this.total["jardin4"])
		}
		else {
		this.collection = [ new Img("jardin4",0,"jardin4",0,0,100,900/16),
							new Button("vjardin45",1,"lumiere",20,80,5,5,infini,function () {scene.unload("jardin4"); scene.jardin5()} )]; 
		this.sort()
		}
	}

	this.porteserre= function() {
		if ("porteserre" in this.total) {
			this.collection = Array.from(this.total["porteserre"])
		}
		else {
		this.collection = [ new Img("porteserre",0,"porteserre",0,0,100,900/16),
							new Button("vporteserrejardin0",2,"lumiere",80,20,5,5,infini,function () {scene.unload("porteserre"); scene.jardin0()},
							new Door("Porteferme", 1, ["simon_blue","simon_yellow"],0,0,100,900/16,"cleserre", function() {scene.unload("porteserre"); scene.serre0()}) )];
		this.sort()
		}
	}

	this.Kvo1= function() {
		if ("Kvo1" in this.total) {
			this.collection = Array.from(this.total["Kvo1"])
		}
		else {
		this.collection = [ new Img("Kvo1",0,"Kvo1",0,0,100,900/16),
							new Button("Kvo12",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo18",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo2= function() {
		if ("Kvo2" in this.total) {
			this.collection = Array.from(this.total["Kvo2"])
		}
		else {
		this.collection = [ new Img("Kvo2",0,"Kvo2",0,0,100,900/16),
							new Button("Kvo21",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo23",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo3= function() {
		if ("Kvo3" in this.total) {
			this.collection = Array.from(this.total["Kvo3"])
		}
		else {
		this.collection = [ new Img("Kvo3",0,"Kvo3",0,0,100,900/16),
							new Button("Kvo32",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo34",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()}),
							new Button("Kvo35",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()},
							new Button("Kvo37",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}) )];
		this.sort()
		}
	}

	this.Kvo4= function() {
		if ("Kvo4" in this.total) {
			this.collection = Array.from(this.total["Kvo4"])
		}
		else {
		this.collection = [ new Img("Kvo4",0,"Kvo4",0,0,100,900/16),
							new Button("Kvo43",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}) ];
		this.sort()
		}
	}

	this.Kvo5= function() {
		if ("Kvo5" in this.total) {
			this.collection = Array.from(this.total["Kvo5"])
		}
		else {
		this.collection = [ new Img("Kvo5",0,"Kvo5",0,0,100,900/16),
							new Button("Kvo53",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo56",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo6= function() {
		if ("Kvo6" in this.total) {
			this.collection = Array.from(this.total["Kvo6"])
		}
		else {
		this.collection = [ new Img("Kvo6",0,"Kvo6",0,0,100,900/16),
							new Button("Kvo65",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo610",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo7= function() {
		if ("Kvo7" in this.total) {
			this.collection = Array.from(this.total["Kvo7"])
		}
		else {
		this.collection = [ new Img("Kvo7",0,"Kvo7",0,0,100,900/16),
							new Button("Kvo73",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()} )];
		this.sort()
		}
	}

	this.Kvo8= function() {
		if ("Kvo8" in this.total) {
			this.collection = Array.from(this.total["Kvo8"])
		}
		else {
		this.collection = [ new Img("Kvo8",0,"Kvo8",0,0,100,900/16),
							new Button("Kvo81",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("vserre18",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo9= function() {
		if ("Kvo9" in this.total) {
			this.collection = Array.from(this.total["Kvo9"])
		}
		else {
		this.collection = [ new Img("Kvo9",0,"Kvo9",0,0,100,900/16),
							new Button("Kvo12",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("vserre18",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo10= function() {
		if ("Kvo10" in this.total) {
			this.collection = Array.from(this.total["Kvo10"])
		}
		else {
		this.collection = [ new Img("Kvo10",0,"Kvo10",0,0,100,900/16),
							new Button("Kvo106",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()} )];
		this.sort()
		}
	}


	this.serre0= function() {
		if ("serre0" in this.total) {
			this.collection = Array.from(this.total["serre0"])
		}
		else {
		this.collection = [ new Img("serre0",0,"serre0",0,0,100,900/16),
							new Button("vserre01",1,"lumiere",80,50,5,5,infini,function () {scene.unload("serre0"); scene.serre1()}),
							new Button("vserre02",1,"lumiere",10,60,5,5,infini,function () {scene.unload("serre0"); scene.serre2()}),
							new Button("vserre04",1,"lumiere",50,40,5,5,infini,function () {scene.unload("serre0"); scene.serre4()} )];
		this.sort()
		}
	}

	this.serre1= function() {
		if ("serre1" in this.total) {
			this.collection = Array.from(this.total["serre1"])
		}
		else {
		this.collection = [ new Img("serre1",0,"serre1",0,0,100,900/16),
							new Button("vserre10",1,"lumiere",20,60,5,5,infini,function () {scene.unload("serre1"); scene.serre0()}), 
							new Button("vserre13",1,"lumiere",70,60,5,5,infini,function () {scene.unload("serre1"); scene.serre3()} )];
		this.sort()
		}
	}

	this.serre2= function() {
		if ("serre2" in this.total) {
			this.collection = Array.from(this.total["serre2"])
		}
		else {
		this.collection = [ new Img("serre2",0,"serre2",0,0,100,900/16),
							new Button("vserre20",1,"lumiere",80,40,5,5,infini,function () {scene.unload("serre02"); scene.serre0()} )];
		this.sort()
		}
	}

	this.serre3= function() {
		if ("serre3" in this.total) {
			this.collection = Array.from(this.total["serre3"])
		}
		else {
		this.collection = [ new Img("serre3",0,"serre3",0,0,100,900/16),
							new Button("vserre31",1,"lumiere",80,20,5,5,infini,function () {scene.unload("serre3"); scene.serre1()} )];
		this.sort()
		}
	}

	this.serre4= function() {
		if ("serre4" in this.total) {
			this.collection = Array.from(this.total["serre4"])
		}
		else {
		this.collection = [ new Img("serre4",0,"serre4",0,0,100,900/16),
							new Button("vserre40",1,"lumiere",20,80,5,5,infini,function () {scene.unload("serre4"); scene.serre0()}), 
							new Button("vserre45",1,"lumiere",50,50,5,5,infini,function () {gui.inputBox("Quel est le code?",5,["1826"],function () {scene.unload("serre4"); scene.serre5()})} )];
		this.sort()
		}
	}

	this.serre5= function() {
		if ("serre5" in this.total) {
			this.collection = Array.from(this.total["serre5"])
		}
		else {
		this.collection = [ new Img("serre5",0,"serre5",0,0,100,900/16)],
		this.sort()
		}
	}

	this.carriere1= function() {
		if ("carriere1" in this.total) {
			this.collection = Array.from(this.total["carriere1"])
		}
		else {
		this.collection = [ new Img("carriere1",0,"carriere1",0,0,100,900/16),
							new Button("vcarriere12",1,"lumiere",2,40,5,5,infini,function () {gui.inputBox("Bite",5,["teub","zob"],function () {scene.unload("carriere1"); scene.carriere2()})}),
							new Button("vcarriere13",2,"lumiere",90,50,5,5,infini,function () {scene.unload("carriere1"); scene.carriere3()} )];
		this.sort()
		}
	}

	this.carriere2= function() {
		if ("carriere2" in this.total) {
			this.collection = Array.from(this.total["carriere2"])
		}
		else {
		this.collection = [ new Img("carriere2",0,"carriere2",0,0,100,900/16),
							new Button("vcarriere21",1,"lumiere",20,85,5,5,infini,function () {scene.unload("carriere2"); scene.carriere1()} )];
		this.sort()
		}
	}

	this.carriere3= function() {
		if ("carriere3" in this.total) {
			this.collection = Array.from(this.total["carriere3"])
		}
		else {
		this.collection = [ new Img("carriere3",0,"carriere3",0,0,100,900/16),
							new Button("vcarriere31",1,"lumiere",20,85,5,5,infini,function () {scene.unload("carriere3"); scene.carriere1()}),
							new Button("vcarriere34",1,"lumiere",60,55,5,5,infini,function () {scene.unload("carriere3"); scene.carriere4()} )];
		this.sort()
		}
	}

	this.carriere4= function() {
		if ("carriere4" in this.total) {
			this.collection = Array.from(this.total["carriere4"])
		}
		else {
		this.collection = [ new Img("carriere4",0,"carriere4",0,0,100,900/16),
							new Button("vcarriere43",1,"lumiere",70,85,5,5,infini,function () {scene.unload("carriere4"); scene.carriere3()}),
							new Button("vcarriere45",1,"lumiere",10,20,5,5,infini,function () {scene.unload("carriere4"); scene.carriere5()}),
							new Button("vcarriere46",1,"lumiere",72,50,5,5,infini,function () {scene.unload("carriere4"); scene.carriere6()}) ];
		this.sort()
		}
	}
	
	this.carriere5= function() {
		if ("carriere5" in this.total) {
			this.collection = Array.from(this.total["carriere5"])
		}
		else {
		this.collection = [ new Img("carriere5",0,"carriere5",0,0,100,900/16),
							new Button("vcarriere54",1,"lumiere",70,85,5,5,infini,function () {scene.unload("carriere5"); scene.carriere3()})];
		this.sort()
		}
	}

	this.carriere6= function() {
		if ("carriere6" in this.total) {
			this.collection = Array.from(this.total["carriere6"])
		}
		else {
		this.collection = [ new Img("carriere6",0,"carriere6",0,0,100,900/16),
							new Button("vcarriere64",1,"lumiere",80,85,5,5,infini,function () {scene.unload("carriere6"); scene.carriere4()}),
							new Button("vcarriere67",1,"lumiere",60,25,5,5,infini,function () {scene.unload("carriere6"); scene.carriere7()} )];
		this.sort()
		}
	}

	this.carriere7= function() {
		if ("carriere7" in this.total) {
			this.collection = Array.from(this.total["carriere7"])
		}
		else {
		this.collection = [ new Img("carriere7",0,"carriere7",0,0,100,900/16),
							new Button("vcarriere2",1,"lumiere",80,85,10,10,infini,function () {scene.unload("carriere7"); scene.carriere6()}), 
							new Button ("fin",1,"key",0,77,15,15,infini, function () {Img("carriere8",2,"carriere8",0,0,100,900/16)}) ];
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
// gui.inputBox("Question posée", Nombre d'essais, ["input valide1", "input valide2", ...], action_si_valide) {j'ai changé le premier bouton de carriere1}
//Pour input, new Button("vcarriere12",1,"lumiere",5,30,10,10,infini,function () {gui.inputBox("Bite",5,["teub","zob"],function () {scene.unload("carriere1"); scene.carriere2()}
//2Musique /1 Objet case/ 3Objet Simon