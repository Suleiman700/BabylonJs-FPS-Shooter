
import Game from './Game.js';
import Scene from './Scene.js';
import Player from './Player.js';
import player from './Player.js';
import { KEY_BINDINGS } from './CONTROLS.js';
import Weapons from './weapons/Weapons.js';

class Keys {
    #debug = false
    #isSpaceDown = false

    constructor() {
    }

    registerKeys() {
        const canvas = Game.getCanvas()
        /*
            use the bind() method to bind the 'this' keyword inside the method to the Keys class instance.
            without .bind(this) when using 'this' keyword in #onKeyDown or #onKeyUp will be canvas class
         */
        canvas.addEventListener('keydown', this.#onKeyDown.bind(this), false);
        canvas.addEventListener('keyup', this.#onKeyUp.bind(this), false);

        const scene = Scene.getScene()
        scene.onDispose = () => {
            canvas.removeEventListener('keydown', this.#onKeyDown);
            canvas.removeEventListener('keyup', this.#onKeyUp);
        }
    }

    #onKeyDown(_event) {
        switch (_event.keyCode) {
            case 49: // 1
                Weapons.selectedWeaponLoadout = 'primary'
                if (this.#debug) console.log('selected primary weapon')
                break
            case 50: // 2
                Weapons.selectedWeaponLoadout = 'secondary'
                if (this.#debug) console.log('selected secondary weapon')
                break
            case 16: // shift
                if (this.#debug) console.log('is sprinting')
                Player.isSprinting(true)
                break
            case KEY_BINDINGS.WEAPON_RELOAD: // R
                if (!Weapons.isReloading) {
                    Weapons.isReloading = true
                }
                break
            case 32: // space
                // check if player is on ground
                if (Player.isOnGround && !this.#isSpaceDown) {
                    if (this.#debug) console.log('is jump')
                    Player.setJumping(true)
                    this.#isSpaceDown = true
                    Player.isOnGround = false
                    setTimeout(() => {
                        player.setJumping(false)
                    }, 100)
                }
                break
        }
    }

    #onKeyUp(_event) {
        switch (_event.keyCode) {
            case 16: // shift
                if (this.#debug) console.log('is not sprinting')
                Player.isSprinting(false)
                break
            case KEY_BINDINGS.WEAPON_RELOAD:
                // Weapons.isReloading = false
                break
            case 32: // space
                if (this.#isSpaceDown) {
                    if (this.#debug) console.log('not jumping')
                    Player.setJumping(false)
                    this.#isSpaceDown = false
                }
                break
        }
    }
}

export default new Keys()