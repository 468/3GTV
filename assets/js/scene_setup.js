function onYouTubeIframeAPIReady() {

var scene, scene2, scene3, camera, renderer, renderer2, renderer3, controls;
  	init();
  	animate();





  	function init() {
  	 
  	    // Create the scene and set the scene size.
  	    scene = new THREE.Scene();
  	    scene2 = new THREE.Scene();
  	    scene3 = new THREE.Scene();
  	    var WIDTH = window.innerWidth,
  	        HEIGHT = window.innerHeight;
  	 
  	    // More code goes here next...

 



  	        camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
  	            camera.position.set(0,0,1500);
  	            scene.add(camera);
  	           // controls = new THREE.TrackballControls( camera );


  	            // Set the background color of the scene.
  	                //renderer.setClearColorHex(0x333F47, 1);
  	             
  	                // Create a light, set its position, and add it to the scene.
  	                var light = new THREE.PointLight(0xffffff, 1);
  	                light.position.set(0,0,550);
  	                scene.add(light);


  	     window.addEventListener('resize', function() {
  	           var WIDTH = window.innerWidth,
  	               HEIGHT = window.innerHeight;
  	           renderer.setSize(WIDTH, HEIGHT);
  	           renderer2.setSize(WIDTH, HEIGHT);
  	           renderer3.setSize(WIDTH, HEIGHT);
  	           camera.aspect = WIDTH / HEIGHT;
  	           camera.updateProjectionMatrix();
  	         });




  	     var loader = new THREE.JSONLoader();
  	         loader.load( "models/phone.json", function(geometry, materials){
  	           var material = new THREE.MeshFaceMaterial(materials);
  	           //material.color.set('black')
  	         //  material.opacity   = 0;
  	         //  material.blending  = THREE.NoBlending;


  	         var reflection = THREE.ImageUtils.loadTextureCube( [ 'sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png' ] )


  	           var mesh = new THREE.Mesh(geometry, material);
  	           mesh.material.materials[0] = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 0.01, shininess: 10, specular: 0x999999, envMap: reflection  } );
  	           mesh.material.materials[1] = new THREE.MeshPhongMaterial( { color: 'grey', shading: THREE.FlatShading  } );
  	           mesh.material.materials[2] = new THREE.MeshPhongMaterial( { color: 'green', shading: THREE.FlatShading  } );
  	           scene.add(mesh);
  	          // mesh.position.y -= 200;


  	           

  	           //var element = document.createElement( 'iframe');


  	           //var parent = document.createElement("div");                 // Create a <li> node
              // Append the text to <li>
             // parent.id = 'parent'
             // parent.style.width = '352px';
  	           //parent.style.height = '416px';
  	           //node.style.borderRadius = "15px"
  	           //node.style['border-radius'] = "15px"//Future standard
  	           //node.style['-webkit-border-radius'] = "15px"//Webkit(Safari and Chrome)
  	          // node.style['-moz-border-radius'] = "15px"//Mozilla Firefox
  	          // node.style['-o-border-radius'] = "15px"//Opera
  	          // parent.style.overflow = 'hidden'

  	           var youtube_holder = document.createElement('div');
  	          // youtube_holder.style.position = 'absolute'
  	           youtube_holder.style.left = '0px';
  	           youtube_holder.style.margin = '0px'
  	           youtube_holder.style.width = '352px';
  	           youtube_holder.style.height = '416px';
  	           youtube_holder.style.overflow = 'hidden'
  	           youtube_holder.style.border = '25px solid black'
  	           youtube_holder.id = 'youtube_holder';
  	           var youtube_holder_cssObject = new THREE.CSS3DObject( youtube_holder );
  	           youtube_holder_cssObject.position.copy(mesh.position);
  	           youtube_holder_cssObject.position.y +=150
  	           youtube_holder_cssObject.position.z += 78 //+=80
				youtube_holder_cssObject.rotation.copy(mesh.rotation);
				youtube_holder.innerHTML = '<iframe id="player" type="text/html" width="352" height="416" src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1" frameborder="0"></iframe>'
  	                 		//cssObject.scale.copy( mesh.scale );
  	           scene2.add( youtube_holder_cssObject );





  	           var screen_html = "<div id='options_screen'>Options here.</div><div class='scroll-left'><div id='video_title'></div></div><div id='left_button_label'>Options</div> <div id='right_button_label'>Next</div>"

  	           var screen_overlay = document.createElement( 'div');
  	           screen_overlay.id = 'screen_overlay';
  	           screen_overlay.style.border = '0px';
  	           screen_overlay.style.opacity = 1;
  	            screen_overlay.style.position = 'absolute'
  	            screen_overlay.style.color = '#ffffff'
  	            screen_overlay.style.width = '352px';
  	           screen_overlay.style.height = '416px';
  	           screen_overlay.style.overflow = 'hidden'
  	           //screen_overlay.style.backgroundColor = 'yellow'
  	           screen_overlay.style.color = 'black'
  	            screen_overlay.style.position='absolute'
  	            //screen_overlay.style.padding = '10px'
  	            screen_overlay.innerHTML = screen_html;
  	            var screen_overlay_cssObject = new THREE.CSS3DObject( screen_overlay );
  	            screen_overlay_cssObject.position.copy(youtube_holder_cssObject.position)
  	           	screen_overlay_cssObject.rotation.copy(mesh.rotation);
  	           	
  	           	var leftButton = document.createElement( 'div');
  	           	leftButton.id = 'left_button';
  	           	leftButton.style.border = '0px';
  	           	leftButton.style.opacity = 1;
  	           	 leftButton.style.position = 'absolute'
  	           	 leftButton.style.width = '90px';
  	           	leftButton.style.height = '40px';
  	           	leftButton.style.backgroundColor = 'red'
  	           	var leftButton_cssObject = new THREE.CSS3DObject( leftButton );
  	           	leftButton_cssObject.position.x = -120
  	           	leftButton_cssObject.position.y = -130
  	           	leftButton_cssObject.position.z += 78
  	           	leftButton_cssObject.rotation.copy(mesh.rotation)



  	           	var rightButton = document.createElement( 'div');
  	           	rightButton.id = 'right_button';
  	           	rightButton.style.border = '0px';
  	           	rightButton.style.opacity = 1;
  	           	 rightButton.style.position = 'absolute'
  	           	 rightButton.style.width = '90px';
  	           	rightButton.style.height = '40px';
  	           	rightButton.style.backgroundColor = 'red'
  	           	var rightButton_cssObject = new THREE.CSS3DObject( rightButton );
  	           	rightButton_cssObject.position.x += 120
  	           	rightButton_cssObject.position.y = -130
  	           	rightButton_cssObject.position.z += 78
  	           	rightButton_cssObject.rotation.copy(mesh.rotation)


  	           scene3.add(screen_overlay_cssObject )
  	           scene3.add(leftButton_cssObject)
  	           scene3.add(rightButton_cssObject)

  	           screen_center_x = window.innerWidth/2;
 		screen_center_y = window.innerHeight/2;
 		var rotSpeed = .02 

 		window.addEventListener( 'mousemove', mousemove, false );

  	           function mousemove( event ) {

  	           	//console.log( (event.clientX) - screen_center  )

  	           	x_distance = event.clientX - screen_center_x
				y_distance = event.clientY - screen_center_y


				var x = camera.position.x,
				        z = camera.position.z;



					camera.position.x = x_distance/2 * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
					camera.position.y = y_distance/2 * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
					
		

				camera.lookAt(scene.position);
  	           	//mesh.rotation.y = x_distance / ( 4000 )
  	           	//mesh.rotation.x = y_distance  / ( 4000 )

  	           //	youtube_holder_cssObject.rotation.copy(mesh.rotation)

  	           	//screen_overlay_cssObject.rotation.copy(mesh.rotation)
  	           	//leftButton_cssObject.rotation.copy(mesh.rotation)
  	           //	rightButton_cssObject.rotation.copy(mesh.rotation)
  	           	//camera.lookAt(scene.position);

  	           	



  	           }


  	         });

  	         

	
  	         

  	        	renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true  } );
  	      		renderer.setClearColor( 0xf0f0f0 , 0);
  	      		renderer.setPixelRatio( window.devicePixelRatio );
  	      		renderer.setSize( window.innerWidth, window.innerHeight );
  	      		document.body.appendChild( renderer.domElement );

  	      		renderer2 = new THREE.CSS3DRenderer();
  	      		renderer2.setSize( window.innerWidth, window.innerHeight );
  	      		renderer2.domElement.style.position = 'absolute';
  	      		renderer2.domElement.style.top = 0;
  	      		renderer2.domElement.style.zIndex = '-1';
  	      		document.body.appendChild( renderer2.domElement );

  	      		renderer3 = new THREE.CSS3DRenderer();
  	      		renderer3.setSize( window.innerWidth, window.innerHeight );
  	      		renderer3.domElement.style.position = 'absolute';
  	      		renderer3.domElement.style.top = 0;
  	      		renderer3.domElement.style.zIndex = '1';
  	      		document.body.appendChild( renderer3.domElement );
  	 
  	 
  	  }


 		






  	  function animate() {
  	  // controls.update();
  	      // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating
  	      renderer3.render( scene3, camera );
  	      renderer2.render( scene2, camera );
  	      renderer.render( scene, camera );
  	      		
  	       		requestAnimationFrame( animate );
  	   
  	    }

}