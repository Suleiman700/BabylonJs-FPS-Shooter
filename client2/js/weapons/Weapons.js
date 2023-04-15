
import AKM from './AKM.js';
import G17 from './G17.js';
import GUI from '../GUI.js';
import Scene from '../Scene.js';
import Camera from '../Camera.js';
import ShootEvent from '../events/ShootEvent.js';

class Weapons {
    #debug = true
    
    #weaponId = '' // id of the selected weapon
    #weaponInstance = {} // store instance of selected weapon

    #isUsingWeaponScore = false
    #isReloading = false
    #isFiring = false
    #fireIntervalId = null

    COUNT_firedBullets = 0 // count selected weapon fired bullets

    constructor() {}
    
    // /**
    //  * set selected weapon loadout
    //  * @param _loadoutName {string} example: primary|secondary
    //  */
    // set selectedWeaponLoadout(_loadoutName) {
    //     if (_loadoutName !== 'primary' && _loadoutName !== 'secondary') {
    //         throw new Error(`[Weapons] Cannot set selected weapon loadout of ${_loadoutName}, please use primary or secondary`);
    //     }
    //
    //     this.#selectedWeaponLoadout = _loadoutName
    //
    //     if (this.#debug) console.log(`[Weapons] selected weapon loadout: ${_loadoutName}`)
    // }
    //
    // /**
    //  * get the selected weapon loadout name
    //  * @return {string} example: primary|secondary
    //  */
    // get selectedWeaponLoadout() {
    //     return this.#selectedWeaponLoadout
    // }

    pickupWeapon(_weaponId) {
        switch (_weaponId) {
            case 'AKM':
                this.#weaponInstance = AKM
                this.#weaponId = 'AKM'
                break
            case 'G17':
                this.#weaponInstance = G17
                this.#weaponId = 'G17'
                break
        }

        // reset fired bullets on weapon pickup
        this.COUNT_firedBullets = 0

        this.#weaponInstance.drawOnUI()

        // since this is weapon pickup, set ammo to maximum and show ammo in UI

        let currentAmmoInMag = 0
        let currentAmmoInCapacity = 0
        // check if mag size exists in capacity
        if (this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.#weaponInstance.WEAPON_SETTINGS.magSize) {
            // take mag size from capacity
            currentAmmoInMag = this.#weaponInstance.WEAPON_SETTINGS.magSize
            this.#weaponInstance.ammoLeftInLag = currentAmmoInMag

            this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity -= currentAmmoInMag
            currentAmmoInCapacity = this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity
        }
        // capacity does not have mag size
        else {
            // set capacity as the current ammo in mag
            currentAmmoInMag = this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity
            // set capacity to 0
            this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity = 0
        }
        GUI.UI_setAmmo(currentAmmoInMag, currentAmmoInCapacity)
    }
    
    /**
     * fire bullets
     * @return {void}
     */
    fire() {
        // check if weapon has ammo left in mag
        if (this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag > 0) {

            // shoot event
            ShootEvent.fireEvent()

            // fire bullet and decrease ammo
            this.#weaponInstance.fireBullet();

            // count bullets fired
            this.COUNT_firedBullets++;

            // update ammo text in UI
            const currentAmmoInMag = this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag;
            const currentAmmoCapacity = this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity;
            GUI.UI_setAmmo(currentAmmoInMag, currentAmmoCapacity);

            // play weapon firing animation
            {
                const START_POSITION = new BABYLON.Vector3(this.#weaponInstance.MEASUREMENTS.position.x, this.#weaponInstance.MEASUREMENTS.position.y, this.#weaponInstance.MEASUREMENTS.position.z);
                const END_POSITION = new BABYLON.Vector3(this.#weaponInstance.MEASUREMENTS.position.x, this.#weaponInstance.MEASUREMENTS.position.y, this.#weaponInstance.MEASUREMENTS.position.z - 0.20);

                // Create the animation object
                const animation = new BABYLON.Animation(
                    "weaponAnimation",
                    "position.z",
                    100,
                    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
                );

                // Define the keyframes for the animation
                const keys = [];
                keys.push({ frame: 0, value: START_POSITION.z });
                keys.push({ frame: 15, value: END_POSITION.z });
                keys.push({ frame: 30, value: START_POSITION.z });
                animation.setKeys(keys);

                // Create the animation group and add the animation
                const animationGroup = new BABYLON.AnimationGroup("weaponAnimationGroup");
                animationGroup.addTargetedAnimation(animation, this.#weaponInstance.MODEL_weaponModel);
                animationGroup.play();
                animationGroup.dispose()
            }

            // weapon recoil
            Camera.getCamera().rotation.x -= this.#weaponInstance.WEAPON_SETTINGS.recoil;

            // play gunshot sound
            const gunshotSound = new BABYLON.Sound("gunshot", this.#weaponInstance.SOUNDS.shoot, Scene.getScene(), null, {
                loop: false,
                autoplay: true,
            });

        }
        else {
            // play out of ammo sound
            const outOfAmmoSound = new BABYLON.Sound("sound", this.#weaponInstance.SOUNDS.noAmmoLeft, Scene.getScene(), null, {
                loop: false,
                autoplay: true,
            });
        }
    }

    fireFromOther(_bulletCoords, _bulletDirection) {
        var translate = function (mesh, direction, power) {
            mesh.physicsImpostor.setLinearVelocity(
                mesh.physicsImpostor.getLinearVelocity().add(direction.scale(power)
                )
            );
        }

        var bulletMesh = new BABYLON.Mesh("bulletMesh", Scene.getScene());
        bulletMesh.renderOrder = 1;

        // create material with black color
        var material = new BABYLON.StandardMaterial("bulletMaterial", Scene.getScene());
        material.diffuseColor = BABYLON.Color3.Black();

        var bullet = BABYLON.Mesh.CreateSphere("bullet", 10, 0.5, Scene.getScene(), false, BABYLON.Mesh.DEFAULTSIDE, bulletMesh);
        bullet.material = material;

        // bullet.depthTest = false;
        bullet.position.x = _bulletCoords.x
        bullet.position.y = _bulletCoords.y
        bullet.position.z = _bulletCoords.z

        bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.25, restitution: 0 }, Scene.getScene());

        // Convert bullet direction to Vector3
        var bulletDirectionVector = new BABYLON.Vector3(_bulletDirection.x, _bulletDirection.y, _bulletDirection.z);
        translate(bullet, bulletDirectionVector, this.#weaponInstance.BULLET_SETTINGS.speed);

        setTimeout(() => {
            bullet.dispose()
        }, this.#weaponInstance.BULLET_SETTINGS.decayTimer)
    }

    /**
     * reload weapon
     * @return {void}
     */
    reload() {
        // play weapon reload sound
        const music = new BABYLON.Sound("sound", this.#weaponInstance.SOUNDS.reload, Scene.getScene(), null, {
            loop: false,
            autoplay: true,
        });
        setTimeout(() => {
            // check if capacity have mag
            if (this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.#weaponInstance.WEAPON_SETTINGS.magSize) {
                // take the amount of bullets fired from capacity and put it into the mag
                this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity -= this.COUNT_firedBullets
                this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.COUNT_firedBullets
            }
            else {
                // check if capacity have the amount of fired bullets
                if (this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.COUNT_firedBullets) {
                    // take the amount of bullets fired from capacity into mag
                    this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity -= this.COUNT_firedBullets

                    this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.COUNT_firedBullets
                }
                else {
                    // take all ammo capacity and put it in mag
                    this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag += this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity

                    this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity = 0
                }
            }

            GUI.UI_setAmmo(this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag, this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity)
            this.COUNT_firedBullets = 0
            this.#isReloading = false
            GUI.UI_showReloadingText(false)
        }, this.#weaponInstance.WEAPON_SETTINGS.reloadSpeed)
    }

    // /**
    //  * switch between selected weapons loadouts
    //  */
    // switchToSelectedWeaponLoadout() {
    //     // if primary is selected
    //     if (this.#selectedWeaponLoadout === 'primary') {
    //         // hide secondary weapon from UI
    //         this.#secondaryWeaponInstance.isShown = false
    //
    //         // draw primary weapon on UI
    //         this.#primaryWeaponInstance.drawOnUI()
    //     }
    //     else if (this.#selectedWeaponLoadout === 'secondary') {
    //         // hide primary weapon from UI
    //         this.#primaryWeaponInstance.isShown = false
    //
    //         this.#secondaryWeaponInstance.drawOnUI()
    //     }
    // }

    set isReloading(_option) {
        this.#isReloading = _option;
        if (_option) {
            // check if mag is not full
            if (this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag < this.#weaponInstance.WEAPON_SETTINGS.magSize) {
                // check if no ammo capacity
                if (this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity == 0) {
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
            }, this.#weaponInstance.WEAPON_SETTINGS.fireRate);
        }
        else {
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

    /**
     * set weapon using score or not
     * @param _option {boolean}
     */
    set isUsingWeaponScore(_option) {
        this.#isUsingWeaponScore = _option

        // use weapon scope
        if (_option) {
            this.#weaponInstance.MODEL_weaponModel.position.x = this.#weaponInstance.SCOPE.position.x
            this.#weaponInstance.MODEL_weaponModel.position.y = this.#weaponInstance.SCOPE.position.y
            this.#weaponInstance.MODEL_weaponModel.position.z = this.#weaponInstance.SCOPE.position.z

            this.#weaponInstance.MODEL_weaponModel.rotation.x = this.#weaponInstance.SCOPE.rotation.x
            this.#weaponInstance.MODEL_weaponModel.rotation.y = this.#weaponInstance.SCOPE.rotation.y
            this.#weaponInstance.MODEL_weaponModel.rotation.z = this.#weaponInstance.SCOPE.rotation.z

            Camera.getCamera().fov = this.#weaponInstance.SCOPE.fov
        }
        // do not use weapon scope
        else {
            this.#weaponInstance.MODEL_weaponModel.position.x = this.#weaponInstance.MEASUREMENTS.position.x
            this.#weaponInstance.MODEL_weaponModel.position.y = this.#weaponInstance.MEASUREMENTS.position.y
            this.#weaponInstance.MODEL_weaponModel.position.z = this.#weaponInstance.MEASUREMENTS.position.z

            this.#weaponInstance.MODEL_weaponModel.rotation.x = this.#weaponInstance.MEASUREMENTS.rotation.x
            this.#weaponInstance.MODEL_weaponModel.rotation.y = this.#weaponInstance.MEASUREMENTS.rotation.y
            this.#weaponInstance.MODEL_weaponModel.rotation.z = this.#weaponInstance.MEASUREMENTS.rotation.z

            Camera.getCamera().fov = this.#weaponInstance.WEAPON_SETTINGS.fov
        }
    }

    /**
     * get weapon using score or not
     * @return {boolean}
     */
    get isUsingWeaponScore() {
        return this.#isUsingWeaponScore
    }

    /**
     * set current weapon id
     * @param _weaponId {string} example: AKM
     */
    set weaponID(_weaponId) {
        this.#weaponId = _weaponId
    }

    /**
     * get current weapon id
     * @return {string} example: AKM
     */
    get weaponId() {
        return this.#weaponId
    }
}

export default new Weapons()