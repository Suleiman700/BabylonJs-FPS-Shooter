import Player from "../Player.js";
import Camera from "../Camera.js";

export class SceneDefault {
    static createScene(scene) {
        const camera = new Camera(scene);
        const player = new Player(scene, camera);

        const groundTexture = new BABYLON.Texture("assets/textures/nature/grass.jpg", scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = groundTexture;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        ground.material = groundMaterial;

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Load the player model
        BABYLON.SceneLoader.ImportMesh("", "assets/models/players/", "player.obj", scene, function (newMeshes) {
            // Attach the player model to the player object
            // player.setMesh(newMeshes[0]);

            // Scale the player model
            console.log(player)
        });
    }
}