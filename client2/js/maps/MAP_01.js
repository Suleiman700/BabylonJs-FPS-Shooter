export default function Map_01_createScene(_scene, _camera) {
    // Lights
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), _scene);

    var box = BABYLON.MeshBuilder.CreateBox("box", {width: 10, height: 5, depth: 5}, _scene);
    box.position.z = 20;
    box.checkCollisions = true;
    var boxTexture = new BABYLON.StandardMaterial("boxTexture", _scene);
    boxTexture.diffuseTexture = new BABYLON.Texture("./assets/textures/wooden_box_01.jpg", _scene);
    // assign the texture to the box
    box.material = boxTexture;

    var ground0 = BABYLON.Mesh.CreateGround("ground0", 250, 250, 2, _scene);
    var material = new BABYLON.StandardMaterial("ground0mat", _scene);
    material.diffuseTexture = new BABYLON.Texture("./assets/textures/ground/seamless_stone_02.jpg", _scene);
    material.diffuseTexture.uScale = 10;
    material.diffuseTexture.vScale = 10;
    ground0.material = material;
    ground0.checkCollisions = true;

    // var ground1 = BABYLON.Mesh.CreateGround("ground1", 250, 250, 2, scene);
    // ground1.material = new BABYLON.GridMaterial("gmat1", scene);
    // ground1.position.z = 125;
    // ground1.rotation.x = -Math.PI/6;
    // ground1.checkCollisions = true;

    // stairs
    var box = new BABYLON.Mesh.CreateBox("box", 5, scene);
    box.position.y = -2;
    box.checkCollisions = true;
    box.type = "wall"
    var box1 = new BABYLON.Mesh.CreateBox("box1", 5, scene);
    box1.position.y = -1.5;
    box1.position.z = 1;
    box1.checkCollisions = true;
    var box2 = new BABYLON.Mesh.CreateBox("box2", 5, scene);
    box2.position.y = -1;
    box2.position.z = 2;
    box2.checkCollisions = true;
    var box3 = new BABYLON.Mesh.CreateBox("box2", 5, scene);
    box3.position.y = -0.5;
    box3.position.z = 3;
    box3.checkCollisions = true;
    var box4 = new BABYLON.Mesh.CreateBox("box4", 5, scene);
    box4.position.y = 0;
    box4.position.z = 4;
    box4.checkCollisions = true;
    var box5 = new BABYLON.Mesh.CreateBox("box5", 5, scene);
    box5.position.y = 0.5;
    box5.position.z = 5;
    box5.checkCollisions = true;

    // gun
    var akm = new BABYLON.TransformNode();
    akm.parent = _camera;
    _camera.fov = 1;
    akm.position = new BABYLON.Vector3(0.5, -9990.7, 0.5);
    akm.rotation.x = -0.01;
    // load gun model
    BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/kqnda4k2aqx8pro/", "AKM.obj", _scene, function (newMeshes) {
        var mat = new BABYLON.StandardMaterial("", _scene);
        mat.diffuseTexture = new BABYLON.Texture("https://dl.dropbox.com/s/isvd4dggvp3vks2/akm_diff.tga");
        mat.bumpTexture = new BABYLON.Texture("https://dl.dropbox.com/s/hiuhjsp4pckt9pu/akm_norm.tga");
        mat.specularTexture = new BABYLON.Texture("https://dl.dropbox.com/s/f3samm7vuvl0ez4/akm_spec.tga");
        for (var index = 0; index < newMeshes.length; index++) {
            let ak = newMeshes[index];
            ak.material = mat;
            ak.scaling.x = 0.05;
            ak.scaling.y = 0.05;
            ak.scaling.z = 0.05;
            ak.isPickable = false;
            ak.parent = akm;
        }
    });

    var pistol = new BABYLON.TransformNode();
    pistol.parent = _camera;
    _camera.fov = 1;
    pistol.position = new BABYLON.Vector3(4.0, -3.0, 4.0);
    pistol.rotation.y = -1.7;
    pistol.rotation.z = 0.01;
    // load gun model
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/guns/", "G17.glb", _scene, function (newMeshes) {
        var mat = new BABYLON.StandardMaterial("", _scene);
        mat.diffuseTexture = new BABYLON.Texture("https://dl.dropbox.com/s/isvd4dggvp3vks2/akm_diff.tga");
        for (var index = 0; index < newMeshes.length; index++) {
            let ak = newMeshes[index];
            ak.material = mat;
            ak.scaling.x = 0.2;
            ak.scaling.y = 0.2;
            ak.scaling.z = 0.2;
            ak.isPickable = false;
            ak.parent = pistol;
        }
    });

    
}