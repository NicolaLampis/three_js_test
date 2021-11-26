import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';        
// import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
        

let canvas = document.querySelector("div#canvas");


var scene, camera, renderer;

init();

function init(){
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0, -5, 15);
  
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);
  
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set( 2, 10, 10);
  scene.add(light);

  const environMap = new THREE.CubeTextureLoader().setPath('images/').load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
  scene.background = environMap;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  canvas.appendChild( renderer.domElement );
       

  const controls = new OrbitControls( camera, renderer.domElement ); // don't write >>> new THREE.OrbitControls
  controls.target.set(0,-1,0);
  controls.update();
  
  //Add meshes here
  const capsule = new THREE.Group();
  scene.add(capsule);

  const geometry = new THREE.SphereGeometry(2, 30, 20, 0, Math.PI * 2, 0, Math.PI/2);
  const material = new THREE.MeshLambertMaterial({wireframe:false, envMap:environMap});
  const sphere = new THREE.Mesh(geometry, material);
  capsule.add(sphere);

  const geometry2 = new THREE.CylinderGeometry(2, 2, 8, 30, 1, true);  
  const cylinder = new THREE.Mesh(geometry2, material);
  capsule.add(cylinder);

  sphere.position.y = 4;

  capsule.rotation.z = Math.PI/4

  const sphere2 = sphere.clone();
  sphere2.rotation.z = Math.PI;
  sphere2.position.y = -4;
  capsule.add(sphere2);

  const capsule2 = capsule.clone();
  capsule2.rotation.z = Math.PI/2;  
  capsule.add(capsule2);


  
  window.addEventListener( 'resize', resize, false);
  
  update();
}

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}