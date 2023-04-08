import Player from "../Player.js";
import Camera from "../Camera.js";

export class SceneDefault {
    static createScene(scene) {
        const camera = new Camera(scene);
        // const player = new Player(scene, camera);

        const groundTexture = new BABYLON.Texture("assets/textures/nature/grass.jpg", scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = groundTexture;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        ground.material = groundMaterial;

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // // Load the player model
        // BABYLON.SceneLoader.ImportMesh("", "assets/models/players/", "player.obj", scene, function (newMeshes) {
        //     // Attach the player model to the player object
        //     player.setMesh(newMeshes[0]);
        //
        //     // Scale the player model
        //     console.log(player)
        // });




        // BABYLON.SceneLoader.Append("./assets/models/players/", "dumbboy_sorrow_by_unknown_freaker.glb", scene, function (newMeshes) {
        //     // Create a new material for the player
        //     const material = new BABYLON.StandardMaterial("playerMaterial", scene);
        //
        //     // Load the texture image file
        //     const texture = new BABYLON.Texture("./assets/textures/nature/grass.jpg", scene);
        //     console.log(texture);
        //
        //     // Assign the texture to the material
        //     material.diffuseTexture = texture;
        //
        //     // Apply the material to the player mesh
        //     newMeshes[0].material = material;
        //
        //     // Scale the player mesh
        //     newMeshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
        //
        //     // Create the camera and player objects
        //     const camera = new Camera(scene);
        //     const player = new Player(scene, camera);
        //
        //     // Set the mesh for the player object
        //     player.setMesh(newMeshes[0]);
        //
        // });
    }
}