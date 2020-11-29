var scene = new Scene();
var loadingscreen = true;

window.addEventListener('load', function () {
	loadingscreen = false; console.log('done')
  })

scene.loadingscreen();
//gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."]);
resize();

function animate() {
	mouse =  JSON.parse(JSON.stringify(mousetemp));
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	scene.update();
	gui.update();
	if (mouse.click == true) {mouse.click = false; console.log('click'); mousetemp.click = false;};
}
animate();