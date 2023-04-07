export default class Camera {
    constructor(scene) {
        this.camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        this.camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        this.camera.wheelPrecision = 100;
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 20;
        this.camera.upperBetaLimit = Math.PI / 2;
    }
}