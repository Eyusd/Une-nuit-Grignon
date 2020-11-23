var scene = new Scene();
scene.carriere1();
resize();
gui.textBox(["[Sacha]","Ça y est, nous y voilà.", "Finissons cette histoire, et allons nous coucher."]);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	scene.update();
	gui.update();
	if (mouse.click == true) {mouse.click = false; console.log('click')};
}

animate();