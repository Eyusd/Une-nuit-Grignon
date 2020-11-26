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
		if (mouse.click == true && mouse.state == 'down' && recthitbox(this.x,this.y,mouse.x,mouse.y,this.width,this.height)) {
			console.log('clicked');
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
		}
		if (mouse.state == 'up' && this.drag == 'onDrag') {
			this.drag = 'released';
			mouse.drag = ['released', this.id]
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
	this.oncomplete = oncomplete;
	this.listinputs = listinputs;
	this.mode = 'robot';
	this.size = canvas.height*0.3;
	this.offset = canvas.height/9.0;
	this.x = canvas.width*0.28125;
	this.y = canvas.height/9.0;
	this.colors1 = ["rgb(0,0,200)","rgb(0,200,0)",'rgb(200,0,0)',"rgb(200,200,0)"];
	this.colors2 = ["rgb(0,0,255)","rgb(0,255,0)","rgb(255,0,0)","rgb(255,255,0)"];
	this.ordiindex = -1;
	this.humanindex = -1;
	scene.pause = true;

	this.robotturn = function () {
		this.ordiindex = 0;
		var d = 0;
		d++;
		var i = this.listinputs[this.ordiindex];
		c.fillStyle = this.colors2[i];
		c.fillRect(this.x+(i%2)*(this.size+this.offset), this.y+(i/2)*(this.size+this.offset),this.size,this.size));
		if (d%2000 == 0) {
			this.ordiindex++
			if (this.ordiindex > this.humanindex) {
				this.mode = 'human';
			}
		}

	}

	this.humanturn = function () {
		this.humanindex = 0;
		while (this.humanindex <= this.ordiindex) {
			for (i=0; i<4; i++) {
				if (recthitbox(this.x+(i%2)*(this.size+this.offset), this.y+(i/2)*(this.size+this.offset),mouse.x,mouse.y,this.size,this.size)) {
					if (mouse.click == true && mouse.state == 'down') {
						c.fillStyle = this.colors2[i];
						c.fillRect(this.x+(i%2)*(this.size+this.offset), this.y+(i/2)*(this.size+this.offset),this.size,this.size));

						if (this.listinputs[this.humanindex] == i) {
							this.humanindex++
						}
					}
				}
			}
		}
		if (this.humanindex == this.listinputs.length) {this.oncomplete()}
		else {this.mode = 'robot'}
	}

	this.draw = function () {
		for (i=0;i<4,i++) {
			c.fillStyle = this.colors1[i];
			c.fillRect(this.x+(i%2)*(this.size+this.offset), this.y+(i/2)*(this.size+this.offset),this.size,this.size));
		}
		if (this.mode == 'robot') {this.robotturn()}
		if (this.mode == 'human') {this.humanturn()}
	}
}