
import Game from './Game.js';
import Scene from './Scene.js';
import Player from './ClientPlayer.js';
import player from './ClientPlayer.js';
import { KEY_BINDINGS } from './CONTROLS.js';
import Weapons from './weapons/Weapons.js';
import WallShop from './shops/WallShop.js';
import PlayersStatsTable from './stats/PlayersStatsTable.js';

import Sky from './Environment/Sky.js';
import AKM from './weapons/AKM.js';
import ClientPlayer from './ClientPlayer.js';

// events
import BuyItemFromWallShop from './events/BuyItemFromWallShop.js';
import GUI from './GUI.js';
import Camera from './Camera.js';

class Keys {
    #debug = true

    #isSpaceDown = false

    #BUY_FROM_WALL_SHOP = {
        isBuyKeyDown: false, // indicates if the key to buy weapon from wall shop is down or not
        buyWeaponTimeout: null, // timeout for time player holds the buy key
    }

    constructor() {}

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
            case 16: // shift
                if (this.#debug) console.log('is sprinting')
                Player.isSprinting(true)
                break
            case KEY_BINDINGS.WEAPON_RELOAD: // R
                if (!Weapons.isReloading) {
                    Weapons.isReloading = true
                }
                break
            // buy weapon from wall shop - F
            case KEY_BINDINGS.BUY_FROM_WALL_SHOP:
                // check if player is at wall shop
                if (ClientPlayer.isAtWallShop.state) {
                    if (this.#debug) console.log('[Keys] Pressed Buy Weapon INSIDE Wall Shop')
                    // check if player does not have enough money
                    if (ClientPlayer.money < parseInt(ClientPlayer.isAtWallShop.itemCost)) {
                        // change shop buy text
                        GUI.UI_setWallShopBuyText(true, '<span class="text-danger">You dont have enough money!</span>')
                        return;
                    }

                    if (!this.#BUY_FROM_WALL_SHOP.isBuyKeyDown) {
                        this.#BUY_FROM_WALL_SHOP.isBuyKeyDown = true
                        this.#BUY_FROM_WALL_SHOP.buyWeaponTimeout = setTimeout(() => {
                            if (this.#debug) console.log('[Keys] Bought weapon from wall shop!')
                            BuyItemFromWallShop.fireEvent()
                        }, Weapons.weaponInstance.SHOPS.WALL_SHOP.HOLD_BUY_KEY_FOR);
                    }
                }
                else {
                    if (this.#debug) console.log('[Keys] Pressed Buy Weapon OUTSIDE Wall Shop')
                }
                break
            // open players stats list
            case KEY_BINDINGS.OPEN_STATS_LIST:
                PlayersStatsTable.setShown(true)
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
            // buy weapon from wall shop - F
            case KEY_BINDINGS.BUY_FROM_WALL_SHOP:
                if (this.#BUY_FROM_WALL_SHOP.isBuyKeyDown) {
                    clearTimeout(this.#BUY_FROM_WALL_SHOP.buyWeaponTimeout);
                    this.#BUY_FROM_WALL_SHOP.isBuyKeyDown = false;
                }
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