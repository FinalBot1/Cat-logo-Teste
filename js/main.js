import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('viewer3d'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Carregar modelo GLB
const loader = new GLTFLoader();
loader.load('3D.glb', function(gltf) {
  scene.add(gltf.scene);

  // Centraliza e ajusta a câmera automaticamente
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  gltf.scene.position.sub(center);  // centraliza no mundo

  const size = box.getSize(new THREE.Vector3()).length();
  const fov = camera.fov * (Math.PI / 180);
  let distance = size / (2 * Math.tan(fov / 2));
  distance *= 1.5;  // margem extra
  camera.position.set(0, distance * 0.5, distance);
  camera.lookAt(0, 0, 0);

}, undefined, function(error) {
  console.error(error);
});

// Responsividade
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
