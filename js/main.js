$(function(){

	var scene, camera, renderer;
	var controls, guiControls, datGUI;
	var axis, grid, color;
	var cubeGeometry,  torGeometry, textGeometry,  planeGeometry;
	var cubeMaterial, torMaterial, textMaterial,  planeMaterial;
	var cube, torusKnot, text, plane;
	var spotLight;
	var stats;
	var SCREEN_WIDTH, SCREEN_HEIGHT;

	// Pour la legende
	var colorMap;
	var numberOfColors;


	function init()
	{
		/*creates empty scene object and renderer*/
		scene = new THREE.Scene();
		camera =  new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
		renderer = new THREE.WebGLRenderer({antialias:true});

		renderer.setClearColor(0xdddddd);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled= true;
		renderer.shadowMapSoft = true;

		/*add controls*/
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );

		/*adds helpers*/
		axis =  new THREE.AxisHelper(1);
		scene.add (axis);

		grid = new THREE.GridHelper(512, 1);
		color = new THREE.Color("rgb(255,0,0)");
		grid.setColors(color, 0xC7D1CA);

		scene.add(grid);

		/*create a particle system*/
		// create the particle variables
		var particleCount = 18000,
			particles = new THREE.Geometry(),
			pMaterial = new THREE.ParticleBasicMaterial(
						{
							color: 0x060D0F,
							size: 2
						});

		// now create the individual particles
		for (var p = 0; p < particleCount; p++)
		{

		  // create a particle with random
		  // position values, -250 -> 250
		  var pX = Math.random() * 500 - 250,
			  pY = Math.random() * 500,
			  pZ = Math.random() * 500 -250,
			  particle = new THREE.Vector4(pX, pY, pZ,0);

		  // add it to the geometry
		  particles.vertices.push(particle);
		}

		// create the particle system
		var particleSystem = new THREE.ParticleSystem(
			particles,
			pMaterial);

		// add it to the scene
		scene.add(particleSystem);

		/*create plane*/
		planeGeometry = new THREE.PlaneGeometry (1536,1536);
		planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
		plane = new THREE.Mesh(planeGeometry, planeMaterial);

		/*position and add objects to scene*/
		plane.rotation.x = -.5*Math.PI;
		plane.receiveShadow = true;
		scene.add(plane);

		camera.position.x = 400;
		camera.position.y = 400;
		camera.position.z = 1000;
		camera.lookAt(scene.position);

		/*datGUI controls object*/
		guiControls = new function(){
			this.rotationX  = 0.0;
			this.rotationY  = 0.0;
			this.rotationZ  = 0.0;

			this.lightX = 20;
			this.lightY = 35;
			this.lightZ = 40;
			this.intensity = 1;
			this.distance = 0;
			this.angle = 1.570;
			this.exponent = 0;
			this.shadowCameraNear = 10;
			this.shadowCameraFar = 100;
			this.shadowCameraFov = 50;
			this.shadowCameraVisible=true;
			this.shadowMapWidth=1028;
			this.shadowMapHeight=1028;
			this.shadowBias=0;
			this.shadowDarkness=0.5;
			this.target = cube;
		}

		/*adds spot light with starting parameters*/
		spotLight = new THREE.SpotLight(0xffffff);
		spotLight.castShadow = true;
		spotLight.position.set (20, 35, 40);
		spotLight.intensity = guiControls.intensity;
		spotLight.distance = guiControls.distance;
		spotLight.angle = guiControls.angle;
		spotLight.exponent = guiControls.exponent;
		spotLight.shadowCameraNear = guiControls.shadowCameraNear;
		spotLight.shadowCameraFar = guiControls.shadowCameraFar;
		spotLight.shadowCameraFov = guiControls.shadowCameraFov;
		spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
		spotLight.shadowBias = guiControls.shadowBias;
		spotLight.shadowDarkness = guiControls.shadowDarkness;
		scene.add(spotLight);

		$("#webGL-container").append(renderer.domElement);

		/*fenetre de stats, en haut a gauche */
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#webGL-container").append( stats.domElement );

	}// fin fonction init



	function render()
	{
		spotLight.position.x = guiControls.lightX;
		spotLight.position.y = guiControls.lightY;
		spotLight.position.z = guiControls.lightZ;

	}


	function animate(){
		requestAnimationFrame(animate);
		render();
		stats.update();
		renderer.render(scene, camera);
	}







	$(window).resize(function(){


		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;

		camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();

		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	});


	init();
	animate();

});
