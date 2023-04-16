
import Game from './Game.js';
import Camera from './Camera.js';
import Weapons from './weapons/Weapons.js';
import Players from './Players.js';
import { KEY_BINDINGS } from './CONTROLS.js';
import AKM from './weapons/AKM.js';

class Scene {
    #scene = null

    constructor() {}

    initScene() {
        this.#scene = new BABYLON.Scene(Game.getEngine())
        this.#scene.gravity = new BABYLON.Vector3(0, -0.6, 0);
        this.#scene.collisionsEnabled = true;
        this.#scene.enablePhysics()
        this.#scene.gravity.y = -0.6

        this.#scene.onPointerDown = _event => {
            switch (_event.button) {
                case KEY_BINDINGS.WEAPON_FIRE:
                    // fire only if weapon is not in reloading progress
                    if (!Weapons.isReloading) {
                        Weapons.isFiring = true;
                    }
                    break
                case KEY_BINDINGS.WEAPON_USE_SCORE:
                    Weapons.isUsingWeaponScore = true
                    break
            }
        }

        this.#scene.onPointerUp = _event => {
            switch (_event.button) {
                case KEY_BINDINGS.WEAPON_FIRE:
                    Weapons.isFiring = false
                    break
                case KEY_BINDINGS.WEAPON_USE_SCORE:
                    Weapons.isUsingWeaponScore = false
                    break
            }
        }

        // this.#scene.registerBeforeRender(() => {
        //     var player = this.#scene.activeCamera.position;
        //     console.log('here')
        // })
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