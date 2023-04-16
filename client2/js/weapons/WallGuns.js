import AKM from './AKM.js';
import Scene from '../Scene.js';
import Camera from '../Camera.js';

class WallGuns {
    constructor() {}

    test() {
        const weaponClone = AKM.MODEL_weaponModel.clone("AKM Clone");
        weaponClone.position.x = 30
        weaponClone.position.y = 4
        weaponClone.position.z = 30
        weaponClone.isWallShop = true
        weaponClone.id = 'test'

        const boxMaterial = new BABYLON.StandardMaterial("boxMaterial1", Scene.getScene());
        boxMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/material/wooden_box_01.jpg", Scene.getScene());
        weaponClone.material = boxMaterial;
        boxMaterial.checkCollisions = true
        boxMaterial.parent = weaponClone
        boxMaterial.onCollide = function (mesh) { console.log("Box collided with mesh: ", mesh); }; // Set the onCollide function



        // Camera.getCamera().onCollide = _collideMesh => {
        //     // Player.isOnGround = _collideMesh.structure === 'ground'
        //     if (_collideMesh.id === 'textBox') {
        //         console.log('near wall shop')
        //     }
        // }
    }
}

export default new WallGuns()