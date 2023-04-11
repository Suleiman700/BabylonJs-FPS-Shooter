
import AKM from './AKM.js';

import GUI from '../GUI.js';

class Weapons {
    #primaryWeaponId = '' // id of the primary weapon
    #primaryWeaponInstance = {} // store instance of primary weapon
    


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

    initPrimaryWeapon() {
        switch (this.#primaryWeaponId) {
            case 'AKM':
                this.#primaryWeaponInstance = AKM
            case 'G17':
                this.#primaryWeaponInstance = AKM
        }

        this.#primaryWeaponInstance.drawOnUI()
        GUI.UI_setAmmo()
    }

    updateAmmo() {

    }
}

export default new Weapons()