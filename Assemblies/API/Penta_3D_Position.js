export const explosionSteps = [
    {
        // Parafusos da Tampa
        mesh: [
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-2",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-1",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-4",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-3",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-5"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.5
    },
    {
        // Tampa
        mesh: [
            "mesh_83_1",
            "mesh_83",
            "mesh_83_2"
        ],
        axis: "z",
        distance: 0.35
    },
    {
        // Parafusos do Mancal
        mesh: [
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-4",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-2",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-1",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-3"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.4
    },
    {
        // Pinos do Mancal
        mesh: [
            "1Corpo_Penta-410-1Pino_M8x55-2",
            "1Corpo_Penta-410-1Pino_M8x55-1"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.4
    },
    {
        // Porca do Volante
        mesh: "Conjunto_pinhão_7_dentes-1Porca_do_volante-1",
        axis: "x",
        distance: 0.55
    },
    {
        // Conjunto Volante
        mesh: [
            "Conjunto_pinhão_7_dentes-13028-1",
            "Conjunto_pinhão_7_dentes-18261-1",
            "Conjunto_pinhão_7_dentes-1Ar_Ø5-8-1",
            "Conjunto_pinhão_7_dentes-1PS_Ø5-8_BSW-2"
        ],
        axis: "x",
        distance: 0.65
    },
    {
        // Porca Manopla
        mesh: "Conjunto_pinhão_7_dentes-1PS_Ø5-8_BSW-2",
        axis: "x",
        distance: -0.1
    },
    {
        // Arruela Manopla
        mesh: "Conjunto_pinhão_7_dentes-1Ar_Ø5-8-1",
        axis: "x",
        distance: -0.05
    },
    {
        // Manopla
        mesh: "Conjunto_pinhão_7_dentes-13028-1",
        axis: "x",
        distance: 0.1
    },
    {
        // Fixação 1 Flange de Acoplamento
        mesh: [
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-6",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-5",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-4",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-7",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-8",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-1",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-2",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-3"
        ],
        axis: "x",
        distance: 0.55
    },
    {
        // Flange de Acoplamento
        mesh: "Conjunto_pinhão_7_dentes-17279-1",
        axis: "x",
        distance: 0.38
    },
    {
        // Porcas do Flange do Pinhão
        mesh: [
            "Conjunto_pinhão_7_dentes-1Porca_do_pinhão_M40-2",
            "Conjunto_pinhão_7_dentes-1Porca_do_pinhão_M40-1"
        ],
        axis: "x",
        distance: 0.36
    },
    {
        // Flange de Acoplamento
        mesh: [
            "Conjunto_pinhão_7_dentes-1Flange_do_pinhão-1",
            { names: ["Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-5","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-4","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-6","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-7","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-8","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-1","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-2","Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-3"], axis: "x" }
        ],
        axis: "x",
        distance: 0.3
    },
    {
        // Porcas do Flange de Acoplamento
        mesh: [
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-4",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-5",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-6",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-7",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-8",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-1",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-3",
            "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-2"
        ],
        axis: "x",
        distance: -0.07
    },
    {
        // Novo bloco
        mesh: "1Corpo_Penta-410-17393-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.2
    },
    {
        // Novo bloco
        mesh: "Montagem_da_Coroa-1PS_da_bucha-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.15
    },
    {
        // Novo bloco
        mesh: "Montagem_da_Coroa-17608-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1
    },
    {
        // Novo bloco
        mesh: "7931-1",
        localDirection: { x: 1, y: 1, z: 0 },
        distance: -0.5
    },
    {
        // Novo bloco
        mesh: [
            "1Corpo_Penta-410-17604-1",
            { name: "1Corpo_Penta-410-1PG_Ø1-4_NPT-2", axis: "y" }
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.25
    },
    {
        // Novo bloco
        mesh: "1Corpo_Penta-410-1PG_Ø1-4_NPT-2",
        localDirection: { x: -1, y: 0, z: 1 },
        distance: 0.1
    },
    {
        // Novo bloco
        mesh: [
            "51115-251115_PART2-1",
            "51115-251115_PART3-1",
            "51115-251115_PART1-1",
            "51115-251115_PART4-10",
            "51115-251115_PART4-9",
            "51115-251115_PART4-7",
            "51115-251115_PART4-8",
            "51115-251115_PART4-6",
            "51115-251115_PART4-11",
            "51115-251115_PART4-12",
            "51115-251115_PART4-13",
            "51115-251115_PART4-14",
            "51115-251115_PART4-15",
            "51115-251115_PART4-16",
            "51115-251115_PART4-17",
            "51115-251115_PART4-18",
            "51115-251115_PART4-19",
            "51115-251115_PART4-20",
            "51115-251115_PART4-21",
            "51115-251115_PART4-22",
            "51115-251115_PART4-1",
            "51115-251115_PART4-2",
            "51115-251115_PART4-3",
            "51115-251115_PART4-4",
            "51115-251115_PART4-5"
        ],
        axis: "x",
        distance: 0.18
    },
    {
        // Novo bloco
        mesh: [
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-9",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-1",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-15",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-14",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-13",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-12",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-11",
            "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-10"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.2
    },
    {
        // Novo bloco
        mesh: "Montagem_da_Coroa-13017-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.14
    },
    {
        // Novo bloco
        mesh: [
            "Chaveta_16x8x35mm-1",
            "Chaveta_16x8x35mm-2"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.125
    },
    {
        // Novo bloco
        mesh: "Montagem_da_Coroa-18401-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.05
    },
    {
        // Novo bloco
        mesh: "Conjunto_pinhão_7_dentes-13018-1",
        axis: "x",
        distance: -0.5
    },
    {
        // Novo bloco
        mesh: "1Corpo_Penta-410-16675-1",
        axis: "x",
        distance: -0.32
    },
    {
        // Novo bloco
        mesh: "1Corpo_Penta-410-1Rt_Ø108xØ85x8-1",
        axis: "x",
        distance: 0.2
    },
    {
        // Novo bloco
        mesh: [
            "1Corpo_Penta-410-17605-1",
            "1Corpo_Penta-410-1PG_Ø1-4_NPT-1"
        ],
        axis: "x",
        distance: 0.15
    },
    {
        // Novo bloco
        mesh: "1Corpo_Penta-410-1PG_Ø1-4_NPT-1",
        axis: "z",
        distance: -0.1
    }
];
