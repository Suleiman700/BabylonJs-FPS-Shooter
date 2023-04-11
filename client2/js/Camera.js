
import Scene from './Scene.js';
import Game from './Game.js';
import Player from './Player.js';

class Camera {
    #camera = {}

    constructor() {}

    initCamera() {
        // some of these settings will be overwritten after client receives setStartGameData emit
        this.#camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 25, 0), Scene.getScene()); // position can be changed on setStartGameData emit
        this.#camera.attachControl(Game.getCanvas(), true);
        this.#camera.keysUp = [87];
        this.#camera.keysDown = [83];
        this.#camera.keysLeft = [65];
        this.#camera.keysRight = [68];
        this.#camera.inertia = 0.2;
        this.#camera.fov = 1.5;
        this.#camera.minZ = 0;
        this.#camera.angularSensibility = 500;
        this.#camera.speed = Player.walkSpeed; // speed can be changed on setStartGameData emit
        this.#camera.checkCollisions = true;
        this.#camera.applyGravity = true;
        this.#camera.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
        this.#camera._needMoveForGravity = true;

        this.#camera.onCollide = _collideMesh => {
            Player.isOnGround = _collideMesh.structure === 'ground'
        }

//         // define roll and pitch angles in radians
//         const roll = Math.PI / 43;
//         const pitch = Math.PI / 90;
// // create a quaternion from the roll and pitch angles
//         const quaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, pitch, roll);
// // get the forward direction vector of the camera
//         const forward = new BABYLON.Vector3(0, 0, 1);
//         forward.rotateByQuaternionToRef(quaternion, forward);
// // set the camera position and target based on the rotated forward vector
//         const position = new BABYLON.Vector3(100.25, 10.5, 100.25);
//         const target = position.add(forward);
//         this.#camera.position = position;
//         this.#camera.setTarget(target);


        // rotate the camera around the X axis by -30 degrees
        // this.#camera.setTarget(new BABYLON.Vector3(100.25, 10.5, 100.25));

        // // listen to the onAfterRenderObservable event of the camera
        // this.#camera.onAfterRenderObservable.add(() => {
        //     // update player coordinates based on camera position
        //     Player.coords.x = this.#camera.position.x
        //     Player.coords.y = this.#camera.position.y
        //     Player.coords.z = this.#camera.position.z
        // });
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