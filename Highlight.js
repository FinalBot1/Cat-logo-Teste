import * as THREE from "three";
import { showMaterialOverlay } from "./Material.js";

/* =========================
   MAPA DE PEÇAS (GLB)
========================= */
const partsMap = {
  "Corpo": ["Corpo_1-1"],
  "Castelo": ["mesh_20_2"],
  "Sede": ["mesh_15_3"],
  "Disco": ["mesh_31_1"],
  "Haste": ["Haste-13019-1"],
  "Preme-Gaxeta": ["Preme_18x18-1"],
  "Trava da Haste": ["3026-1"],
  "Bucha da Haste": ["mesh_47"],
  "Rolamento": ["Rolamento-1", "Rolamento-2"],
  "Suporte da Trava": ["Mesh_10"],
  "Volante Trava": ["7925-1"],
  "Volante da Haste": ["3023-1"],
  "Proteção da Haste": [
    "Chapa_de_proteção-1",
    "MirrorChapa_de_proteção-1"
  ],
  "Anel Raspador": ["3008-1"],
  "Anéis de Gaxeta": [
    "mesh_36_1",
    "mesh_34_1",
    "mesh_23_1",
    "mesh_26_1",
    "mesh_22_1",
    "mesh_25_1"
  ],
  "Junta": ["Junta-1"],
  "Atuador Penta-410": ["mesh_49_4", "mesh_49"],
};

/* =========================
   CONFIGURAÇÃO VISUAL
========================= */
const defaultColor = "#333";
const highlightColor = "#ff7a00";
const highlightBackground = "#ffffff";

/* Cores 3D */
const hoverColor = new THREE.Color(0x66ff66);
const hoverIntensity = 0.6;

const selectedColor = new THREE.Color(0x39ff14);
const selectedIntensity = 1.3;

/* =========================
   FUNÇÃO PRINCIPAL
========================= */
export function setupHighlight(scene, camera, renderer) {

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const lista = document.getElementById("lista-pecas");

  const spans = Array.from(lista.getElementsByTagName("span"))
    .filter(span => !span.classList.contains("titulo"));

  let selectedName = null;
  let selectedMeshes = [];
  let hoverMeshes = [];
  let hoverSpan = null;

  /* ---------- Reset lista ---------- */
  function resetListStyles() {
    spans.forEach(span => {
      span.style.color = defaultColor;
      span.style.backgroundColor = "transparent";
      span.style.padding = "0";
      span.style.borderRadius = "0";
      span.style.fontWeight = "normal";
    });
  }

  /* ---------- Reset emissive ---------- */
  function clearMeshes(meshArray) {
    meshArray.forEach(mesh => {
      if (mesh.material && mesh.material.emissive !== undefined) {
        mesh.material.emissive.set(0x000000);
        mesh.material.emissiveIntensity = 0;
      }
    });
  }

  function resetHover() {
    clearMeshes(hoverMeshes);
    hoverMeshes = [];

    if (hoverSpan && hoverSpan !== selectedName) {
      hoverSpan.style.color = defaultColor;
      hoverSpan.style.backgroundColor = "transparent";
      hoverSpan.style.padding = "0";
      hoverSpan.style.borderRadius = "0";
      hoverSpan.style.fontWeight = "normal";
    }

    hoverSpan = null;
  }

  function resetSelection() {
    clearMeshes(selectedMeshes);
    selectedMeshes = [];
    selectedName = null;
  }

  /* ---------- Mostrar/ocultar peças 3D ---------- */
  function showOnlySelected(meshNames) {
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.visible = meshNames.includes(obj.name);
      }
    });
  }

  function showAllMeshes() {
    scene.traverse(obj => {
      if (obj.isMesh) obj.visible = true;
    });
  }

  /* ---------- Aplicar emissive ---------- */
  function applyEmissive(meshNameList, color, intensity, targetArray) {
    scene.traverse(obj => {
      if (
        obj.isMesh &&
        meshNameList.includes(obj.name) &&
        obj.material &&
        obj.material.emissive !== undefined
      ) {
        obj.material.emissive.set(color);
        obj.material.emissiveIntensity = intensity;
        targetArray.push(obj);
      }
    });
  }

  /* ---------- Aplicar destaque lista ---------- */
  function applyHighlightByName(name) {
    spans.forEach(span => {
      if (span.textContent.trim() === name) {
        span.style.color = highlightColor;
        span.style.backgroundColor = highlightBackground;
        span.style.padding = "3px 8px";
        span.style.borderRadius = "6px";
        span.style.fontWeight = "600";
      }
    });
  }

  /* =========================
     CLIQUE NO 3D
  ========================= */
  renderer.domElement.addEventListener("click", (event) => {

    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    resetListStyles();
    resetHover();
    resetSelection();

    if (intersects.length === 0) return;

    let clickedObject = intersects.find(i => i.object.isMesh)?.object;
    if (!clickedObject) return;

    const clickedMeshName = clickedObject.name;

    for (const [listName, meshNames] of Object.entries(partsMap)) {
      if (meshNames.includes(clickedMeshName)) {

        selectedName = listName;
        selectedMeshes = [];

        applyHighlightByName(listName);
        applyEmissive(meshNames, selectedColor, selectedIntensity, selectedMeshes);

        break;
      }
    }

  });

  /* =========================
     EVENTOS NA LISTA
  ========================= */
  spans.forEach(span => {

    span.style.cursor = "pointer";

    const name = span.textContent.trim();
    const meshNames = partsMap[name];
    if (!meshNames) return;

    /* 🔥 HOVER */
    span.addEventListener("mouseenter", () => {
      if (selectedName === name) return;

      resetHover();
      hoverSpan = span;

      span.style.color = highlightColor;
      span.style.backgroundColor = highlightBackground;
      span.style.padding = "3px 8px";
      span.style.borderRadius = "6px";
      span.style.fontWeight = "600";

      applyEmissive(meshNames, hoverColor, hoverIntensity, hoverMeshes);
    });

    span.addEventListener("mouseleave", () => {
      resetHover();

      if (selectedName) {
        applyHighlightByName(selectedName);
      }
    });

    /* 🔥 CLIQUE NA LISTA (ISOLAR PEÇA + MATERIAL) */
    span.addEventListener("click", () => {

      resetListStyles();
      resetHover();
      resetSelection();

      selectedName = name;
      selectedMeshes = [];

      // 🔹 Destacar apenas o span
      applyHighlightByName(name);

      // 🔹 Ocultar todas as outras peças e mostrar apenas a selecionada
      showOnlySelected(meshNames);

      // 🔹 Mostrar overlay de material se for "Corpo"
      showMaterialOverlay(
        name,
        spans,
        scene,
        showAllMeshes,
        resetSelection,
        resetHover,
        resetListStyles
      );

      // ⚠️ Não aplicar emissive (não ascender) na peça
    });

  });

}