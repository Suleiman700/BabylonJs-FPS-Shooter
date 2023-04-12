
import AKM from './AKM.js';
import GUI from '../GUI.js';
import Scene from '../Scene.js';

class Weapons {
    #debug = true
    
    #primaryWeaponId = '' // id of the primary weapon
    #primaryWeaponInstance = {} // store instance of primary weapon

    #isReloading = false
    #isFiring = false
    #fireIntervalId = null

    COUNT_bulletsFired = 0 // count the fired bullets

    #selectedWeaponLoadout = 'primary' // selected weapon loadout primary|secondary

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

    /**
     * set selected weapon loadout
     * @param _loadoutName {string} example: primary|secondary
     */
    set selectedWeaponLoadout(_loadoutName) {
        if (_loadoutName !== 'primary' && _loadoutName !== 'secondary') {
            throw new Error(`[Weapons] Cannot set selected weapon loadout of ${_loadoutName}, please use primary or secondary`);
        }

        this.#selectedWeaponLoadout = _loadoutName

        if (this.#debug) console.log(`[Weapons] selected weapon loadout: ${_loadoutName}`)
    }

    /**
     * get the selected weapon loadout name
     * @return {string} example: primary|secondary
     */
    get selectedWeaponLoadout() {
        return this.#selectedWeaponLoadout
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

        this.COUNT_bulletsFired = 0

        let currentAmmoInMag = 0
        let currentAmmoInCapacity = 0
        // check if mag size exists in capacity
        if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.#primaryWeaponInstance.WEAPON_SETTINGS.magSize) {
            // take mag size from capacity
            currentAmmoInMag = this.#primaryWeaponInstance.WEAPON_SETTINGS.magSize
            this.#primaryWeaponInstance.ammoLeftInLag = currentAmmoInMag

            this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity -= currentAmmoInMag
            currentAmmoInCapacity = this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity
        }
        // capacity does not have mag size
        else {
            // set capacity as the current ammo in mag
            currentAmmoInMag = this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity
            // set capacity to 0
            this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity = 0
        }
        GUI.UI_setAmmo(currentAmmoInMag, currentAmmoInCapacity)
    }

    /**
     * fire bullets
     * @return {void}
     */
    fire() {
        // check if weapon has ammo left in mag
        if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag > 0) {

            // fire bullet and decrease ammo
            this.#primaryWeaponInstance.fireBullet();

            // count bullets fired
            this.COUNT_bulletsFired++;

            // update ammo text in UI
            const currentAmmoInMag = this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag;
            const currentAmmoCapacity = this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity;
            GUI.UI_setAmmo(currentAmmoInMag, currentAmmoCapacity);

            // play gunshot sound
            const gunshotSound = new BABYLON.Sound("gunshot", this.#primaryWeaponInstance.SOUNDS.shoot, Scene.getScene(), null, {
                loop: false,
                autoplay: true,
            });

        } else {
            // play out of ammo sound
            const outOfAmmoSound = new BABYLON.Sound("sound", this.#primaryWeaponInstance.SOUNDS.noAmmoLeft, Scene.getScene(), null, {
                loop: false,
                autoplay: true,
            });
        }
    }

    /**
     * reload weapon
     * @return {void}
     */
    reload() {
        // play weapon reload sound
        const music = new BABYLON.Sound("sound", this.#primaryWeaponInstance.SOUNDS.reload, Scene.getScene(), null, {
            loop: false,
            autoplay: true,
        });
        setTimeout(() => {
            // check if capacity have mag
            if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.#primaryWeaponInstance.WEAPON_SETTINGS.magSize) {
                // take the amount of bullets fired from capacity and put it into the mag
                this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity -= this.COUNT_bulletsFired
                this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.COUNT_bulletsFired
            }
            else {
                // check if capacity have the amount of fired bullets
                if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.COUNT_bulletsFired) {
                    // take the amount of bullets fired from capacity into mag
                    this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity -= this.COUNT_bulletsFired

                    this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.COUNT_bulletsFired
                }
                else {
                    // take all ammo capacity and put it in mag
                    this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity

                    this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity = 0
                }
            }

            GUI.UI_setAmmo(this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag, this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity)
            this.COUNT_bulletsFired = 0
            this.#isReloading = false
            GUI.UI_showReloadingText(false)
        }, this.#primaryWeaponInstance.WEAPON_SETTINGS.reloadSpeed)
    }

    /**
     * switch between selected weapons loadouts
     */
    switchToSelectedWeaponLoadout() {
        // if primary is selected
        if (this.#selectedWeaponLoadout === 'primary') {
            // hide secondary weapon from UI

            // draw primary weapon on UI
            this.#primaryWeaponInstance.drawOnUI()
        }
        else if (this.#selectedWeaponLoadout === 'secondary') {
            this.#primaryWeaponInstance.isShown = false
        }
    }

    set isReloading(_option) {
        this.#isReloading = _option;
        if (_option) {
            // check if mag is not full
            if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoLeftInMag < this.#primaryWeaponInstance.WEAPON_SETTINGS.magSize) {
                // check if no ammo capacity
                if (this.#primaryWeaponInstance.WEAPON_SETTINGS.ammoCapacity == 0) {
                    if (this.#debug) console.log('[Weapons] Cant reload weapon, there are no more bullets in capacity')
                    this.#isReloading = false
                    return
                }
                GUI.UI_showReloadingText(true)
                this.reload()
            }
            else {
                if (this.#debug) console.log('[Weapons] Cant reload weapon, mag is full')
                this.#isReloading = false
            }
        }
    }

    /**
     * get if weapon is reloading or not
     * @return {boolean}
     */
    get isReloading() {
        return this.#isReloading
    }

    /**
     * set weapon if firing or not
     * @param _option {boolean}
     */
    set isFiring(_option) {
        this.#isFiring = _option;
        if (_option) {
            this.fire()
            // this will keep firing based on weapon fire rate
            this.#fireIntervalId = setInterval(() => {
                this.fire();
            }, this.#primaryWeaponInstance.WEAPON_SETTINGS.fireRate);
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