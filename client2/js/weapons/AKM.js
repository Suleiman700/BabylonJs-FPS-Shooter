
import Camera from '../Camera.js';
import Scene from '../Scene.js';
import Player from '../ClientPlayer.js';

class AKM {
    #debug = true

    id = 'AKM'
    name = 'AKM'

    #isShown = false // if weapon is shown or not

    animations = []

    WEAPON_SETTINGS = {
        reloadSpeed: 2000, // weapon reload speed in ms
        fireRate: 100, // weapon fire rate in ms
        recoil: 0.02, // weapon recoil
        fov: 1, // weapon field of view
        magSize: 30, // total amount of ammo magazine can hold
        ammoLeftInMag: 30, // set same as magSize
        ammoCapacity: 180, // total amount of ammo weapon can hold
    }

    BULLET_SETTINGS = {
        decayTimer: 1000, // decay bullet in ms
        speed: 2000, // bullet speed in ms
        diameter: 0.5, // bullet diameter
    }

    SOUNDS = {
        reload: './assets/sounds/weapons/weapon_reload.mp3',
        shoot: './assets/sounds/weapons/gun_shot.mp3',
        noAmmoLeft: './assets/sounds/weapons/no_ammo_left.mp3'
    }

    WEAPON_MESH = {
        // filePath: 'https://dl.dropbox.com/s/kqnda4k2aqx8pro/',
        // fileName: 'AKM.obj'
        filePath: './assets/models/weapons/',
        fileName: 'AKM.glb'
    }

    MEASUREMENTS = {
        position: {x: 1.0, y: -0.7, z: 1.5},
        rotation: {x: 80, y: 0, z: 4.5},
        scale: {x: 0.02, y: 0.02, z: 0.02}
    }

    SCOPE = {
        fov: 0.5,
        position: {x: 0.02, y: -0.4, z: 1.0},
        rotation: {x: 80, y: 0, z: 4.7},
    }

    SHOPS = {
        WALL_SHOP: {
            COST: 150,
            HOLD_BUY_KEY_FOR: 1000, // hold buy key for X ms to buy the weapon
        }
    }

    MODEL_weaponModel = undefined


    constructor() {}

    async importModel() {
        var akm = new BABYLON.TransformNode();
        akm.visibility = 0;

        // update flag
        this.#isShown = false

        await BABYLON.SceneLoader.ImportMeshAsync("", this.WEAPON_MESH.filePath, this.WEAPON_MESH.fileName, Scene.getScene()).then((result) => {
            for (var index = 0; index < result.meshes.length; index++) {
                let ak = result.meshes[index];
                ak.scaling.x = this.MEASUREMENTS.scale.x;
                ak.scaling.y = this.MEASUREMENTS.scale.y;
                ak.scaling.z = this.MEASUREMENTS.scale.z;
                ak.isPickable = false;
                ak.parent = akm;
            }
        });

        if (this.#debug) console.log('[AKM] model loaded')

        this.MODEL_weaponModel = akm
    }

    drawOnUI() {
        this.MODEL_weaponModel.parent = Camera.getCamera()
        this.MODEL_weaponModel.visibility = 1
        this.MODEL_weaponModel.position = new BABYLON.Vector3(this.MEASUREMENTS.position.x, this.MEASUREMENTS.position.y, this.MEASUREMENTS.position.z)
        this.MODEL_weaponModel.rotation.x = this.MEASUREMENTS.rotation.x
        this.MODEL_weaponModel.rotation.y = this.MEASUREMENTS.rotation.y
        this.MODEL_weaponModel.rotation.z = this.MEASUREMENTS.rotation.z
        Camera.getCamera().fov = this.WEAPON_SETTINGS.fov

        // update flag
        this.isShown = true
    }

    /**
     * set weapon shown or not
     * @param _option {boolean}
     */
    set isShown(_option) {
        this.#isShown = _option
        this.MODEL_weaponModel.setEnabled(_option)
    }

    /**
     * get if weapon is shown or not
     * @return {boolean}
     */
    get isShown() {
        return this.#isShown
    }
}

export default new AKM()