
import Scene from './Scene.js';
import AKM from './weapons/AKM.js';
import G17 from './weapons/G17.js';
import Medkit from './shops/items/Medkit.js';

class Loader {
    weapons = {}

    constructor() {}

    async loadWeapons() {
        // AKM
        await AKM.importModel()
        await G17.importModel()

        // Load the model asynchronously
        // await BABYLON.SceneLoader.ImportMeshAsync("", AKM.MODEL_weaponModel.filePath, AKM.MODEL_weaponModel.fileName, Scene.getScene()).then((result) => {
        //     this.weapons.akm = result.meshes[0]
        // });
        // console.log(this.weapons)
    }

    async loadItems() {
        await Medkit.importModel()
    }
}

export default new Loader()