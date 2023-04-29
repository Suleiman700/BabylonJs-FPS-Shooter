
import AKM from './AKM.js';
import G17 from './G17.js';
import GUI from '../GUI.js';
import Scene from '../Scene.js';
import Camera from '../Camera.js';
import ShootEvent from '../events/ShootEvent.js';
import Sounds from '../Environment/Sounds.js';
import Zombies from '../Zombies.js';

class Weapons {
    #debug = true
    
    #weaponId = '' // id of the selected weapon
    #weaponInstance = {} // store instance of selected weapon

    #isUsingWeaponScore = false
    #isReloading = false
    #isFiring = false
    #fireIntervalId = null

    // store ammo settings of the currently used weapon
    ammoSettings = {
        ammoCapacity: 0,
        magSize: 0,
        ammoLeftInMag: 0,
    }

    weaponSettings = {
        damage: 0
    }

    COUNT_firedBullets = 0 // count selected weapon fired bullets

    constructor() {}

    /**
     * get weapon instance by its id
     * @param _weaponId {string} example: AKM
     * @return {instance} weapon instance
     */
    getWeaponInstanceById(_weaponId) {
        switch (_weaponId) {
            case 'AKM':
                return AKM
            case 'G17':
                return G17
        }
    }

    pickupWeapon(_weaponId) {
        this.#weaponId = _weaponId
        this.#weaponInstance = this.getWeaponInstanceById(_weaponId)

        // set ammo stats to the picked weapon ammo settings
        this.ammoSettings.ammoCapacity = this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity
        this.ammoSettings.magSize = this.#weaponInstance.WEAPON_SETTINGS.magSize
        this.ammoSettings.ammoLeftInMag = this.#weaponInstance.WEAPON_SETTINGS.ammoLeftInMag

        // update weapon settings
        this.weaponSettings.damage = this.#weaponInstance.WEAPON_SETTINGS.damage

        // reset fired bullets on weapon pickup
        this.COUNT_firedBullets = 0

        this.#weaponInstance.drawOnUI()

        // since this is weapon pickup, set ammo to maximum and show ammo in UI

        let currentAmmoInMag = 0
        let currentAmmoInCapacity = 0
        // check if mag size exists in capacity
        if (this.ammoSettings.ammoCapacity >= this.ammoSettings.magSize) {
            // take mag size from capacity
            currentAmmoInMag = this.ammoSettings.magSize
            this.ammoSettings.ammoLeftInMag = currentAmmoInMag

            this.ammoSettings.ammoCapacity -= currentAmmoInMag
            currentAmmoInCapacity = this.ammoSettings.ammoCapacity
        }
        // capacity does not have mag size
        else {
            // set capacity as the current ammo in mag
            currentAmmoInMag = this.ammoSettings.ammoCapacity
            // set capacity to 0
            this.ammoSettings.ammoCapacity = 0
        }
        GUI.UI_setAmmo(currentAmmoInMag, currentAmmoInCapacity)
    }
    
    /**
     * fire bullets
     * @return {void}
     */
    fire() {
        // check if weapon has ammo left in mag
        if (this.ammoSettings.ammoLeftInMag > 0) {
            // shoot event
            ShootEvent.fireEvent()

            var translate = function (mesh, direction, power) {
                mesh.physicsImpostor.setLinearVelocity(
                    mesh.physicsImpostor.getLinearVelocity().add(direction.scale(power)
                    )
                );
            }

            var bulletMesh = new BABYLON.Mesh("bulletMesh", Scene.getScene());
            // bulletMesh.renderOrder = 1;

            // create material with black color
            var material = new BABYLON.StandardMaterial("bulletMaterial", Scene.getScene());
            material.diffuseColor = BABYLON.Color3.Black();

            var bullet = BABYLON.Mesh.CreateSphere("bullet", 10, this.#weaponInstance.BULLET_SETTINGS.diameter, Scene.getScene(), false, BABYLON.Mesh.DEFAULTSIDE, bulletMesh);
            bullet.material = material;
            // bullet.depthTest = false;
            bullet.position.x = Camera.getCamera().position.x
            bullet.position.y = Camera.getCamera().position.y
            bullet.position.z = Camera.getCamera().position.z
            bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.25, restitution: 0 }, Scene.getScene());
            translate(bullet, Camera.getCamera().getForwardRay().direction, this.#weaponInstance.BULLET_SETTINGS.speed);

            setTimeout(() => {
                bullet.dispose()
            }, this.#weaponInstance.BULLET_SETTINGS.decayTimer)

            // play firing sound
            // new BABYLON.Sound("gunshot", "gunshot.mp3", Scene.getScene()).play()

            this.ammoSettings.ammoLeftInMag--


            // count bullets fired
            this.COUNT_firedBullets++;

            // update ammo text in UI
            const currentAmmoInMag = this.ammoSettings.ammoLeftInMag;
            const currentAmmoCapacity = this.ammoSettings.ammoCapacity;
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

            // play bullet firing sound
            const soundCoords = {x: Camera.getCamera().position.x, y: Camera.getCamera().position.y, z: Camera.getCamera().position.z}
            Sounds.playBulletFiringSound(soundCoords, this.#weaponInstance.SOUNDS.shoot)

            bullet.showBoundingBox = true


            // Get all zombie meshes


            // Loop through all zombies to check for collisions
            for (var i = 0; i < Zombies.zombies.length; i++) {
                var zombie = Zombies.zombies[i];

                let zombieMesh = Scene.getScene().getMeshByName(`zombie-0`);

                console.log(bulletMesh)

                // Check if the bullet collides with the zombie
                if (bulletMesh.intersectsMesh(zombieMesh)) {
                    console.log('bullet hit zombie');
                    const weaponDamage = this.weaponSettings.damage // 10

                    // Update the zombie's health
                    zombie.health -= weaponDamage;

                    // Update the zombie's material emissive color based on its health
                    zombie.material.emissiveColor = new BABYLON.Color3(zombie.health / 100, zombie.health / 100, zombie.health / 100);

                    // Dispose of the bullet mesh
                    bulletMesh.dispose();

                    // Exit the loop since the bullet has hit a zombie
                    break;
                }
            }

// // Check if the bullet hit anything else
//             if (!bullet.isDisposed()) {
//                 var pick = Scene.getScene().pickWithRay(ray, (mesh) => {
//                     return mesh.name !== bullet.name && mesh.isPickable && mesh.type !== "zombie";
//                 })
//                 if (pick.hit) {
//                     console.log('bullet hit something else');
//                     bullet.dispose();
//                 }
//             }

        }
        else {
            // play out of ammo sound
            const outOfAmmoSound = new BABYLON.Sound("sound", this.#weaponInstance.SOUNDS.noAmmoLeft, Scene.getScene(), null, {
                loop: false,
                autoplay: true,
            });
        }
    }

    fireFromOther(_weaponId, _bulletCoords, _bulletDirection) {
        // get weapon settings by id
        const firingWeaponInstance = this.getWeaponInstanceById(_weaponId)

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

        var bullet = BABYLON.Mesh.CreateSphere("bullet", 10, firingWeaponInstance.BULLET_SETTINGS.diameter, Scene.getScene(), false, BABYLON.Mesh.DEFAULTSIDE, bulletMesh);
        bullet.material = material;

        // bullet.depthTest = false;
        bullet.position.x = _bulletCoords.x
        bullet.position.y = _bulletCoords.y
        bullet.position.z = _bulletCoords.z
        bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.25, restitution: 0 }, Scene.getScene());

        // play bullet firing sound
        const soundCoords = {x: _bulletCoords.x, y: _bulletCoords.y, z: _bulletCoords.z}
        Sounds.playBulletFiringSound(soundCoords, this.#weaponInstance.SOUNDS.shoot)

        // Convert bullet direction to Vector3
        var bulletDirectionVector = new BABYLON.Vector3(_bulletDirection.x, _bulletDirection.y, _bulletDirection.z);
        translate(bullet, bulletDirectionVector, firingWeaponInstance.BULLET_SETTINGS.speed);

        setTimeout(() => {
            bullet.dispose()
        }, firingWeaponInstance.BULLET_SETTINGS.decayTimer)
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
            if (this.ammoSettings.ammoCapacity >= this.ammoSettings.magSize) {
                // take the amount of bullets fired from capacity and put it into the mag
                this.ammoSettings.ammoCapacity -= this.COUNT_firedBullets
                this.ammoSettings.ammoLeftInMag += this.COUNT_firedBullets
            }
            else {
                // check if capacity have the amount of fired bullets
                if (this.#weaponInstance.WEAPON_SETTINGS.ammoCapacity >= this.COUNT_firedBullets) {
                    // take the amount of bullets fired from capacity into mag
                    this.ammoSettings.ammoCapacity -= this.COUNT_firedBullets

                    this.ammoSettings.ammoLeftInMag += this.COUNT_firedBullets
                }
                else {
                    // take all ammo capacity and put it in mag
                    this.ammoSettings.ammoLeftInMag += this.ammoSettings.ammoCapacity

                    this.ammoSettings.ammoCapacity = 0
                }
            }

            GUI.UI_setAmmo(this.ammoSettings.ammoLeftInMag, this.ammoSettings.ammoCapacity)
            this.COUNT_firedBullets = 0
            this.#isReloading = false
            GUI.UI_showReloadingText(false)
        }, this.#weaponInstance.WEAPON_SETTINGS.reloadSpeed)
    }

    set isReloading(_option) {
        this.#isReloading = _option;
        if (_option) {
            // check if mag is not full
            if (this.ammoSettings.ammoLeftInMag < this.ammoSettings.magSize) {
                // check if no ammo capacity
                if (this.ammoSettings.ammoCapacity == 0) {
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

    /**
     * get current player weapon instance
     * @return {object}} example: AKM instance
     */
    get weaponInstance() {
        return this.#weaponInstance
    }
}

export default new Weapons()