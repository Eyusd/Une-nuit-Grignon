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
var ctx = canvas.getContext('2d');
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

var mousetemp = {
	x: 0,
	y: 0,
	state: "up",
	click: false,
	drag: ['idle', ""]
}
var rect = canvas.getBoundingClientRect();
var padl = rect.left;
var padr = rect.right;
var padt = rect.top;
var padb = rect.bottom;

function mouseMove(event) { mousetemp.x = (event.clientX - padl) / (padr - padl) * canvas.width; mousetemp.y = (event.clientY - padt) / (padb - padt) * canvas.height}
window.addEventListener('mousemove', mouseMove, false);
window.addEventListener('mousedown', function(event) {mousetemp.state = 'down'; mousetemp.click = true; mouseMove(event)});
window.addEventListener('mouseup', function(event) {mousetemp.state = 'up'; mouseMove(event)});
window.addEventListener('resize', function() {
	if (window.innerWidth/ window.innerHeight < 16/9) {
		canvas.width = window.innerWidth;
		canvas.height = canvas.width * 9/16
	} 
	else {
		canvas.height = window.innerHeight;
		canvas.width = canvas.height*16/9
	}
	resize() }, false);

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

function sec2str(t){
    var d = Math.floor(t/86400),
        h = ('0'+Math.floor(t/3600) % 24).slice(-2),
        m = ('0'+Math.floor(t/60)%60).slice(-2),
        s = ('0' + t % 60).slice(-2);
    return (d>0?d+'d ':'')+(h>0?h+':':'')+(m>0?m+':':'')+(t>60?s:s+'s');
}

function arrayEquals(a, b) {
	return Array.isArray(a) &&
	  Array.isArray(b) &&
	  a.length === b.length &&
	  a.every((val, index) => val === b[index]);
  }


/// GUI
function GUI () {
	this.slots = [null, null, null, null, null];
	this.size = 100*canvas.width/1500;
	this.l = this.slots.length;
	this.mode = 'inv';
	this.texts = [];
	this.choices = [];
	this.txtlength = -1;
	this.index = 0;
	this.time = null;
	this.showtime = false;
	this.onTimerEnd = function () {};
	this.stupidity = 0;
	this.prompt = [];
	this.audio = [];
	this.currentlyPlaying = undefined;
	this.toexecute = function () {};
	this.show = false;

	this.drawinv = function () {
		ctx.lineWidth = 4;
		for (i=0; i<this.l; i++) {
			if (this.slots[i] !== null) {
				ctx.drawImage(this.slots[i].img,(canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size)
			}
			ctx.fillStyle = 'rgba(150,150,150,0.7)';
			ctx.fillRect((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size);
			ctx.strokeStyle = "black";
			ctx.strokeRect((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9, this.size, this.size);
		}
	}

	this.drawtext = function () {
			scene.pause = true;
			ctx.lineWidth = 4;
			ctx.fillStyle = 'rgba(150,150,150,0.7)';
			ctx.fillRect(canvas.width*0.1,canvas.height*0.7,canvas.width*0.8,canvas.height*0.25);
			ctx.strokeStyle = "rgb(180,180,180)";
			ctx.strokeRect(canvas.width*0.1,canvas.height*0.7,canvas.width*0.8,canvas.height*0.25);
			if (this.index - this.txtlength/4.0 < 0) {ctx.strokeRect(canvas.width*0.9,canvas.height*0.805,canvas.height*0.05,canvas.height*0.05);}	
			var num = Math.floor(canvas.width/38);
			var n = num.toString();
			n = n.concat('', 'px Arial');
			ctx.font = n;
			var j=0;
			while (4*this.index+j < this.txtlength && j<4) {
				ctx.fillStyle = 'white';
				ctx.fillText(this.texts[4*this.index+j], canvas.width*0.12, canvas.height*0.758+j*1.2*num);
				j++
			}
	}

	this.drawchoices = function() {
		scene.pause = true;
		ctx.lineWidth = 4;
		ctx.fillStyle = 'rgba(150,150,150,0.7)';
		ctx.fillRect(canvas.width*0.1,canvas.height*0.7,canvas.width*0.8,canvas.height*0.25);
		ctx.strokeStyle = "black";
		ctx.strokeRect(canvas.width*0.1,canvas.height*0.7,canvas.width*0.8,canvas.height*0.25);
		var num = Math.floor(canvas.width/38);
		var n = num.toString();
		n = n.concat('', 'px Arial');
		ctx.font = n;
		var j=0;
		while (j < this.choices[0].length && j<4) {
			ctx.fillStyle = 'white';
			ctx.fillText(this.choices[0][j], canvas.width*0.12, canvas.height*0.758+j*1.2*num);
			j++
		}
		for (i=1; i<this.choices.length; i++) {
			ctx.lineWidth = 4;
			ctx.fillStyle = 'rgba(150,150,150,0.7)';
			ctx.fillRect(canvas.width*0.7,canvas.height*0.6-(i-0.95)*canvas.height*0.1,canvas.width*0.2,canvas.height*0.08);
			ctx.strokeStyle = "black";
			ctx.strokeRect(canvas.width*0.7,canvas.height*0.6-(i-0.95)*canvas.height*0.1,canvas.width*0.2,canvas.height*0.08);
			ctx.fillStyle = 'white';
			var num = Math.floor(canvas.width/90);
			var n = num.toString();
			n = n.concat('', 'px Arial');
			ctx.font = n;
			ctx.fillText(this.choices[i][0], canvas.width*0.71, canvas.height*0.655-(i-0.95)*canvas.height*0.1);
		}
	}

	this.clickchecktext = function () {
		if (mouse.click == true && mouse.state == 'down' && recthitbox(canvas.width*0.9,canvas.height*0.805,mouse.x,mouse.y,canvas.height*0.05,canvas.height*0.05)) {
				this.index++
				if (this.index < this.audio.length) {
					this.playsound(this.audio[this.index])
				}
		}
		if (recthitbox(canvas.width*0.9,canvas.height*0.805,mouse.x,mouse.y,canvas.height*0.05,canvas.height*0.05)) {
			ctx.fillStyle = 'black';
			ctx.fillRect(canvas.width*0.9,canvas.height*0.805,canvas.height*0.05,canvas.height*0.05)
		}
	}

	this.clickcheckchoice = function () {
		for (i=1; i<this.choices.length; i++) {
			if (recthitbox(canvas.width*0.7,canvas.height*0.6-(i-0.95)*canvas.height*0.1,mouse.x,mouse.y,canvas.width*0.2,canvas.height*0.08)) {
				ctx.fillStyle = 'rgba(255,255,255,0.1)';
				ctx.fillRect(canvas.width*0.7,canvas.height*0.6-(i-0.95)*canvas.height*0.1,canvas.width*0.2,canvas.height*0.08)
				if (mouse.click == true && mouse.state == 'down') {
					scene.pause = false;
					this.texts = Array.from([]);
					this.index = 0;
					this.txtlength = -1;
					this.mode = 'inv';
					var f = this.choices[i][1];
					this.choices = [];
					f();
				}
			}
		}
	}

	this.clickcheckinv = function () {
		for (i=0; i<this.l; i++) {
			if (this.slots[i] !== null && mouse.click == true && mouse.state == 'down' && recthitbox((canvas.width-this.l*this.size)/2+i*this.size, (canvas.height-this.size)*0.9,mouse.x,mouse.y,this.size, this.size)) {
				this.slots[i].drag = 'onDrag';
				scene.collection.push(this.slots[i]);
				var newslots = [null,null,null,null,null];
				for (u=0;u<newslots.length;u++) {
					if (i !== u) {newslots[u] = this.slots[u]}
				}
				console.log(newslots);
				this.slots = Array.from(newslots);
				scene.sort();
			}
		}
	}

	this.textBox = function (texts, sounds = [], toexecute = function () {}) {
		this.toexecute = toexecute;
		this.mode = 'text';
		this.texts = Array.from(texts);
		this.index = 0;
		this.txtlength = texts.length;
		this.audio = sounds;
		if (this.index < this.audio.length) {
			this.playsound(this.audio[this.index])
		}
	}

	this.playsound = function (soundid) {
		this.currentlyPlaying = document.getElementById(soundid);
		if (this.currentlyPlaying.paused) {this.currentlyPlaying.play()}
	}

	this.choicesBox = function (choices) {
		if (this.txtlength == -1) {this.mode = 'choice';}
		else {this.mode = 'text';}
		this.choices = choices;
	}

	this.inputBox = function (txt,tries,listvalid,onvalid,onnonvalid = function () {}) {
		var i = 0;
		var retry = true;
		while (i<tries && retry) {
			var input = prompt(txt,"")
			if (listvalid.includes(input)) {
				retry = false
				onvalid()
			} else {i++}
		}
		if (i == tries) {onnonvalid()}
	}

	this.tick = function () {
		if (this.time !== null && this.time <= 0) {
			this.time = null
			this.onTimerEnd()
			this.showtimer = false;
		}
		else {
			if (this.time !== null) {this.time -= 1;}
		}
	}

	this.setTimer = function (seconds, timend) {
		this.onTimerEnd = timend;
		this.time = seconds;
		this.showtime = true;
	}

	this.drawTimer = function() {
		var num = Math.floor(canvas.width/18);
		var n = num.toString();
		n = n.concat('', 'px Arial');
		ctx.font = n;
		if (this.time == null) {
			this.showtime = false;
		}
		else {
			var txt = sec2str(this.time);
			ctx.fillStyle = 'red';
			ctx.fillText(txt, canvas.width*0.9, canvas.height*0.1);
		}
	}

	this.stupidshow = function () {
		var num = Math.floor(canvas.width/18);
		var n = num.toString();
		n = n.concat('', 'px Arial');
		ctx.font = n;
		ctx.fillStyle = 'red'
		ctx.fillText(this.stupidity.toString(), canvas.width*0.05, canvas.height*0.1);
	}


	this.update = function () {
		if (this.show) {
			if (this.mode == 'inv') {
				this.clickcheckinv();
				this.drawinv()
			}
			if (this.mode == 'text') {
				if ((this.index)*4 >= this.txtlength) {
					this.audio = [];
					this.currentlyPlaying = undefined;
					if (this.choices.length == 0) {
						this.mode = 'inv'; this.index = 0; this.texts = Array.from([]); this.txtlength = -1; scene.pause = false;this.toexecute();
					}
					else {
						this.mode = 'choice'; this.index = 0; this.texts = Array.from([]); this.txtlength = -1;
					}
				}
				else {
					this.drawtext();
					if (this.index - this.txtlength/4.0 < 0) {this.clickchecktext()}
				}
			}
			if (this.mode == 'choice') {
				this.drawchoices();
				this.clickcheckchoice();
			}
			if (this.showtime) {
				this.drawTimer()
			}
			this.stupidshow();
		}
	}
}

var gui = new GUI();
window.setInterval(function () {gui.tick()}, 1000);


/// Resize
function resize () {
	gui.size = 100*canvas.width/1500;
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
	rect = canvas.getBoundingClientRect();
	padl = rect.left;
	padr = rect.right;
	padt = rect.top;
	padb = rect.bottom;
}