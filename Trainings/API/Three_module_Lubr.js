import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    assemblySteps,
    modelFile,
    startScreen
}
from "./Assembly_Lubr.js";

import {
    pontosLubrificacao,
    meshesTransparentes
}
from "./Lubr_load.js";

const container = document.getElementById("viewer3d");

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

let model = null;

const objectMap = new Map();
const originalPositions = new Map();

let currentStep = 0;
let animation = null;
let currentPdf = null;
let currentHtml = null;
let isSliderDragging = false;

let meshesLubrificacao = [];
const mapaNotasLubrificacao = new Map();

const trainingImage =
    document.getElementById(
        "imgTreinamento"
    );

    trainingImage.src =
    startScreen.trainingImage;

currentPdf =
    startScreen.pdf;

currentHtml =
    startScreen.html || null;

    const trainingContainer =
    document.getElementById(
        "textoTreinamento"
    );

trainingContainer.addEventListener(
    "click",
    () => {

        if(currentHtml){

            window.open(
                currentHtml,
                "_blank"
            );

        }else if(currentPdf){

            window.open(
                currentPdf,
                "_blank"
            );

        }

    }
);

    let previousTrainingImage =
    trainingImage.src;

function setTrainingImage(src, onLoadComplete){

    trainingImage.style.opacity = 0;

    const fadeDelay = isSliderDragging ? 0 : 150;

    setTimeout(()=>{

        const onImageLoad = () => {
            trainingImage.removeEventListener('load', onImageLoad);
            trainingImage.style.opacity = 1;
            if (onLoadComplete) onLoadComplete();
        };

        trainingImage.addEventListener('load', onImageLoad);

        trainingImage.src = src;

        previousTrainingImage = src;

        if (trainingImage.complete) {
            onImageLoad();
        }

    }, fadeDelay);

}

function setOpacity(object, opacity) {

    object.traverse(child => {

        if (!child.isMesh) return;

        if (Array.isArray(child.material)) {

            child.material.forEach(mat => {

                mat.opacity = opacity;

            });

        } else {

            child.material.opacity = opacity;

        }

    });

}

function setVisible(object, visible) {

    object.traverse(child => {

        if (!child.isMesh) return;

        child.visible = visible;

    });

}

function setHighlightAzul(object) {

    object.traverse(child => {

        if (!child.isMesh) return;

        const materiais =
            Array.isArray(child.material)
                ? child.material
                : [child.material];

        materiais.forEach(mat => {

            if (mat.emissive) {
                mat.emissive.setHex(0x87ceeb);
            }

            if (mat.emissiveIntensity !== undefined) {
                mat.emissiveIntensity = 1;
            }

        });

    });

}

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

            model = gltf.scene;

            scene.add(model);

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
            model.position.x += size.x * 0.3;
            model.position.y += size.y * -0.25;

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

            cameraZ *= 0.35;

            camera.position.set(
                cameraZ,
                cameraZ,
                cameraZ
            );

            
            
             controls.minDistance = 0; 
            
             controls.maxDistance = Infinity;

            controls.update();

            model.traverse(obj => {

    if (!obj.isMesh) return;

    objectMap.set(
        obj.name,
        obj
    );

    originalPositions.set(
        obj.name,
        obj.position.clone()
    );

    if (Array.isArray(obj.material)) {

        obj.material =
            obj.material.map(mat => {

                const clone = mat.clone();

                clone.transparent = true;
                clone.opacity = 1;

                return clone;

            });

    } else {

        obj.material =
            obj.material.clone();

        obj.material.transparent = true;
        obj.material.opacity = 1;
    }

});


pontosLubrificacao.forEach(item => {

    const mesh = objectMap.get(item.mesh);

    if (!mesh) return;

    setHighlightAzul(mesh);

    meshesLubrificacao.push(mesh);

    mapaNotasLubrificacao.set(
        mesh.name,
        item.note || "Ponto de Lubrificação"
    );

});


meshesTransparentes.forEach(nomeMesh => {

    const mesh = objectMap.get(nomeMesh);

    if (!mesh) return;

    setVisible(mesh, false);

});

currentStep = -1;

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

loadModel();

const tooltipLubr = document.createElement("div");
tooltipLubr.id = "tooltipLubrificacao";
tooltipLubr.style.cssText = `
    position: fixed;
    display: none;
    background: rgb(0, 17, 255);
    color: #ffffff;
    padding: 0.4vw 0.8vw;
    border-radius: 4px;
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 0.9vw;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    z-index: 9999;
    transform: translate(14px, -50%);
`;

document.body.appendChild(tooltipLubr);

const raycasterLubr = new THREE.Raycaster();
const mouseLubr = new THREE.Vector2();

let meshHoverLubr = null;

renderer.domElement.addEventListener("mousemove", (event) => {

    if (meshesLubrificacao.length === 0) return;

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouseLubr.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouseLubr.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterLubr.setFromCamera(mouseLubr, camera);

    const intersects =
        raycasterLubr.intersectObjects(
            meshesLubrificacao,
            false
        );

    if (intersects.length > 0) {

        const meshAlvo = intersects[0].object;

        if (meshHoverLubr !== meshAlvo) {

            meshHoverLubr = meshAlvo;

            tooltipLubr.textContent =
                mapaNotasLubrificacao.get(meshAlvo.name) ||
                "Ponto de Lubrificação";

        }

        tooltipLubr.style.left = event.clientX + "px";
        tooltipLubr.style.top = event.clientY + "px";
        tooltipLubr.style.display = "block";

    } else if (meshHoverLubr !== null) {

        meshHoverLubr = null;
        tooltipLubr.style.display = "none";

    }

});

renderer.domElement.addEventListener("mouseleave", () => {

    meshHoverLubr = null;
    tooltipLubr.style.display = "none";

});

function startAnimation(step) {

const groups = step.groups || [step];

const items = [];

groups.forEach(group => {

    const meshes =
        Array.isArray(group.mesh)
            ? group.mesh
            : [group.mesh];

    meshes.forEach(meshName => {

        const object = objectMap.get(meshName);

        if (!object) return;

        object.visible = true;

        setOpacity(object, 1);

        const start = object.position.clone();

        const end = start.clone();

        if (group.localDirection) {

            const direction = new THREE.Vector3(
                group.localDirection.x,
                group.localDirection.y,
                group.localDirection.z
            );

            direction.normalize();

            direction.applyQuaternion(object.quaternion);

            direction.multiplyScalar(group.distance);

            end.add(direction);

        } else {

            end[group.axis] += group.distance;

        }

        items.push({
            object,
            start,
            end
        });

    });

});



    animation = {

        type: "forward",

        items,

        startOpacity: 1,
        endOpacity: 0,

        startTime:
            performance.now()
    };

}

function executeStep() {

    if (animation) return;

    currentStep++;

    if (currentStep >= assemblySteps.length) {

        currentStep--;
        return;

    }

    const step =
        assemblySteps[currentStep];

    if (trainingImage) {

        if (
            step.trainingImage
        ) {

            setTrainingImage(
                step.trainingImage,
                () => startAnimation(step)
            );

            currentPdf =
                step.pdf || null;

            currentHtml =
                step.html || null;

        } else {

            setTrainingImage(
                startScreen.trainingImage,
                () => startAnimation(step)
            );

            currentPdf =
                startScreen.pdf;

            currentHtml =
                startScreen.html || null;
        }

    } else {

        startAnimation(step);

    }

}

function reverseStep() {

    if (animation) return;

    if (currentStep < 0)
        return;

    const step =
        assemblySteps[currentStep];

const groups = step.groups || [step];

const items = [];

groups.forEach(group => {

    const meshes =
        Array.isArray(group.mesh)
            ? group.mesh
            : [group.mesh];

    meshes.forEach(meshName => {

        const object =
            objectMap.get(meshName);

        if (!object) return;

        object.visible = true;

        setOpacity(object, 0);

        items.push({

            object,

            start:
                object.position.clone(),

            end:
                originalPositions
                    .get(meshName)
                    .clone()

        });

    });

});

animation = {

    type: "backward",

    items,

    startOpacity: 0,
    endOpacity: 1,

    startTime:
        performance.now()
};

    currentStep--;

    if (currentStep === -1) {

        if (trainingImage) {

            setTrainingImage(
                startScreen.trainingImage
            );

            currentPdf =
                startScreen.pdf;

            currentHtml =
                startScreen.html || null;

        }

    } else {

        const newStep =
            assemblySteps[currentStep];

        if (
            trainingImage &&
            newStep.trainingImage
        ) {

            setTrainingImage(
                newStep.trainingImage
            );

        }

        currentPdf =
            newStep.pdf || null;

        currentHtml =
            newStep.html || null;

    }

}

const slider3d = 
    document.getElementById("slider3d");

let targetStep = -1;

let sliderQueueActive = false;

function processTargetStep() {
    
    if (currentStep === targetStep) {
        return;
    }
    
    if (animation) {
        return;
    }
    
    if (currentStep < targetStep) {
        executeStep();
    }

    else if (currentStep > targetStep) {
        reverseStep();
    }
}

if(slider3d){


    slider3d.addEventListener("pointerdown", () => {
        isSliderDragging = true;
    });


    slider3d.addEventListener("pointerup", () => {
        isSliderDragging = false;
    });


    document.addEventListener("pointerup", () => {
        isSliderDragging = false;
    });

    slider3d.addEventListener("input", (e) => {


        const sliderValue = 
            parseInt(e.target.value);


        const totalSteps = 
            assemblySteps.length;

        targetStep = 
            Math.round(
                (sliderValue / 100) * totalSteps - 1
            );

        targetStep = Math.max(
            -1, 
            Math.min(
                targetStep, 
                totalSteps - 1
            )
        );

        sliderQueueActive = true;

        if(animation === null){
            processTargetStep();
        }

    });

}

function animate() {

    requestAnimationFrame(
        animate
    );

    if (animation) {

        const duration = (isSliderDragging || sliderQueueActive) ? 200 : 1000;

        let t =
            (
                performance.now() -
                animation.startTime
            ) / duration;

        t = Math.min(t, 1);

        animation.items.forEach(item => {

    item.object.position.lerpVectors(
        item.start,
        item.end,
        t
    );

});

        const opacity =
            THREE.MathUtils.lerp(
                animation.startOpacity,
                animation.endOpacity,
                t
            );

       animation.items.forEach(item => {

    setOpacity(
        item.object,
        opacity
    );

});

        if (t >= 1) {

            if (
                animation.type ===
                "forward"
            ) {

             animation.items.forEach(item => {

    item.object.visible = false;

});

            } else {

           animation.items.forEach(item => {

    item.object.visible = true;

});

            }

            animation = null;

            if(sliderQueueActive && targetStep !== currentStep){
                processTargetStep();
            } else if(sliderQueueActive && targetStep === currentStep){
                sliderQueueActive = false;
            }
        }

    }

    controls.update();

    renderer.render(
        scene,
        camera
    );
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
