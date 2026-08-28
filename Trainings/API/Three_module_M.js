    import * as THREE from "three";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    import {
        assemblySteps,
        modelFile,
        startScreen
    }
    from "./Assembly_M.js";

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

    function setTrainingImage(src){

        trainingImage.style.opacity = 0;

        // Transição instantânea enquanto o slider está em uso, senão 150ms
        const fadeDelay = isSliderDragging ? 0 : 150;

        setTimeout(()=>{

            trainingImage.src = src;

            previousTrainingImage = src;

            trainingImage.style.opacity = 1;

        },fadeDelay);

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
                model.position.y += size.y * -0.05;

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

                cameraZ *= 0.65;

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

    assemblySteps.forEach(step => {

    const groups = step.groups || [step];

    groups.forEach(group => {

        const meshes =
            Array.isArray(group.mesh)
                ? group.mesh
                : [group.mesh];

        meshes.forEach(meshName => {

            const object =
                objectMap.get(meshName);

            if (!object) return;

    if (group.localDirection) {

        const direction = new THREE.Vector3(
            group.localDirection.x,
            group.localDirection.y,
            group.localDirection.z
        );

        direction.normalize();

        direction.applyQuaternion(
            object.quaternion
        );

        direction.multiplyScalar(
            group.distance
        );

        object.position.add(direction);

    } else {

        object.position[group.axis] +=
            group.distance;

    }

            setOpacity(object, 0);

            object.visible = false;

        });

});

});

currentStep = 0;

        }
    );

}

    loadModel();

    function executeStep() {

        if (animation) return;

        if (currentStep <= 0)
            return;

        currentStep--;

    const step =
        assemblySteps[currentStep];

    if (trainingImage) {

    if (
        currentStep > 0 &&
        assemblySteps[currentStep - 1]
            ?.trainingImage
    ) {

        const previousStep =
            assemblySteps[
                currentStep - 1
            ];

        setTrainingImage(
            previousStep.trainingImage
        );

    currentPdf =
        previousStep.pdf || null;

    currentHtml =
        previousStep.html || null;

    } else {

        setTrainingImage(
        startScreen.trainingImage
    );

    currentPdf =
        startScreen.pdf;

    currentHtml =
        startScreen.html || null;
    }
    }
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

        setOpacity(object, 1);

    const start =
        object.position.clone();

    const end =
        start.clone();

    if (group.localDirection) {

        const direction = new THREE.Vector3(
            group.localDirection.x,
            group.localDirection.y,
            group.localDirection.z
        );

        direction.normalize();

        direction.applyQuaternion(
            object.quaternion
        );

        direction.multiplyScalar(
            group.distance
        );

        end.add(direction);

    } else {

        end[group.axis] +=
            group.distance;

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

    function reverseStep() {

        if (animation) return;

        if (currentStep >= assemblySteps.length)
            return;

        const step =
            assemblySteps[currentStep];
        if (
        trainingImage &&
        step.trainingImage
    ){
        setTrainingImage(
            step.trainingImage
        );
    }

    currentPdf =
        step.pdf || null;

    currentHtml =
        step.html || null;

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

        currentStep++;

    }

    document
    .getElementById("btnAvancar")
    .addEventListener(
        "click",
        executeStep
    );

    document
    .getElementById("btnVoltar")
    .addEventListener(
        "click",
        reverseStep
    );

    // ===== FUNCIONALIDADE DO SLIDER =====
    // Mapeia a posição do slider (0-100%) para os passos de forma proporcional
    // Sistema de alvo: o slider define targetStep e o código processa um passo por vez
    // Aqui currentStep vai de 0 (tudo explodido/afastado, estado inicial)
    // até assemblySteps.length (tudo montado)
    // 0% = 0 (estado inicial, peças afastadas)
    // 100% = assemblySteps.length (montagem completa)
    // Não altera a lógica existente de executeStep/reverseStep,
    // apenas os chama repetidamente até alcançar o alvo.

    const slider3d =
        document.getElementById("slider3d");

    let targetStep = 0;

    // Indica se existe uma fila de passos pendente iniciada pelo slider.
    // Diferente de isSliderDragging (que reflete apenas o botão do mouse
    // pressionado), essa flag permanece true até o slider alcançar o
    // targetStep, mesmo que o usuário solte o clique antes de terminar.
    let sliderQueueActive = false;

    function processTargetStep() {

        // Se já chegou no alvo, para
        if (currentStep === targetStep) {
            return;
        }

        // Se está animando, não faz nada (vai processar quando terminar)
        if (animation) {
            return;
        }

        // currentStep precisa aumentar (montar mais um passo) -> reverseStep
        if (currentStep < targetStep) {
            reverseStep();
        }
        // currentStep precisa diminuir (desmontar um passo) -> executeStep
        else if (currentStep > targetStep) {
            executeStep();
        }

    }

    if(slider3d){

        // Quando começa a arrastar o slider
        slider3d.addEventListener("pointerdown", () => {
            isSliderDragging = true;
        });

        // Quando termina de arrastar
        slider3d.addEventListener("pointerup", () => {
            isSliderDragging = false;
        });

        // Também detecta mouse fora do slider para parar o drag
        document.addEventListener("pointerup", () => {
            isSliderDragging = false;
        });

        slider3d.addEventListener("input", (e) => {

            // Obtém o valor do slider (0-100)
            const sliderValue =
                parseInt(e.target.value);

            // Total de passos disponíveis
            const totalSteps =
                assemblySteps.length;

            // Calcula o passo alvo baseado na percentagem do slider
            // Mapeamento: 0% = 0 (início), 100% = totalSteps (montagem completa)
            targetStep =
                Math.round(
                    (sliderValue / 100) * totalSteps
                );

            // Garante que targetStep fica dentro dos limites válidos
            targetStep = Math.max(
                0,
                Math.min(
                    targetStep,
                    totalSteps
                )
            );

            // Marca que existe uma fila do slider a ser cumprida até o alvo,
            // independente do usuário continuar ou não com o clique pressionado
            sliderQueueActive = true;

            // Se não está animando, começa a processar o alvo
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

            // Duração menor (200ms) quando usando o slider (arrastando ou
            // ainda completando a fila de passos após soltar), normal (1000ms) senão
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

                // Se a fila do slider ainda não alcançou o alvo, continua
                // processando mesmo que o usuário já tenha soltado o clique
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