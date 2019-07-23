function onYouTubeIframeAPIReady() {
  var scene, scene2, scene3, camera, renderer, renderer2, renderer3, controls;
  
  init();
  animate();
  var trackmouse = true;
  var still = false;
  var autoskip = false;

  var randomNum = function(min,max){ return Math.floor(Math.random() * (max - min + 1)) + min; } 

  var startMovementLoop = function(){

    var currentY = scene.position.y;
    var newY = currentY - 10;

    new TWEEN.Tween( scene.position).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start();

    new TWEEN.Tween( scene2.position ).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start();

    new TWEEN.Tween( scene3.position ).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start().onComplete(function(){ setTimeout(function(){ if(!still){finishMovementLoop();} }, 2000); });
  }

  var finishMovementLoop = function(){
    var currentY = scene.position.y;
    var newY = currentY + 10;

    new TWEEN.Tween( scene.position).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start();

    new TWEEN.Tween( scene2.position ).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start();

    new TWEEN.Tween( scene3.position ).to( 
    { y: newY }, 2000 ).easing( TWEEN.Easing.Quadratic.InOut).start().onComplete(function(){ setTimeout(function(){ if(!still){startMovementLoop();} }, 1500); });
  }

  function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene2 = new THREE.Scene();
    scene3 = new THREE.Scene();
    var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(-500,250,1400);
    scene.add(camera);

    // camera intro animation -- triggers interactive element setup & movement loop animation on finish
    var introAnimation = function(){
      setTimeout(function(){ 
        new TWEEN.Tween( camera.position ).to( {
        x:0,
        y: 50,
        z: 1000}, 5000 ).easing( TWEEN.Easing.Quadratic.Out).onUpdate(function () {
        camera.lookAt(scene.position)}).start();

        new TWEEN.Tween( scene.position ).to( {
        x:0,
        y: 100,
        z: 0}, 5000 ).easing( TWEEN.Easing.Quadratic.Out).start();

        new TWEEN.Tween( scene2.position ).to( {
        x:0,
        y: 100,
        z: 0}, 5000 ).easing( TWEEN.Easing.Quadratic.Out).start();

        new TWEEN.Tween( scene3.position ).to( {
        x:0,
        y: 100,
        z: 0}, 5000 ).easing( TWEEN.Easing.Quadratic.Out).start().onComplete(function(){ 
          createInteractiveElements(); 
          startMovementLoop(); 
        });

      $('#splashscreen').fadeOut(5000); 

      }, 1000);
    };

    var light = new THREE.PointLight(0xffffff, 0.65);
                    light.position.set(0,0,10000);
                    light.name = 'main_light';
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
      var reflection = THREE.ImageUtils.loadTextureCube( [ './img/sky.png', './img/sky.png', './img/sky.png', './img/sky.png', './img/sky.png', './img/sky.png' ] )

      var leftbuttontexture = THREE.ImageUtils.loadTexture("./img/left_button.png");
      var rightbuttontexture = THREE.ImageUtils.loadTexture("./img/right_button.png");
      var centerbuttontexture = THREE.ImageUtils.loadTexture("./img/center_button.png");
      var lowerleftbuttontexture = THREE.ImageUtils.loadTexture("./img/lower_left_button.png");
      var callbuttontexture = THREE.ImageUtils.loadTexture("./img/call_button.png");
      var hangupbuttontexture = THREE.ImageUtils.loadTexture("./img/hangup_button.png");
      var hashbuttontexture = THREE.ImageUtils.loadTexture("./img/hash_button.png");

      var zerobuttontexture = THREE.ImageUtils.loadTexture("./img/zero_button.png");
      var asteriskbuttontexture = THREE.ImageUtils.loadTexture("./img/asterisk_button.png");
      var ninebuttontexture = THREE.ImageUtils.loadTexture("./img/nine_button.png");
      var eightbuttontexture = THREE.ImageUtils.loadTexture("./img/eight_button.png");
      var sevenbuttontexture = THREE.ImageUtils.loadTexture("./img/seven_button.png");
      var sixbuttontexture = THREE.ImageUtils.loadTexture("./img/six_button.png");
      var fivebuttontexture = THREE.ImageUtils.loadTexture("./img/five_button.png");
      var fourbuttontexture = THREE.ImageUtils.loadTexture("./img/four_button.png");
      var threebuttontexture = THREE.ImageUtils.loadTexture("./img/three_button.png");
      var twobuttontexture = THREE.ImageUtils.loadTexture("./img/two_button.png");
      var onebuttontexture = THREE.ImageUtils.loadTexture("./img/one_button.png");
      var cancelbuttontexture = THREE.ImageUtils.loadTexture("./img/cancel_button.png");
      var navbuttontexture = THREE.ImageUtils.loadTexture("./img/nav_button.png");
      var pencilbuttontexture = THREE.ImageUtils.loadTexture("./img/pencil_button.png");
      var linkbuttontexture = THREE.ImageUtils.loadTexture("./img/link_button.png");

      var mesh = new THREE.Mesh(geometry, material);
      mesh.material.materials[0] = new THREE.MeshPhongMaterial ( {  color: 0x000000, shininess: 50   } );
      mesh.material.materials[1] = new THREE.MeshPhongMaterial ( {  map: hashbuttontexture   } ); // # key
      mesh.material.materials[2] = new THREE.MeshPhongMaterial ( {  map: zerobuttontexture } ); // 0 key
      mesh.material.materials[3] = new THREE.MeshPhongMaterial ( { map: asteriskbuttontexture } );  // * key
      mesh.material.materials[4] = new THREE.MeshPhongMaterial ( {  map: ninebuttontexture } );  // 9 key
      mesh.material.materials[5] = new THREE.MeshPhongMaterial ( {  map: eightbuttontexture } );  // 8 key
      mesh.material.materials[6] = new THREE.MeshPhongMaterial ( {  map: sevenbuttontexture } );  // 7 key
      mesh.material.materials[7] = new THREE.MeshPhongMaterial ( {  map: sixbuttontexture } );  // 6 key
      mesh.material.materials[8] = new THREE.MeshPhongMaterial ( { map: fivebuttontexture } );  // 5 key
      mesh.material.materials[9] = new THREE.MeshPhongMaterial ( {map: fourbuttontexture } );  // 4 key
      mesh.material.materials[10] = new THREE.MeshPhongMaterial ( {   map: threebuttontexture} );  // 3 key
      mesh.material.materials[11] = new THREE.MeshPhongMaterial ( {  map: twobuttontexture   } );  // 2 key
      mesh.material.materials[12] = new THREE.MeshPhongMaterial ( {  map: onebuttontexture } );  // 1 key
      mesh.material.materials[13] = new THREE.MeshPhongMaterial ( {  map: cancelbuttontexture  } );  // C key
      mesh.material.materials[14] = new THREE.MeshPhongMaterial ( {  map: navbuttontexture  } );  //nav key
      mesh.material.materials[15] = new THREE.MeshPhongMaterial ( {  map: pencilbuttontexture } );  // pencil key
      mesh.material.materials[16] = new THREE.MeshPhongMaterial ( {  map: linkbuttontexture } );  // link key
      mesh.material.materials[17] = new THREE.MeshPhongMaterial ( {  map: hangupbuttontexture  } );  // hangup key
      mesh.material.materials[18] = new THREE.MeshPhongMaterial ( {  map: callbuttontexture  } );  // call key
      mesh.material.materials[19] = new THREE.MeshLambertMaterial ( { color: 0x000000  } ); // keyboard backing
      mesh.material.materials[20] = new THREE.MeshPhongMaterial ( {  map: rightbuttontexture  } ); // top left button
      mesh.material.materials[21] = new THREE.MeshPhongMaterial ( {  map: leftbuttontexture  } ); // top right button
     // mesh.material.materials[22] = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 0.25, shininess: 10, specular: 0xffffff, envMap: reflection  } ); // hand
      mesh.material.materials[22] = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 0.25, shininess: 10, specular: 0xffffff, envMap: reflection  } ); // hand
 
      mesh.material.materials[23] = new THREE.MeshPhongMaterial( { color: 0xffffff  } ); // ?
      mesh.material.materials[24] = new THREE.MeshPhongMaterial( { color: 0xffffff  } ); // side detail
      mesh.material.materials[25] = new THREE.MeshLambertMaterial( { color: 0x72587F  } ); // phone main body
      noisetexture = THREE.ImageUtils.loadTexture('./img/noise_texture.png')

      noisetexture.wrapS = noisetexture.wrapT = THREE.RepeatWrapping;
      noisetexture.repeat.set( 2, 2 );
      mesh.material.materials[25].bumpMap     = noisetexture
      mesh.material.materials[25].bumpScale = 1

      mesh.material.materials[26] = new THREE.MeshPhongMaterial ( { color: 0xF0F0F0 } ); // phone face plate
      mesh.material.materials[26].bumpMap     = noisetexture
      mesh.material.materials[26].bumpScale = 0.4;

      mesh.material.materials[27] = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, opacity: 1, shininess: 70, specular: 0x333333, envMap: reflection  } ); // shiny faceplate
      
      brushedmetaltexture = THREE.ImageUtils.loadTexture('./img/_brushedmetal.png')
      brushedmetaltexture.wrapS = brushedmetaltexture.wrapT = THREE.RepeatWrapping;
      brushedmetaltexture.repeat.set( 2, 2 );
      mesh.material.materials[27].specularMap     = brushedmetaltexture

      mesh.material.materials[28] = new THREE.MeshPhongMaterial( { color: 0xBEBEBE, opacity: 1, shininess: 25, specular: 0x999999, envMap: reflection  } ); //speaker
      mesh.material.materials[29] = new THREE.MeshPhongMaterial( { color: 0xBEBEBE, opacity: 1, shininess: 25, specular: 0x999999, envMap: reflection  } ); // camera outer
      mesh.material.materials[30] =  new THREE.MeshPhongMaterial ( { color: 0x333333, opacity: 1, shininess: 100, specular: 0xffffff, envMap: reflection  } ); // camera
      mesh.material.materials[31] =  new THREE.MeshPhongMaterial ( { map: centerbuttontexture } ); // central button
      mesh.material.materials[32] =  new THREE.MeshLambertMaterial ( { color: 0xCDCDCD  } ); // ?
      mesh.material.materials[33] =  new THREE.MeshLambertMaterial ( { color: 0x000000  } ); // ?

      mesh.material.materials[35] = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 0.01, shininess: 5, specular: 0x999999 } ); // screen cover
      mesh.material.materials[36] =  new THREE.MeshLambertMaterial ( { color: 0xCDCDCD  } ); // ?

      mesh.name = "mainMesh";
      scene.add(mesh);

      var youtube_holder = document.createElement('div');
      youtube_holder.style.left = '0px';
      youtube_holder.style.margin = '0px'
      youtube_holder.innerHTML = "<img src='./img/splashscreen.png' id='phone_splashscreen'/><div id='player'></div> <div id='phone-header'> <div class='scroll-left'> <div id='video_title_container'><div id='video_title'></div></div></div> <div id='battery_icon'><img src='./img/battery_test3.png'/></div> <div id='reception_icon'><img src='./img/reception_test3.gif'/></div> </div> <div id='phone-footer'> <div id='left_button_label'><span>Menu</span></div> <div id='right_button_label'><span id='startbtn'>Start</span></div> </div>"
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
      scene2.add( youtube_holder_cssObject );
               
      var screen_overlay = document.createElement( 'div');
      screen_overlay.id = 'screen_overlay';
      screen_overlay.className = "no_highlight";
      screen_overlay.style.opacity = 1;
      screen_overlay.style.position = 'absolute'
      screen_overlay.style.color = '#ffffff'
      screen_overlay.style.width = '352px';
      screen_overlay.style.height = '416px';
      screen_overlay.style.overflow = 'hidden'
      screen_overlay.style.color = 'black'
      var generateVolumeBars = function(){
        var html = "";
        for(var i=10;i<=100;i+=10){
          if(i>80){
            html += "<span id='options_volume_" + i + "'>|</span>"
          }
          else{
            html += "<span class='yellow' id='options_volume_" + i + "'>|</span>"
          }
        }
        return html;
      }

      var screen_html = "<div id='searching_box'><div><img src='./img/searching_emoticon.png'></div><span>Searching...</span></div><div id='menu_screen'><h1> <img src='./img/menu_emoticon.png'/> Menu</h1><div id='menu_options'> <div id='options_volume'>Volume: <span class='align-right'><span id='options_volume_down' class='clickable'>-</span> "+generateVolumeBars()+" <span id='options_volume_up' class='clickable'>+</span></span></div> <div id='options_region'>Region: <span class='align-right'><span id='options_region_down'><</span> <span id='options_current_region' class='yellow'>All</span> <span id='options_region_up'>></span></span></div> <div id='options_channel'>Channel: <span class='align-right'><span id='options_channel_down'>< </span><span id='options_current_channel' class='yellow'>All</span><span id='options_channel_up'> ></span></span></div> <div id='options_safesearch'>Safesearch: <span class='align-right'><span id='options_safesearch_down'>< </span><span id='options_current_safesearch' class='yellow'>Moderate</span><span id='options_safesearch_up'> ></span></span></div> <div id='options_autoskip'>Autoskip: <span class='align-right'><span id='options_autoskip_up'>< </span> <span id='options_current_autoskip' class='yellow'>Disabled</span> <span id='options_autoskip_down'> ></span></span></div> <div id='options_new_window'><span id='options_new_window_link'>Video ID: <span class='align-right'><span id='current_id' class='yellow'>None</span></span></span></div> </div> </div>"
      screen_overlay.innerHTML = screen_html;
      var screen_overlay_cssObject = new THREE.CSS3DObject( screen_overlay );

      screen_overlay_cssObject.position.copy(youtube_holder_cssObject.position)
      screen_overlay_cssObject.position.z -= 5;
      screen_overlay_cssObject.rotation.copy(mesh.rotation);
                
      var leftButton = document.createElement( 'div');
      leftButton.id = 'left_button';
      leftButton.style.border = '0px';
      leftButton.style.opacity = 0;
      leftButton.style.position = 'absolute'
      leftButton.style.width = '110px';
      leftButton.style.height = '40px';
      var leftButton_cssObject = new THREE.CSS3DObject( leftButton );
      leftButton_cssObject.position.x = -110
      leftButton_cssObject.position.y = -115
      leftButton_cssObject.position.z += 78
      leftButton_cssObject.rotation.copy(mesh.rotation)

      var rightButton = document.createElement( 'div');
      rightButton.id = 'right_button';
      rightButton.style.border = '0px';
      rightButton.style.opacity = 0;
      rightButton.style.position = 'absolute'
      rightButton.style.width = '110px';
      rightButton.style.height = '40px';
      var rightButton_cssObject = new THREE.CSS3DObject( rightButton );
      rightButton_cssObject.position.x += 115
      rightButton_cssObject.position.y = -115
      rightButton_cssObject.position.z += 78
      rightButton_cssObject.rotation.copy(mesh.rotation)

      var innerUpButton = document.createElement( 'div');
      innerUpButton.id = 'inner_up_button';
      innerUpButton.style.border = '0px';
      innerUpButton.style.opacity = 1;
      innerUpButton.style.position = 'absolute'
      innerUpButton.style.width = '40px';
      innerUpButton.style.height = '40px';
      var innerUpButton_cssObject = new THREE.CSS3DObject( innerUpButton );
      innerUpButton_cssObject.position.x += 0
      innerUpButton_cssObject.position.y = -95
      innerUpButton_cssObject.position.z += 78
      innerUpButton_cssObject.rotation.copy(mesh.rotation)


      var innerDownButton = document.createElement( 'div');
      innerDownButton.id = 'inner_down_button';
      innerDownButton.style.border = '0px';
      innerDownButton.style.opacity = 0;
      innerDownButton.style.position = 'absolute'
      innerDownButton.style.width = '40px';
      innerDownButton.style.height = '40px';
      innerDownButton.style.backgroundColor = 'red'
      var innerDownButton_cssObject = new THREE.CSS3DObject( innerDownButton );
      innerDownButton_cssObject.position.x += 0
      innerDownButton_cssObject.position.y = -165
      innerDownButton_cssObject.position.z += 78
      innerDownButton_cssObject.rotation.copy(mesh.rotation)

      var innerLeftButton = document.createElement( 'div');
      innerLeftButton.id = 'inner_left_button';
      innerLeftButton.style.border = '0px';
      innerLeftButton.style.opacity = 0;
      innerLeftButton.style.position = 'absolute'
      innerLeftButton.style.width = '40px';
      innerLeftButton.style.height = '40px';
      var innerLeftButton_cssObject = new THREE.CSS3DObject( innerLeftButton );
      innerLeftButton_cssObject.position.x += 40
      innerLeftButton_cssObject.position.y = -130
      innerLeftButton_cssObject.position.z += 78
      innerLeftButton_cssObject.rotation.copy(mesh.rotation)


      var innerRightButton = document.createElement( 'div');
      innerRightButton.id = 'inner_right_button';
      innerRightButton.style.border = '0px';
      innerRightButton.style.opacity = 0;
      innerRightButton.style.position = 'absolute'
      innerRightButton.style.width = '40px';
      innerRightButton.style.height = '40px';
      var innerRightButton_cssObject = new THREE.CSS3DObject( innerRightButton );
      innerRightButton_cssObject.position.x -= 40
      innerRightButton_cssObject.position.y = -130
      innerRightButton_cssObject.position.z += 78
      innerRightButton_cssObject.rotation.copy(mesh.rotation)

      var menuButton = document.createElement( 'div');
      menuButton.id = 'menu_button';
      menuButton.style.border = '0px';
      menuButton.style.opacity = 0;
      menuButton.style.position = 'absolute'
      menuButton.style.width = '75px';
      menuButton.style.height = '40px';
      var menuButton_cssObject = new THREE.CSS3DObject( menuButton );
      menuButton_cssObject.position.x = -125
      menuButton_cssObject.position.y = -15
      menuButton_cssObject.position.z += 78
      menuButton_cssObject.rotation.copy(mesh.rotation)

      var skipButton = document.createElement( 'div');
      skipButton.id = 'skip_button';
      skipButton.style.border = '0px';
      skipButton.style.opacity = 0;
      skipButton.style.position = 'absolute'
      skipButton.style.width = '75px';
      skipButton.style.height = '40px';
      var skipButton_cssObject = new THREE.CSS3DObject( skipButton );
      skipButton_cssObject.position.x = 125
      skipButton_cssObject.position.y = -15
      skipButton_cssObject.position.z += 78
      skipButton_cssObject.rotation.copy(mesh.rotation)

      scene3.add(screen_overlay_cssObject )
      scene3.add(menuButton_cssObject)
      scene3.add(skipButton_cssObject)
      scene3.add(leftButton_cssObject)
      scene3.add(rightButton_cssObject)
      scene3.add(innerUpButton_cssObject)
      scene3.add(innerDownButton_cssObject)
      scene3.add(innerLeftButton_cssObject)
      scene3.add(innerRightButton_cssObject)

      introAnimation();

    });


    renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true  } );
    renderer.setClearColor( 0xf0f0f0 , 0);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("phone").appendChild( renderer.domElement );

    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    renderer2.domElement.style.zIndex = '-1';
    document.getElementById("phone").appendChild( renderer2.domElement );

    renderer3 = new THREE.CSS3DRenderer();
    renderer3.setSize( window.innerWidth, window.innerHeight );
    renderer3.domElement.style.position = 'absolute';
    renderer3.domElement.style.top = 0;
    renderer3.domElement.style.zIndex = '0';
    document.getElementById("phone").appendChild( renderer3.domElement );

  }

  function animate() {
    renderer3.render( scene3, camera );
    renderer2.render( scene2, camera );
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
    camera.lookAt(scene.position);
    TWEEN.update();
  }

  var channels = {};

  channels['All'] = {'name': 'All', 'id_number': false}
  channels['autos_and_vehicles'] = {'name': 'Autos/Vehicles', 'id_number': 2}
  channels['music'] = {'name': 'Music', 'id_number': 10 }
  channels['pets_and_animals'] = {'name': 'Pets/Animals', 'id_number': 15}
  channels['sports'] = {'name': 'Sports', 'id_number': 17}
  channels['people_and_blogs'] = {'name': 'People/Blogs', 'id_number': 22}
  channels['comedy'] = {'name': 'Comedy', 'id_number': 23}
  channels['entertainment'] = {'name': 'Entertainment', 'id_number': 24}
  channels['film_and_animation'] = {'name': 'Film/Animation', 'id_number': 1}
  //channels['short_movies'] = {'name': 'Short Movies', 'id_number': 18} // empty
  channels['travel_and_events'] = {'name': 'Travel/Events', 'id_number': 19}
  channels['gaming'] = {'name': 'Gaming', 'id_number': 20}
  //channels['videblogging'] = {'name': 'Videoblogging', 'id_number': 21} // empty
  channels['news_and_politics'] = {'name': 'News/Politics', 'id_number': 25}
  channels['howto_and_style'] = {'name': 'Howto/Style', 'id_number': 26}
  channels['education'] = {'name': 'Education', 'id_number': 27}
  channels['science_and_technology'] = {'name': 'Science/Tech', 'id_number': 28}
  channels['nonprofits_and_activism'] = {'name': 'Nonprofits', 'id_number': 29}

  var ordered_channels = [ channels['All'],channels['music'], channels['sports'],channels['autos_and_vehicles'],channels['pets_and_animals'], channels['comedy'],channels['entertainment'],
                          channels['travel_and_events'],channels['gaming'],channels['people_and_blogs'],channels['film_and_animation'],
                          channels['news_and_politics'],channels['howto_and_style'],channels['education'],channels['science_and_technology'],channels['nonprofits_and_activism'] ]
  var selected_ordered_channel = 0;
  var selected_channel = ordered_channels[selected_ordered_channel];

  var regions = {};

  var north_america_locations = [ {'location': '62.103882522897884,-132.01171875', 'radius': '1000km'},
                                  {'location': '51.94426487902879,-108.984375', 'radius': '1000km'},
                                  {'location': '40.84706035607127,-110.0390625', 'radius': '1000km'},
                                  {'location': '36.17335693522165,-93.1640625', 'radius': '1000km'},
                                  {'location': '39.774769485295494,-77.6953125', 'radius': '1000km'},
                                  {'location': '43.58039085560789,-95.80078125', 'radius': '1000km'},
                                  {'location': '43.068887774169646,-77.87109375', 'radius': '1000km'},
                                  {'location': '39.90973623453724,-100.8984375', 'radius': '1000km'},
                                  {'location': '40.979898069620205,-114.43359375', 'radius': '1000km'}
                                ];

  var central_america_locations = [ {'location': '25.00597265623929,-109.51171875', 'radius': '700km'},
                                    {'location': '21.616579336740717,-105.1171875', 'radius': '845km'},
                                    {'location': '17.978733095556283,-91.23046875', 'radius': '1000km'},
                                    {'location': '15.96132908159676,-81.2109375', 'radius': '1000km'},
                                    {'location': '20.303417518489415,-68.73046875', 'radius': '700km'},
                                    {'location': '15.199386048560122,-86.923828125', 'radius': '1000km'},
                                    {'location': '19.394067895396727,-107.314453125', 'radius': '1000km'}
                                  ];

  var south_america_locations = [ {'location': '-1.142502403706025,-68.818359375', 'radius': '1000km'},
                                  {'location': '-12.29706829285369,-45.439453125', 'radius': '1000km'},
                                  {'location': '-13.496472765758837,-64.423828125', 'radius': '1000km'},
                                  {'location': '-28.071980301779732,-61.259765625', 'radius': '1000km'},
                                  {'location': '-41.967659203678075,-67.587890625', 'radius': '1000km'},
                                  {'location': '-5.8783321096742,-63.720703125', 'radius': '1000km'},
                                  {'location': '-28.536274512989813,-55.634765625', 'radius': '1000km'},
                                  {'location': '-12.468760144823104,-49.482421875', 'radius': '1000km'}
                                ];

  var western_europe_locations = [ {'location': '54.007768761934855,-4.306640625', 'radius': '500km'},
                                   {'location': '47.45780853075046,1.845703125', 'radius': '527km'},
                                   {'location': '50.792047064406994,10.283203125', 'radius': '5271km'},
                                   {'location': '49.894634395734386,3.076171875', 'radius': '820km'}
                                 ];

  var northern_europe_locations = [ {'location': '65.10914820386489,-18.896484375', 'radius': '280km'},
                                    {'location': '59.48972603553725,11.865234375', 'radius': '480km'},
                                    {'location': '57.37393841871432,22.587890625', 'radius': '341km'},
                                    {'location': '63.74363097533565,19.599609375', 'radius': '557km'}
                                  ];

  var southern_europe_locations = [ {'location': '41.04621681452099,-4.306640625', 'radius': '530km'},
                                    {'location': '42.09822241119009,13.447265625', 'radius': '530km'},
                                    {'location': '40.38002840251219,22.939453125', 'radius': '476km'}
                                  ];

  var eastern_europe_locations = [  {'location': '51.234407351634914,22.587890625', 'radius': '340km'},
                                    {'location': '46.25584681848069,28.564453125', 'radius': '556km'},
                                    {'location': '50.345460408605135,38.583984375', 'radius': '555km'},
                                    {'location': '58.12431960569405,44.560546875', 'radius': '973km'},
                                    {'location': '63.03503931553001,70.751953125', 'radius': '973km'},
                                    {'location': '62.22699603632,91.494140625', 'radius': '857km'},
                                    {'location': '54.927141864546805,41.923828125', 'radius': '1000km'} 
                                 ];

  var north_africa_locations = [ {'location': '28.226970038918925,3.955078125', 'radius': '942km'},
                                  {'location': '30.675715404168326,-7.294921875', 'radius': '484km'},
                                  {'location': '28.22697003891895,18.720703125', 'radius': '886km'},
                                  {'location': '25.403584973187364,30.322265625', 'radius': '728km'},
                                  {'location': '14.519780046326797,30.322265625', 'radius': '846km'}
                               ];

  var west_africa_locations = [ {'location': '11.436955216143927,-6.591796875', 'radius': '1000km'},
                                {'location': '10.746969318460765,8.173828125', 'radius': '1000km'},
                                {'location': '16.55196172197326,9.931640625', 'radius': '661km'},
                                {'location': '10.055402736565,0.439453125', 'radius': '1000km'}
                              ];


  var central_africa_locations = [ {'location': '2.1088986592431764,17.0947265625', 'radius': '1000km'},
                                  {'location': '14.434680215297318,18.9404296875', 'radius': '784km'},
                                  {'location': '-11.609193407938903,18.0615234375', 'radius': '784km'},
                                  {'location': '-5.353521355337283,17.6220703125', 'radius': '1000km'},
                                  {'location': '5.266007882805536,26.4111328125', 'radius': '510km'}
                                ];

  var eastern_africa_locations = [ {'location': '8.667918002363171,40.4736328125', 'radius': '712km'},
                                   {'location': '0.2636709443367138,41.7041015625', 'radius': '868km'},
                                   {'location': '-5.528510525692725,36.2548828125', 'radius': '868km'},
                                   {'location': '-5.528510525692725,36.2548828125', 'radius': '867km'},
                                   {'location': '-11.7813252961122,34.6728515625', 'radius': '1000km'}
                                 ];

  var southern_africa_locations = [ {'location': '-26.509904531413774,23.2470703125', 'radius': '980km'},
                                    {'location': '-22.99885159414276,24.3017578125', 'radius': '596km'},
                                    {'location': '-23.322080011378276,17.9736328125', 'radius': '596km'},
                                    {'location': '-28.84467368077164,24.6533203125', 'radius': '767km'}
                                  ];

  var middle_east_locations = [ {'location': '27.449790329784367,30.62988281255', 'radius': '767km'},
                                {'location': '35.96022296929685,35.2001953125', 'radius': '877km'},
                                {'location': '22.187404991398978,49.2626953125', 'radius': '1000km'},
                                {'location': '30.52441326992419,51.3720703125', 'radius': '1000km'},
                                {'location': '27.449790329784445,49.4384765625', 'radius': '1000km'}
                              ];

  var central_asia_locations = [ {'location': '45.64476821775213,59.6337890625', 'radius': '960km'},
                                 {'location': '46.13417004624344,70.7080078125', 'radius': '916km'},
                                 {'location': '44.150681159781115,63.3251953125', 'radius': '915km'},
                                 {'location': '46.49839225859783,67.7197265625', 'radius': '1000km'}
                               ];

  var south_asia_locations = [ { 'location': '30.977609093348967,68.4228515625', 'radius': '773km'},
                               {'location': '24.607069137709985,75.8056640625', 'radius': '773km'},
                               {'location': '19.559790136497703,79.3212890625', 'radius': '1000km'},
                               {'location': '21.043491216803858,75.8056640625', 'radius': '1000km'}
                             ];

  var east_asia_locations = [ {'location': '39.70718665682679,96.0205078125', 'radius': '1000km'},
                              {'location': '32.91648534731467,109.3798828125', 'radius': '1000km'},
                              {'location': '38.4793946732767,132.5830078125', 'radius': '900km'},
                              {'location': '36.949891786813545,88.1103515625', 'radius': '900km'},
                              {'location': '36.949891786813545,88.1103515625', 'radius': '900km'},
                              {'location': '35.96022296929698,136.4501953125', 'radius': '791km'},
                              {'location': '35.245619094207115,113.2470703125', 'radius': '1000km'},
                            ];

  var southeast_asia_locations = [ {'location': '17.978733095556194,99.228515625', 'radius': '629km'},
                                   {'location': '14.434680215297318,105.029296875', 'radius': '630km'},
                                   {'location': '1.0546279422759506,103.623046875', 'radius': '1000km'},
                                   {'location': '2.811371193331204,120.146484375', 'radius': '1000km'},
                                   {'location': '2.811371193331204,120.146484375', 'radius': '1000km'},
                                   {'location': '7.362466865535851,116.103515625', 'radius': '1000km'}
                                 ];

  var oceania_locations = [ {'location': '24.84656534821963,124.541015625', 'radius': '1000km'},
                            {'location': '-27.994401411046045,142.822265625', 'radius': '1000km'},
                            {'location': '-7.71099165543309,147.392578125', 'radius': '683km'},
                            {'location': '-39.909736234537085,171.298828125', 'radius': '835km'},
                            {'location': '-27.059125784374054,147.12890625', 'radius': '1000km'}
                          ];


  regions['none_selected'] = {'name': 'All', 'locations': false, 'radius': false}

  regions['north_america'] = {'name': 'North America', 'locations': north_america_locations };
  regions['central_america'] = {'name': 'Central America', 'locations': central_america_locations};
  regions['south_america'] = {'name': 'South America', 'locations': south_america_locations};

  regions['north_africa'] = {'name': 'North Africa', 'locations': north_africa_locations};
  regions['west_africa'] = {'name': 'West Africa', 'locations': west_africa_locations};
  regions['central_africa'] = {'name': 'Central Africa', 'locations': central_africa_locations};
  regions['eastern_africa'] = {'name': 'Eastern Africa', 'locations': eastern_africa_locations};
  regions['southern_africa'] = {'name': 'Southern Africa', 'locations': southern_africa_locations};

  regions['northern_europe'] = {'name': 'Northern Europe', 'locations': northern_europe_locations};
  regions['eastern_europe'] = {'name': 'Eastern Europe', 'locations': eastern_europe_locations};
  regions['southern_europe'] = {'name': 'Southern Europe', 'locations': southern_europe_locations};
  regions['western_europe'] = {'name': 'Western Europe', 'locations': western_europe_locations};

  regions['middle_east'] = {'name': 'Middle East', 'locations': middle_east_locations};
  regions['central_asia'] = {'name': 'Central Asia', 'locations': central_asia_locations};
  regions['south_asia'] = {'name': 'South Asia', 'locations': south_asia_locations};
  regions['east_asia'] = {'name': 'East Asia', 'locations': east_asia_locations};
  regions['southeast_asia'] = {'name': 'Southeast Asia', 'locations': southeast_asia_locations};

  regions['oceania'] = {'name': 'Oceania', 'location': oceania_locations};

  var ordered_regions = [regions['none_selected'], regions['north_america'], regions['central_america'], regions['south_america'], regions['north_africa'], regions['west_africa'], regions['central_africa'],regions['eastern_africa'],regions['southern_africa'],regions['northern_europe'],regions['eastern_europe'],regions['southern_europe'],regions['western_europe'],  regions['middle_east'],  regions['central_asia'], regions['south_asia'], regions['southeast_asia'], regions['east_asia'], regions['oceania']  ]
  var selected_ordered_region = 0;
  var selected_region = ordered_regions[selected_ordered_region];
  var safe_search_options = ['none', 'moderate', 'strict'];
  var selected_safe_search = 1;
  var failed_searches = 0;

  var generateVideoID = function(){
    var randomDate = function(){
      if(selected_region.locations){
        return new Date(new Date(2006, 6, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2006, 6, 1).getTime())).toISOString(); 
      }else{
        // return pre-2013 videos only when not doing a specific region search
        return new Date(new Date(2006, 6, 1).getTime() + Math.random() * (new Date(2012,12,31).getTime() - new Date(2006, 6, 1).getTime())).toISOString(); 
      }
    }

    var result;
    console.log('playing video uploaded before...' + randomDate() )

    $('#right_button, #skip_button').attr('disabled','disabled');
    
    if(selected_region.locations){
      var randlocation = selected_region.locations[Math.floor(Math.random()*selected_region.locations.length)];
      console.log('region selected is ' + selected_region.name + ' at ' + randlocation.location + ' radius: ' + randlocation.radius)
      //console.log('channel selected is ' + selected_channel.name + ', id number ' + selected_channel.id_number)
      if(selected_channel.id_number){
        $.get(
                "https://www.googleapis.com/youtube/v3/search", {
                    part: 'snippet',
                    q: '.3gp',
                    maxResults: 50,
                    order: 'date', 
                    publishedBefore: randomDate(),
                    videoDefinition: 'standard',
                    videoEmbeddable: 'true',
                    videoCategoryId: selected_channel.id_number,
                    safeSearch: safe_search_options[selected_safe_search],
                    location: randlocation.location,
                    locationRadius: randlocation.radius,
                    type: 'video',
                    key: 'private'
                },
                function(data) {
                  if(data.items.length ==0 || data.items.length ==false){
                    failed_searches +=1;
                    if(failed_searches > 5){
                      $('#searching_box').show();
                      $('#searching_box').html("<div><img src='./img/neg_emoticon.png'/></div><span>Nothing Found.</span>")
                      $('#right_button, #skip_button').removeAttr('disabled');
                      failed_searches = 0;
                      setTimeout(function() {
                        $('#searching_box').hide();
                        $('#searching_box').html("<div><img src='./img/searching_emoticon.png'></div><span>Searching...</span>")
                      }, 2000);
                      return;
                    }
                    $('#searching_box').show();
                    setTimeout(function() {
                      generateVideoID();
                    }, 1000);
                  }
                  else{
                    failed_searches = 0;
                    $('#right_button, #skip_button').removeAttr('disabled');
                    $('#searching_box').hide();
                    var random_number = randomNum(0, (data.items.length)-1);
                    createPlayer(String(data.items[random_number].id.videoId));
                  }
        });
      }else{
        $.get(
                "https://www.googleapis.com/youtube/v3/search", {
                    part: 'snippet',
                    q: '.3gp',
                    maxResults: 50,
                    order: 'date', 
                    publishedBefore: randomDate(),
                    videoDefinition: 'standard',
                    videoEmbeddable: 'true',
                    safeSearch: safe_search_options[selected_safe_search],
                    location: randlocation.location,
                    locationRadius: randlocation.radius,
                    type: 'video',
                    key: 'private'
                },
                function(data) {
                  if(data.items.length ==0 || data.items.length ==false){
                    failed_searches +=1;
                    if(failed_searches > 5){
                      $('#searching_box').show();
                      $('#searching_box').html("<div><img src='./img/neg_emoticon.png'/></div><span>Nothing Found.</span>")
                      $('#right_button, #skip_button').removeAttr('disabled');
                      failed_searches = 0;
                      setTimeout(function() {
                        $('#searching_box').hide();
                        $('#searching_box').html("<div><img src='./img/searching_emoticon.png'></div><span>Searching...</span>")
                      }, 2000);
                      return;
                    }
                    $('#searching_box').show();
                    setTimeout(function() {
                      generateVideoID();
                    }, 1000);
                  }
                  else{
                    failed_searches = 0;
                    $('#right_button, #skip_button').removeAttr('disabled');
                    $('#searching_box').hide();
                    var random_number = randomNum(0, (data.items.length)-1);
                    createPlayer(String(data.items[random_number].id.videoId));
                  }
        });
      }
    }
    else{
      if(selected_channel.id_number){
         $.get(
                "https://www.googleapis.com/youtube/v3/search", {
                    part: 'snippet',
                    q: '.3gp',
                    maxResults: 50,
                    order: 'date', 
                    publishedBefore: randomDate(),
                    videoDefinition: 'standard',
                    videoEmbeddable: 'true',
                    videoCategoryId: selected_channel.id_number,
                    safeSearch: safe_search_options[selected_safe_search],
                    type: 'video',
                    key: 'private'
                },
                function(data) {
                 if(data.items.length ==0 || data.items.length ==false){
                  $('#searching_box').show();
                  setTimeout(function() {
                    generateVideoID();
                  }, 1000);
                }
                else{
                    failed_searches = 0;
                    $('#right_button, #skip_button').removeAttr('disabled');
                    $('#searching_box').hide();
                    var random_number = randomNum(0, (data.items.length)-1);
                    createPlayer(String(data.items[random_number].id.videoId));
                 }

        });
      }else{
         $.get(
                "https://www.googleapis.com/youtube/v3/search", {
                    part: 'snippet',
                    q: '.3gp',
                    maxResults: 50,
                    order: 'date', 
                    publishedBefore: randomDate(),
                    videoDefinition: 'standard',
                    videoEmbeddable: 'true',
                    safeSearch: safe_search_options[selected_safe_search],
                    type: 'video',
                    key: 'private'
                },
                function(data) {
                 if(data.items.length ==0 || data.items.length ==false){
                  $('#searching_box').show();
                  setTimeout(function() {
                    generateVideoID();
                  }, 1000);
                }
                else{
                    failed_searches = 0;
                    $('#right_button, #skip_button').removeAttr('disabled');
                    $('#searching_box').hide();
                    var random_number = randomNum(0, (data.items.length)-1);
                    createPlayer(String(data.items[random_number].id.videoId));
                 }

        });
      }
    }
  };

  var createPlayer = function(videoID){
    if(player_created){
      player.pauseVideo();
      player.loadVideoById(videoID, 0, 'small')
    }
    else{
      player = new YT.Player('player', {
      height: '395',
      width: '352',
      videoId: videoID,
      playerVars: { 'autoplay': 1, 'controls': 0, 'fs': 0, 'modestbranding': 1, 'rel': 0, 'showinfo': 0 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
      });

    $('#logo_container').fadeTo( "slow", 0.25 );

    }
  }

  var player_volume = 80;
  var distance = 3;
  var player_created = false;
  var current_video_title = "";

  function onPlayerReady(event) { 
    player.setVolume(player_volume);
    player_created = true;
    current_video_title = event.target.getVideoData().title
    $('#video_title').text('Now Playing: ' + current_video_title);
    $('#video_title').simplemarquee({cycles: 10, handleHover: false});
    $('#current_id').html("<a href='https://www.youtube.com/watch?v="+event.target.getVideoData().video_id+ "' target='_blank'>"+ event.target.getVideoData().video_id +"</a>")
  }

  function onPlayerStateChange(event) { 
    if(current_video_title !== event.target.getVideoData().title){
      current_video_title = event.target.getVideoData().title
      $('#video_title').text('Now Playing: ' + current_video_title);
      $('#video_title').simplemarquee({cycles: 10, handleHover: false});
      $('#current_id').html("<a href='https://www.youtube.com/watch?v="+event.target.getVideoData().video_id+ "' target='_blank'>"+ event.target.getVideoData().video_id +"</a>")
    }

    if(event.data == YT.PlayerState.ENDED){
      generateVideoID();
    }
  }

  var createInteractiveElements = function(){

    var menu_open = false;
    var menu_options = ['options_volume', 'options_region', 'options_channel', 'options_safesearch', 'options_autoskip', 'options_new_window']
    var menu_option_selected = 0;


    generateVideoID();


    var changeSafeSearch = function(x){
      if(x=='up'){
        if(selected_safe_search == (safe_search_options.length-1) ){
          selected_safe_search = 0;
          $('#options_current_safesearch').text(safe_search_options[selected_safe_search]).css('textTransform', 'capitalize');
        }
        else{
          selected_safe_search+=1
          $('#options_current_safesearch').text(safe_search_options[selected_safe_search]).css('textTransform', 'capitalize');
        }

      }
      else if(x=='down'){
        if(selected_safe_search == 0 ){
          selected_safe_search = (safe_search_options.length-1);
          $('#options_current_safesearch').text(safe_search_options[selected_safe_search]).css('textTransform', 'capitalize');
        }
        else{
          selected_safe_search-=1
          $('#options_current_safesearch').text(safe_search_options[selected_safe_search]).css('textTransform', 'capitalize');
        }
      }
    }

    var startAutoskip = function(){
      if(autoskip){
        var rand = randomNum(10000,30000);
        setTimeout(function() {
          if(autoskip ){ 
            if(menu_open==false){
              generateVideoID();
            }
            startAutoskip(); 
          }
        }, rand);
      }
    }


    var changeAutoskip = function(){
      if(autoskip){
        $('#options_current_autoskip').text('Disabled')
        autoskip = false;
      }
      else
      {
        $('#options_current_autoskip').text('Enabled')
        autoskip = true;
        startAutoskip();
      }
    }

    var changeVolume = function(x){
      if(x=='up'){
        if(player_volume < 100){
          player_volume += 10;
          player.setVolume(player_volume);
          $('#options_volume_' + player_volume).addClass('yellow');
        }
      }
      else if(x=='down'){
        if(player_volume > 0){
          $('#options_volume_' + player_volume ).removeClass('yellow');
          player_volume -= 10;
          player.setVolume(player_volume);
        }
      }
    }

    var changeRegion = function(x){
      if(x=='up'){
        if(selected_ordered_region == ordered_regions.length-1){
          selected_ordered_region = 0;      
        }
        else{
          selected_ordered_region += 1;
        }
        selected_region = ordered_regions[selected_ordered_region];
        $('#options_current_region').text(selected_region.name);
      }
      else if(x=='down'){
        if(selected_ordered_region == 0){
          selected_ordered_region =  ordered_regions.length-1
        }
        else{
          selected_ordered_region -= 1;
        }
        selected_region = ordered_regions[selected_ordered_region];
        $('#options_current_region').text(selected_region.name);
      }
    }

    var changeChannel = function(x){
      if(x=='up'){
        if(selected_ordered_channel == ordered_channels.length-1){
          selected_ordered_channel = 0;      
        }
        else{
          selected_ordered_channel += 1;
        }
        selected_channel = ordered_channels[selected_ordered_channel];
        $('#options_current_channel').text(selected_channel.name);
      }
      else if(x=='down'){
        if(selected_ordered_channel == 0){
          selected_ordered_channel =  ordered_channels.length-1
        }
        else{
          selected_ordered_channel -= 1;
        }
        selected_channel = ordered_channels[selected_ordered_channel];
        $('#options_current_channel').text(selected_channel.name);
      }
    }

    $('#right_button, #skip_button').click(function(){
      $('#startbtn').text('Skip');
      $('#phone_splashscreen').hide();
      $('#player').show();
      $('#video_title').show();
      if($(this).attr('disabled') == 'disabled'){
        return;
      }
      else{
        generateVideoID();
        $('#right_button, #skip_button').attr('disabled','disabled');
        setTimeout(function() {
          $('#right_button, #skip_button').removeAttr('disabled');
        }, 750);
      }
    });


    var toggleKeypressSkip = function(x){
      if(x=='enable'){
        $(window).bind('keypress.key32', function(e){
            if(e.which == 32 && !(menu_open)){
              e.preventDefault()
              generateVideoID();
              toggleKeypressSkip('disable')
              setTimeout(function() {
                toggleKeypressSkip('enable')
              }, 750);
            }
        });
      }
      else if(x=='disable'){
        $(window).unbind('keypress.key32');
      }
    }

    toggleKeypressSkip('enable');

    var openMenu = function(){
      if(player.getPlayerState() == 1 || player.getPlayerState() == 0){
        $('#'+menu_options[menu_option_selected]).addClass('highlighted');
        $('#menu_screen, #skip_button, #right_button, #right_button_label').toggle();
        $('#searching_box').hide();
        player.pauseVideo();
        menu_open = true;
        $('#left_button_label').html('Back');
      }
      else if(player.getPlayerState() == 2){
        $('#'+menu_options[menu_option_selected]).addClass('highlighted');
        $('#menu_screen, #skip_button, #right_button, #right_button_label').toggle();
        player.playVideo();
        menu_open = false;
        $('#left_button_label').html('Menu');
      }
      else{
        return
      }
    }

    $(window).bind('keypress.key77', function(e){
      if(e.which == 109){
        openMenu();
      }
    });

    $('#left_button, #menu_button').click(function(){
      openMenu();
    });

    $('#about_button').click(function(){
      $('#about-box').toggle();
    })

    $('#close-about-box').click(function(){
      $('#about-box').hide();
    })

    var updateDistance = function(distance,still){
      TWEEN.removeAll();

      // zoom
      trackmouse = false;
      switch(distance) {
        case 1:
          new TWEEN.Tween( camera.position ).to( {
        
          z: 1500}, 500 ).onUpdate(function () {
          camera.lookAt(scene.position)}).onComplete(function(){if(!still){trackmouse=true;}}).start();

          new TWEEN.Tween( scene.position ).to( {
          x:0,
          y: 0,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene2.position ).to( {
          x:0,
          y: 0,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene3.position ).to( {
          x:0,
          y: 0,
          z: 0}, 500 ).start();

          break;
        case 2:
          new TWEEN.Tween( camera.position ).to( {
         
          z: 1250}, 500 ).onUpdate(function () {
          camera.lookAt(scene.position)}).onComplete(function(){if(!still){trackmouse=true;}}).start();

          new TWEEN.Tween( scene.position ).to( {
          x:0,
          y: 50,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene2.position ).to( {
          x:0,
          y: 50,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene3.position ).to( {
          x:0,
          y: 50,
          z: 0}, 500 ).start();

          break;
        case 3:

          new TWEEN.Tween( camera.position ).to( {
        
          z: 1000}, 500 ).onUpdate(function () {
          camera.lookAt(scene.position)}).onComplete(function(){if(!still){trackmouse=true;}}).start();

          new TWEEN.Tween( scene.position ).to( {
          x:0,
          y: 100,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene2.position ).to( {
          x:0,
          y: 100,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene3.position ).to( {
          x:0,
          y: 100,
          z: 0}, 500 ).start();

          break;
        case 4:

          new TWEEN.Tween( camera.position ).to( {
     
          z: 750}, 500 ).onUpdate(function () {
          camera.lookAt(scene.position)}).onComplete(function(){if(!still){trackmouse=true;}}).start();

          new TWEEN.Tween( scene.position ).to( {
          x:0,
          y: 125,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene2.position ).to( {
          x:0,
          y: 125,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene3.position ).to( {
          x:0,
          y: 125,
          z: 0}, 500 ).start();
          break;
        case 5:

          new TWEEN.Tween( camera.position ).to( {
    
          z: 500}, 500 ).onUpdate(function () {
          camera.lookAt(scene.position)}).onComplete(function(){if(!still){trackmouse=true;}}).start();

          new TWEEN.Tween( scene.position ).to( {
          x:0,
          y: 150,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene2.position ).to( {
          x:0,
          y: 150,
          z: 0}, 500 ).start();

          new TWEEN.Tween( scene3.position ).to( {
          x:0,
          y: 150,
          z: 0}, 500 ).start();
          break;
        default:
          break;
      } 
      $('#current_distance').html(distance);
    }

    $('#options_distance_up').click(function(){
      if(distance == 1){
        return;
      }
      else{
        distance-=1;
        updateDistance(distance,still);
      }
    })

    $('#options_distance_down, #current_distance').click(function(){
      if(distance == 5){
        return
      }
      else{
        distance+=1;
        updateDistance(distance,still);
      }
    })
    console.log($('#bgvid').html())
    $('#footer-close').click(function(){
      $('#footer').hide();
      $('#footer-triangle').hide();
      $('#footer-open').show();
    })

    $('#footer-open').click(function(){
      $('#footer').show();
      $('#footer-triangle').show();
      $('#footer-open').hide();
    })


    $('#options_distance_1').click(function(){
      distance = 1;
      updateDistance(distance,still)
    })

    $('#options_distance_2').click(function(){
      distance = 2;
      updateDistance(distance,still)
    })

    $('#options_distance_3').click(function(){
      distance = 3;
      updateDistance(distance,still)
    })

    $('#options_distance_4').click(function(){
      distance = 4;
      updateDistance(distance,still)
    })

    $('#options_distance_5').click(function(){
      distance = 5;
      updateDistance(distance,still)
    })


    $('#options_still_toggle').click(function(){
      if(still==false){
        still = true;
        trackmouse = false;

        new TWEEN.Tween( camera.position ).to( {
        x:0,
        y: 0}, 500 ).onUpdate(function () {
        camera.lookAt(scene.position)}).start();



        $(this).text('On')
      }else if(still){
        still = false;
        trackmouse = true;
        startMovementLoop();
        $(this).text('Off')
      }
    })

    var cinema_mode = false;
    var light = scene.getObjectByName( "main_light" );


    $('#cinema_mode_toggle').click(function(){
      if(cinema_mode){
        cinema_mode = false;
        $('#bgvid').fadeIn();
        $('#site_logo').fadeIn();
        light.intensity = 0.65;
        $(this).text('Off');
      }
      else{
        cinema_mode = true;
        $('#bgvid').fadeOut();
        $('#site_logo').fadeOut();
        light.intensity = 0.1;
        $(this).text('On');
      }
    })

    $('#options_volume_down, #options_volume_up, #options_region_down, #options_region_up, #options_channel_down, #options_channel_up, #options_safesearch_down, #options_safesearch_up, #options_autoskip_up, #options_autoskip_down').hover(function () {
      $(this).toggleClass("yellow");
    });


    $('#menu_button, #left_button').hover(function () {
      $('#left_button_label').addClass('yellow');
    }, function(){
      $('#left_button_label').removeClass('yellow');
    });

    $('#skip_button, #right_button').hover(function () {
      $('#right_button_label').addClass('yellow');
    }, function(){
      $('#right_button_label').removeClass('yellow');
    });

    $('#options_region_up, #options_current_region').click(function(){
      changeRegion('up'); 
    })

    $('#options_region_down').click(function(){
      changeRegion('down');
    })


    $('#options_channel_up, #options_current_channel').click(function(){
      changeChannel('up');
    })

    $('#options_channel_down').click(function(){
      changeChannel('down');
    })


    $('#options_volume_up').click(function(){
      changeVolume('up');
    })

    $('#options_volume_down').click(function(){
      changeVolume('down');
    });


    $('#inner_up_button, #inner_down_button, #inner_left_button, #inner_right_button').hover(function(){
      scene.getObjectByName('mainMesh').material.materials[31].color.setHex(0xCDCDCD); 
    }, function(){
      scene.getObjectByName('mainMesh').material.materials[31].color.setHex(0xffffff); 
    })

    $('#right_button').hover(function(){
      scene.getObjectByName('mainMesh').material.materials[20].color.setHex(0xCDCDCD); 
    }, function(){
      scene.getObjectByName('mainMesh').material.materials[20].color.setHex(0xffffff); 
    })

    $('#left_button').hover(function(){
      scene.getObjectByName('mainMesh').material.materials[21].color.setHex(0xCDCDCD); 
    }, function(){
      scene.getObjectByName('mainMesh').material.materials[21].color.setHex(0xffffff); 
    })

    $('#options_safesearch_up, #options_current_safesearch').click(function(){
      changeSafeSearch('up');
    })

    $('#options_safesearch_down').click(function(){
      changeSafeSearch('down');
    });

    $('#options_autoskip_up, #options_autoskip_down, #options_current_autoskip').click(function(){
      changeAutoskip();
    })

    $('#inner_down_button').click(function(){
      if(menu_open && !(menu_option_selected >= menu_options.length-1) ){
        $('#'+menu_options[menu_option_selected]).removeClass('highlighted');
        menu_option_selected+=1;
        $('#'+menu_options[menu_option_selected]).addClass('highlighted');
      }
    })

    $('#inner_up_button').click(function(){
      if(menu_open && !(menu_option_selected <= 0) ){
        $('#'+menu_options[menu_option_selected]).removeClass('highlighted');
        menu_option_selected-=1;
        $('#'+menu_options[menu_option_selected]).addClass('highlighted');
      }
    })

    $('#inner_right_button').click(function(){
      if(menu_open && menu_option_selected==0){
        changeVolume('down');
      }

      if(menu_open && menu_option_selected==1){
        changeRegion('down');
      }
      if(menu_open && menu_option_selected==2){
        changeChannel('down');
      }

      if(menu_open && menu_option_selected==3){
        changeSafeSearch('down');
      }

      if(menu_open&& menu_option_selected==4){
        changeAutoskip();
      }
    })

    $('#inner_left_button').click(function(){
      if(menu_open && menu_option_selected==0){
        changeVolume('up');
      }
      if(menu_open && menu_option_selected==1){
        changeRegion('up');
      }
      if(menu_open && menu_option_selected==2){
        changeChannel('up');
      }
      if(menu_open && menu_option_selected==3){
        changeSafeSearch('up');
      }
      if(menu_open && menu_option_selected==4){
        changeAutoskip();
      }
    })
  
    $( "#options_volume, #options_region, #options_safesearch, #options_channel, #options_autoskip, #options_new_window ").click(function(){
        $('#'+menu_options[menu_option_selected]).removeClass('highlighted');
        var selected_id = $(this).attr('id');
        menu_option_selected = menu_options.indexOf(selected_id)
         $('#'+menu_options[menu_option_selected]).addClass('highlighted');
      }
    );

    var disablescroll = false;

    $(window).on('mousewheel DOMMouseScroll', function (e) {
      if(!disablescroll){
        var direction = (function () {
            var delta = (e.type === 'DOMMouseScroll' ?
                         e.originalEvent.detail * -40 :
                         e.originalEvent.wheelDelta);

            return delta > 0 ? 0 : 1;
        }());

        if(direction === 1) {
           if(distance==1){
            return;
          }
          else{


           distance-=1
           updateDistance(distance,still)
           disablescroll=true;
           setTimeout(function(){ disablescroll=false }, 250);
         }
        }
        if(direction === 0) {
           if(distance==5){
            return
           }
           else{


           distance+=1
           updateDistance(distance,still)
           disablescroll=true;
           setTimeout(function(){ disablescroll=false }, 250);
         }
        }
        }else{
          return;
        }
    });


    screen_center_x = window.innerWidth/2;
    screen_center_y = window.innerHeight/2;
    var rotSpeed = .1 
    window.addEventListener( 'mousemove', mousemove, false );

    function mousemove( event ) {
      if(trackmouse){
   
        x_distance = event.clientX - screen_center_x
        y_distance = event.clientY - screen_center_y


        var x = camera.position.x,
            z = camera.position.z;

        if(  x_distance <= -900 || x_distance >= 900 ){
        }else{
          camera.position.x = -(x_distance/2 * Math.cos(rotSpeed) - z * Math.sin(rotSpeed));
        }

        if(  y_distance <= -500 || y_distance >= 500 ){
        }else{
          camera.position.y = y_distance/2 * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        }
        camera.lookAt(scene.position);
      }
    }

  };

  var update = function () {
    requestAnimationFrame( update );
  };

  requestAnimationFrame( update );


};


