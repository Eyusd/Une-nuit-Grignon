var scene = new Scene();
scene.jardin0();
//gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."]);
resize();
//gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."]);
//gui.textBox(["[Sasha]","Ça y est, nous y voilà.", "Finissons cette histoire, et allons nous coucher."]);

function animate() {
	mouse =  JSON.parse(JSON.stringify(mousetemp));
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	scene.update();
	gui.update();
	if (mouse.click == true) {mouse.click = false; console.log('click'); mousetemp.click = false;};
}

animate();