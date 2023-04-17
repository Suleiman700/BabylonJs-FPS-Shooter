
import Scene from '../Scene.js';

class Sounds {

    SOUNDS = {
        WALL_SHOP_PURCHASE: './assets/sounds/cash-register.mp3'
    }

    constructor() {}

    /**
     * play wall shop purchase sound
     * @param _coords {object} example: {x: 0, y: 0, z: 0}
     */
    playWallShopPurchase(_coords) {
        const sound = new BABYLON.Sound("music", this.SOUNDS.WALL_SHOP_PURCHASE, Scene.getScene(), null, {
            loop: false,
            autoplay: true,
            spatialSound: true,
            distanceModel: "linear",
            rolloffFactor: 2,
        });
        sound.setVolume(0.5);
        sound.setPosition(new BABYLON.Vector3(_coords.x, _coords.y, _coords.z));
    }

    /**
     * play bullet firing sound at coords
     * @param _coords {object} example: {x: 0, y: 0, z: 0}
     * @param _audioFilePath {string} example: ./assets/sounds/weapons/gun_shot.mp3
     */
    playBulletFiringSound(_coords, _audioFilePath) {
        const sound = new BABYLON.Sound("music", _audioFilePath, Scene.getScene(), null, {
            loop: false,
            autoplay: true,
            spatialSound: true,
            distanceModel: "linear",
            rolloffFactor: 2,
        });
        sound.setVolume(0.5);
        sound.setPosition(new BABYLON.Vector3(_coords.x, _coords.y, _coords.z));
    }
}

export default new Sounds()