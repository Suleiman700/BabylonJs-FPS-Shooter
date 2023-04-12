
import Camera from '../Camera.js';
import Scene from '../Scene.js';
import Player from '../Player.js';

class AKM {
    #debug = true

    id = 'AKM'
    name = 'AKM'

    #isShown = false // if weapon is shown or not

    WEAPON_SETTINGS = {
        reloadSpeed: 2000, // weapon reload speed in ms
        fireRate: 100, // weapon fire rate in ms
        recoil: 10, // weapon recoil
        fov: 1, // weapon field of view
        magSize: 30, // total amount of ammo magazine can hold
        ammoLeftInMag: 30, // set same as magSize
        ammoCapacity: 180, // total amount of ammo weapon can hold
    }

    BULLET_SETTINGS = {
        decayTimer: 1000, // decay bullet in ms
        speed: 1000, // bullet speed in ms
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
        fileName: 'AKM.obj'
    }

    #CONFIG_posOnScreen = {
        position: {x: 0.5, y: -0.7, z: 0.5},
        rotation: {x: -0.01, y: 0, z: 0,}
    }

    MODEL_weaponModel = undefined


    constructor() {}

    async importModel() {
        var akm = new BABYLON.TransformNode();
        akm.visibility = 0;

        // update flag
        this.#isShown = false

        await BABYLON.SceneLoader.ImportMeshAsync("", this.WEAPON_MESH.filePath, this.WEAPON_MESH.fileName, Scene.getScene()).then((result) => {
            // this.MODEL_weaponModel = result.meshes[0]
            var mat = new BABYLON.StandardMaterial("", Scene.getScene());
            mat.diffuseTexture = new BABYLON.Texture("https://dl.dropbox.com/s/isvd4dggvp3vks2/akm_diff.tga");
            mat.bumpTexture = new BABYLON.Texture("https://dl.dropbox.com/s/hiuhjsp4pckt9pu/akm_norm.tga");
            mat.specularTexture = new BABYLON.Texture("https://dl.dropbox.com/s/f3samm7vuvl0ez4/akm_spec.tga");
            for (var index = 0; index < result.meshes.length; index++) {
                let ak = result.meshes[index];
                ak.material = mat;
                ak.scaling.x = 0.05;
                ak.scaling.y = 0.05;
                ak.scaling.z = 0.05;
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
        this.MODEL_weaponModel.position = new BABYLON.Vector3(this.#CONFIG_posOnScreen.position.x, this.#CONFIG_posOnScreen.position.y, this.#CONFIG_posOnScreen.position.z)
        this.MODEL_weaponModel.rotation.x = this.#CONFIG_posOnScreen.rotation.x
        Camera.getCamera().fov = this.WEAPON_SETTINGS.fov

        // update flag
        this.isShown = true
    }

    fireBullet() {
        var translate = function (mesh, direction, power) {
            mesh.physicsImpostor.setLinearVelocity(
                mesh.physicsImpostor.getLinearVelocity().add(direction.scale(power)
                )
            );
        }

        var bulletMesh = new BABYLON.Mesh("bulletMesh", Scene.getScene());
        bulletMesh.renderOrder = 1;
        var bullet = BABYLON.Mesh.CreateSphere("bullet", 12, 1, Scene.getScene(), false, BABYLON.Mesh.DEFAULTSIDE, bulletMesh);
        // bullet.depthTest = false;
        bullet.position.x = Camera.getCamera().position.x
        bullet.position.y = Camera.getCamera().position.y
        bullet.position.z = Camera.getCamera().position.z
        bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.25, restitution: 0 }, Scene.getScene());
        translate(bullet, Camera.getCamera().getForwardRay().direction, this.BULLET_SETTINGS.speed);

        setTimeout(() => {
            bullet.dispose()
        }, this.BULLET_SETTINGS.decayTimer)

        // play firing sound
        // new BABYLON.Sound("gunshot", "gunshot.mp3", Scene.getScene()).play()

        this.WEAPON_SETTINGS.ammoLeftInMag--
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