
import Scene from '../../Scene.js';

class AmmoBox {

    #debug = true

    NAMES = {
        ITEM_NAME: 'AmmoBox',
        WALLSHOP_NAME: 'Ammo Box',
    }

    SHOPS = {
        WALL_SHOP: {
            COST: 100,
            HOLD_BUY_KEY_FOR: 1000, // hold buy key for X ms to buy item
        }
    }

    MESH = {
        filePath: './assets/models/items/',
        fileName: 'ammo_box.glb'
    }

    MODEL = undefined

    MEASUREMENTS = {
        rotation: {x: 0, y: 7.85, z: 0},
        scale: {x: 3, y: 3, z: 3},
        scaling: {x: -1},
    }




    constructor() {}

    async importModel() {
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.ImportMeshAsync("", this.MESH.filePath, this.MESH.fileName, Scene.getScene()).then((result) => {
                var ammoCrate = new BABYLON.TransformNode();
                ammoCrate.visibility = 0;

                for (var index = 0; index < result.meshes.length; index++) {
                    let item = result.meshes[index];
                    item.scaling.x = this.MEASUREMENTS.scale.x;
                    item.scaling.y = this.MEASUREMENTS.scale.y;
                    item.scaling.z = this.MEASUREMENTS.scale.z;

                    // Mirror the model along the X-axis
                    item.scaling.x *= -1;

                    item.isPickable = false;
                    item.parent = ammoCrate;
                }

                ammoCrate.rotation.x = this.MEASUREMENTS.rotation.x;
                ammoCrate.rotation.y = this.MEASUREMENTS.rotation.y;
                ammoCrate.rotation.z = this.MEASUREMENTS.rotation.z;

                if (this.#debug) console.log('[AmmoBox] model loaded')

                this.MODEL = ammoCrate;

                // Scene.getScene().removeMesh(ammoCrate)
                // ammoCrate.dispose();

                // Resolve the promise with the loaded model
                resolve(ammoCrate);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default new AmmoBox()