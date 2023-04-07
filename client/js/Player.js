export default class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.createPlayer();
    }

    createPlayer() {
        const sphere = BABYLON.MeshBuilder.CreateSphere("player", { diameter: 1 }, this.scene);
        sphere.position = new BABYLON.Vector3(0, 0.5, 0);
        this.camera.camera.lockedTarget = sphere;
    }

    setPosition(x, y, z) {
        const sphere = this.scene.getMeshByName("player");
        sphere.position = new BABYLON.Vector3(x, y + 0.5, z);
    }
}