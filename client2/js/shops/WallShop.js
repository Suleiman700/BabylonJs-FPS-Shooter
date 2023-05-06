import AKM from '../weapons/AKM.js';
import Scene from '../Scene.js';
import Camera from '../Camera.js';
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';
import Medkit from './items/Medkit.js';
import AmmoBox from './items/AmmoBox.js';

class WallShop {
    #showBounding = true

    constructor() {}

    /**
     * @param _shopPosition {object} example: {x: 23, y: 0, z: 95}
     * @param _shopMeasurement {object} example: {width: 5, height: 15, depth: 7}
     * @param _itemInstance
     * @param _itemCost {number} the cost of the item
     * @param _itemPosition {object} example: {x: 23, y: 0, z: 95}
     * @param _itemRotation {object} example: {x: 0, y: 0, z: 0}
     * @param _itemType {string} the type of the item, example: weapon|medkit|AmmoBox...etc
     */
    createNewWallShop(_shopPosition, _shopMeasurement, _itemInstance, _itemCost, _itemPosition, _itemRotation, _itemType) {
        let itemClone = undefined

        const cloneName = _itemInstance.name
        itemClone = _itemInstance.MODEL.clone(`WALLSHOP - ${cloneName}`)

        itemClone.position.x = _itemPosition.x
        itemClone.position.y = _itemPosition.y
        itemClone.position.z = _itemPosition.z

        itemClone.rotation.x = _itemRotation.x
        itemClone.rotation.y = _itemRotation.y
        itemClone.rotation.z = _itemRotation.z

        // itemClone.scaling.x *= AmmoCrate.MEASUREMENTS.scaling.x

        // weaponClone.isWallShop = true
        // weaponClone.id = 'test'


        // create a transparent box mesh
        var shopBox = BABYLON.MeshBuilder.CreateBox("box", _shopMeasurement, Scene.getScene());
        shopBox.material = new BABYLON.StandardMaterial("boxMaterial", Scene.getScene());
        shopBox.material.alpha = this.#showBounding? 0.5:0.0;
        shopBox.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        shopBox.position.x = _shopPosition.x;
        shopBox.position.y = _shopPosition.y;
        shopBox.position.z = _shopPosition.z;
        shopBox.isWallShop = true;

        // create a bounding box around the box mesh
        var boundingBox = shopBox.getBoundingInfo().boundingBox;


        // check if player is within the bounding box continuously
        let isPlayerAtWallShop = false;

        Scene.getScene().registerBeforeRender(() => {
            var player = Scene.getScene().activeCamera.position;

            if (boundingBox.intersectsPoint(player)) {
                if (!isPlayerAtWallShop) {
                    // player has entered the bounding box
                    GUI.UI_setWallShopBuyText(true, `Hold F to buy ${_itemInstance.NAMES.WALLSHOP_NAME} for $${_itemCost}`);

                    ClientPlayer.isAtWallShop = {
                        state: true,
                        itemId: _itemInstance.id,
                        itemCost: _itemCost,
                        itemType: _itemType
                    };

                    isPlayerAtWallShop = true;
                }
            } else {
                if (isPlayerAtWallShop) {
                    // player has left the bounding box
                    GUI.UI_setWallShopBuyText(false);

                    ClientPlayer.isAtWallShop = {
                        state: false,
                        itemId: '',
                        itemCost: 0,
                        itemType: ''
                    };

                    isPlayerAtWallShop = false;
                }
            }
        });
    }
}

export default new WallShop()