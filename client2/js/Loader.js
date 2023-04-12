
import Scene from './Scene.js';
import AKM from './weapons/AKM.js';

class Loader {
    weapons = {}

    constructor() {}

    async loadWeapons() {
        // AKM
        await AKM.importModel()
        // Load the model asynchronously
        // await BABYLON.SceneLoader.ImportMeshAsync("", AKM.MODEL_weaponModel.filePath, AKM.MODEL_weaponModel.fileName, Scene.getScene()).then((result) => {
        //     this.weapons.akm = result.meshes[0]
        // });
        // console.log(this.weapons)
    }
}

export default new Loader()