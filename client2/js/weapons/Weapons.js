
import AKM from './AKM.js';
import GUI from '../GUI.js';
import Scene from '../Scene.js';

class Weapons {
    #primaryWeaponId = '' // id of the primary weapon
    #primaryWeaponInstance = {} // store instance of primary weapon

    #isFiring = false
    #fireIntervalId = null

    constructor() {}

    /**
     * set primary weapon id
     * @param _primaryWeaponID {string} example: AKM
     */
    set primaryWeaponId(_primaryWeaponID) {
        this.#primaryWeaponId = _primaryWeaponID
    }

    /**
     * get primary weapon id
     * @return {string}
     */
    get primaryWeaponId() {
        return this.#primaryWeaponId
    }

    pickupPrimaryWeapon() {
        switch (this.#primaryWeaponId) {
            case 'AKM':
                this.#primaryWeaponInstance = AKM
                break
        }

        // since this is weapon pickup, set ammo to maximum and show ammo in UI
        // draw weapon on UI
        this.#primaryWeaponInstance.drawOnUI()
        // set weapon ammo in UI
        GUI.UI_setAmmo(this.#primaryWeaponInstance.magSize, this.#primaryWeaponInstance.ammoCapacity)
        // set ammo left in weapon
        this.#primaryWeaponInstance.ammoLeft = this.#primaryWeaponInstance.ammoCapacity
    }

    fire() {
        // fire bullet
        this.#primaryWeaponInstance.fireBullet()

        const music = new BABYLON.Sound("gunshot", "gunshot.mp3", Scene.getScene(), null, {
            loop: false,
            autoplay: true,
        });
        // music.play()
    }

    /**
     * set weapon if firing or not
     * @param _option {boolean}
     */
    set isFiring(_option) {
        this.#isFiring = _option;
        if (_option) {
            // this.fire()
            // this will keep firing based on weapon fire rate
            this.#fireIntervalId = setInterval(() => {
                this.fire();
            }, this.#primaryWeaponInstance.fireRate);
        } else {
            clearInterval(this.#fireIntervalId);
        }
    }

    /**
     * get player if firing or not
     * @return {boolean}
     */
    get isFiring() {
        return this.#isFiring
    }
}

export default new Weapons()