import Camera from '../Camera.js';
import WallShop from '../shops/WallShop.js';
import AKM from '../weapons/AKM.js';
import G17 from '../weapons/G17.js';
import Medkit from '../shops/items/Medkit.js';
import Zombies from '../Zombies.js';
import zombies from '../Zombies.js';

export default async function Map_01_createScene(_scene, _camera) {
    // Lights
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), _scene);

    var ground = BABYLON.Mesh.CreateGround("ground0", 120, 120, 2, _scene);
    ground.jumpAble = true
    var material = new BABYLON.StandardMaterial("ground0mat", _scene);
    material.diffuseTexture = new BABYLON.Texture("./assets/textures/ground/seamless_stone_02.jpg", _scene);
    material.diffuseTexture.uScale = 35;
    material.diffuseTexture.vScale = 35;
    ground.material = material;
    ground.checkCollisions = true;

    // Load skyline cutout city
    await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/environment/", "skyline_cutout_city.glb", _scene).then((result) => {
        // Loop through the meshes in the loaded model
        for (var index = 0; index < result.meshes.length; index++) {
            let treeMesh = result.meshes[index];
            treeMesh.position = new BABYLON.Vector3(-0.5, 0, -5); // Set position of the tree mesh
            treeMesh.scaling = new BABYLON.Vector3(1.6, 2, 1.6); // Set scaling of the tree mesh
        }
    });

    // // Load skyline cutout city
    // await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/vehicles/wrecked/", "car.glb", _scene).then((result) => {
    //     // Loop through the meshes in the loaded model
    //     for (var index = 0; index < result.meshes.length; index++) {
    //         let treeMesh = result.meshes[index];
    //         treeMesh.position = new BABYLON.Vector3(10, -1.5, 30); // Set position of the tree mesh
    //         treeMesh.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5); // Set scaling of the tree mesh
    //
    //         // Create a bounding box around the car mesh
    //         const boundingBox = new BABYLON.MeshBuilder.CreateBox("carBoundingBox", { width: 4.5, height: 10, depth: 11 }, _scene);
    //         boundingBox.position = new BABYLON.Vector3(9.6, -1.5, 30); // Set the position of the bounding box to match the car mesh
    //         boundingBox.isVisible = true; // Set the bounding box as not visible
    //         boundingBox.checkCollisions = true
    //     }
    // });


    // walls
    const wallTexture = './assets/textures/structure/brick_wall_02.jpg'
    var wall1 = BABYLON.Mesh.CreateBox("wall1", 10, _scene);
    wall1.position.x = -55;
    wall1.position.y = 3;
    wall1.scaling.x = 0.1; // depth
    wall1.scaling.y = 12; // width
    wall1.scaling.z = 1; // height
    wall1.rotation.x = 4.715;
    wall1.checkCollisions = true;
    var wall1Material = new BABYLON.StandardMaterial("wall1Material", _scene);
    wall1Material.diffuseTexture = new BABYLON.Texture(wallTexture, _scene);
    wall1Material.diffuseTexture.uScale = 10; // adjust texture scaling
    wall1Material.diffuseTexture.vScale = 0.5;
    wall1.material = wall1Material;

    var wall2 = wall1.clone("wall2");
    wall2.position.x = 55;

    var wall3 = BABYLON.Mesh.CreateBox("wall3", 10, _scene);
    wall3.position.z = -55;
    wall3.position.y = 2.7;
    wall3.scaling.y = 1; // height
    wall3.scaling.x = 12; // width
    wall3.scaling.z = 0.1; // depth
    wall3.checkCollisions = true;
    var wall3Material = new BABYLON.StandardMaterial("wall3Material", _scene);
    wall3Material.diffuseTexture = new BABYLON.Texture(wallTexture, _scene);
    wall3.material = wall3Material;
    wall3Material.diffuseTexture.uScale = 10; // adjust texture scaling
    wall3Material.diffuseTexture.vScale = 0.5;

    var wall4 = wall3.clone("wall4");
    wall4.position.z = 55;

    // boxes
    const box1 = BABYLON.Mesh.CreateBox("box1", 5, _scene);
    box1.jumpAble = true
    box1.position.x = 50;
    box1.position.z = 50;
    box1.position.y = 2;
    box1.checkCollisions = true;
    const boxMaterial = new BABYLON.StandardMaterial("boxMaterial1", _scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/material/wooden_box_01.jpg", _scene);
    box1.material = boxMaterial;
    box1.type = 'solid';

    var box2 = box1.clone("box2");
    box2.position.x = -50;
    box2.position.z = -50;

    var box3 = box1.clone("box3");
    box3.position.x = -50;
    box3.position.z = 50;

    var box4 = box1.clone("box4");
    box4.position.x = 50;
    box4.position.z = -50;

    const shopPosition = {x: 0, y: 0, z: 53}
    const shopMeasurement = {width: 5, height: 10, depth: 4}
    const itemPosition = {x: shopPosition.x, y: shopPosition.y + 3, z: shopPosition.z + 1.4}
    const itemRotation = {x: -7.8, y: 0, z: 0}
    WallShop.createNewWallShop(shopPosition, shopMeasurement, AKM, AKM.SHOPS.WALL_SHOP.COST, itemPosition, itemRotation, 'weapon')

    // const shopPosition2 = {x: 15, y: 0, z: 95}
    // const shopMeasurement2 = {width: 5, height: 10, depth: 9}
    // const itemPosition2 = {x: shopPosition2.x, y: shopPosition2.y + 3, z: shopPosition2.z - 0.03}
    // const itemRotation2 = {x: 0, y: 1.6, z: 4.7}
    // WallShop.createNewWallShop(shopPosition2, shopMeasurement2, G17, G17.SHOPS.WALL_SHOP.COST, itemPosition2, itemRotation2, 'weapon')

    const shopPosition2 = {x: 15, y: 0, z: 53}
    const shopMeasurement2 = {width: 5, height: 10, depth: 4}
    const itemPosition2 = {x: shopPosition2.x, y: shopPosition2.y + 3, z: shopPosition2.z + 1.5}
    const itemRotation2 = {x: -1.55, y: 0, z: 3.1}
    WallShop.createNewWallShop(shopPosition2, shopMeasurement2, Medkit, Medkit.SHOPS.WALL_SHOP.COST, itemPosition2, itemRotation2, 'medkit')


    // stairs - ADDED
    var box = new BABYLON.Mesh.CreateBox("box", 5, _scene);
    box.position.y = -2;
    box.position.z = 4;
    box.checkCollisions = true;
    box.type = "solid"
    var box11 = new BABYLON.Mesh.CreateBox("box1", 5, _scene);
    box11.position.y = -1.5;
    box11.position.z = 5;
    box11.checkCollisions = true;
    box11.type = "solid"
    var box2 = new BABYLON.Mesh.CreateBox("box2", 5, _scene);
    box2.position.y = -1;
    box2.position.z = 6;
    box2.checkCollisions = true;
    box2.type = "solid"
    var box3 = new BABYLON.Mesh.CreateBox("box2", 5, _scene);
    box3.position.y = -0.5;
    box3.position.z = 7;
    box3.checkCollisions = true;
    box3.type = "solid"
    var box4 = new BABYLON.Mesh.CreateBox("box4", 5, _scene);
    box4.position.y = 0;
    box4.position.z = 8;
    box4.checkCollisions = true;
    box4.type = "solid"
    var box5 = new BABYLON.Mesh.CreateBox("box5", 5, _scene);
    box5.position.y = 0.5;
    box5.position.z = 9;
    box5.checkCollisions = true;
    box5.type = "solid"

    // apply physics to the boxes
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
    box11.physicsImpostor = new BABYLON.PhysicsImpostor(box11, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
    box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
    box3.physicsImpostor = new BABYLON.PhysicsImpostor(box3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
    box4.physicsImpostor = new BABYLON.PhysicsImpostor(box4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
    box5.physicsImpostor = new BABYLON.PhysicsImpostor(box5, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);


    // zombies.spawnZombies()







}
