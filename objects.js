function dist (x1, y1, x2, y2) {return Math.hypot(x1-x2,y1-y2)}
function circlehitbox(elt1x, elt1y, elt2x, elt2y, radius) {return dist(elt1x,elt1y,elt1x,elt2y) < radius}
function recthitbox(elt1x,elt1y,elt2x,elt2y,w,h) {return ((elt1x<elt2x) && (elt1y<elt2y) && (elt2x<elt1x+w) && (elt2y<elt1y+h))}
function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}


function Button (id, depth, src, x, y, width, height, clickable, onclick) {

	this.depth = depth;
	this.id = id;
	this.src = src;
	this.x = x*canvas.width/100;
	this.y = y*canvas.height/100;
	this.width = width*canvas.width/100;
	this.height = height*canvas.height*16/900;
	this.clickable = clickable;
	this.clicktimes = 0;

	this.img = document.getElementById(src);

	this.draw = function() {
		c.drawImage(this.img,this.x,this.y,this.width,this.height)
	}

	this.resize = function() {
		this.x = x*canvas.width/100;
		this.y = y*canvas.height/100;
		this.width = width*canvas.width/100;
		this.height = height*canvas.height*16/900;
	}

	this.clickcheck = function() {
		if (mouse.state == 'down') {console.log('sbrah')}
		if (mouse.click && mouse.state == 'down' && recthitbox(this.x,this.y,mouse.x,mouse.y,this.width,this.height)) {
			onclick();
		}
	}

	this.update = function() {
		this.clickcheck();
		this.draw()
	}
}

function Door (id, depth, imgs, x, y, width, height, key, onopen) {

	this.depth = depth;
	this.id = id;
	this.key = key;
	this.x = x*canvas.width/100;
	this.y = y*canvas.height/100;
	this.width = width*canvas.width/100;
	this.height = height*canvas.height*16/900;
	this.state = 0;
	this.onopen = onopen;
	this.imgs = imgs;
	this.img = document.getElementById(this.imgs[this.state]);

	this.draw = function() {
		c.drawImage(this.img,this.x,this.y,this.width,this.height)
	}

	this.resize = function() {
		this.x = x*canvas.width/100;
		this.y = y*canvas.height/100;
		this.width = width*canvas.width/100;
		this.height = height*canvas.height*16/900;
	}

	this.keyopen = function() {
		if (mouse.drag[0] == ['released'] && mouse.drag[1] == [this.key] && recthitbox(this.x,this.y,mouse.x,mouse.y,this.width, this.height)) {
			console.log('tick');
			mouse.drag = ['idle', ""];
			this.state = 1;
			this.onopen();
			for (i=0; i<scene.collection.length; i++) {if (scene.collection[i].id == this.key) {delete scene.collection[i]}}
			scene.collection = Array.from(scene.collection.filter(x => true))
		}
	}

	this.update = function() {
		if (this.state == 0) {
			this.keyopen()
		}

		this.img = document.getElementById(this.imgs[this.state]);
		this.draw()
	}
}

function Img (id, depth, src, x, y ,width, height) {
	this.id = id;
	this.depth = depth;
	this.src = src;
	this.x = x*canvas.width/100;
	this.y = y*canvas.height/100;
	this.width = width*canvas.width/100;
	this.height = height*canvas.height*16/900;

	this.img = document.getElementById(this.src);

	this.resize = function() {
		this.x = x*canvas.width/100;
		this.y = y*canvas.height/100;
		this.width = width*canvas.width/100;
		this.height = height*canvas.height*16/900;
	}

	this.draw = function() {
		c.drawImage(this.img,this.x,this.y,this.width,this.height)
	}

	this.update = function() {
		this.draw()
	}
	
}


function Collectible (id, depth, img, x, y, width, height) {

	this.depth = depth;
	this.id = id;
	this.x = x*canvas.width/100;
	this.y = y*canvas.height/100;
	this.src = img;
	this.width = width*canvas.width/100;
	this.height = height*canvas.height*16/900;

	this.img = document.getElementById(img);

	this.drag = 'idle';

	this.dragcheck = function() {
		if (this.drag == 'released') {this.drag = 'idle'; mouse.drag = ['idle', ""]}
		if (mouse.click == true && mouse.state == 'down' && recthitbox(this.x,this.y,mouse.x,mouse.y,this.width, this.height)) {
			this.drag = 'onDrag';
			mouse.drag = ['onDrag', this.id]
			mousetemp.drag = ['onDrag', this.id]
		}
		if (mouse.state == 'up' && this.drag == 'onDrag') {
			this.drag = 'released';
			mouse.drag = ['released', this.id]
			mousetemp.drag = ['released', this.id]
			
		}
	}

	this.draw = function() {
		c.drawImage(this.img,this.x,this.y,this.width,this.height)
	}

	this.resize = function() {
		this.x = x*canvas.width/100;
		this.y = y*canvas.height/100;
		this.width = width*canvas.width/100;
		this.height = height*canvas.height*16/900;
	}

	this.idle = function() {
	}

	this.ondrag = function() {
		this.x = mouse.x-this.width/2;
		this.y = mouse.y-this.height/2;
	}

	this.released = function() {
		for (i=0; i<gui.l; i++) {
			if (recthitbox((canvas.width-gui.l*gui.size)/2+i*gui.size, (canvas.height-gui.size)*0.9, mouse.x, mouse.y, gui.size, gui.size)) {
				mouse.drag = ['idle', ""];
				mousetemp.drag = ['idle', ""];
				this.drag = 'idle';
				gui.slots[i] = this;
				var newcollec = arrayRemove(scene.collection, this);
				scene.collection =  newcollec
				break;
			}
		}
	}

	this.update = function() {
		this.dragcheck();
		switch (this.drag) {
			case 'onDrag':
				this.ondrag();
				break;
			
			case 'idle':
				this.idle();
				break;

			case 'released':
				this.released();
				break;
		}
		this.draw();
	}
}

function Chest (id, depth, img, x, y, width, height) {

	this.depth = depth;
	this.id = id;
	this.x = x*canvas.width/100;
	this.y = y*canvas.height/100;
	this.src = img;
	this.width = width*canvas.width/100;
	this.height = height*canvas.height*16/900;
	this.img = document.getElementById(img);
	this.slot = null;

	this.draw = function () {
		c.drawImage(this.img,this.x,this.y,this.width,this.height);
		if (this.slots !== null) {
			c.drawImage(this.slot.img,this.x, this.y, this.width, this.height)
		}
	}

	this.clickcheckinv = function () {
		if (this.slot !== null && mouse.click == true && mouse.state == 'down' && recthitbox(this.x,this.y,mouse.x,mouse.y,this.width, this.height)) {
			this.slot.drag = 'onDrag';
			scene.collection.push(this.slot);
			scene.sort();
			this.slot = null;
		}
	}

	this.update = function () {
		this.clickcheckinv();
		this.draw()
	}

	this.resize = function() {
		this.x = x*canvas.width/100;
		this.y = y*canvas.height/100;
		this.width = width*canvas.width/100;
		this.height = height*canvas.height*16/900;
	}
}

function Simon (listinputs, oncomplete) {
	
	this.id = "simon_obj";
	this.listinputs = listinputs;
	this.oncomplete = oncomplete;
	this.trutharray = [false,false,false,false];
	this.d = 0;
	this.index = 0;
	this.showcurseur = 0;
	this.usercurseur = 0;
	this.buttons = [null,null,null,null];
	this.colors1 = ["simon_red","simon_yellow","simon_green","simon_blue"];
	this.colors2 = ["simon_red_clear","simon_yellow_clear","simon_green_clear","simon_blue_clear"];
	scene.pause = true;

	this.init = function () {
		for (i=0;i<scene.collection.length;i++) {
			if (scene.collection[i].id == "simon_button_xxx_1") {this.buttons[0] = scene.collection[i]}
			if (scene.collection[i].id == "simon_button_xxx_2") {this.buttons[1] = scene.collection[i]}
			if (scene.collection[i].id == "simon_button_xxx_3") {this.buttons[2] = scene.collection[i]}
			if (scene.collection[i].id == "simon_button_xxx_4") {this.buttons[3] = scene.collection[i]}
		}
	}
	this.draw = function () {
		if (this.buttons[0] !== null) {
			if (this.d == 0) {this.buttons[this.listinputs[this.showcurseur]].img = document.getElementById(this.colors2[i])}
			if (this.d == 100) {for (i=0;i<4;i++) {this.buttons[i].img = document.getElementById(this.colors1[i])}}
			if (this.d > 150) {
				if (this.showcurseur <= this.index) {this.showcurseur++}
				else {console.log("switched to human"); this.d = 0; this.showcurseur = 0; scene.pause = false}
			}
			this.d++
		}
	}

	this.resize = function () {}

	this.update = function () {
		if (mouse.click) {
			for (i=0;i<4;i++) {
				if (this.trutharray[i]) {
					console.log(i);
					this.buttons[i].img = document.getElementById(this.colors2[i]);
					if (this.listinputs[this.usercurseur] == i) {
						if (this.usercurseur >= this.index) {
							this.usercurseur = 0;
							this.index ++;
							scene.pause = false;
							if (this.index >= this.listinputs.length) {this.oncomplet()}
						} else {this.index = 0; this.showcurseur = 0; this.usercurseur = 0}
					}
				}
			}
		}
	}
}

function generateSimon(listinputs, oncomplete) {
	var check = true;
	for (i=0;i<scene.collection.length;i++) {
		if (scene.collection[i].id == "simon_button_xxx_1") {check = false}
	}
	if (check) {
		var r = [new Button("simon_button_xxx_1", 100, "simon_red",4,290/9,20,20,2**64-1,function () {console.log("clicked"); for (i=0;i<scene.collection.length;i++) {if (scene.collection[i].id == "simon_obj") {scene.collection[i].trutharray[1] = true}}}),
				new Button("simon_button_xxx_2", 100, "simon_yellow",28,290/9,20,20,2**64-1,function () {for (i=0;i<scene.collection.length;i++) {if (scene.collection[i].id == "simon_obj") {scene.collection[i].trutharray[2] = true}}}),
				new Button("simon_button_xxx_3", 100, "simon_green",52,290/9,20,20,2**64-1,function () {for (i=0;i<scene.collection.length;i++) {if (scene.collection[i].id == "simon_obj") {scene.collection[i].trutharray[3] = true}}}),
				new Button("simon_button_xxx_4", 100, "simon_blue",76,290/9,20,20,2**64-1,function () {for (i=0;i<scene.collection.length;i++) {if (scene.collection[i].id == "simon_obj") {scene.collection[i].trutharray[4] = true}}}),
				new Simon(listinputs, oncomplete)]
		return r
	}

}

function initSimon() {
	for (i=0;i<scene.collection.length;i++) {if (scene.collection[i].id == "simon_obj") {scene.collection[i].init()}}
}