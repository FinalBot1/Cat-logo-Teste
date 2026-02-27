import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { setupHighlight } from "./Highlight.js";

// =====================
// Setup inicial
// =====================
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

// =====================
// Variáveis globais
// =====================
let model = null;
let lastClickedMeshes = []; // Peças clicadas no 3D para Hide

// =====================
// Função para carregar modelo
// =====================
function loadModel(path = "Assets/GLB/286-14x14x90.glb") {
  const loader = new GLTFLoader();
  loader.load(path, (gltf) => {
    if (model) scene.remove(model);
    model = gltf.scene;
    scene.add(model);

    // Centralizar
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);
    model.position.y += size.y * 0.075;

    // Posicionar câmera
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 0.6;
    camera.position.set(cameraZ, cameraZ, cameraZ);
    camera.lookAt(0, 0, 0);

    // Reset última peça clicada
    lastClickedMeshes = [];
  });
}

// Carrega modelo inicial
loadModel();

// =====================
// Loop de animação
// =====================
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// =====================
// Responsivo
// =====================
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// =====================
// Botões
// =====================
const btnHome = document.querySelector('#coluna-botoes .top-buttons img[alt="Home"]');
btnHome.addEventListener("click", () => {
  window.location.href = "index.html";
});

const btn2D = document.querySelector('#coluna-botoes .top-buttons img[alt="2D"]');
btn2D.addEventListener("click", () => {
  window.open("Assets/PDF/C2849.pdf", "_blank");
});

const btnAssembly = document.querySelector('#coluna-botoes .middle-buttons img[alt="Assembly"]');
btnAssembly.addEventListener("click", () => {
  loadModel("Assets/GLB/286-14x14x90.glb");
});

const btnExplode = document.querySelector('#coluna-botoes .middle-buttons img[alt="Explode"]');
btnExplode.addEventListener("click", () => {
  loadModel("Assets/GLB/286-14x14x90-Explode.glb");
});

const btnHide = document.querySelector('#coluna-botoes .bottom-button img[alt="Hide"]');
btnHide.addEventListener("click", () => {
  if (lastClickedMeshes.length > 0) {
    lastClickedMeshes.forEach(mesh => {
      mesh.visible = false; // apenas invisível, não remove
    });
    lastClickedMeshes = [];
    // Reset highlight da lista
    if (window.resetHighlightSelection) window.resetHighlightSelection();
  }
});

// =====================
// Hover para trocar imagens (_Highlight)
// =====================
const allButtons = document.querySelectorAll('#coluna-botoes img');
allButtons.forEach(btn => {
  const originalSrc = btn.src;
  const highlightSrc = originalSrc.replace('.png', '_Highlight.png');

  btn.addEventListener('mouseenter', () => btn.src = highlightSrc);
  btn.addEventListener('mouseleave', () => btn.src = originalSrc);
});

// =====================
// Highlight e clique 3D
// =====================
setupHighlight(scene, camera, renderer);

// Salvar a última peça clicada ao clicar no 3D
renderer.domElement.addEventListener("click", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // ✅ Só considera meshes visíveis
  const intersects = raycaster.intersectObjects(scene.children, true)
    .filter(i => i.object.visible);

  if (intersects.length === 0) return;

  const clickedObject = intersects.find(i => i.object.isMesh)?.object;
  if (!clickedObject) return;

  lastClickedMeshes = [clickedObject]; // Salva a peça clicada
});

// =====================
// Hover para Close button (overlay)
// =====================
document.body.addEventListener('mouseover', (e) => {
  if (e.target && e.target.tagName === 'IMG' && e.target.src.includes('Close.png')) {
    const btn = e.target;
    const originalSrc = btn.src;
    const highlightSrc = originalSrc.replace('.png', '_Highlight.png');

    btn.addEventListener('mouseenter', () => btn.src = highlightSrc);
    btn.addEventListener('mouseleave', () => btn.src = originalSrc);
  }
});
