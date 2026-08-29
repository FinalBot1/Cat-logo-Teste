import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { modelFile, partsData } from "./AS1A_3D_DB.js";
import { explosionSteps } from "./AS1A_3D_Position.js"; 

let itemSelecionado = null;
let meshSelecionada = null;
let meshesMap = {}; 
let originalPositions = {}; 

window.highlightMesh3D = function(meshName, status) {
    Object.keys(meshesMap).forEach(name => {
        const mesh = meshesMap[name];
        if (mesh && mesh.material) {
            
            if (!mesh._originalEmissive) mesh._originalEmissive = mesh.material.emissive.clone();
            if (mesh._originalOpacity === undefined) mesh._originalOpacity = mesh.material.opacity !== undefined ? mesh.material.opacity : 1.0;
            if (mesh._originalTransparent === undefined) mesh._originalTransparent = mesh.material.transparent !== undefined ? mesh.material.transparent : false;

            if (status === "clear") {
                mesh.material.emissive.copy(mesh._originalEmissive);
                mesh.material.opacity = mesh._originalOpacity;
                mesh.material.transparent = mesh._originalTransparent;
            } else {
                const meshesSelecionadas =
    Array.isArray(meshName)
        ? meshName
        : [meshName];

if (meshesSelecionadas.includes(name)) {

    mesh.material.transparent = false;
    mesh.material.opacity = 0.1;

    if (status === "click") {

        mesh.material.emissive.copy(mesh._originalEmissive);

    } else if (status === "hover") {

        mesh.material.emissive.setHex(0xff5c00);

    }

} else {
                    
                    if (status === "click") {
                        mesh.material.transparent = true;
                        mesh.material.opacity = 0.1; 
                    } else {
                        mesh.material.transparent = mesh._originalTransparent;
                        mesh.material.opacity = mesh._originalOpacity;
                    }
                    mesh.material.emissive.copy(mesh._originalEmissive);
                }
            }
            mesh.material.needsUpdate = true; 
        }
    });
};

document.addEventListener("click", (event) => {
    const container3D = document.getElementById("viewer3d");
    const partListEl = document.getElementById("PartList-body");
    const partInfoEl = document.getElementById("PartInfo");
    const menuFlutuanteEl = document.getElementById("menuFlutuante3D");

    
    if (
        (container3D && container3D.contains(event.target)) ||
        (partListEl && partListEl.contains(event.target)) ||
        (partInfoEl && partInfoEl.contains(event.target)) ||
        (menuFlutuanteEl && menuFlutuanteEl.contains(event.target))
    ) {
        return;
    }

    if (itemSelecionado) {
        itemSelecionado.style.backgroundColor = "";
        window.highlightMesh3D(meshSelecionada, "clear");
        itemSelecionado = null;
        meshSelecionada = null;
        
        if (typeof partInfo !== "undefined") {
            partInfo.style.display = "none";
            partInfoImg.src = "";
        }
    }
});

// Remove o destaque se o mouse se mover para fora dos elementos principais (Corrigido)
document.addEventListener("mousemove", (event) => {
    const container3D = document.getElementById("viewer3d");
    const partListEl = document.getElementById("PartList-body");
    const partInfoEl = document.getElementById("PartInfo");
    const menuFlutuanteEl = document.getElementById("menuFlutuante3D");

    
    const noPartInfo = partInfoEl && (partInfoEl === event.target || partInfoEl.contains(event.target));
    const noContainer = container3D && container3D.contains(event.target);
    const noPartList = partListEl && partListEl.contains(event.target);
    const noMenuFlutuante = menuFlutuanteEl && (menuFlutuanteEl === event.target || menuFlutuanteEl.contains(event.target));

    
    if (noContainer || noPartList || noPartInfo || noMenuFlutuante) {
        return;
    }

    
    if (typeof clicouNoInfo !== "undefined" && clicouNoInfo) {
        return;
    }

    
    if (itemSelecionado) {
        itemSelecionado.style.backgroundColor = "";
        window.highlightMesh3D(meshSelecionada, "clear");
        itemSelecionado = null;
        meshSelecionada = null;
        
        if (typeof partInfo !== "undefined") {
            partInfo.style.display = "none";
            partInfoImg.src = "";
        }
    }
});

const container = document.getElementById("viewer3d");


const partInfo = document.createElement("div");
partInfo.id = "PartInfo";
partInfo.style.position = "absolute";
partInfo.style.top = "0.5vw";
partInfo.style.left = "2.5vw";
partInfo.style.width = "21.0vw";
partInfo.style.height = "calc(21.0vw * 1.67)";
partInfo.style.display = "none"; 
partInfo.style.zIndex = "100";

partInfo.style.pointerEvents = "auto"; 

const partInfoImg = document.createElement("img");
partInfoImg.style.width = "100%";
partInfoImg.style.height = "100%";
partInfoImg.style.display = "block";
partInfoImg.style.objectFit = "contain";
partInfoImg.style.cursor = "pointer"; 


let pdfAtivo = "";

// Abre o PDF correspondente em uma nova guia ao clicar na imagem
partInfoImg.addEventListener("click", () => {
    if (pdfAtivo) {
        window.open(pdfAtivo, "_blank");
    }
});


const btnFechar = document.createElement("button");
btnFechar.textContent = "Fechar";
btnFechar.style.position = "absolute";
btnFechar.style.top = "0.5vw";
btnFechar.style.right = "0.5vw";
btnFechar.style.padding = "4px 8px";
btnFechar.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
btnFechar.style.color = "#ffffff";
btnFechar.style.border = "none";
btnFechar.style.borderRadius = "4px";
btnFechar.style.cursor = "pointer";
btnFechar.style.fontSize = "0.8vw";
btnFechar.style.zIndex = "101";


btnFechar.addEventListener("click", (event) => {
    event.stopPropagation(); 

    if (itemSelecionado) {
        itemSelecionado.style.backgroundColor = "";
        window.highlightMesh3D(meshSelecionada, "clear");
        itemSelecionado = null;
        meshSelecionada = null;
    }
    
    
    partInfo.style.display = "none";
    partInfoImg.src = "";
});

partInfo.appendChild(partInfoImg);
partInfo.appendChild(btnFechar);
container.appendChild(partInfo);

const scene = new THREE.Scene();

const temaSalvo =
    localStorage.getItem("temaEscuro");

scene.background = new THREE.Color(
    temaSalvo === "true"
        ? 0x6E6E6E
        : 0xf5f5f5
);

window.alterarTema3D = function(corHex){

    scene.background =
        new THREE.Color(corHex);

};

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.01, 
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);

scene.add(
    new THREE.AmbientLight(0xffffff, 0.7)
);

const dirLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;


const partListBody =
    document.getElementById(
        "PartList-body"
    );

partsData.forEach((part, index) => {

    const item =
        document.createElement("div");

    item.className = "partList-item";
    item.textContent = part.name; 
    
    const meshName = part.mesh; 
    
    
    part.element = item;

    
    item.addEventListener("mouseenter", () => {
        if (itemSelecionado !== item) {
            item.style.setProperty("background-color", "#ffe0b2", "important");
            window.highlightMesh3D(meshName, "hover");
        }
    });

    
    item.addEventListener("mouseleave", () => {
        if (itemSelecionado !== item) {
            item.style.backgroundColor = "";
            
            if (itemSelecionado && meshSelecionada) {
                window.highlightMesh3D(meshSelecionada, "click");
            } else {
                window.highlightMesh3D(meshName, "clear");
            }
        }
    });

    
    item.addEventListener("click", (event) => {
        event.stopPropagation();

        if (itemSelecionado) {
            itemSelecionado.style.backgroundColor = "";
            window.highlightMesh3D(meshSelecionada, "clear");
        }

        itemSelecionado = item;
        meshSelecionada = meshName;

        item.style.setProperty("background-color", "#90cbee", "important");
        window.highlightMesh3D(meshName, "click");

        
        if (part.image) {
            partInfoImg.src = part.image;
            pdfAtivo = part.pdf || "";
            partInfo.style.display = "block";
        }
    });

    partListBody.appendChild(item);

});



const loadingOverlay3D = document.getElementById("loadingOverlay3D");
const loadingPercentTexto = document.getElementById("loadingPercentTexto");

function atualizarCarregamento3D(xhr){

    if(!loadingPercentTexto) return;

    if(xhr.lengthComputable){

        const percentual =
            Math.round((xhr.loaded / xhr.total) * 100);

        loadingPercentTexto.textContent =
            "Carregando modelo 3D... " + percentual + "%";

    } else {

        const mb =
            (xhr.loaded / (1024 * 1024)).toFixed(1);

        loadingPercentTexto.textContent =
            "Carregando modelo 3D... " + mb + " MB";
    }

}

function esconderCarregamento3D(){

    if(!loadingOverlay3D) return;

    loadingOverlay3D.style.opacity = 0;

    setTimeout(()=>{
        loadingOverlay3D.style.display = "none";
    }, 300);

}

function loadModel() {

    const loader = new GLTFLoader();

    loader.load(
        modelFile,
        (gltf) => {

            const model = gltf.scene;

            scene.add(model);

            
            model.traverse((child) => {
                if (child.isMesh) {
                    meshesMap[child.name] = child;
                    originalPositions[child.name] = child.position.clone();
                    if (child.material) {
                        child.material = child.material.clone(); 
                    }
                }
            });

            const box =
                new THREE.Box3()
                .setFromObject(model);

            const center =
                box.getCenter(
                    new THREE.Vector3()
                );

            const size =
                box.getSize(
                    new THREE.Vector3()
                );

            model.position.sub(center);
            model.position.y += size.y * -0.11;

            const maxDim =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );

            const fov =
                camera.fov *
                Math.PI / 180;

            let cameraZ =
                Math.abs(
                    maxDim / 2 /
                    Math.tan(fov / 2)
                );

            cameraZ *= 0.52;

            camera.position.set(
                cameraZ,
                cameraZ,
                cameraZ
            );

            
            
             controls.minDistance = size.length() * 0.05; 
            
             controls.maxDistance = Infinity;

            controls.update();

             const posicaoInicialZ = cameraZ;

            
            window.afastarCamera3D = function() {
                const novoZ = posicaoInicialZ * (2.2 / 1.1); 
                camera.position.set(novoZ, novoZ, novoZ);
                controls.update();
            };

            
            window.resetarCamera3D = function() {
                camera.position.set(posicaoInicialZ, posicaoInicialZ, posicaoInicialZ);
                controls.update();
            };

            
            setupSliderAnimation();

            esconderCarregamento3D();
        },
        (xhr) => {

            atualizarCarregamento3D(xhr);

        },
        (error) => {

            console.error("Erro ao carregar o modelo 3D:", error);

        }
    );

}

function setupSliderAnimation() {
    const slider = document.getElementById("slider3d");
    if (!slider) return;

    slider.addEventListener("input", (e) => {
        const valorSlider = parseFloat(e.target.value); 
        const totalPassos = explosionSteps.length;
        
        
        const fatiaPorPasso = 100 / totalPassos;

        
        Object.keys(originalPositions).forEach(nome => {
            const mesh3d = meshesMap[nome];
            const posOriginal = originalPositions[nome];
            if (mesh3d && posOriginal) {
                mesh3d.position.copy(posOriginal);
            }
        });

        explosionSteps.forEach((step, index) => {
            
            const inicioPasso = index * fatiaPorPasso;
            const fimPasso = (index + 1) * fatiaPorPasso;

            
            let progressoPasso = 0;
            if (valorSlider > inicioPasso) {
                progressoPasso = (valorSlider - inicioPasso) / fatiaPorPasso;
                if (progressoPasso > 1) progressoPasso = 1; 
            }

            
            const itensPassoBruto = Array.isArray(step.mesh) ? step.mesh : [step.mesh];

            
            const itensPasso = [];
            itensPassoBruto.forEach(item => {
                if (item && typeof item === "object" && Array.isArray(item.names)) {
                    
                    item.names.forEach(nomeDoGrupo => {
                        itensPasso.push({
                            name: nomeDoGrupo,
                            localDirection: item.localDirection,
                            worldDirection: item.worldDirection,
                            axis: item.axis,
                            distance: item.distance
                        });
                    });
                } else {
                    itensPasso.push(item);
                }
            });

            itensPasso.forEach(item => {

                
                const ehObjeto = typeof item === "object" && item !== null;

                const nome = ehObjeto ? item.name : item;
                const localDirectionItem = ehObjeto && item.localDirection ? item.localDirection : null;
                const worldDirectionItem = ehObjeto && item.worldDirection ? item.worldDirection : null;
                const axisItem = ehObjeto && item.axis ? item.axis : null;
                const distanceItem = (ehObjeto && item.distance !== undefined && item.distance !== null) ? item.distance : step.distance;

                const mesh3d = meshesMap[nome];
                const posOriginal = originalPositions[nome];

                if (!mesh3d || !posOriginal) return;

                const deslocamento = (distanceItem || 0) * progressoPasso;
                if (!deslocamento) return;

                // 1) Direção do deslocamento, sempre resolvida em ESPAÇO DE MUNDO:
                //    - localDirection: gira junto com a rotação própria da peça
                //      (prioridade: item > step)
                //    - worldDirection: vetor livre, fixo no mundo, ignora a rotação da peça
                //    - axis: eixo cardeal fixo no mundo (x/y/z)
                let dirMundo = null;

                if (localDirectionItem) {
                    dirMundo = new THREE.Vector3(
                        localDirectionItem.x || 0,
                        localDirectionItem.y || 0,
                        localDirectionItem.z || 0
                    ).normalize().applyQuaternion(mesh3d.getWorldQuaternion(new THREE.Quaternion()));
                } else if (worldDirectionItem) {
                    dirMundo = new THREE.Vector3(worldDirectionItem.x || 0, worldDirectionItem.y || 0, worldDirectionItem.z || 0).normalize();
                } else if (axisItem) {
                    dirMundo = new THREE.Vector3(axisItem === "x" ? 1 : 0, axisItem === "y" ? 1 : 0, axisItem === "z" ? 1 : 0);
                } else if (step.worldDirection) {
                    dirMundo = new THREE.Vector3(step.worldDirection.x || 0, step.worldDirection.y || 0, step.worldDirection.z || 0).normalize();
                } else if (step.axis) {
                    dirMundo = new THREE.Vector3(step.axis === "x" ? 1 : 0, step.axis === "y" ? 1 : 0, step.axis === "z" ? 1 : 0);
                } else if (step.localDirection) {
                    dirMundo = new THREE.Vector3(
                        step.localDirection.x || 0,
                        step.localDirection.y || 0,
                        step.localDirection.z || 0
                    ).normalize().applyQuaternion(mesh3d.getWorldQuaternion(new THREE.Quaternion()));
                }

                if (!dirMundo) return;

                // 2) mesh3d.position é relativo ao PAI da peça, não ao mundo.
                //    Neste modelo, grupos como "Bloco", "51115" e
                //    "Penta-410_Bloco_3D" têm rotação própria (até 90°) — somar o
                //    vetor de mundo direto na position fazia a peça andar torta.
                //    Convertendo a direção para o espaço local do pai, o
                //    deslocamento fica reto no mundo não importa a rotação do pai
                //    ou da própria peça.
                let dirNoPai = dirMundo;
                if (mesh3d.parent) {
                    const quatPaiInv = mesh3d.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
                    dirNoPai = dirMundo.clone().applyQuaternion(quatPaiInv);
                }
                mesh3d.position.addScaledVector(dirNoPai, deslocamento);
            });
        });
    });
}
loadModel();

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }
);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const menuFlutuante = document.createElement("div");
menuFlutuante.id = "menuFlutuante3D";
menuFlutuante.style.cssText = `
    position: fixed;
    display: none;
    flex-direction: column;
    gap: 6px;
    background: rgba(255, 255, 255, 0.98);
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 9999;
    border: 1px solid #bbb;
`;

const btnOcultar = document.createElement("button");
btnOcultar.textContent = "Ocultar";
btnOcultar.style.cssText = "padding: 5px 12px; cursor: pointer; border: 1px solid #aaa; border-radius: 3px; background: #fff; font-weight: bold; font-size: 12px;";

const btnMostrarTodos = document.createElement("button");
btnMostrarTodos.textContent = "Mostrar Todos";
btnMostrarTodos.style.cssText = "padding: 5px 12px; cursor: pointer; border: 1px solid #aaa; border-radius: 3px; background: #fff; font-weight: bold; font-size: 12px;";

menuFlutuante.appendChild(btnOcultar);
menuFlutuante.appendChild(btnMostrarTodos);
document.body.appendChild(menuFlutuante);


function fecharMenuFlutuante() {
    menuFlutuante.style.display = "none";
}


document.addEventListener("click", (event) => {
    if (!menuFlutuante.contains(event.target)) {
        fecharMenuFlutuante();
    }
});


document.addEventListener("mousemove", (event) => {
    if (menuFlutuante.style.display === "flex") {
        const noViewer = container.contains(event.target);
        const noMenu = menuFlutuante.contains(event.target);
        
        if (!noViewer && !noMenu) {
            fecharMenuFlutuante();
        }
    }
});


btnOcultar.addEventListener("click", (e) => {
    e.stopPropagation();
    if (meshSelecionada && meshesMap[meshSelecionada]) {
        meshesMap[meshSelecionada].visible = false;
        fecharMenuFlutuante();
        if (itemSelecionado) {
            itemSelecionado.style.backgroundColor = "";
            window.highlightMesh3D(meshSelecionada, "clear");
            itemSelecionado = null;
            meshSelecionada = null;
        }
    }
});

btnMostrarTodos.addEventListener("click", (e) => {
    e.stopPropagation();
    Object.keys(meshesMap).forEach(name => {
        if (meshesMap[name]) meshesMap[name].visible = true;
    });
    if (meshSelecionada) {
        window.highlightMesh3D(meshSelecionada, "contextmenu");
    }
    fecharMenuFlutuante();
});


function processarSelecao3D(clientX, clientY, mostrarMenu, event) {
    if (event.target !== renderer.domElement) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

const objetosVisiveis = Object.values(meshesMap).filter(mesh => mesh.visible);

const intersects = raycaster.intersectObjects(objetosVisiveis, false);

    if (intersects.length > 0) {
        const objetoClicado = intersects[0].object;
        const nomeMesh = objetoClicado.name;
const partCorrespondente =
    partsData.find(p => {

        if (Array.isArray(p.mesh)) {
            return p.mesh.includes(nomeMesh);
        }

        return p.mesh === nomeMesh;

    });

        if (partCorrespondente && partCorrespondente.element) {
            
            if (typeof partInfo !== "undefined") {
                partInfo.style.display = "none";
                partInfoImg.src = "";
            }

            const itemHTML = partCorrespondente.element;

            if (itemSelecionado) {
                itemSelecionado.style.backgroundColor = "";
                window.highlightMesh3D(meshSelecionada, "clear");
            }

            itemSelecionado = itemHTML;
            meshSelecionada = nomeMesh;

            
            itemHTML.style.setProperty("background-color", "#90cbee", "important");
            
            
            window.highlightMesh3D(nomeMesh, "click");

            itemHTML.scrollIntoView({ behavior: "smooth", block: "nearest" });

            if (typeof clicouNoInfo !== "undefined") {
                clicouNoInfo = false;
            }

            
            if (mostrarMenu) {
                menuFlutuante.style.left = `${clientX}px`;
                menuFlutuante.style.top = `${clientY}px`;
                menuFlutuante.style.display = "flex";
            } else {
                fecharMenuFlutuante();
            }
        }
    } else {
        
        fecharMenuFlutuante();
    }
}


container.addEventListener("click", (event) => {
    processarSelecao3D(event.clientX, event.clientY, false, event);
});


container.addEventListener("contextmenu", (event) => {
    event.preventDefault(); 
    processarSelecao3D(event.clientX, event.clientY, true, event);
});


const imgInfo = document.getElementById("imgInfo");
let imagemAnteriorPainel = "";
let pdfAnteriorPainel = "";
let estadoPainelAnterior = "none";
let clicouNoInfo = false;

const btnInfoEl = document.getElementById("btnInfo");

if (btnInfoEl) {
    btnInfoEl.addEventListener("mouseenter", () => {
        
        imgInfo.src = "../Assets/Botoes/Informação_highlight_2.gif";

        
        imagemAnteriorPainel = partInfoImg.src;
        pdfAnteriorPainel = pdfAtivo;
        estadoPainelAnterior = partInfo.style.display;

        clicouNoInfo = false;

        
        partInfoImg.src = "./Files/Imagens/Info_Assemblies_286.png";
        pdfAtivo = ""; 
        partInfo.style.display = "block";
    });

    btnInfoEl.addEventListener("mouseleave", () => {
        
        imgInfo.src = "../Assets/Botoes/Informação_2.gif";

        
        if (!clicouNoInfo) {
            partInfoImg.src = imagemAnteriorPainel;
            pdfAtivo = pdfAnteriorPainel;
            partInfo.style.display = estadoPainelAnterior;
            
            if (estadoPainelAnterior === "none") {
                partInfoImg.src = "";
            }
        }
    });

    btnInfoEl.addEventListener("click", (event) => {
        event.stopPropagation(); 

        clicouNoInfo = true;

        
        if (itemSelecionado) {
            itemSelecionado.style.backgroundColor = "";
            window.highlightMesh3D(meshSelecionada, "clear");
            itemSelecionado = null;
            meshSelecionada = null;
        }

        
        partInfoImg.src = "./Files/Imagens/Info_Assemblies_286.png";
        pdfAtivo = ""; 
        partInfo.style.display = "block";
    });
}