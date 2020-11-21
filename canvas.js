console.log('Starting...');

/// Canvas Setup
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (window.innerWidth/window.innerHeight < 16/9) {
	canvas.width = window.innerWidth;
	canvas.height = canvas.width * 9/16
} 
else {
	canvas.height = window.innerHeight;
	canvas.width = canvas.height*16/9
}
var c = canvas.getContext('2d');
var style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";

/// Mouse elements
var mouse = {
	x: 0,
	y: 0,
	state: "up",
	click: false,
	drag: ['idle', ""]
}

window.addEventListener('mousemove', function(event) {mouse.x = event.x; mouse.y = event.y;});
window.addEventListener('mousedown', function(event) {mouse.state = 'down'; mouse.click = true; mouse.x = event.x; mouse.y = event.y;});
window.addEventListener('mouseup', function(event) {mouse.state = 'up'; mouse.click = false; mouse.x = event.x; mouse.y = event.y;});
window.addEventListener('resize', function() {
	if (window.innerWidth/window.innerHeight < 16/9) {
		canvas.width = window.innerWidth;
		canvas.height = canvas.width * 9/16
	} 
	else {
		canvas.height = window.innerHeight;
		canvas.width = canvas.height*16/9
	}
	resize() });

/// Tri Fusion
function fusionner(t1, t2) {  
	var i = 0, j = 0, k = 0;
	var n = t1.length, m = t2.length;
	var t = new Array(n+m);

	while (i < n && j < m) {if (t1[i].depth < t2[j].depth) {t[k] = t1[i];i++;} else {t[k] = t2[j];j++;} k++;}  
	while (i < n) {t[k] = t1[i];i++;k++;}  
	while (j < m) {t[k] = t2[j];j++;k++;}  
	return t;
}
  
function trier(t) {  
 	var n = t.length;  
 	var t1, t2;  
	if (n == 0 || n == 1) {return t;} else {t1 = trier(t.slice(0,n/2));t2 = trier(t.slice(n/2));return fusionner (t1,t2);}  
}  

/// GUI
function GUI () {
	this.slots = [null, null, null, null, null];
	this.size = 100*canvas.width/1500;
	this.l = this.slots.length;
	this.mode = 'inv';
	this.texts = [""];
	this.txtlength = 0;
	this.index = 0;

	this.drawinv = function () {
		c.lineWidth = 4;
		for (i=0; i<this.l; i++) {
			if (this.slots[i] !== null) {
				c.drawImage(this.slots[i].img,(canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size)
			}
			c.fillStyle = 'rgba(150,150,150,0.7)';
			c.fillRect((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size);
			c.strokeStyle = "black";
			c.strokeRect((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size);
		}
	}

	this.drawtext = function () {
		if ((this.index)*4 > this.txtlength) {this.mode = 'inv'; this.index = 0;}
		else {
			scene.pause = true;
			c.lineWidth = 4;
			c.strokeRect(canvas.width*0.1,canvas.height*0.7,canvas.width*0.8,canvas.height*0.25);
			if (this.index - this.txtlength/4 < 0) {c.strokeRect(canvas.width*0.9,canvas.height*0.805,canvas.height*0.05,canvas.height*0.05);}	
			var num = Math.floor(canvas.width/38);
			var n = num.toString();
			n = n.concat('', 'px Arial');
			c.font = n;
			var j=0;
			while (4*this.index+j < this.txtlength && j<4) {
				c.fillText(this.texts[4*this.index+j], canvas.width*0.12, canvas.height*0.758+j*1.2*num);
				j++
			}
		}
	}

	this.clickchecktext = function () {
		if (mouse.click == true && mouse.state == 'down' && recthitbox(canvas.width*0.9,canvas.height*0.805,mouse.x,mouse.y,canvas.height*0.05,canvas.height*0.05)) {
				this.index++
		}
		if (recthitbox(canvas.width*0.9,canvas.height*0.805,mouse.x,mouse.y,canvas.height*0.05,canvas.height*0.05)) {
			c.fillRect(canvas.width*0.9,canvas.height*0.805,canvas.height*0.05,canvas.height*0.05)
		}
	}

	this.clickcheckinv = function () {
		for (i=0; i<this.l; i++) {
			if (this.slots[i] !== null && mouse.click == true && mouse.state == 'down' && recthitbox((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9,mouse.x,mouse.y,this.size, this.size)) {
				this.slots[i].drag = 'onDrag';
				scene.collection.push(this.slots[i]);
				scene.sort();
				this.slots[i] = null;
			}
		}
	}

	this.textBox = function (texts) {
		this.mode = 'text';
		this.texts = texts;
		this.index = 0;
		this.txtlength = this.texts.length;
	}

	this.update = function () {
		if (this.mode == 'inv') {
			this.clickcheckinv();
			this.drawinv()
		}
		if (this.mode == 'text') {
			this.drawtext();
			if (this.index - this.txtlength/4 < 0) {this.clickchecktext()}
		}
	}
}

var gui = new GUI();


/// Resize
function resize () {
	gui.size = 100*canvas.width/1500;
	gui.l = gui.slots.length;
	if (window.innerWidth/window.innerHeight < 16/9) {
		canvas.width = window.innerWidth;
		canvas.height = canvas.width * 9/16
	} 
	else {
		canvas.height = window.innerHeight;
		canvas.width = canvas.height*16/9
	}

	for (i=0; i<scene.collection.length; i++) {
		scene.collection[i].resize()
	}
}
