import Camera from '../Camera.js';
import WallShop from '../weapons/WallShop.js';
import AKM from '../weapons/AKM.js';

export default function Map_02_createScene(_scene, _camera) {
    // Lights
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), _scene);

    var ground = BABYLON.Mesh.CreateGround("ground0", 250, 250, 2, _scene);
    ground.jumpAble = true
    var material = new BABYLON.StandardMaterial("ground0mat", _scene);
    material.diffuseTexture = new BABYLON.Texture("./assets/textures/ground/seamless_stone_02.jpg", _scene);
    material.diffuseTexture.uScale = 10;
    material.diffuseTexture.vScale = 10;
    ground.material = material;
    ground.checkCollisions = true;

    var wall1 = BABYLON.Mesh.CreateBox("wall1", 10, _scene);
    wall1.position.x = -100;
    wall1.position.y = 10;
    wall1.scaling.y = 22; // width
    wall1.scaling.z = 3; // height
    wall1.rotation.x = 4.715;
    wall1.checkCollisions = true;
    var wall1Material = new BABYLON.StandardMaterial("wall1Material", _scene);
    wall1Material.diffuseTexture = new BABYLON.Texture("./assets/textures/structure/brick_01.png", _scene);
    wall1Material.diffuseTexture.uScale = 5; // adjust texture scaling
    wall1Material.diffuseTexture.vScale = 1;
    wall1.material = wall1Material;


    var wall2 = wall1.clone("wall2");
    wall2.position.x = 100;

    var wall3 = BABYLON.Mesh.CreateBox("wall3", 10, _scene);
    wall3.position.z = -100;
    wall3.position.y = 10;
    wall3.scaling.y = 3; // height
    wall3.scaling.x = 25; // width
    wall3.checkCollisions = true;
    var wall3Material = new BABYLON.StandardMaterial("wall3Material", _scene);
    wall3Material.diffuseTexture = new BABYLON.Texture("./assets/textures/structure/brick_01.png", _scene);
    wall3.material = wall3Material;
    wall3Material.diffuseTexture.uScale = 5; // adjust texture scaling
    wall3Material.diffuseTexture.vScale = 1;

    var wall4 = wall3.clone("wall4");
    wall4.position.z = 100;

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

    var box2 = box1.clone("box2");
    box2.position.x = -50;
    box2.position.z = -50;

    var box3 = box1.clone("box3");
    box3.position.x = -50;
    box3.position.z = 50;

    var box4 = box1.clone("box4");
    box4.position.x = 50;
    box4.position.z = -50;

    const shopPosition = {x: 23, y: 0, z: 95}
    const shopMeasurement = {width: 5, height: 10, depth: 9}
    const itemPosition = {x: shopPosition.x, y: shopPosition.y + 3, z: shopPosition.z}
    const itemRotation = {x: -7.8, y: 0, z: 0}
    new WallShop(shopPosition, shopMeasurement, AKM, AKM.wallShopPrice, itemPosition, itemRotation)
}
