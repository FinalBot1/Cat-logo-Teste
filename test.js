import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let model;
let currentModelFile = "3D.glb"; // começa com 3D.glb
const container = document.getElementById("viewer3d");
const scene = new THREE.Scene();

// Mapas de peças para cada modelo
const partsMap = {
  "3D.glb": {
    corpo: "mesh_32",
    tampa: "11946-1",
    tampaFundo: "11939-1",
    garfo: "11938-1"
  },
  "CH5.glb": {
    corpo: "C1",
    tampa: "T1",
    tampaFundo: "S1",
    garfo: "D1"
  }
};

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
renderer.setClearColor(0xffffff, 1);
container.appendChild(renderer.domElement);

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Loader GLTF
const loader = new GLTFLoader();

// Função para carregar modelo
function loadModel(file) {
  if (model) {
    scene.remove(model);
    model.traverse((child) => {
      if (child.isMesh) child.geometry.dispose();
    });
  }

  currentModelFile = file;

  loader.load(file, (gltf) => {
    model = gltf.scene;
    scene.add(model);


// Listar todos os objetos do modelo no console
model.traverse((child) => {
  if (child.isMesh) {
    console.log("Peça encontrada:", child.name);
  }
});


    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);

    const maxY = size.y;
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = maxY / (2 * Math.tan(fov / 2));
    cameraZ *= 1.2;
    camera.position.set(cameraZ, cameraZ, cameraZ);
    camera.lookAt(0, 0, 0);

    controls.update();
  });
}

// Carregar modelo inicial
loadModel("3D.glb");

// Funções de highlight
function clearAllHighlights() {
  if (!model) return;
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.emissive.set(0x000000);
    }
  });
  document.querySelectorAll("#btnCorpo, #btnTampa, #btnTampaFundo, #btnGarfo")
    .forEach(el => el.style.color = "black");
}

function highlightPart(partKey, labelId, fix = false) {
  if (!model) return;
  clearAllHighlights();

  const partName = partsMap[currentModelFile][partKey];
  const part = model.getObjectByName(partName);

  if (part && part.material) {
    part.material.emissive.set(0xff0000);
  }
  const label = document.getElementById(labelId);
  if (label) {
    label.style.color = "red";
  }
  if (!fix) {
    label.addEventListener("mouseleave", clearAllHighlights, { once: true });
  }
}

// Eventos de hover nos labels (usando keys genéricas)
document.getElementById("btnCorpo").addEventListener("mouseenter", () => highlightPart("corpo", "btnCorpo"));
document.getElementById("btnTampa").addEventListener("mouseenter", () => highlightPart("tampa", "btnTampa"));
document.getElementById("btnTampaFundo").addEventListener("mouseenter", () => highlightPart("tampaFundo", "btnTampaFundo"));
document.getElementById("btnGarfo").addEventListener("mouseenter", () => highlightPart("garfo", "btnGarfo"));

// Clique no 3D
renderer.domElement.addEventListener("click", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(model.children, true);

  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    const map = partsMap[currentModelFile];

    if (clicked.name === map.corpo) highlightPart("corpo", "btnCorpo", true);
    else if (clicked.name === map.tampa) highlightPart("tampa", "btnTampa", true);
    else if (clicked.name === map.tampaFundo) highlightPart("tampaFundo", "btnTampaFundo", true);
    else if (clicked.name === map.garfo) highlightPart("garfo", "btnGarfo", true);
    else clearAllHighlights();
  } else {
    clearAllHighlights();
  }
});

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsividade
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Botões de troca de modelo
document.getElementById("btnLoad3D").addEventListener("click", () => loadModel("3D.glb"));
document.getElementById("btnLoadCH5").addEventListener("click", () => loadModel("CH5.glb"));