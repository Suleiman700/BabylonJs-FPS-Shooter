export default class Camera {
    constructor(scene) {
        this.camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        this.camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        this.camera.wheelPrecision = 100;
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 20;
        this.camera.upperBetaLimit = Math.PI / 2;
        this.followPlayer = true; // add a flag to enable/disable following the player
    }

    setTarget(target) {
        this.camera.setTarget(target.position);
    }

    follow(player) {
        setInterval(() => {
            console.log(player.position)
            // set the camera position to follow the player
            const distance = 1;
            const height = 5;
            this.camera.position = new BABYLON.Vector3(
                player.position.x - distance,
                player.position.y + height,
                player.position.z
            );
        }, 100)

    }
}