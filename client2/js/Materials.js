
import Scene from './Scene.js';

class Materials {
    bulletMaterial = undefined
    zombieMaterial = undefined

    constructor() {}

    loadMaterial() {
        this.bulletMaterial = new BABYLON.StandardMaterial("bulletMaterial", Scene.getScene())
        this.zombieMaterial = new BABYLON.StandardMaterial("zombieMaterial", Scene.getScene())
    }
}

export default new Materials()