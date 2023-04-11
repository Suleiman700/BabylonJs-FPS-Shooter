
import Scene from './Scene.js';
import Game from './Game.js';

class Camera {
    #camera = {}

    #cheats = {
        noClip: false,
    }

    constructor() {}

    initCamera() {
        this.#camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 25, 0), Scene.getScene());
        this.#camera.attachControl(Game.getCanvas(), true);
        this.#camera.keysUp = [87];
        this.#camera.keysDown = [83];
        this.#camera.keysLeft = [65];
        this.#camera.keysRight = [68];
        this.#camera.inertia = 0.2;
        this.#camera.fov = 1.5;
        this.#camera.minZ = 0;
        this.#camera.angularSensibility = 500;
        this.#camera.speed = 2.5;
        this.#camera.checkCollisions = true;
        this.#camera.applyGravity = true;
        this.#camera.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
        this.#camera._needMoveForGravity = true;

        // noClip cheat
        if (this.#cheats.noClip) this.#camera.checkCollisions = false;
    }

    /**
     * get camera
     * @returns {{}}
     */
    getCamera() {
        return this.#camera
    }
}

export default new Camera()