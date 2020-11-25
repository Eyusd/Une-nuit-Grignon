var scene = new Scene();
scene.serre0();
resize();
gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."]);
gui.textBox(["[Sasha]","Ça y est, nous y voilà.", "Finissons cette histoire, et allons nous coucher."]);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	scene.update();
	gui.update();
	if (mouse.click == true) {mouse.click = false; console.log('click')};
}

animate();