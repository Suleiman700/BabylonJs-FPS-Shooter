
import Camera from '../Camera.js';
import Scene from '../Scene.js';
import Player from '../ClientPlayer.js';

class G17 {
    #debug = true

    id = 'G17'
    name = 'G17'

    #isShown = false // if weapon is shown or not

    WEAPON_SETTINGS = {
        reloadSpeed: 2000, // weapon reload speed in ms
        fireRate: 1000, // weapon fire rate in ms
        recoil: 0.005, // weapon recoil
        fov: 1, // weapon field of view
        magSize: 8, // total amount of ammo magazine can hold
        ammoLeftInMag: 8, // set same as magSize
        ammoCapacity: 80, // total amount of ammo weapon can hold
    }

    BULLET_SETTINGS = {
        decayTimer: 1000, // decay bullet in ms
        speed: 1000, // bullet speed in ms
        diameter: 100.5, // bullet diameter
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
        fileName: 'G17.glb'
    }

    MEASUREMENTS = {
        position: {x: 0.5, y: -0.4, z: 1.0},
        rotation: {x: 0, y: 0, z: -1.56},
        scale: {x: 0.1, y: 0.1, z: 0.1}
    }

    SCOPE = {
        fov: 0.5,
        position: {x: 0, y: -0.09, z: 1.0},
        rotation: {x: 0, y: 0, z: 4.7},
    }

    MODEL_weaponModel = undefined


    constructor() {}

    async importModel() {
        var G17 = new BABYLON.TransformNode();
        G17.visibility = 0;

        // update flag
        this.#isShown = false

        await BABYLON.SceneLoader.ImportMeshAsync("", this.WEAPON_MESH.filePath, this.WEAPON_MESH.fileName, Scene.getScene()).then((result) => {
            for (var index = 0; index < result.meshes.length; index++) {
                let weapon = result.meshes[index];
                weapon.scaling.x = this.MEASUREMENTS.scale.x;
                weapon.scaling.y = this.MEASUREMENTS.scale.y;
                weapon.scaling.z = this.MEASUREMENTS.scale.z;
                weapon.isPickable = false;
                weapon.parent = G17;
            }
        });

        if (this.#debug) console.log('[G17] model loaded')

        this.MODEL_weaponModel = G17
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

export default new G17()