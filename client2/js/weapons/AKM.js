
import Camera from '../Camera.js';
import Scene from '../Scene.js';
import Player from '../Player.js';

class AKM {
    id = 'AKM'
    name = 'AKM'
    damage = 10 // weapon damage
    recoil = 10 // weapon recoil
    reloadSpeed = 1000 // in ms
    fireRate = 100 // in ms
    ammoLeft = 180 // ammo left in weapon - this will be updated on weapon pickup and on shoot
    magSize = 30 // magazine size
    ammoCapacity = 180 // the ammo capacity weapon can hold

    bulletDecay = 1000 // decay bullet in ms
    bulletSpeed = 1000

    #SOUND_reload = './assets/sounds/weapons/weapon_reload.mp3'
    SOUND_shot = './assets/sounds/weapons/gun_shot.mp3'
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

    fireBullet() {
        var translate = function (mesh, direction, power) {
            mesh.physicsImpostor.setLinearVelocity(
                mesh.physicsImpostor.getLinearVelocity().add(direction.scale(power)
                )
            );
        }

        var bulletMesh = new BABYLON.Mesh("bulletMesh", Scene.getScene());
        var bullet = BABYLON.Mesh.CreateSphere("bullet", 12, 1, Scene.getScene(), false, BABYLON.Mesh.DEFAULTSIDE, bulletMesh);
        bullet.position.x = Camera.getCamera().position.x
        bullet.position.y = Camera.getCamera().position.y
        bullet.position.z = Camera.getCamera().position.z
        bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.25, restitution: 0 }, Scene.getScene());
        translate(bullet, Camera.getCamera().getForwardRay().direction, this.bulletSpeed);

        setTimeout(() => {
            bullet.dispose()
        }, this.bulletDecay)

        // play firing sound
        new BABYLON.Sound("gunshot", "gunshot.mp3", Scene.getScene()).play()
    }
}

export default new AKM()