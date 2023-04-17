
import Scene from '../../Scene.js';

class Medkit {

    #debug = true

    name = 'Medkit'

    SHOPS = {
        WALL_SHOP: {
            COST: 50,
            HOLD_BUY_KEY_FOR: 1000, // hold buy key for X ms to buy item
        }
    }

    MESH = {
        filePath: './assets/models/items/',
        fileName: 'medkit.glb'
    }

    MODEL = undefined

    MEASUREMENTS = {
        rotation: {x: 80, y: 0, z: 4.5},
        scale: {x: 5.02, y: 5.02, z: 5.02}
    }

    constructor() {}

    async importModel() {
        var medkit = new BABYLON.TransformNode();
        medkit.visibility = 0;

        await BABYLON.SceneLoader.ImportMeshAsync("", this.MESH.filePath, this.MESH.fileName, Scene.getScene()).then((result) => {
            for (var index = 0; index < result.meshes.length; index++) {
                let item = result.meshes[index];
                item.scaling.x = this.MEASUREMENTS.scale.x;
                item.scaling.y = this.MEASUREMENTS.scale.y;
                item.scaling.z = this.MEASUREMENTS.scale.z;
                item.isPickable = false;
                item.parent = medkit;
            }
        });

        if (this.#debug) console.log('[MEDKIT] model loaded')

        this.MODEL = medkit
    }
}

export default new Medkit()