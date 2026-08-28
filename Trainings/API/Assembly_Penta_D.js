export const modelFile =
    "./Files/Penta.glb";

export const startScreen = {

    trainingImage:
        "./Files/Texts/Penta/Desmontagem/0.png",

    pdf: null,
    html: null

};

export const assemblySteps = [

    {
        // Avançar 1
        mesh: [
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-4",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-1",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-2",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-3",
            "1Corpo_Penta-410-1PCA_Ø1-4x3-4_BSW-5"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/1.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 2
        groups: [
        {
        mesh: ["mesh_83",
               "mesh_83_1",
               "mesh_83_2"
                ],
        axis: "z",
        distance: 0.25,
        },
        {
        mesh: ["1Corpo_Penta-410-17393-1"
              ],
        axis: "y",
        distance: 0.25,
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/2.png",
            pdf: null,
            html: null
    },
       {
        //Avançar 3
        groups: [
        {
        mesh: ["Conjunto_pinhão_7_dentes-1PS_Ø5-8_BSW-2"
                ],
            axis: "x",
            distance: -0.05
        },
        {
        mesh: ["Conjunto_pinhão_7_dentes-1Ar_Ø5-8-1"
              ],
            axis: "x",
            distance: -0.03
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/3.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 4
        mesh: "Conjunto_pinhão_7_dentes-13028-1",
        axis: "x",
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/4.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 5
        mesh: "Conjunto_pinhão_7_dentes-1Porca_do_volante-1",
        axis: "x",
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/5.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 6
        mesh: "Conjunto_pinhão_7_dentes-18261-1",
        axis: "x",
        distance: 0.2,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/6.png",
            pdf: null,
            html: null
    },
  {
        //Avançar 7
        groups: [
        {
        mesh: ["Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-7",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-6",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-5",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-4",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-3",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-2",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-1",
            "Conjunto_pinhão_7_dentes-1PCS_3-8x11-8_BSW-8",
                ],
            axis: "x",
            distance: 0.05
        },
        {
        mesh: ["Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-6",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-5",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-7",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-8",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-1",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-2",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-3",
               "Conjunto_pinhão_7_dentes-1PS_Ø3-8_BSW-4"
              ],
            axis: "x",
            distance: -0.008
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/7.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 8
        mesh: "Conjunto_pinhão_7_dentes-17279-1",
        axis: "x",
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/8.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 9
        mesh: [
            "Conjunto_pinhão_7_dentes-1Porca_do_pinhão_M40-2",
            "Conjunto_pinhão_7_dentes-1Porca_do_pinhão_M40-1"
        ],
        axis: "x",
        distance: 0.15,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/9.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 10
        mesh: "Conjunto_pinhão_7_dentes-1Flange_do_pinhão-1",
        axis: "x",
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/10.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 11
        mesh: "1Corpo_Penta-410-1Rt_Ø108xØ85x8-1",
        axis: "x",
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/11.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 12
        mesh: [
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-4",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-2",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-1",
            "1Corpo_Penta-410-1PCS_Ø5-8x21-2_BSW-3"
        ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/12.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 13
        groups: [
        {
        mesh: [ "1Corpo_Penta-410-17605-1",
                "Conjunto_pinhão_7_dentes-13018-1"
                ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1
        },
        {
        mesh: ["1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART2-1",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART2-1",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART4-1",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART1-1",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART3-1",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART3-1",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART1-1",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART4-1",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-16",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-17",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-18",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-20",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-21",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-22",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-23",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-24",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-25",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-26",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-27",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-1",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-2",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-3",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-4",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-5",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-6",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-7",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-8",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-9",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-10",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-11",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-12",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-13",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-14",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-15",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-15",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-14",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-13",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-11",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-12",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-16",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-17",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-19",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-18",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-20",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-22",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-21",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-23",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-24",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-25",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-26",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-1",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-2",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-3",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-4",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-5",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-6",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-7",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-8",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-9",
               "1Corpo_Penta-410-132012_X_QCL7C-132012_X_QCL7C_PART5-10",
               "1Corpo_Penta-410-132013_X_Q-132013_X_Q_PART5-19"],
               localDirection: { x: 0, y: 1, z: 0 },
               distance: 0.0
        },
        {
        mesh: ["1Corpo_Penta-410-16675-1"
                ],
        axis: "y",
        distance: 0.1,
        },
        {
        mesh: ["1Corpo_Penta-410-1Pino_M8x55-2",
               "1Corpo_Penta-410-1Pino_M8x55-1"
                ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1,
        },
        {
        mesh: ["1Corpo_Penta-410-1PG_Ø1-4_NPT-1"
                ],
        axis: "y",
        distance: 0.1,
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/13.png",
            pdf: null,
            html: null
    },
        {
        // Avançar 13.1
        mesh: "",
        localDirection: {},
        distance: 0.00,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/13.1.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 14
        mesh: "Montagem_da_Coroa-1PS_da_bucha-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.15,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/14.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 15
        mesh: "Montagem_da_Coroa-17608-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.15,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/15.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 16
        groups: [
        {
        mesh: ["7931-1",
              ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.15
        },
        {
        mesh: ["51115-251115_PART2-1",
               "51115-251115_PART1-1",
               "51115-251115_PART3-1",
               "51115-251115_PART4-16",
               "51115-251115_PART4-15",
               "51115-251115_PART4-14",
               "51115-251115_PART4-13",
               "51115-251115_PART4-12",
               "51115-251115_PART4-11",
               "51115-251115_PART4-10",
               "51115-251115_PART4-9",
               "51115-251115_PART4-7",
               "51115-251115_PART4-8",
               "51115-251115_PART4-6",
               "51115-251115_PART4-5",
               "51115-251115_PART4-4",
               "51115-251115_PART4-3",
               "51115-251115_PART4-2",
               "51115-251115_PART4-1",
               "51115-251115_PART4-22",
               "51115-251115_PART4-20",
               "51115-251115_PART4-19",
               "51115-251115_PART4-18",
               "51115-251115_PART4-17",
               "51115-251115_PART4-21",
               "Chaveta_16x8x35mm-1",
               "Chaveta_16x8x35mm-2"
              ],
            localDirection: { x: 0, y: 1, z: 0 } ,
            distance: 0.00
        },
                {
        mesh: ["1Corpo_Penta-410-1PG_Ø1-4_NPT-2"
              ],
        localDirection: { x: 0, y: 0, z: 1 },
        distance: 0.0
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/16.png",
            pdf: null,
            html: null
    },
{
        //Avançar 17
        groups: [
        {
        mesh: ["1Corpo_Penta-410-17604-1"
                ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.15,
        },
    ],
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/17.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 18
        mesh: ["Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-10",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-9",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-1",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-15",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-14",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-13",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-12",
               "Montagem_da_Coroa-1PCS_Ø1-2x40_BSW-11"
                ],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.15,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/18.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 19
        mesh: "Montagem_da_Coroa-18401-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.1,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/19.png",
            pdf: null,
            html: null
    },
    {
        // Avançar 20
        mesh: "",
        localDirection: {},
        distance: 0.0,
         trainingImage:
            "./Files/Texts/Penta/Desmontagem/20.png",
            pdf: null,
            html: null
    },
];