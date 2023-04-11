
import Camera from '../Camera.js';
import Scene from '../Scene.js';

class AKM {
    // #id = 'AKM'
    // #name = 'AKM'
    // #damage = 10 // weapon damage
    // #recoil = 10 // weapon recoil
    // #reloadSpeed = 1000 // in ms
    // #fireRate = 100 // in ms
    // #magZie = 30 // magazine size
    // #ammoCapacity = 180 // the ammo capacity weapon can hold

    #SOUND_reload = './assets/sounds/weapons/weapon_reload.mp3'
    #SOUND_shot = './assets/sounds/weapons/gun_shot.mp3'
    #MODEL_weaponModel = 'https://dl.dropbox.com/s/kqnda4k2aqx8pro/AKM.obj'

    constructor() {}


    drawOnUI() {
        var akm = new BABYLON.TransformNode();
        akm.parent = Camera.getCamera();
        Camera.getCamera().fov = 1;
        akm.position = new BABYLON.Vector3(0.5, -0.7, 0.5);
        akm.rotation.x = -0.01;
        // load gun model
        BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/kqnda4k2aqx8pro/", "AKM.obj", Scene.getScene(), function (newMeshes) {
            var mat = new BABYLON.StandardMaterial("", Scene.getScene());
            mat.diffuseTexture = new BABYLON.Texture("https://dl.dropbox.com/s/isvd4dggvp3vks2/akm_diff.tga");
            mat.bumpTexture = new BABYLON.Texture("https://dl.dropbox.com/s/hiuhjsp4pckt9pu/akm_norm.tga");
            mat.specularTexture = new BABYLON.Texture("https://dl.dropbox.com/s/f3samm7vuvl0ez4/akm_spec.tga");
            for (var index = 0; index < newMeshes.length; index++) {
                let ak = newMeshes[index];
                ak.material = mat;
                ak.scaling.x = 0.05;
                ak.scaling.y = 0.05;
                ak.scaling.z = 0.05;
                ak.isPickable = false;
                ak.parent = akm;
            }
        });
    }
}

export default new AKM()