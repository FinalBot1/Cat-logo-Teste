import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("viewer3d");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdff5e1);

// Câmera
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Loader
const loader = new GLTFLoader();

// 🔥 Carrega automaticamente o 3D.glb
loader.load("/Assets/GLB/286-14x14x90.glb", (gltf) => {

  const model = gltf.scene;
  scene.add(model);

  // Centralizar modelo
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);

// 🔥 Deslocamento vertical para subir o modelo
const offsetY = size.y * 0.075; // ajuste a porcentagem conforme desejar
model.position.y += offsetY;

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
  cameraZ *= 0.6;

  camera.position.set(cameraZ, cameraZ, cameraZ);
  camera.lookAt(0, 0, 0);

});

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Responsivo
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});


// Importar Highlitght
import { setupHighlight } from "./Highlight.js";

// Após carregar o modelo e configurar a cena:
setupHighlight(scene, camera, renderer);
