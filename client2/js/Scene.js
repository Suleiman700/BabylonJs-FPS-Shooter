
import Game from './Game.js';
import Camera from './Camera.js';
import Weapons from './weapons/Weapons.js';
import { KEY_BINDINGS } from './CONTROLS.js';

class Scene {
    #scene = null

    constructor() {
        this.#scene = new BABYLON.Scene(Game.getEngine())
        this.#scene.gravity = new BABYLON.Vector3(0, -0.6, 0);
        this.#scene.collisionsEnabled = true;
        this.#scene.enablePhysics()
        this.#scene.gravity.y = -0.6

        this.#scene.onPointerDown = _event => {
            if (_event.button === KEY_BINDINGS.LEFT_MOUSE) {
                Weapons.isFiring = true;
            }
        }

        this.#scene.onPointerUp = _event => {
            if (_event.button === KEY_BINDINGS.LEFT_MOUSE) {
                Weapons.isFiring = false
            }
        }
    }

    /**
     * create scene on map
     * @param _mapId {string} example: MAP_01
     */
    createScene(_mapId) {
        // load map file
        const mapFile = `./maps/${_mapId}.js`;
        import(mapFile).then(module => {
            // call function to create scene
            const createSceneFn = module.default;
            createSceneFn(this.#scene, Camera.getCamera());
        });
    }

    /**
     * get scene
     * @returns {{}}
     */
    getScene() {
        return this.#scene
    }
}

export default new Scene()