var infini = 2**64-1;
var c = 0;
var d = 0;


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
		this.total[key] = Array.from(this.collection);
		for (i = 0; i < this.collection.length; i++) {delete this.collection[i]}
		this.collection = []
	}
	this.sort = function() {
		this.collection = trier(this.collection);
		this.resize();
	}

/// Declare Scenes

	this.loadingscreen = function() {
		this.collection = [ new SplashText("splash1", 10, 11,30,9,'rgb(0,0,0)',"Une Nuit à Grignon"),
							new SplashText("splash2", 10, 30,50,3,'rgb(0,0,0)', "Un jeu en cours de chargement."),
							new SplashText("splash3", 10, 10,57,3,'rgb(0,0,0)', "On a environ 200Mo de données à charger, patiente un peu."),
							new SplashText("splash4", 10, 40,95,1.5,'rgb(0,0,0)', "Développé par Clément Chardine @CS et Louis Pimont @APT pour le Bureau des Etoiles")];
	}

	this.startup = function() {
		console.log('startup');
		if ("startup" in this.total) {
			this.collection = Array.from(this.total["startup"])
		} 
		else {
		this.collection = [	new Collectible("simplekey", 10, "key",10,10,10,10),
							new Door("door", 0, ["door1","door2"],30,10,10,20,"simplekey", function() {gui.textBox(['Bite','Un texte très long qui sert à voir des trucs de ouf','Encore bite','Teub'],["test"])} ),
							new Chest("ch3st", -1000, "simon_red", 40,40,30,30,function (name) {if (name == "simplekey") {console.log('loul')}})];
		this.sort()
		}
	}

	this.porte1= function() {
		if ("porte1" in this.total) {
			this.collection = Array.from(this.total["porte1"])
		}
		else {
		this.collection = [ new Img("porte",0,"porte",0,0,100,900/16),
							new Button("portesasha",1,"lumiere",32,60,5,5,1,function () {gui.textBox(["[Sasha]","Oh putain ça s’ouvre pas…","Qu’est-ce que j’ai foutu de mes clés ? Bon. ","Calme-toi Sasha. Réfléchis deux secondes."], [], function () {gui.textBox(["Où est-ce que tu aurais pu ranger tes PUTAIN clés ?"], [], function () {scene.collection.push(new Img("messagealex",5,"messagealex",30,0,45,45)) ; gui.textBox(["Vous avez reçu un message de ALEX"], [], function () {gui.textBox(["[Sasha]","Mais qu’est-ce qu’il raconte ? Soirée ?", "Camille ? J’ai la tête dans le cul,", "je me rappelle plus de rien." ], [], function () {scene.collection.push(new Img("messageherve",5,"messageherve",30,0,45,45)) ; gui.textBox(["Vous avez reçu un message de ALEXANDRE HERVÉ"], [], function() {supprime("portesacha") ; supprime("messageherve"); supprime("messagealex"); gui.textBox(["[Sasha]","Oh mince, j’étais censé aider à nettoyer le campus ce matin ?", "Je ferais mieux de m’y mettre immédiatement." ])})})} )})}  )}),
							new Button("portealex",2,"lumiere",68,48,5,5,1,function () {gui.textBox(["[Alex]","Bah alors Sasha on a la tête dans le cul ce matin ? En même ","temps, t’étais vraiment un déchet hier soir, c’était pas beau à voir.","Mais trêve de bavardages, une meuf a oublié son éco-cup"], [], function() {scene.collection.push(new Img("alex1",5,"alex1",30,0,50,50)) ; gui.textBox(["[Alex]", "chez moi hier. Comme t’es chargé de nettoyage", "et que j’ai la flemme de bouger mon cul, je te la file.","Eh sans rancune, hein !"], [], function() {supprime("alex1"),gui.textBox(["Sasha","Euuuuuuh... ok ? O_O"], [], function() {supprime("portealex"); scene.collection.push(new Collectible("ecocup", 10, "ecocup",68,48,5,5))})})})}), 
							new Button("vporteU",1,"lumiere",80,87,5,5,infini,function () {scene.unload("porte"); scene.U()}) ];
		this.sort()
		}
	}

	this.U1= function() {
		if ("U1" in this.total) {
			this.collection = Array.from(this.total["U1"])
		}
		else {
		this.collection = [ new Img("U",0,"U",0,0,100,900/16),
							new Button("vUporte",1,"lumiere",25,52,5,5,infini,function () {scene.unload("U"); scene.porte()}),
							new Button("vUDEP",2,"lumiere",8,77,5,5,infini,function () {scene.unload("U"); scene.dep()} ),
							new Collectible("capote", 10, "capote",30,60,1,1),
							new Button("clara",2,"clara",70,50,15,20,infini,function () {gui.textBox(["[Clara]","Bonjour Sasha, je suis un peu pressée là","mais je devais une bière à ma pote.", "Tu peux lui apporter ?" ], [], function () {gui.textBox(["[Sasha]","Au point où j’en suis…" ], [], function() {gui.textBox(["[Clara]","Trop sympa Sasha !" ], [], function() {supprime("clara");scene.collection.push(new Collectible("martens", 10, "martens",70,60,5,5))})} )} )} )];
		this.sort()
		}
	}

	this.dep1= function() {
		if ("dep1" in this.total) {
			this.collection = Array.from(this.total["dep1"])
		}
		else {
		this.collection = [ new Img("dep",0,"dep",0,0,100,900/16),
							new Button("vdepu",1,"lumiere",20,85,5,5,infini,function () {scene.unload("dep"); scene.U()}),
							new Collectible("portable", 10, "portable",10,75,5,5),
							new Button("vdepamphitheatre",2,"lumiere",60,60,5,5,infini,function () {scene.unload("dep"); scene.amphitheatre()} ),
							new Button("manon",2,"manon",20,50,12,17,infini,function () {gui.textBox(["[Manon]","hey Sasha, tu tombes bien! Hier j’ai trouvé","ce bob abandonné au bassin, tu pourrais le ramener", "à son propriétaire ?" ], [], function () {gui.textBox(["[Sasha]","Oui, bien sûr. Je suis censé m’occuper du nettoyage", "de Grignon de toute façon." ], [], function() {gui.textBox(["[Manon]","Ah cool merci ! Au fait, je sais pas si t’as ouvert zimbra","ce matin, mais on a encore reçu 341 mails…","5 jours de suite..." ], [], function() {gui.textBox(["[Sasha]","Chaud..." ], [], function () {supprime("manon");scene.collection.push(new Collectible("bob", 10, "bob",20,50,5,5))})})})} )} )];
		this.sort()
		}
	}

	this.amphitheatre1= function() {
		if ("amphitheatre1" in this.total) {
			this.collection = Array.from(this.total["amphitheatre1"])
		}
		else {
		this.collection = [ new Img("amphitheatre",0,"amphitheatre",0,0,100,900/16),
							new Button("vamphitheatredep",1,"lumiere",15,85,5,5,infini,function () {scene.unload("amphitheatre"); scene.dep()}),
							new Button("vamphitheatreamphi",2,"lumiere",40,50,5,5,infini,function () {scene.unload("amphitheatre"); scene.amphi()} ),
							new Button("othilie",2,"othilie",50,50,10,18,infini,function () {gui.textBox(["[Othilie]","Coucou Sasha.","J’ai appris que tu faisais aussi", "le grand nettoyage de Grignon"], [], function() {gui.textBox(["[Othilie]","J’ai trouvé ce briquet, mais je ne sais pas à qui il", "appartient. Tu pourrais le déposer dans le casier", "de son propriétaire?"], [], function() {supprime("othilie");scene.collection.push(new Collectible("briquet", 10,"briquet",50,50,5,5))})})}),
							new Collectible("truelle", 10, "truelle",90,80,5,5),
							new Collectible("poppers", 10, "poppers",10,70,3,3)];
		this.sort()
		}
	}

	this.amphi1= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.casier1= function() {
		if ("casier1" in this.total) {
			this.collection = Array.from(this.total["casier1"])
		}
		else {
		this.collection = [ new Img("casier",0,"casier",0,0,100,900/16),
							new Button("casieramphi",2,"lumiere",10,90,5,5,infini,function () {scene.unload("casier1"); scene.amphi()} ),
							new Chest("ch3st0", 1, "simon_red", 13,5,5,5),
							new Chest("ch3st1", 1, "simon_red", 40,5,5,5),
							new Chest("ch3st2", 1, "simon_red", 70,5,5,5),
							new Chest("ch3st3", 1, "simon_red", 13,27,5,5),
							new Chest("ch3st4", 1, "simon_red", 40,27,5,5),
							new Chest("ch3st5", 1, "simon_red", 70,27,5,5),
							new Chest("ch3st6", 1, "simon_red", 13,42,5,5),
							new Chest("ch3st7", 1, "simon_red", 40,42,5,5),
							new Chest("ch3st8", 1, "simon_red", 70,42,5,5),
							new Button("valider",3,"valider", 95,55,5,5, infini, function () {var ar=[null, null, null, null, null, null, null, null, null];
								for (i=0; i<scene.collection.length; i++) {
									var elt= scene.collection[i];
									if (elt.id=="ch3st0") {
										if (elt.slot==null) {
											ar[0]=null}
										else {ar[0]=elt.slot.id}
									}
									if (elt.id=="ch3st1") {
										if (elt.slot==null) {
											ar[1]=null}
										else {ar[1]=elt.slot.id} 
									}
									if (elt.id=="ch3st2") {
										if (elt.slot==null) {
											ar[2]=null} 
										else {ar[2]=elt.slot.id}
									}
									if (elt.id=="ch3st3") {
										if (elt.slot==null) {
											ar[3]=null} 
										else {ar[3]=elt.slot.id}
									}
									if (elt.id=="ch3st4") {
										if (elt.slot==null) {
											ar[4]=null} 
										else {ar[4]=elt.slot.id}
									}
									if (elt.id=="ch3st5") {
										if (elt.slot==null) {
											ar[5]=null} 
										else {ar[5]=elt.slot.id}
									}
									if (elt.id=="ch3st6") {
										if (elt.slot==null) {
											ar[6]=null} 
										else {ar[6]=elt.slot.id}
									}
									if (elt.id=="ch3st7") {
										if (elt.slot==null) {
											ar[7]=null} 
										else {ar[7]=elt.slot.id}
									}
									if (elt.id=="ch3st8") {
										if (elt.slot==null) {
											ar[8]=null} 
										else {ar[8]=elt.slot.id}
									}		
								}
								console.log(ar);
								if (ar==["portable", "martens", "truelle", "banane", "ecocup", "capote", "briquet", "poppers", "bob"]) {gui.textBox(["[Sasha]","Une bonne chose de faite !", "J’espère que les gens penseront à venir récupérer", "leurs affaires dans leurs casiers." ], [], function () {gui.textBox(["[Sasha]","D’ailleurs, je me demande si j’ai des trucs à récupérer moi aussi.", "Voyons voir… hmm… tiens donc ? J’avais laissé ça là ?"], [], function () {scene.unload("casier1"); scene.souvenir1()})})};
								else {if (c<15) {gui.stupidity+=3; c+=1}};
								})];
		this.sort()
		}
	}

	this.souvenir1= function() {
		if ("souvenir1" in this.total) {
			this.collection = Array.from(this.total["souvenir1"])
		}
		else {
		this.collection = [ new Button("souvenir1",2,"souvenir1",0,0,100,900/16,infini,function () {scene.unload("souvenir1"); scene.amphitheatre()} )];
		this.sort()
		}
	}

	this.souvenir2= function() {
		if ("souvenir2" in this.total) {
			this.collection = Array.from(this.total["souvenir2"])
		}
		else {
		this.collection = [ new Button("souvenir2",2,"souvenir2",0,0,100,900/16,infini,function () {scene.unload("souvenir2"); scene.pullup1()} )];
		this.sort()
		}
	}

	this.souvenir3= function() {
		if ("souvenir3" in this.total) {
			this.collection = Array.from(this.total["souvenir3"])
		}
		else {
		this.collection = [ new Button("souvenir3",2,"souvenir3",0,0,100,900/16,infini,function () {scene.unload("souvenir3"); scene.amphitheatre()} )];
		this.sort()
		}
	}

	this.souvenir4= function() {
		if ("souvenir4" in this.total) {
			this.collection = Array.from(this.total["souvenir4"])
		}
		else {
		this.collection = [ new Button("souvenir4",2,"souvenir4",0,0,100,900/16,infini,function () {scene.unload("souvenir4"); scene.ct1()} )];
		this.sort()
		}
	}

	this.souvenir5= function() {
		if ("souvenir5" in this.total) {
			this.collection = Array.from(this.total["souvenir5"])
		}
		else {
		this.collection = [ new Button("souvenir5",2,"souvenir5",0,0,100,900/16,infini,function () {scene.unload("souvenir5"); scene.amphitheatre()} )];
		this.sort()
		}
	}

	this.souvenir6= function() {
		if ("souvenir6" in this.total) {
			this.collection = Array.from(this.total["souvenir6"])
		}
		else {
		this.collection = [ new Button("souvenir6",2,"souvenir6",0,0,100,900/16,infini,function () {scene.unload("souvenir6"); scene.chariot1()} )];
		this.sort()
		}
	}

	this.souvenir7= function() {
		if ("souvenir7" in this.total) {
			this.collection = Array.from(this.total["souvenir7"])
		}
		else {
		this.collection = [ new Button("souvenir7",2,"souvenir7",0,0,100,900/16,infini,function () {scene.unload("souvenir7"); scene.combat11()} )];
		this.sort()
		}
	}

	this.souvenir8= function() {
		if ("souvenir8" in this.total) {
			this.collection = Array.from(this.total["souvenir8"])
		}
		else {
		this.collection = [ new Button("souvenir8",2,"souvenir8",0,0,100,900/16,infini,function () {scene.unload("souvenir8"); scene.amphitheatre()} )];
		this.sort()
		}
	}

	this.combat11= function() {
		if ("combat11" in this.total) {
			this.collection = Array.from(this.total["combat11"])
		}
		else {
		this.collection = [ new Img("foret5",0,"foret5",0,0,100,900/16),
							new Button("agression",2,"lumiere",70,90,5,5,infini,function () {gui.textBox(["[???]"," A L’ATTAAAAAQUE !" ], [], function () {scene.unload("combat11"); scene.combat12()}  ) } )];
		this.sort()
		}
	}

	this.combat12= function() {
		if ("combat12" in this.total) {
			this.collection = Array.from(this.total["combat12"])
		}
		else {
		this.collection = [ new Img("combat1",0,"combat1",0,0,100,900/16),
							new Img("viefullg",1,"viefullg",10,20,10,10),
							new Img("viefulls",1,"viefulls",10,60,10,10),
							new Button("fight1",2,"fight1",50,70,5,5,infini,function () {gui.choicesBox([["Que faire?"],
							["lancer le poly de compta", function() {scene.collection.push(new Img("vieforteg",3,"vieforteg",10,20,10,10));gui.stupidity +=30; gui.textBox(["Ce n'est pas très efficace."], [], function () {
							gui.textBox(["Guillaume contre-attaque à grands coups de lance."], [], function () {
							scene.collection.push(new Img("viefaibles",3,"viefaibles",10,60,10,10));gui.textBox(["C'est super efficace!"], [], function() {scene.unload("combat12"); scene.combat13() } )} )})}],
							["BONJOUR BONJOUR", function() {scene.collection.push(new Img("vieforteg",3,"vieforteg",10,20,10,10));gui.stupidity +=60; gui.textBox(["Ce n'est pas très efficace."], [], function () {
								gui.textBox(["Guillaume contre-attaque à grands coups de lance."], [], function () {
								scene.collection.push(new Img("viefaibles",3,"viefaibles",10,60,10,10));gui.textBox(["C'est super efficace!"], [], function() {scene.unload("combat12"); scene.combat13() } )} )})}],
							["lui perforer le crâne à coup de pioche laser", function() {scene.collection.push(new Img("vieforteg",3,"vieforteg",10,20,10,10));gui.stupidity +=10; gui.textBox(["Ce n'est pas très efficace."], [], function () {
								gui.textBox(["Guillaume contre-attaque à grands coups de lance."], [], function () {
								scene.collection.push(new Img("viefaibles",3,"viefaibles",10,60,10,10));gui.textBox(["C'est super efficace!"], [], function() {scene.unload("combat12"); scene.combat13() } )} )})}],
							["créer un débat sur zimbra", function() {scene.collection.push(new Img("vieforteg",3,"vieforteg",10,20,10,10));gui.stupidity +=120; gui.textBox(["Ce n'est pas très efficace."], [], function () {
								gui.textBox(["Guillaume contre-attaque à grands coups de lance."], [], function () {
								scene.collection.push(new Img("viefaibles",3,"viefaibles",10,60,10,10));gui.textBox(["C'est super efficace!"], [], function() {scene.unload("combat12"); scene.combat13() } )} )})}] ])})];
		this.sort()
		}
	}

	this.combat13= function() {
		if ("combat13" in this.total) {
			this.collection = Array.from(this.total["combat13"])
		}
		else {
		this.collection = [ new Img("foret5",0,"foret5",0,0,100,900/16),
							new Button("guillaume1",2,"guillaume1",50,50,15,20,infini,function () {gui.textBox(["[Guillaume]","Oh tu n’étais donc pas le guerrier que je croyais", "que tu étais. Écoute-moi attentivement. "], [], function () {gui.textBox(["[Guillaume]","Il se passe des choses étranges sur ce campus. " ], [], function() {gui.textBox(["[Guillaume]","J’ai surpris toute à l’heure, ton pote là,", "le petit con, Alex en train de faire du forcing sur Camille", "bien pompette, pour qu’elle appelle les flics." ], [], function() {gui.textBox(["[Guillaume]","Quel enfoiré ! Il a l’air de préparer un sale coup…" ], [], function() {gui.textBox(["[Guillaume]","Je l’ai suivi jusqu’à la vieille grange", "abandonnée dans le champ, puis je l’ai perdu", "de vue, le fumier !" ], [], function() {scene.collection.push(new Img("grange5",3,"grange5",20,10,50,50));gui.textBox(["[Guillaume]","J’ai juste pris cette photo, mais on ferait", "mieux de vite le retrouver pour lui régler son compte." ], [], function() {scene.unload("combat13"); scene.gastro2()})})})})})})} )];
		this.sort()
		}
	}

	this.gastro3= function() {
		if ("gastro3" in this.total) {
			this.collection = Array.from(this.total["gastro3"])
		}
		else {
		this.collection = [ new Img("gastro",0,"gastro",0,0,100,900/16),
							new Button("vgrange1",2,"lumiere",10,80,5,5,infini,function () {gui.textBox(["[Sasha]","Tout laisse penser que je trouverai plus", "d’indices en me rendant à la grange." ], [], function() {scene.unload("gastro2"); scene.grange1()} )}),
							];
		this.sort()
		}
	}

	this.grange1= function() {
		if ("grange1" in this.total) {
			this.collection = Array.from(this.total["grange1"])
		}
		else {
		this.collection = [ new Img("grange1",0,"grange1",0,0,100,900/16),
							new Button("vgrange2",2,"lumiere",10,50,5,5,infini,function () {scene.unload("grange1"); scene.grange2()} ),
							];
		this.sort()
		}
	}

	this.grange2= function() {
		if ("grange2" in this.total) {
			this.collection = Array.from(this.total["grange2"])
		}
		else {
		this.collection = [ new Img("grange2",0,"grange2",0,0,100,900/16),
							new Button("vgrange3",2,"lumiere",50,50,5,5,infini,function () {scene.unload("grange2"); scene.grange3()} ),
							];
		this.sort()
		}
	}

	this.grange3= function() {
		if ("grange3" in this.total) {
			this.collection = Array.from(this.total["grange3"])
		}
		else {
		this.collection = [ new Img("grange3",0,"grange3",0,0,100,900/16),
							new Button("vgrange4",2,"lumiere",50,50,5,5,infini,function () {scene.unload("grange3"); scene.grange4()} ),
							];
		this.sort()
		}
	}

	this.grange4= function() {
		if ("grange4" in this.total) {
			this.collection = Array.from(this.total["grange4"])
		}
		else {
		this.collection = [ new Img("grange4",0,"grange4",0,0,100,900/16),
							new Button("screamer",2,"grange4",0,0,100,900/16,infini,function () {scene.unload("grange4"); scene.grange32()} ),
							];
		this.sort()
		}
	}

	this.grange43= function() {
		if ("grange43" in this.total) {
			this.collection = Array.from(this.total["grange43"])
		}
		else {
		this.collection = [ new Img("grange3",0,"grange3",0,0,100,900/16),
							new Button("vieux",2,"vieux",50,50,50,60,infini,function () {gui.textBox(["[Vieil homme]","Bonjour à toi, voyageur !", "Je vois que tu as trouvé mon repère." ], [], function() {gui.textBox(["[Vieil homme]","Excuse-moi si je t’ai fait peur.", "Un jeune homme est venu me menacer hier.", "Je préférais prendre mes précautions." ], [], function() {gui.textBox(["[Vieil homme]","Mais ne parlons pas ici. Résous cette énigme", "et tu trouveras le lieu de notre prochaine rencontre :  " ], [], function() {gui.textBox(["Dessous la terre je me situe,", "et beaucoup ne m’ont jamais vu,", "il se dit que je fus jadis,", "l’antre des fêtes et des vices. Qui suis-je ?" ], [], function() {gui.inputBox(["Dessous la terre je me situe,", "et beaucoup ne m’ont jamais vu,", "il se dit que je fus jadis,", "l’antre des fêtes et des vices. Qui suis-je ?"],5,["k-vo","K-vo"],function () {scene.unload("grange43"); scene.Kvo1()})})})})})} ),
							];
		this.sort()
		}
	}


	this.chateau= function() {
		if ("chateau" in this.total) {
			this.collection = Array.from(this.total["chateau"])
		}
		else {
		this.collection = [ new Img("chateau",0,"chateau",0,0,100,900/16),
							new Button("leo1",2,"leo",60,90,20,15,infini,function () {gui.textBox(["[Léo]","Tremblez pauvres mortels car la conjoncture astrale", "a été altérée par les vents cosmiques." ], [], function() {gui.textBox(["[Léo]","Comme vous le savez tous, une obscure", "malédiction s’abat sur Grignon !" ], [], function() {gui.textBox(["[Léo]","Des portes disparaissent mystérieusement dans la nuit." ], [], function () {gui.textBox(["[Léo]","Leurs propriétaires, le cœur brisé, n’ont d’autre choix", "que de vivre leur deuil en silence,", "ne sachant qui blâmer pour leur sort." ], [], function() {gui.textBox(["[Léo]","Mais n’ayez crainte ! Car vous", "avez la possibilité de sauver votre avenir de la désolation."], [], function() {gui.textBox(["[Léo]","Pour cela il vous suffit de prendre rendez-vous", "avec un de nos experts en divination écodigitale." ], [], function() {gui.textBox(["[Léo]","Bienvenue cher ami, quel trouble me vaut votre visite?" ], [], function () {gui.textBox(["[Sasha]","Je dois avouer que je sais plus tellement où j’en suis,","là c’est plus un trou, c’est un gouffre, une abîme,", "que dis-je, c’est la putain de fosse des Mariannes !" ], [], function() {gui.textBox(["[Léo]","Hmm, j’entends… Prenez place." ], [], function() {gui.textBox(["[Sasha]","euh ok …?" ], [], function() {gui.textBox(["[Léo]","La première carte représente votre présent." ], [], function() {scene.collection.push(new Img("ermite",3,"ermite",5,5,45,45));gui.textBox(["[Léo]","Vous avez tiré l’Hermite… Bien, il semblerait", " que vous cheminiez seul, vos alliés vous", "ont tourné le dos..." ], [], function() {gui.textBox(["[Sasha]","Attends tu viens de dire quoi là ?" ], [], function() {gui.textBox(["[Léo]","Concentrez-vous, il est temps de découvrir votre futur." ], [], function() {scene.collection.push(new Img("jugement",4,"jugement",5,5,45,45));gui.textBox(["[Léo]","Le Jugement. Bien que votre esprit soit plongé dans", "l’ombre par les mots de ceux qui vous entourent." ], [], function() {gui.textBox(["[Léo]","Au bout du chemin se trouve la lumière de la vérité.", "Enfin si vous n’êtes pas trop stupide." ], [], function() {gui.textBox(["[Sasha]","Ça suffit ces insinuations oui ? Je vais partir hein !" ], [], function() {scene.collection.push(new Img("maisondieu",5,"maisondieu",5,5,45,45)),gui.textBox(["[Léo]","Chuuuuut ! Vous perturbez l’ordre céleste, tirez", "maintenant la carte du passé. La maison Dieu…", "Intéressant…" ], [], function() {gui.textBox(["[Léo]","Vous m’avez l’air fort simplet alors je ne m’encombrerai", "pas d’une analyse raffinée : un lieu élevé vous a", "rapproché du ciel étoilé." ], [], function() {gui.textBox(["Sasha", "un lieu élevé... le ciel étoilé..."], [], function() {scene.unload("chateau"); scene.souvenir5()})})})})})})} )})})})})})})})})})})})})})} )];
		this.sort()
		}
	}

	this.pullup1= function() {
		if ("pullup1" in this.total) {
			this.collection = Array.from(this.total["pullup1"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("jim",2,"lumiere",95,95,5,5,infini,function () {scene.collection.push(new Img("jimmy1",5,"jimmy1",30,0,50,50)); gui.textBox(["[Jimmy]","Besoin d’un peu de paillettes dans ta vie ? " ], [], function() {gui.textBox(["[Jimmy]","Laisse-moi illuminer ton visage afin qu’il attire", "à toi tous les jolies papillons de nuit." ], [], function() {supprime("jim");supprime("jimmy1")})})} ),
							new Button("pullup1",2,"lumiere",65,30,5,5,infini,function () {gui.stupidity +=30; supprime("pullup1"); gui.textBox(["Pull-uuuuuuuuuuuuup !" ])} ),
							new Button("noemie",2,"lumiere",40,50,5,5,infini,function () {gui.textBox(["[Noémie]","J’aurais pas dû venir…" ], [], function() {gui.textBox(["[Sasha]","Pourquoi ça ? Il y a une bonne ambiance !" ], [], function () {gui.textBox(["[Noémie]","Ouais c’est pas ça mais…" ], [], function() {gui.textBox(["[Noémie]","Je dois reprendre tous les cours de stats", "avant les partiels… avec la co à Grignon", "qui déconne j’ai pas pu en suivre un seul…"], [], function() {gui.textBox(["[Sasha]","C’est vrai que c’est pas ouf comme conditions." ], [], function() {gui.textBox(["[Noémie]","Tu trouves pas ça trop bizarre, toi ? Genre on", "croirait vraiment qu’on essaie de saboter", "notre réseau, à ce stade c’est plus possible…" ], [], function() {gui.textBox(["[Sasha]","On est beaucoup après sur le campus, ça aide pas." ], [], function() {gui.textBox(["[Noémie]","Mouais, t’as peut-être raison." ], [], function() {scene.unload("pullup1"); scene.pullup2()})})})})})})})})} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.pullup2= function() {
		if ("pullup2" in this.total) {
			this.collection = Array.from(this.total["pullup2"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("pullup1",2,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["[Sasha]","Aaah je sens que l’alcool commence à monter.", " La playlist est très K-li ce soir. C’est", "l’occasion d’aller faire des rencontres !" ], [], function() {gui.choicesBox([["Qui veux-tu aborder?"],
							["Pauline", function() {scene.unload("pullup2"); scene.draguep1()}],
							["Jimmy", function() {scene.unload("pullup2"); scene.draguej1()}]] )})})];
		this.sort()
		}
	}

	this.draguep1= function() {
		if ("draguep1" in this.total) {
			this.collection = Array.from(this.total["draguep1"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("pauline",2,"pauline1",20,0,15,20,infini,function () {gui.choicesBox([["Comment commencer?"],
							["raconter ses rêves", function() {gui.textBox(["[Sasha]", " On m’a toujours dit de suivre mes rêves,", "alors ce soir je te suis."], [], function() {gui.stupidity +=40; gui.textBox(["*Pauline a pris la fuite*"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["évoquer le feu", function() {gui.textBox(["[Sasha]", "C’est moi où le feu est aussi chaud que l’atmosphère entre nous ?"], [], function() {scene.collection.push(new Img("pauline3",5,"pauline3",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Pauline]", "Alors j’en perds mes mots"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["la comparer aux étoiles", function() {gui.textBox(["[Sasha]", "Tu es aussi rayonnante que les étoiles", "de la constellation du dragon."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Pauline]", "Oh ! Je suis hyper touchée"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["t'es bonne", function() {gui.textBox(["[Sasha]", "Vas y t'es tellement bonne que", "je t'échangerais contre ma daronne"], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Pauline]", "J’me casse, sans cordialité aucune"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["proposer un bouche-à-bouche", function() {gui.textBox(["[Sasha]", "J’ai besoin d’un bouche-à-bouche car", "je viens de me noyer dans votre regard."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Pauline]", "Alors je pense que tu peux", "t’en sortir sans moi !"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}]])} ),
						];
		this.sort()
		}
	}

	this.draguep2= function() {
		if ("draguep2" in this.total) {
			this.collection = Array.from(this.total["draguep2"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("pauline",2,"pauline1",20,0,15,20,infini,function () {gui.choicesBox([["Comment continuer?"],
							["raconter ses rêves", function() {gui.textBox(["[Sasha]", " On m’a toujours dit de suivre mes rêves,", "alors ce soir je te suis."], [], function() {gui.stupidity +=40; gui.textBox(["*Pauline a pris la fuite*"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["évoquer le feu", function() {gui.textBox(["[Sasha]", "C’est moi où le feu est aussi chaud que l’atmosphère entre nous ?"], [], function() {scene.collection.push(new Img("pauline3",5,"pauline3",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Pauline]", "Alors j’en perds mes mots"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["la comparer aux étoiles", function() {gui.textBox(["[Sasha]", "Tu es aussi rayonnante que les étoiles", "de la constellation du dragon."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Pauline]", "Oh ! Je suis hyper touchée"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["t'es bonne", function() {gui.textBox(["[Sasha]", "Vas y t'es tellement bonne que", "je t'échangerais contre ma daronne"], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Pauline", "J’me casse, sans cordialité aucune"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["proposer un bouche-à-bouche", function() {gui.textBox(["[Sasha]", "J’ai besoin d’un bouche-à-bouche car", "je viens de me noyer dans votre regard."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Pauline]", "Alors je pense que tu peux", "t’en sortir sans moi !"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}]])} ),
						];
		this.sort()
		}
	}

	this.draguep3= function() {
		if ("draguep3" in this.total) {
			this.collection = Array.from(this.total["draguep3"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("pauline",2,"pauline1",20,0,15,20,infini,function () {gui.choicesBox([["Comment finir?"],
							["raconter ses rêves", function() {gui.textBox(["[Sasha]", " On m’a toujours dit de suivre mes rêves,", "alors ce soir je te suis."], [], function() {gui.stupidity +=40; gui.textBox(["*Pauline a pris la fuite*"], [], function() {gui.textBox(["[Pauline]", "BYE, SANS CORDIALITÉ AUCUNE"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["évoquer le feu", function() {gui.textBox(["[Sasha]", "C’est moi où le feu est aussi chaud que l’atmosphère entre nous ?"], [], function() {scene.collection.push(new Img("pauline3",5,"pauline3",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Pauline]", "Alors j’en perds mes mots"], [], function() {gui.textBox(["[Pauline]", "Belle soirée et belle nuit à toi"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["la comparer aux étoiles", function() {gui.textBox(["[Sasha]", "Tu es aussi rayonnante que les étoiles", "de la constellation du dragon."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Pauline]", "Oh ! Je suis hyper touchée"], [], function() {gui.textBox(["[Pauline]", "Belle soirée et belle nuit à toi"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["t'es bonne", function() {gui.textBox(["[Sasha]", "Vas y t'es tellement bonne que", "je t'échangerais contre ma daronne"], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Pauline]", "J’me casse, sans cordialité aucune"], [], function() {gui.textBox(["[Pauline]", "BYE, SANS CORDIALITÉ AUCUNE"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["proposer un bouche-à-bouche", function() {gui.textBox(["[Sasha]", "J’ai besoin d’un bouche-à-bouche car", "je viens de me noyer dans votre regard."], [], function() {scene.collection.push(new Img("pauline2",5,"pauline2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Pauline]", "Alors je pense que tu peux", "t’en sortir sans moi !"], [], function() {gui.textBox(["[Pauline]", "Belle soirée et belle nuit à toi"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}]])} ),
						];
		this.sort()
		}
	}

	this.draguej1= function() {
		if ("draguej1" in this.total) {
			this.collection = Array.from(this.total["draguej1"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("jimmy",2,"jimmy1",20,0,15,20,infini,function () {gui.choicesBox([["Comment commencer?"],
							["parler en anglais", function() {gui.textBox(["[Sasha]", " May I kiss you on your buttcheeks?"], [], function() {scene.collection.push(new Img("jimmy3",5,"jimmy3",30,0,50,50)),gui.stupidity +=40; gui.textBox(["[Jimmy]","Ah..bah non ça va pas être possible"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["proposer de réviser ensemble", function() {gui.textBox(["[Sasha]", "Faut que je révise pour les partiels,", "tu me donnes un coup de main", "pour les TD  de repro?"], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Jimmy]", "Ca faut le mériter mon chou"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["être direct", function() {gui.textBox(["[Sasha]", "Salut toi ! Je t’ai cherché des", "yeux pendant toute la soirée."], [], function() {scene.collection.push(new Img("jimmy1",5,"jimmy1",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Jimmy]", "Oh c’est un peu creepy mais je suis flatté !"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["parler de ses fantasmes", function() {gui.textBox(["[Sasha]", "J’ai toujours rêvé de chevaucher un mouton."], [], function() {scene.collection.push(new Img("jimmy4",5,"jimmy4",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Jimmy]", "Ah bah cool pour toi. A +"], [], function() {scene.unload("draguep1"); scene.draguep2()})})}],
							["demander l'heure", function() {gui.textBox(["[Sasha]", "Excuse-moi t’aurais pas l’heure parce que", "depuis que je t’ai vu, j’ai perdu", "la notion du temps."], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Jimmy]", "Ah… me voilà gêné "], [], function() {scene.unload("draguep1"); scene.draguep2()})})}]])} ),
						];
		this.sort()
		}
	}

	this.draguej2= function() {
		if ("draguej2" in this.total) {
			this.collection = Array.from(this.total["draguej2"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("jimmy",2,"jimmy1",20,0,15,20,infini,function () {gui.choicesBox([["Comment continuer?"],
							["parler en anglais", function() {gui.textBox(["[Sasha]", " May I kiss you on your buttcheeks?"], [], function() {scene.collection.push(new Img("jimmy3",5,"jimmy3",30,0,50,50)),gui.stupidity +=40; gui.textBox(["[Jimmy]","Ah..bah non ça va pas être possible"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["proposer de réviser ensemble", function() {gui.textBox(["[Sasha]", "Faut que je révise pour les partiels,", "tu me donnes un coup de main", "pour les TD  de repro?"], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Jimmy]", "Ca faut le mériter mon chou"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["être direct", function() {gui.textBox(["[Sasha]", "Salut toi ! Je t’ai cherché des", "yeux pendant toute la soirée."], [], function() {scene.collection.push(new Img("jimmy1",5,"jimmy1",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Jimmy]", "Oh c’est un peu creepy mais je suis flatté !"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["parler de ses fantasmes", function() {gui.textBox(["[Sasha]", "J’ai toujours rêvé de chevaucher un mouton."], [], function() {scene.collection.push(new Img("jimmy4",5,"jimmy4",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Jimmy]", "Ah bah cool pour toi. A +"], [], function() {scene.unload("draguep2"); scene.draguep3()})})}],
							["demander l'heure", function() {gui.textBox(["[Sasha]", "Excuse-moi t’aurais pas l’heure parce que", "depuis que je t’ai vu, j’ai perdu", "la notion du temps."], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Jimmy]", "Ah… me voilà gêné "], [], function() {scene.unload("draguep2"); scene.draguep3()})})}]])} ),
						];
		this.sort()
		}
	}

	this.draguej3= function() {
		if ("draguej3" in this.total) {
			this.collection = Array.from(this.total["draguej3"])
		}
		else {
		this.collection = [ new Img("pullup",0,"pullup",0,0,100,900/16),
							new Button("jimmy",2,"jimmy1",20,0,15,20,infini,function () {gui.choicesBox([["Comment commencer?"],
							["parler en anglais", function() {gui.textBox(["[Sasha]", " May I kiss you on your buttcheeks?"], [], function() {scene.collection.push(new Img("jimmy3",5,"jimmy3",30,0,50,50)),gui.stupidity +=40; gui.textBox(["[Jimmy]","Ah..bah non ça va pas être possible"], [], function() {gui.textBox(["[Jimmy]", "Je me barre de là moi."], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["proposer de réviser ensemble", function() {gui.textBox(["[Sasha]", "Faut que je révise pour les partiels,", "tu me donnes un coup de main", "pour les TD  de repro?"], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=20; gui.textBox(["[Jimmy]", "Ca faut le mériter mon chou"], [], function() {gui.textBox(["[Jimmy]", "Bisous ! Passe une soirée !"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["être direct", function() {gui.textBox(["[Sasha]", "Salut toi ! Je t’ai cherché des", "yeux pendant toute la soirée."], [], function() {scene.collection.push(new Img("jimmy1",5,"jimmy1",30,0,50,50));gui.stupidity +=0; gui.textBox(["[Jimmy]", "Oh c’est un peu creepy mais je suis flatté !"], [], function() {gui.textBox(["[Jimmy]", "Bisous ! Passe une soirée !"], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["parler de ses fantasmes", function() {gui.textBox(["[Sasha]", "J’ai toujours rêvé de chevaucher un mouton."], [], function() {scene.collection.push(new Img("jimmy4",5,"jimmy4",30,0,50,50));gui.stupidity +=80; gui.textBox(["[Jimmy]", "Ah bah cool pour toi. A +"], [], function() {gui.textBox(["[Jimmy]", "Je me barre de là moi."], [], function() {scene.unload("draguep3"); scene.chateau()})})})}],
							["demander l'heure", function() {gui.textBox(["[Sasha]", "Excuse-moi t’aurais pas l’heure parce que", "depuis que je t’ai vu, j’ai perdu", "la notion du temps."], [], function() {scene.collection.push(new Img("jimmy2",5,"jimmy2",30,0,50,50));gui.stupidity +=10; gui.textBox(["[Jimmy]", "Ah… me voilà gêné "], [], function() {gui.textBox(["[Jimmy]"], ["[Jimmy]","Bisous ! Passe une soirée !"], function() {scene.unload("draguep3"); scene.chateau()})})})}]])} ),
						];
		this.sort()
		}
	}

	this.porte2= function() {
		if ("porte2" in this.total) {
			this.collection = Array.from(this.total["porte2"])
		}
		else {
		this.collection = [ new Img("porte",0,"porte",0,0,100,900/16),
							new Button("alex",2,"alex1",68,48,15,20,1,function () {gui.textBox(["[Alex]","Salut, je peux t’aider. Tu cherches quelqu’un", "qu’on surnommerait « 17 », c’est ça ?" ], [], function() {gui.textBox(["[Sasha]","Salut, tu peux- Hein quoi ? Comment tu sais ça ?" ], [], function() {gui.textBox(["[Alex]","Tu harcèles littéralement tous les gens", "que tu croises à propos de ça…" ], [], function() {gui.textBox(["[Sasha]","Ah ouais j’avoue. Et du coup, toi, tu dois", "bien savoir des choses à ce sujet ?" ], [], function() {gui.textBox(["[Alex]","Navré mais je ne peux rien te dire de plus", "à ce sujet que ce que tu ne sais déjà." ], [], function() {gui.textBox(["[Sasha]","Sérieusement ? Toi aussi Alex ?" ], [], function() {scene.unload("porte2");scene.reflexion()})})})})})})}), 
							new Button("vporteU",1,"lumiere",80,87,5,5,infini,function () {scene.unload("porte2"); scene.U2()}) ];
		this.sort()
		}
	}


	this.U2= function() {
		if ("U2" in this.total) {
			this.collection = Array.from(this.total["U2"])
		}
		else {
		this.collection = [ new Img("U",0,"U",0,0,100,900/16),
							new Button("vUporte",1,"lumiere",25,52,5,5,infini,function () {scene.unload("U2"); scene.porte2()}),
							new Button("vUDEP",2,"lumiere",8,77,5,5,infini,function () {scene.unload("U2"); scene.dep2()} ),
							new Button("alexia",2,"alexia",50,40,5,5,infini,function () {gui.textBox(["[Sasha]","Salut, tu peux m’aider ? Je cherche quelqu’un qu’on", "surnommerait « 17 », ça te parle ?" ], [], function() {gui.textBox(["[Alexia]","*chante les filles d’agro*" ], [], function() {gui.textBox(["[Sasha]","et pour 17 du coup ?" ], [], function() {gui.textBox(["[Alexia]","Y a dix-sept… cent… quatre-vingt-neuf ? " ], [], function() {gui.textBox(["[Sasha]","Raaaaah ça m’aide pas." ])})})})})} ),
							new Button("benjamin",2,"benjamin",70,50,15,20,infini,function () {gui.textBox(["[Sasha]","Salut, tu peux m’aider ? Je cherche quelqu’un qu’on", "surnommerait « 17 », ça te parle ?" ], [], function() {gui.textBox(["[Benjamin]","17 ? Comme la taille de ma bi-" ], [], function() {gui.textBox(["[Sasha]","Putain je suis sérieux là." ], [], function() {gui.textBox(["[Sasha]","Vas-y laisse tomber." ])})})})} )];
		this.sort()
		}
	}

	this.dep2= function() {gui.textBox(["[Benjamin]","Binouze… ?" ])
		if ("dep2" in this.total) {
			this.collection = Array.from(this.total["dep2"])
		}
		else {
		this.collection = [ new Img("dep",0,"dep",0,0,100,900/16),
							new Button("vdepu",1,"lumiere",20,85,5,5,infini,function () {scene.unload("dep2"); scene.U2()}),
							new Button("vdepamphitheatre",2,"lumiere",60,60,5,5,infini,function () {scene.unload("dep2"); scene.amphitheatre2()} ),
							new Button("auriane",2,"auriane",20,50,12,17,infini,function () {gui.textBox(["[Sasha]","Salut, tu peux m’aider ? Je cherche quelqu’un qu’on", "surnommerait « 17 », ça te parle ?" ], [], function() {gui.textBox(["[Auriane]","17 ? Hmm aucune idée mais le 17e membre du club Ko-pain", "ça pourrait bien être toi Sasha." ], [], function() {gui.textBox(["[Auriane]"," T’avais promis de m’aider aujourd’hui", "pour le pain alors ramène tes fesses." ], [], function() {gui.textBox(["[Sasha]","Ah euh ouais ouais plus tard…" ], [], function() {gui.textBox(["[Auriane]","Attends, Sasha, reviens !" ])})})})})} )];
		this.sort()
		}
	}

	this.amphitheatre2= function() {
		if ("amphitheatre2" in this.total) {
			this.collection = Array.from(this.total["amphitheatre2"])
		}
		else {
		this.collection = [ new Img("amphitheatre",0,"amphitheatre",0,0,100,900/16),
							new Button("vamphitheatredep",1,"lumiere",15,85,5,5,infini,function () {scene.unload("amphitheatre2"); scene.dep2()}),
							new Button("vamphitheatrechateau",2,"lumiere",90,90,5,5,infini,function () {scene.unload("amphitheatre2"); scene.chateau2()} ),
							new Button("rith",2,"rith",50,50,10,18,infini,function () {gui.textBox(["[Sasha]","Salut, tu peux m’aider ? Je cherche quelqu’un", "qu’on surnommerait « 17 », ça te parle ?" ], [], function() {gui.textBox(["[Rith]","17 ? Eh bien tu peux passer commande pour les paniers bio." ], [], function() {gui.textBox(["[Rith]","Avec 17€ tu auras droit à un gâteau au noix, un sachet", "de pommes, une bouteille de cidre, et 200g de tomme de chèvre." ], [], function () {gui.textBox(["[Sasha]","Non merci." ])})})})}),
							];
		this.sort()
		}
	}

	this.chateau2= function() {
		if ("chateau2" in this.total) {
			this.collection = Array.from(this.total["chateau2"])
		}
		else {
		this.collection = [ new Img("chateau",0,"chateau",0,0,100,900/16),
							new Button("vamphi",2,"lumiere",50,50,5,5,infini,function () {scene.unload("chateau2"); scene.amphitheatre2()}),
							new Button("leo1",4,"leo",60,90,20,15, infini, function () {gui.textBox(["[Léo]","Attendez, il reste la dernière carte : celle de la raison", "qui vous amène ici. Tiens mais… Vous avez tiré l’Etoile…", "la 17e carte… étrange..." ], [], function () {gui.textBox(["[Sasha]","Je m’en tamponne le coquillage!", "L’étoile ? 17 ? Très drôle ! Bon salut !" ], [], function() {gui.textBox(["[Sasha]","Mais putain mais c’est quoi ce bordel ?", "Il se passe vraiment des choses pas nettes ici.", "Quoi qu’il en soit, je dois découvrir qui est ce fameux « 17 »"])})})}),
							new Button("camille1",2,"camille1",70,50,10,18,infini,function () {gui.textBox(["[Sasha]","AH ! Camille. Je voulais m’excuser pour hier soir", "j’ai certainement fait quelque chose qui t’as mis", "dans le mal."], [], function() {gui.textBox(["[Sasha]","A vrai dire, je me souviens pas de tout,", "et je suis vraiment paumé. Mais bon, en tout", "cas, il faut vraiment que tu m’expliques : qui est ce 17 ?"  ], [], function() {gui.textBox(["[Camille]","17 ? Voyons, la dix-septième carte", "au tarot c’est l’Etoile. Elle représente une-" ], [], function() {gui.textBox(["[Sasha]","Salut, tu peux m’aider ? Je cherche quelqu’un", "qu’on surnommerait « 17 », ça te parle ?" ])})})})})];
		this.sort()
		}
	}

	this.reflexion= function() {
		if ("reflexion" in this.total) {
			this.collection = Array.from(this.total["reflexion"])
		}
		else {
		this.collection = [ new Img("U",0,"U",0,0,100,900/16),
							new Button("reflexion",2,"lumiere",50,50,5,5,infini,function () {gui.textBox(["[Sasha]","Bon, je crois que j’arriverai pas à déterminer qui", "est ce satané 17. On va changer de stratégie. " ], [], function() {gui.textBox(["[Sasha]","Cherchons plutôt qui a envoyé ces messages à Camille cette nuit." ], [], function() {gui.textBox(["[Sasha]","Faisons des stats : si j’applique  le théorème de Novembre", "à la racine circulaire de l’inégalité de Bienaymé-Tchebychev" ], [], function() {gui.textBox(["[Sasha]","...et que je considère la durée d’un rapport sexuel moyen" ], [], function() {gui.textBox(["[Sasha]","...il semble ÉVIDENT de supposer qu’EXACTEMENT", "4 de ces personnes mentent et 2 sont honnêtes.", "Reste plus qu’à déduire qui a envoyé ce message."], [], function() {gui.textBox(["[Rith]","Ça pourrait être soit Benjamin, soit Auriane.", "Ils se sont éclipsés en skred hier soir." ], [], function() {gui.textBox(["[Camille]","Écoute, je sais pas ce que t’as dit Alex,", "mais c’est rien qu’un menteur, un menteur !" ], [], function() {gui.textBox(["[Alexia]","J’ai vu Camille se barrer dans les bois avec quelqu’un hier", "soir, il y a moyen que ce soit elle la coupable…" ], [], function() {gui.textBox(["[Alexia]","ou alors Auriane, sa tête me revient pas." ], [], function() {gui.textBox(["[Benjamin]","Écoute, avec ce qu’on a pris hier soir,", "c’est clair qu’on a pas toute notre tête." ], [], function() {gui.textBox(["[Benjamin]","Du coup j’pense qu’entre Alex et moi,", "il y en a forcément un qui ment et", "l’autre qui est honnête, man." ], [], function() {gui.textBox(["[Alex]"," Nan mais Sasha, tu peux nous", "faire confiance à Camille et à moi." ], [], function() {gui.textBox(["[Auriane]","Je ne voudrais pas m’avancer,", "mais y a moyen que le coupable dise la vérité." ], [], function() {scene.unload("reflexion"); scene.reponse()})})})})})})})})})})})})})} ),
		];
		this.sort()
		}
	}

	this.reponse= function() {
		if ("reponse" in this.total) {
			this.collection = Array.from(this.total["reponse"])
		}
		else {
		this.collection = [ new Img("choix",0,"choix",0,0,100,900/16),
							new Button("reponse",2,"lumiere",50,70,5,5,infini,function () {gui.choicesBox([["Qui est le coupable?"],
							["Rith", function() {if (d < 4.0) {gui.stupidity +=15;d+=1.0} }],
							["Camille", function() {if (d < 4.0) {gui.stupidity +=50;d+=1.0}}],
							["Alexia", function() {if (d < 4.0) {gui.stupidity +=15;d+=1.0}}],
							["Benjamin", function() {if (d < 4.0) {gui.stupidity +=25;d+=1.0}}],
							["Alex", function() {gui.textBox(["[Sasha]","Alex… dis-moi tout. J’attends." ], [], function() {gui.textBox(["[Alex]","Bon, je voulais pas t’en parler car t’es ma pote", "et je voulais pas te blesser. Mais tu", "vois…Camille…" ], [], function() {gui.textBox(["[Alex]","C’est elle qui a appelé les flics à la soirée", "d’hier. C’est à cause d’elle que tu as subi tout ça." ], [], function() {gui.textBox(["[Sasha]","C-Comment ?" ], [], function() {scene.unload("reponse"); scene.souvenir3()})})})})}],
							["Auriane", function() {if (d < 4.0){gui.stupidity +=15;d+=1.0}}]]) })];
							
		this.sort()
		}
	}

	this.ct1= function() {
		if ("ct1" in this.total) {
			this.collection = Array.from(this.total["ct1"])
		}
		else {
		this.collection = [ new Img("ct",0,"ct",0,0,100,900/16),,
							new Button("agression",2,"lumiere",50,50,5,5,infini,function () {gui.textBox(["[Acolyte de la CT]","Parvenue à toi, jaune missile.","Ici tu ne troueras que poix et amochement !" ], [], function() {gui.textBox(["[Acolyte de la CT]","En gros, on perce et tue les traductions :", "fin, bâillon, canasson. Plains-toi à fous !" ], [], function() {gui.textBox(["[Acolyte de la CT]","Jeanne… Jeanne ! Ah cette biche, elle est", "courbe comme un tronc ! Con : accroche,", "ça va être mordant !" ], [], function() {gui.choicesBox([["..."],
							["Euh...avec plaisir?", function() {gui.stupidity +=15; scene.unload("ct1"); scene.ct4()}],
							["Tu peux répéter, s'il te plaît?", function() {gui.stupidity +=30;scene.unload("ct1"); scene.ct2()}]])} )})})} ),
							];
		this.sort()
		}
	}

	this.ct2= function() {
		if ("ct2" in this.total) {
			this.collection = Array.from(this.total["ct2"])
		}
		else {
		this.collection = [ new Img("ct",0,"ct",0,0,100,900/16),,
							new Button("agression",2,"lumiere",50,50,5,5,infini,function () {gui.textBox(["Bienvenue à toi, jaune missile.", "  Ici tu ne troueras que joie et amochement !" ], [], function() {gui.textBox(["[Acolyte de la CT]","En gros, on perce et tue les traditions", "vin, bâillon, canasson. Plains-toi à nous !"], [], function() {gui.textBox([gui.textBox(["[Acolyte de la CT]","Attends : Jeanne ! Ahlala cette quiche,","toujours courbe comme un pot ! Con :", "approche, ça va être mordant !" ]) ], [], function() {gui.choicesBox([["..."],
							["Euh...avec plaisir?", function() {gui.stupidity +=30; scene.unload("ct2"); scene.ct4()}],
							["Tu peux répéter, s'il te plaît?", function() {gui.stupidity +=120;scene.unload("ct2"); scene.ct3()}]])} )})})} ),
							];
		this.sort()
		}
	}

	this.ct3= function() {
		if ("ct3" in this.total) {
			this.collection = Array.from(this.total["ct3"])
		}
		else {
		this.collection = [ new Img("ct",0,"ct",0,0,100,900/16),,
							new Button("agression",2,"lumiere",50,50,5,5,infini,function () {gui.textBox([gui.textBox(["[Acolyte de la CT]","Bienvenue à toi, jeune disciple.", "Ici tu ne trouveras que joie et amusement !" ]) ], [], function() {gui.textBox(["En gros, on perpétue les traditions :", "vin, jambon, saucisson. Joins-toi à nous !" ], [], function() {gui.textBox(["Bon cette fois j’espère qu’elle va entendre." ], [], function() {gui.textBox(["[Acolyte de la CT]","Jeaaaaanne !! Bon bah ça a pas l’air, elle est", "vraiment sourde comme un pot.", "Bon : approche ça va être marrant !" ], [], function() {gui.choicesBox([["..."],
							["Aaaaaah mais oui avec plaisir", function() {gui.stupidity +=20; scene.unload("ct3"); scene.ct4()}]])})} )})})} ),
							];
		this.sort()
		}
	}

	this.ct4= function() {
		if ("ct4" in this.total) {
			this.collection = Array.from(this.total["ct4"])
		}
		else {
		this.collection = [ new Img("ct",0,"ct",0,0,100,900/16),,
							new Button("fete",2,"lumiere",50,50,5,5,infini,function () {gui.textBox(["[Acolyte de la CT]","Et une tournée de saucisson pour tous !" ], [], function() {gui.textBox(["[Acolyte de la CT]","Tu vois, ce saucisson, c’est tout ce qu’il nous reste", "du dernier cochon de promo !" ], [], function() {gui.textBox(["[Sasha]"," Ah… euh… ok..." ], [], function() {gui.textBox(["[Acolyte de la CT]","Coucou toi, tu veux du nectar de jus de raisin ?" ], [], function() {gui.textBox(["[Sasha]","Euh… pourquoi pas ?" ], [], function() {gui.textBox(["[Acolyte de la CT]","Attendez, nous ne devrions pas l’inclure trop", "rapidement dans notre groupe." ], [], function() {gui.textBox(["[Acolyte de la CT]","Elle doit d’abord s’en montrer digne.", "Dis-moi étrangère, saurais-tu nous jouer la lyre ?" ], [], function() {gui.textBox(["*LA LYRE*"], [], function() {scene.unload("ct4"); scene.gastro2()})})})})})})})})} ),
							];
		this.sort()
		}
	}

	this.gastro2= function() {
		if ("gastro2" in this.total) {
			this.collection = Array.from(this.total["gastro2"])
		}
		else {
		this.collection = [ new Img("gastro",0,"gastro",0,0,100,900/16),
							new Button("auriane",2,"auriane",10,80,25,30,infini,function () {gui.textBox(["[Auriane]"," Eh mais t’as vraiment fait des trucs", "de fou toi hier soir." ], [], function() {gui.textBox(["[Sasha]"," En vrai, si ça se trouve,", "j’étais juste en train de délirer." ], [], function() {scene.collection.push(new Img("photosw",5,"photosw",20,0,50,50));gui.textBox(["[Auriane]","Ah au fait, regarde Sasha, c’est une photo", "que j’ai prise hier soir, tu t’en souviens ?" ], [], function() {scene.unload("gastro2"); scene.souvenir7()})})})}),
							];
		this.sort()
		}
	}

	this.chariot1= function() {
		if ("chariot1" in this.total) {
			this.collection = Array.from(this.total["chariot1"])
		}
		else {
		this.collection = [ new Img("chariot",0,"chariot",0,0,100,900/16),
							new Button("chariot1",2,"Vide1",0,0,10,900/16,infini,function () {gui.textBox(["[Alex]","Ah bah c’est pas trop tôt, te revoilà !" ], [], function() {gui.textBox(["[Sasha]","Ouais désolé je m’étais égaré…" ], [], function() {gui.textBox(["[Alex]","Ouais « égaré » bien sûr.", "Disons plutôt que les bras de Camille", "t’ont fait oublier la mif."], [], function() {gui.textBox(["[Camille]","..." ], [], function() {gui.textBox(["[Sasha]","..." ], [], function() {gui.textBox(["[Alex]","Enfin brrrrrref, l’heure tourne, c’est le moment !", "Benjamin m’a dit qu’il était prêt."], [], function() {gui.textBox(["[Benjamin]","Heeeey ! Salut les potos !", "Prêts à consommer activement de l’étoile de Mario ?!"], [], function() {gui.textBox(["[Alex]","Alllllez!"], [], function() {scene.unload("chariot1"); scene.chariot2()})})} )})})})})})} ),
							];
		this.sort()
		}
	}
	
	this.chariot2= function() {
		if ("chariot2" in this.total) {
			this.collection = Array.from(this.total["chariot2"])
		}
		else {
		this.collection = [ new Img("chariottrip",0,"chariottrip",0,0,100,900/16),
							new Button("chariot2",2,"licorne",80,50,50,40,infini,function () {gui.choicesBox([["Voulez-vous chevaucher la licorne magique?"],
							["Bien sûr", function() {gui.stupidity +=20;gui.textBox(["[Sasha, Camille, Alex, Benjamin]", "WIIIIIIIIIII"], [], function() {scene.unload("chariot2"); scene.chariot3()})}],
							["Naturellement", function() {gui.stupidity +=40 ; gui.textBox(["[Sasha, Camille, Alex, Benjamin]", "WIIIIIIIIIII"], [], function() {scene.unload("chariot2"); scene.chariot3()})}],
							["Puisque c'est proposé si gentiment", function() {gui.stupidity +=60; gui.textBox(["[Sasha, Camille, Alex, Benjamin]", "WIIIIIIIIIII"], [], function() {scene.unload("chariot2"); scene.chariot3()})}],
							["Oui en faisant l'ATR", function() {gui.stupidity +=120; gui.textBox(["[Sasha, Camille, Alex, Benjamin]", "WIIIIIIIIIII"], [], function() {scene.unload("chariot2"); scene.chariot3()})}]])})];
		this.sort()
		}
	}


	this.chariot3= function() {
		if ("chariot3" in this.total) {
			this.collection = Array.from(this.total["chariot3"])
		}
		else {
		this.collection = [ new Img("foret5",0,"foret5",0,0,100,900/16),
							new Button("chute",2,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["AAAAAAHAAH"], [], function() {scene.collection.push(new Img("camille4",5,"camille4",30,0,45,45));gui.textBox(["[Sasha]","Camille !" ], [], function() {gui.textBox(["[Camille]","Sasha… putain Sasha !" ], [], function () {gui.textBox(["[Sasha]","Q-quoi ?" ], [], function() {scene.collection.push(new Img("camille5",5,"camille5",30,0,45,45));supprime("camille4");gui.textBox(["[Camille]"," Pourquoi il a fallu que tu fouilles mon tél ?! " ], [], function() {supprime("camille5");scene.collection.push(new Img("camille6",5,"camille6",30,0,45,45));gui.textBox(["[Camille]", "...", [], function() {scene.unload("chariot3"); scene.jardinr()}])})})})})})} ),
							];
		this.sort()
		}
	}

	this.porte3= function() {
		if ("porte3" in this.total) {
			this.collection = Array.from(this.total["porte3"])
		}
		else {
		this.collection = [ new Img("porte",0,"porte",0,0,100,900/16),
							new Button("alex",2,"alex1",68,48,15,20,1,function () {gui.textBox(["[Alex]","Alors Sasha, toujours pas tes clés?","Oh merde t’es dans un sale état !"], [], function() {gui.textBox(["[Sasha]","Ouais je sais,", "t’aurais des fringues de rechange pour moi ?"], [], function() {gui.textBox(["[Alex]","Ouais bien sûr, sers-toi." ], [], function() {gui.textBox(["[Sasha]","Ah on se sent mieux. Merci, Alex.", "Par contre, cette soirée a de moins en moins", "de sens. Tu pourrais me faire un résumé ?"], [], function() {gui.textBox(["[Alex]","Ouais… mais euh… nan… je m’en souviens pas trop…", "ouais c’est ça je suis en plein black hole…", "les étoiles de Mario tu vois…" ], [], function() {gui.textBox(["[Sasha]","Mais à quoi tu sers, Alex ! Bon… tant pis…", "je vais continuer ma quête de souvenirs","avec ou sans toi." ], [], function() {gui.textBox(["[Sasha]","Réfléchissons. Le pull-up a eu lieu", " au bassin des Anglais. Peut-être que je peux", "choper des infos là-bas." ], [], function() {scene.unload("porte3"); scene.bassin1()})})})})})})})})];
		this.sort()
		}
	}

	this.jardinr= function() {
		if ("jardinr" in this.total) {
			this.collection = Array.from(this.total["jardinr"])
		}
		else {
		this.collection = [ new Img("jardin0",0,"jardin0",0,0,100,900/16),
							new Button("vporte3",2,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["[Sasha]","De plus en plus étrange…Camille m’aurait trahi ?", "Ou je l’aurais trahie ?" ], [], function() {gui.textBox(["[Sasha]","Et puis c’est quand même fort de finir deux fois", "trempée en un laps de temps aussi restreint…", "Je vais demander à Alex de quoi me changer."], [], function() {scene.unload("jardinr"); scene.porte3()})})})];
		this.sort()
		}
	}

	this.bassin1= function() {
		if ("bassin1" in this.total) {
			this.collection = Array.from(this.total["bassin1"])
		}
		else {
		this.collection = [ new Img("bassin1",0,"bassin1",0,0,100,900/16),
							new Button("vbassin2",2,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["[Sasha]","Voyons si je peux trouver quelque chose", "pour m’aider à me souvenir de ma soirée…" ], [], function () {gui.textBox(["[Sasha]","Oh, ils ont décroché les drapeaux… mais qui a fait ça ?", "Je devrais peut-être les remettre en place." ], [], function() {scene.unload("bassin1"); scene.bassin2()})})} )];
		this.sort()
		}
	}

	this.bassin2= function() {
		if ("bassin2" in this.total) {
			this.collection = Array.from(this.total["bassin2"])
		}
		else {
		this.collection = [ new Img("bassin2",0,"bassin2",0,0,100,900/16),
							new Chest("ch3st10", 1, "coffre", 50,10,8,8),
							new Chest("ch3st11", 1, "coffre", 35,50,8,8),
							new Chest("ch3st12", 1, "coffre", 72,50,8,8),
							new Chest("ch3st13", 1, "coffre", 50,65,8,8),
							new Collectible("intersexe", 10, "intersexe",5,5,5,5),
							new Collectible("pansexuel", 10, "pansexuel",5,15,5,5),
							new Collectible("asexuel", 10, "asexuel",5,25,5,5),
							new Collectible("polyamour", 10, "polyamour",5,35,5,5),
							new Button("dasexuel",2,"lumiere",50,20,5,5,infini,function () {gui.textBox(["Asexualité","Fascé de sable, d’acier, d’argent et de pourpre de quatres pièces." ])} ),
							new Button("dintersexe",2,"lumiere",35,60,5,5,infini,function () {gui.textBox(["Intersexe","D’or à un anneau pourpre." ])} ),
							new Button("dpolyamour",2,"lumiere",72,60,5,5,infini,function () {gui.textBox(["Polyamour","Tiercé en fasce d’azur, de gueules et de sable", "à une constante  d’archimède d’or." ])} ),
							new Button("dpansexuel",2,"lumiere",50,75,5,5,infini,function () {gui.textBox(["Pansexualité","Tiercé en fasce de pourpre, d’or et d’azur." ])} ),
							new Button("valider",3,"valider", 90,10,5,5, infini, function () {var ar=[null, null, null, null];
								for (i=0; i<scene.collection.length; i++) {
									var elt= scene.collection[i];
									if (elt.id=="ch3st10") {
										if (elt.slot==null) {
											ar[0]=null}
										else {ar[0]=elt.slot.id}
									}
									if (elt.id=="ch3st11") {
										if (elt.slot==null) {
											ar[1]=null}
										else {ar[1]=elt.slot.id} 
									}
									if (elt.id=="ch3st12") {
										if (elt.slot==null) {
											ar[2]=null} 
										else {ar[2]=elt.slot.id}
									}
									if (elt.id=="ch3st13") {
										if (elt.slot==null) {
											ar[3]=null} 
										else {ar[3]=elt.slot.id}
									}
								}
								console.log(ar);
								if (ar==["asexuel", "intersexe", "asexuel", "polyamour"]) {gui.textBox(["[Sasha]","Hmm il me semble qu’AgroParisPride a laissé des paillettes", "dans le coin. Je me demande où elles peuvent être..." ], [], function () {scene.unload("bassin2"); scene.bassin3()})}
								else {if (c<15) {gui.stupidity+=3; c+=1}}
								})];
		this.sort()
		}
	}

	this.bassin3= function() {
		if ("bassin3" in this.total) {
			this.collection = Array.from(this.total["bassin3"])
		}
		else {
		this.collection = [ new Img("bassin3",0,"bassin3",0,0,100,900/16),
							new Button("vsouvenir2",2,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["[Sasha]","Ah les voilà !" ], [], function () {gui.textBox(["[Sasha]","Tiens ça me rappelle..."], [], function() {scene.unload("bassin3"); scene.souvenir2()})}) }),
							];
		this.sort()
		}
	}

	this.U3= function() {
		if ("U3" in this.total) {
			this.collection = Array.from(this.total["U3"])
		}
		else {
		this.collection = [ new Img("U",0,"U",0,0,100,900/16),
							new Button("vgastro1",2,"Vide1",70,90,5,5,infini,function () {gui.textBox(["[Sasha]","Définitivement, cette soirée n’a eu aucun sens." ], [], function () {gui.textBox(["[Auriane]","Bon Sasha, maintenant plus d'excuses,", "tu viens m’aider pour le pain." ], [], function() {gui.textBox(["[Sasha]","Bon ok j’arrive." ], [], function() {scene.unload("U3"); scene.gastro1()})})})} ),
							];
		this.sort()
		}
	}

	this.gastro1= function() {
		if ("gastro1" in this.total) {
			this.collection = Array.from(this.total["gastro1"])
		}
		else {
		this.collection = [ new Img("gastro",0,"gastro",0,0,100,900/16),
							new Button("auriane",2,"auriane",50,60,15,20,infini,function () {gui.textBox(["[Auriane]","Oh c’est pas vrai…" ], [], function() {gui.textBox(["[Sasha]","Qu’est-ce qu’il se passe ?" ], [], function() {gui.textBox(["[Auriane]","J’ai tout mélangé… je retrouve plus le pain aux noix,", "c’était le seul qu’il me restait en un seul exemplaire en plus…" ], [], function() {gui.textBox(["[Sasha]","Mais attends on va arranger ça, je vais t’aider." ], [], function() {gui.textBox(["[Sasha]","Bien, si j’ai bien compris " ], [], function() {scene.unload("gastro1"); scene.enigmepain()})})})})})} ),
							];
		this.sort()
		}
	}

	this.enigmepain= function() {
		if ("enigmepain" in this.total) {
			this.collection = Array.from(this.total["enigmepain"])
		}
		else {
		this.collection = [ new Img("enigmepain",0,"enigmepain",0,0,100,900/16),
							new Button("enigme",5,"Vide1",0,0,100,900/16,infini,function () {gui.textBox(["[Sasha]","Je dois trouver un pain qui n’existe qu’en", "UN SEUL exemplaire parmi des pains qui", "vont par PAIRES." ], [], function() {supprime("enigme")})} ),
							new Button("pain",2,"pain",50,65,10,10,infini,function () {gui.textBox(["[Auriane]","Oh Sasha, merci infiniment !", "Le club Ko-pain a accompli", "sa mission du jour grâce à toi ! " ], [], function() {gui.textBox(["[Sasha]","Face à ce dur labeur, je crois", "qu’une petite pause s’impose !" ], [], function() {gui.textBox(["[Auriane]","L’autre jour je suis passé à la ferme et", "j’ai acheté un petit saucisson", "aux herbes dont tu me diras des nouvelles !" ], [], function() {gui.textBox(["[Sasha]","Mais il est trop bon ton saucisson !", " Aussi bon que celui que j’ai mangé à la CT hier !" ], [], function() {gui.textBox(["[Auriane]","Tu as mangé du saucisson à la CT hier ?" ], [], function() {gui.textBox(["[Sasha]"," Bah… je crois bien…" ], [], function() {scene.unload("enigmepain"); scene.souvenir4()})})})})})})} ),
							];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
		this.sort()
		}
	}

	this.amphi= function() {
		if ("amphi" in this.total) {
			this.collection = Array.from(this.total["amphi"])
		}
		else {
		this.collection = [ new Img("amphi",0,"amphi",0,0,100,900/16),
							new Button("vamphiamphitheatre",2,"lumiere",70,90,5,5,infini,function () {scene.unload("amphi"); scene.amphitheatre()} ),
							new Button("vamphicasier",2,"lumiere",30,50,5,5,infini,function () {scene.unload("amphi"); scene.casier1()} ),
							new Collectible("banane", 10, "banane",50,80,10,10)];
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
							new Button("vporteserrejardin0",2,"lumiere",80,20,5,5,infini,function () {scene.unload("porteserre"); scene.jardin0()}) ,
							new Door("Porteferme", 1, ["Vide1","Vide1"],0,0,100,900/16,"cleserre", function() {scene.unload("porteserre"); scene.serre0()}) ];
		this.sort()
		}
	}

	this.Kvo1= function() {
		if ("Kvo1" in this.total) {
			this.collection = Array.from(this.total["Kvo1"])
		}
		else {
		this.collection = [ new Img("Kvo1",0,"Kvo1",0,0,100,900/16),
							new Button("Kvo12",1,"lumiere",70,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo2()}), 
							new Button("Kvo18",1,"lumiere",20,60,5,5,infini,function () {scene.unload("Kvo1"); scene.Kvo8()} ),
							new Button("idee",1,"lumiere",20,50,5,5,infini,function () {gui.textBox(["Pour faire un bon Sex On The Beach", "on ajoute la vodka, puis le jus", "de canneberges, puis le jus d'ananas dans le verre."])}), 
							new Door("verre1", 1, ["verre","verre"],60,60,15,15,"jus1", function() {supprime("verre1");scene.collection.push(new Door("verre2", 1, ["verre","verre"],60,60,15,15,"jus3", function() {supprime("verre3");scene.collection.push(new Door("verre3", 1, ["verre","verre"],60,60,15,15,"jus2", function() {supprime("verre3");scene.collection.push(new Collectible("cocktail", 10, "cocktail",60,60,15,15))}))}))})];
		this.sort()
		}
	}

	this.Kvo2= function() {
		if ("Kvo2" in this.total) {
			this.collection = Array.from(this.total["Kvo2"])
		}
		else {
		this.collection = [ new Img("Kvo2",0,"Kvo2",0,0,100,900/16),
							new Button("Kvo21",1,"lumiere",10,95,5,5,infini,function () {scene.unload("Kvo2"); scene.Kvo1()}), 
							new Button("Kvo23",1,"lumiere",80,75,5,5,infini,function () {scene.unload("Kvo2"); scene.Kvo3()}),
							new Chest("ch3st9", 1, "coffre", 70,50,5,5),
							new Button("Sophie",1,"sophie1",50,50,15,20,infini,function () {var rc=[null];
								for (i=0; i<scene.collection.length; i++) {
									var elt= scene.collection[i];
									if (elt.id=="ch3st9") {
										if (elt.slot==null) {
											rc[0]=null}
										else {rc[0]=elt.slot.id}
									}
								}
								if (rc[0]=="cocktail") {gui.textBox(["[Petite grande fille]","Oh oui, mon cocktail ! Tiens ", "en échange je t’offre cette clé. Comme ça tu pourras ouvrir", "les toilettes. Le vieux s’est enfermé dedans.", [], function() {supprime("Sophie");scene.collection.push(new Collectible("cletoilettes", 10, "key",50,50,5,5))} ])}
								else {gui.textBox(["[Petite grande fille]","Salut toi !" ], [], function() {gui.textBox(["[Sasha]","Bonjour… dis-moi, tu n’aurais pas vu", "un vieil homme passer ici ?" ], [], function() {gui.textBox(["[Petite grande fille]","Bien sûr !" ], [], function() {gui.textBox(["[Sasha]","Et tu peux me dire où il est ?" ], [], function() {gui.textBox(["[Petite grande fille]","Ah non ! D’abord tu dois faire", "quelque chose pour moi !" ], [], function() {gui.textBox(["[Sasha]","j’aurais dû m’en douter.", "Qu’est-ce que tu veux ?" ], [], function() {gui.textBox(["[Petite grande fille]","S’il vous plaît, fais-moi un cocktail !" ], [], function() {gui.textBox(["[Sasha]","Pardon ? Mais genre t’as quel âge pour me demander ça ?" ], [], function() {gui.textBox(["[Petite grande fille]","Bah 20 ans pourquoi ? Bon si tu veux pas", "me faire mon cocktail bah je t’aiderai pas, nah !" ], [], function (){gui.textBox(["[Sasha]","Ok, ça va j’ai compris !" ])})})})})})})})})})}
							})];
		this.sort()
		}
	}

	this.Kvo3= function() {
		if ("Kvo3" in this.total) {
			this.collection = Array.from(this.total["Kvo3"])
		}
		else {
		this.collection = [ new Img("Kvo3",0,"Kvo3",0,0,100,900/16),
							new Button("Kvo32",1,"lumiere",80,90,5,5,infini,function () {scene.unload("Kvo3"); scene.Kvo2()}), 
							new Button("Kvo34",1,"lumiere",10,90,5,5,infini,function () {scene.unload("Kvo3"); scene.Kvo4()}),
							new Button("Kvo35",1,"lumiere",50,40,5,5,infini,function () {scene.unload("Kvo3"); scene.Kvo5()},
							new Button("Kvo37",1,"lumiere",65,60,5,5,infini,function () {scene.unload("Kvo3"); scene.Kvo7()}) )];
		this.sort()
		}
	}

	this.Kvo4= function() {
		if ("Kvo4" in this.total) {
			this.collection = Array.from(this.total["Kvo4"])
		}
		else {
		this.collection = [ new Img("Kvo4",0,"Kvo4",0,0,100,900/16),
							new Button("Kvo43",1,"lumiere",15,90,5,5,infini,function () {scene.unload("Kvo4"); scene.Kvo3()}),
							new Collectible("jus1", 10, "jus1",60,50,10,10)];
		this.sort()
		}
	}

	this.Kvo5= function() {
		if ("Kvo5" in this.total) {
			this.collection = Array.from(this.total["Kvo5"])
		}
		else {
		this.collection = [ new Img("Kvo5",0,"Kvo5",0,0,100,900/16),
							new Button("Kvo53",1,"lumiere",5,50,5,5,infini,function () {scene.unload("Kvo5"); scene.Kvo3()}), 
							new Button("Kvo56",1,"lumiere",95,95,5,5,infini,function () {scene.unload("Kvo5"); scene.Kvo8()} )];
		this.sort()
		}
	}

	this.Kvo6= function() {
		if ("Kvo6" in this.total) {
			this.collection = Array.from(this.total["Kvo6"])
		}
		else {
		this.collection = [ new Img("Kvo6",0,"Kvo6",0,0,100,900/16),
							new Button("Kvo65",1,"lumiere",20,80,5,5,infini,function () {scene.unload("Kvo6"); scene.Kvo5()}), 
							new Button("Kvo610",1,"lumiere",68,80,5,5,infini,function () {scene.unload("Kvo6"); scene.Kvo10()} )];
		this.sort()
		}
	}

	this.Kvo7= function() {
		if ("Kvo7" in this.total) {
			this.collection = Array.from(this.total["Kvo7"])
		}
		else {
		this.collection = [ new Img("Kvo7",0,"Kvo7",0,0,100,900/16),
							new Button("Kvo73",1,"lumiere",90,90,5,5,infini,function () {scene.unload("Kvo7"); scene.Kvo2()} ),
							new Collectible("jus2", 10,"jus2",10,90,10,10)];
		this.sort()
		}
	}

	this.Kvo8= function() {
		if ("Kvo8" in this.total) {
			this.collection = Array.from(this.total["Kvo8"])
		}
		else {
		this.collection = [ new Img("Kvo8",0,"Kvo8",0,0,100,900/16),
							new Button("Kvo81",3,"lumiere",90,90,5,5,infini,function () {scene.unload("Kvo8"); scene.Kvo1()}), 
							new Door("Portetoilettes", 1, ["Vide1","Vide1"],0,0,100,900/16,"cletoilettes", function() {scene.unload("Kvo8"); scene.Kvo9()}) ];
		this.sort()
		}
	}

	this.Kvo9= function() {
		if ("Kvo9" in this.total) {
			this.collection = Array.from(this.total["Kvo9"])
		}
		else {
		this.collection = [ new Img("Kvo9",0,"Kvo9",0,0,100,900/16),
							new Button("vieux",2,"vieux",50,50,50,60,infini,function () {gui.textBox(["[[Vieil homme]","Ah, tu m’as retrouvé ! Je disais donc…", "je sais que tu as mené une grande", "bataille la nuit dernière. " ], [], function() {gui.textBox(["[[Vieil homme]","Pendant trop longtemps, nos ennemis,", "cruels, ont souillé les terres de Grignon." ], [], function() {gui.textBox(["[[Vieil homme]","Mais pour te souvenir de cet affrontement,", "il te faudra fouiller les archives", "cachées sous l’amphithéâtre." ], [], function () {gui.textBox(["[[Vieil homme]","Bon nombre de tes questions trouveront ainsi", "leur réponse." ], [], function() {scene.unload("Kvo9"); scene.archive1()})})})})})];
		this.sort()
		}
	}

	this.Kvo10= function() {
		if ("Kvo10" in this.total) {
			this.collection = Array.from(this.total["Kvo10"])
		}
		else {
		this.collection = [ new Img("Kvo10",0,"Kvo10",0,0,100,900/16),
							new Button("Kvo106",1,"lumiere",95,95,5,5,infini,function () {scene.unload("Kvo10"); scene.Kvo6()} )];
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
//Pour input, new Button("vcarriere12",1,"lumiere",5,30,10,10,infini,function () {gui.inputBox("Bite",5(nb d'essais),["teub","zob"],function () {scene.unload("carriere1"); scene.carriere2()}
//2Musique/1 Objet case/ 3Objet Simon
//gui.slots[0à4]=new....
//scene.collection=scene.collection.concat([new Collectible]);
		//scene.sort()
//new Chest("chest", -1000, "simon_red", 40,40,30,30,function (name) {if (name == "simplekey") {console.log('loul')
//var ar=[null, null, null, null, null, null, null, null, null]
//for (i=0; i<scene.collection.length; i++) {
	//var elt= scene.collection[i];
	//if (elt.id=="ch3st0") {
		//if (elt.slot==null) {
			//ar[0]=null
		//} else {ar[0]=elt.slot.id}
	//}
//}
//if (ar==[]) {scene.unload("scene actuelle"); scene.scenenouvelle()}

//Supprimer Objet var newcollec =Array.from(scene.collection);
	//for (i=0; i<scene.collection.length; i++) {
		//var elt= scene.collection[i]; 
		//if (elt.id=="ch3st0") {
			//newcollec=arrayRemove(newcollec,elt)
		//}
	//}
//scene.collection=Array.from(newcollec)
//gui.textBox([],[], function() {}) pour le son
//Musique gui.playsound("")