var scene = new Scene();

window.addEventListener('load', function () {
<<<<<<< HEAD
	loadingscreen = false; scene.collection.push(new Button("startingbutton",100,"startbutton",45,79,10,5,100000,function () 
		{scene.unload("loadingscreen"); gui.show = true; scene.chariot3(); gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."], ["Sasha1"]);}))
=======
	loadingscreen = false; scene.collection.push(new Button("startingbutton",100,"startbutton",45,67,10,5,100000,function () 
		{scene.unload("loadingscreen"); gui.show = true; scene.porte1(); gui.textBox(["[Sasha]","*baillement* Hmm ? Mais qu’est-ce que je fous là ?","Pourquoi je suis devant ma chambre?"," Je devrais peut-être rentrer."], ["Sasha1"]);}))
>>>>>>> de39b96598037bf77331201936d4431a44bf68cd
  })

scene.loadingscreen();

resize();

function animate() {
	mouse =  JSON.parse(JSON.stringify(mousetemp));
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	scene.update();
	gui.update();
	if (mouse.click == true) {mouse.click = false; console.log('click'); mousetemp.click = false;};
}
animate();