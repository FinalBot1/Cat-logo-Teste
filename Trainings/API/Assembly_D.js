export const modelFile =
    "./Files/AS3A.glb";

export const startScreen = {

    trainingImage:
        "./Files/Texts/Desmontagem/0.png",

    pdf: null,
    html: null

};

export const assemblySteps = [

    {
        //Avançar 1
        mesh: ["PS_Ø11-8_BSW-1","Ar_Ø11-8_BSW-1"],
         localDirection: {x: 0,y: 1,z: 0},
         distance: 0.4,
         trainingImage:
            "./Files/Texts/Desmontagem/1.png",
            pdf: null,
            html: null
    },

    {
        //Avançar 2
        mesh: "7557-1",
         localDirection: {x: 0,y: 1,z: 0},
         distance: 0.4,
         trainingImage:
            "./Files/Texts/Desmontagem/2.png",
            pdf: null,
            html: null
    },

    {
        //Avançar 3
        mesh: "7396-1",
         localDirection: {x: 0,y: 1,z: 0},
          distance: -0.4,
         trainingImage:
            "./Files/Texts/Desmontagem/3.png",
            pdf: null,
            html: null
    },

    {
        //Avançar 4
        mesh: ["PS_Ø3-4_-_10UNC-4","mesh_30_instance_1","mesh_35_instance_1","mesh_30_instance_2","mesh_35_instance_2","AP_Ø3-4-2","mesh_35_instance_3","mesh_30_instance_3"],
         localDirection: {x: 0,y: 1,z: 0},
          distance: -0.02,
         trainingImage:
            "./Files/Texts/Desmontagem/4.png",
            pdf: null,
            html: null
    },
{
    //Avançar 5
    groups: [
        {
            mesh: [
                "Corpo_Bloco_3D-1",
                "Flange_do_pinhão_Bloco_3D-1",
                "8261-1",
            ],
            axis: "y",
            distance: 0.4
        },
        {
            mesh: [
                "mesh_31_instance_3",
                "PCS_Ø3-4x31-4-4",
                "mesh_31_instance_1",
                "mesh_31_instance_2",
                "7931-1",
                "Chaveta_16x8x35mm-2",
                "Chaveta_16x8x35mm-1"
            ],
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 0.4
        },
        {
            mesh: [
                "51115_PART1-1_1",
                "51115_PART3-1_1",
                "51115_PART2-1_1",
                "51115_PART4-1_1",
                "51115_PART4-2_1",
                "51115_PART4-3_1",
                "51115_PART4-4_1",
                "51115_PART4-5_1",
                "51115_PART4-6_1",
                "51115_PART4-7_1",
                "51115_PART4-8_1",
                "51115_PART4-9_1",
                "51115_PART4-10_1",
                "51115_PART4-11_1",
                "51115_PART4-12_1",
                "51115_PART4-13_1",
                "51115_PART4-14_1",
                "51115_PART4-15_1",
                "51115_PART4-16_1",
                "51115_PART4-17_1",
                "51115_PART4-18_1",
                "51115_PART4-19_1",
                "51115_PART4-20_1",
                "51115_PART4-21_1",
                "51115_PART4-22_1"
            ],
            localDirection: { x: 1, y: 0, z: 0 },
            distance: 0.4
        }
    ],
    trainingImage: "./Files/Texts/Desmontagem/5.png",
    pdf: null,
    html: "./Penta_D_TR.html",
},
    {
        //Avançar 6
        mesh: [ "51115_PART1-1",
                "51115_PART2-1",
                "51115_PART3-1",
                "51115_PART4-1",
                "51115_PART4-2",
                "51115_PART4-3",
                "51115_PART4-4",
                "51115_PART4-5",
                "51115_PART4-6",
                "51115_PART4-7",
                "51115_PART4-8",
                "51115_PART4-9",
                "51115_PART4-10",
                "51115_PART4-11",
                "51115_PART4-12",
                "51115_PART4-13",
                "51115_PART4-14",
                "51115_PART4-15",
                "51115_PART4-16",
                "51115_PART4-17",
                "51115_PART4-18",
                "51115_PART4-19",
                "51115_PART4-20",
                "51115_PART4-21",
                "51115_PART4-22"
            ],
        localDirection: { x: 1, y: 0, z: 0 },
        distance: -0.5,
         trainingImage:
            "./Files/Texts/Desmontagem/6.png",
            pdf: null,
            html: null
    },  
    {
        //Avançar 7
        mesh: ["mesh_74","mesh_74_1"],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.5,
         trainingImage:
            "./Files/Texts/Desmontagem/7.png",
            pdf: null,
            html: null
    },         
    {
        //Avançar 8
    groups: [{
            mesh: "8351-1",
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 0.4
        },
        {
            mesh: "8351-2",
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 0.4
        },
    ],
         trainingImage:
            "./Files/Texts/Desmontagem/8.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 9
        mesh: "7483-1",
        localDirection: { x: 0, y: 0, z: 1 },
        distance: 0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/9.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 10
        mesh: "PASC_Ø1-4x10_BSW-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.4,
         trainingImage:
            "./Files/Texts/Desmontagem/10.png",
            pdf: null,
            html: null
    },  
    {
        //Avançar 11
        mesh: "7397-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 1.0,
         trainingImage:
            "./Files/Texts/Desmontagem/11.png",
            pdf: null,
            html: null
    }, 
{
        //Avançar 12
        mesh: "Chaveta_8x8x20-1",
        localDirection: { x: 1, y: 0, z: 0 },
        distance: -0.4,
         trainingImage:
            "./Files/Texts/Desmontagem/12.png",
            pdf: null,
            html: null
    }, 
    {
        //Avançar 13
    groups: [{
            mesh: ["Pr_Ø1x1450-19",
                   "mesh_10_instance_1",
                   "mesh_10_instance_2",
                   "mesh_10_instance_3",
                   "PS_Ø1_BSW-37",
                   "mesh_12_instance_1",
                   "mesh_12_instance_2",
                   "mesh_12_instance_3",
                   "AP_Ø7-8_BSW-3",
                   "mesh_11_instance_1",
                   "mesh_11_instance_2",
                   "mesh_11_instance_3"
                ],
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 0.4
        },
        {
            mesh: ["PS_Ø1_BSW-38",
                   "mesh_13_instance_1",
                   "mesh_13_instance_2",
                   "mesh_13_instance_3",
                   "AP_Ø7-8_BSW-6",
                   "mesh_14_instance_1",
                   "mesh_14_instance_2",
                   "mesh_14_instance_3"
                ],
            localDirection: { x: 0, y: 1, z: 0 },
            distance: -0.03
        },
    ],
         trainingImage:
            "./Files/Texts/Desmontagem/13.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 14
        groups: [ {
        mesh: ["8278-1","7561-1",
               "Anel_trava_do_raspador-1",
               "AO_Ø635xØ508-1"],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.4
        },          
        {
        mesh: ["PEs_Ø5-16x15-1",
               "PEs_Ø5-16x15-2",
               "PEs_Ø5-16x15-3",
               "PEs_Ø5-16x15-4",],
        localDirection: { x: 0, y: 0, z: 0 },
        distance: 0.0
        },
        {
        mesh: ["PG_Ø1-4_NPT-1"
                ],
            axis: "x",
            distance: 0.0
        },
        {
        mesh: [
              ],
            axis: "x",
            distance: 0.4
        },
    ],
         trainingImage:
            "./Files/Texts/Desmontagem/14.png",
            pdf: null,
            html: null
    }, 
    {
        //Avançar 15
        mesh: ["PS_1-2_BSW-2","PS_1-2_BSW-1"],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.5,
         trainingImage:
            "./Files/Texts/Desmontagem/15.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 16
        mesh: "7318-1",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 1.2,
         trainingImage:
            "./Files/Texts/Desmontagem/16.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 17
        mesh: ["PE_Ø10x43-1","PE_Ø10x43-3"],
        localDirection: { x: 1, y: 0, z: 0 },
        distance: 0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/17.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 18
        mesh: ["7555-1","7555-2"],
        localDirection: { x: 1, y: 0, z: 0 },
        distance: 0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/18.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 19
    groups: [{
            mesh: ["Gaxeta-1","mesh_15_instance_1","mesh_15_instance_2","mesh_15_instance_3","mesh_15_instance_4"],
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 1.4
        },
        {
            mesh: "Gaxeta_Tecnyl-1",
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 1.3
        },
    ],
         trainingImage:
            "./Files/Texts/Desmontagem/19.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 20
    groups: [{
            mesh: ["mesh_2_instance_2",
                "mesh_2_instance_7",
                "mesh_2_instance_1",
                "Pr_Ø1x1450-1",
                "mesh_2_instance_3",
                "mesh_2_instance_6",
                "mesh_2_instance_10",
                "mesh_2_instance_9",
                "mesh_2_instance_4",
                "mesh_2_instance_5",
                "mesh_2_instance_13",
                "mesh_2_instance_3",
                "mesh_2_instance_12",
                "mesh_2_instance_11",
                "mesh_4_instance_6",
                "mesh_4_instance_5",
                "mesh_4_instance_11",
                "mesh_4_instance_4",
                "mesh_4_instance_3",
                "mesh_4_instance_1",
                "mesh_4_instance_2",
                "AP_Ø1-1",
                "mesh_4_instance_13",
                "mesh_4_instance_12",
                "mesh_4_instance_10",
                "mesh_4_instance_9",
                "mesh_4_instance_8",
                "mesh_4_instance_7",
                "PS_Ø1_BSW-23",
                "mesh_9_instance_2",
                "mesh_9_instance_7",
                "mesh_9_instance_1",
                "mesh_9_instance_8",
                "mesh_9_instance_9",
                "mesh_9_instance_10",
                "mesh_9_instance_11",
                "mesh_9_instance_3",
                "mesh_9_instance_12",
                "mesh_9_instance_13",
                "mesh_9_instance_4",
                "mesh_9_instance_5",
                "mesh_9_instance_6",
                "mesh_2_instance_13",
                "mesh_0_instance_5",
                "mesh_8_instance_2",
                "mesh_0_instance_1",
                "mesh_2_instance_8",
                "mesh_0_instance_13",
                "mesh_8_instance_7"],
            localDirection: { x: 0, y: 1, z: 0 },
            distance: 0.4
        },
        {
            mesh: ["mesh_0_instance_3",
                   "mesh_0_instance_6",
                   "mesh_0_instance_10",
                   "mesh_0_instance_7",
                   "mesh_0_instance_12",
                   "mesh_0_instance_9",
                   "mesh_0_instance_11",
                   "mesh_0_instance_5",
                   "mesh_0_instance_13",
                   "mesh_0_instance_4",
                   "mesh_0_instance_8",
                   "AP_Ø1-5",
                   "mesh_0_instance_2",
                   "mesh_8_instance_5",
                   "mesh_8_instance_13",
                   "mesh_8_instance_12",
                   "mesh_8_instance_9",
                   "mesh_8_instance_10",
                   "mesh_8_instance_11",
                   "PS_Ø1_BSW-13",
                   "mesh_8_instance_8",
                   "mesh_8_instance_2",
                   "mesh_8_instance_70",
                   "mesh_8_instance_6",
                   "mesh_8_instance_4",
                   "mesh_8_instance_1",
                   "mesh_8_instance_3",
                   "AP_Ø1-33",
                   "AP_Ø1-34",
                   "PCS_Ø1x3_BSW-1",
                   "PCS_Ø1x3_BSW-2"],
            localDirection: { x: 0, y: 1, z: 0 },
            distance:-0.05
        },
                {
            mesh: ["AP_Ø1-33",
                   "AP_Ø1-34",
                   "PCS_Ø1x3_BSW-1",
                   "PCS_Ø1x3_BSW-2"],
            localDirection: { x: 0, y: 1, z: 0 },
            distance:0.2
        },
    ],
         trainingImage:
            "./Files/Texts/Desmontagem/20.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 21
        mesh: "8362-2",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/21.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 22
        mesh: "Junta_da_passagem-2",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/22.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 23
        mesh: ["PCS_Ø3-4x450-1","PCS_Ø3-4x450-2"],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: 0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/23.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 24
        mesh: "8365-2",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/24.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 25
        mesh: ["8364_1-1","8361-1","7590-1"],
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -2,
         trainingImage:
            "./Files/Texts/Desmontagem/25.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 26
        mesh: "Junta_do_corpo-2",
        localDirection: { x: 0, y: 1, z: 0 },
        distance: -0.2,
         trainingImage:
            "./Files/Texts/Desmontagem/26.png",
            pdf: null,
            html: null
    },
    {
        //Avançar 27
        mesh: "",
        localDirection: { x: 1, y: 0, z: 0 },
        distance: 0,
         trainingImage:
            "./Files/Texts/Desmontagem/27.png",
            pdf: null,
            html: null
    },
];