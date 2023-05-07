import Camera from './Camera.js';
import Scene from './Scene.js';
import GUI from './GUI.js';

class ClientPlayer {
    #debug = false
    socketId = '' // the socketId of the player

    coords = {x: 0, y: 0, z: 0}
    #health = -1 // number (1 ~ 100)
    #kills = -1 // number (zombie kills)
    #walkSpeed = -1 // number
    #sprintSpeed = -1 // number
    #jumpHeight = -1 // number
    #gravity = -0.6
    #isOnGround = true // boolean
    #money = 0 // number

    // set if player is at wall shop or not
    isAtWallShop = {
        state: false,
        itemId: '', // string | wall shop item id - example: AKM
        itemCost: 0, // number | wall shop item cost - example: 150
        itemType: '' // string | item type, example: weapon|item
    }

    constructor() {}

    /**
     * set player coords
     * @param _x {number} example: 15.6
     * @param _y {number} example: 2.0
     * @param _z {number} example: 35.45
     */
    setCoords(_x, _y, _z) {
        this.coords.x = _x
        this.coords.y = _y
        this.coords.z = _z

        // change camera position
        Camera.getCamera().position = new BABYLON.Vector3(_x, _y, _z);
    }

    /**
     * get player coords
     * @returns {{x: number, y: number, z: number}}
     */
    getCoords() {
        return {x: this.coords.x, y: this.coords.y, z: this.coords.z}
    }

    /**
     * set player walk speed
     * @param _walkSpeed {number} example: 2.5
     */
    set walkSpeed(_walkSpeed) {
        this.#walkSpeed = _walkSpeed
        Camera.getCamera().speed = _walkSpeed
        if (this.#debug) console.log(`player walk speed changed to: ${_walkSpeed}`)
    }

    /**
     * get player walk speed
     * @returns {number}
     */
    get walkSpeed() {
        return this.#walkSpeed
    }


    /**
     * set player sprint speed
     * @param _sprintSpeed {number} example: 5.0
     */
    set sprintSpeed(_sprintSpeed) {
        this.#sprintSpeed = _sprintSpeed
        if (this.#debug) console.log(`player sprint speed changed to: ${_sprintSpeed}`)
    }

    /**
     * get player sprint speed
     * @returns {number}
     */
    get sprintSpeed() {
        return this.#sprintSpeed
    }

    /**
     * set player jump height
     * @param _jumpHeight {number} example: 1.5
     */
    set jumpHeight(_jumpHeight) {
        this.#jumpHeight = _jumpHeight
        if (this.#debug) console.log(`player jump height changed to: ${_jumpHeight}`)
    }

    /**
     * get player jump height
     * @return {number}
     */
    get jumpHeight() {
        return this.#jumpHeight
    }

    /**
     * set player gravity
     * @param _gravity {number} example: -0.6
     */
    set gravity(_gravity) {
        this.#gravity = _gravity
        Scene.getScene().gravity.y = _gravity
        if (this.#debug) console.log(`player gravity changed to: ${_gravity}`)
    }

    /**
     * get player gravity
     * @return {number}
     */
    get gravity() {
        Scene.getScene().gravity.y = this.#gravity
        return this.#gravity
    }

    /**
     * set player is on ground or not
     * @param _option {boolean}
     */
    set isOnGround(_option) {
        this.#isOnGround = _option
        if (this.#debug) console.log(`player on ground: ${_option}`)
    }

    /**
     * get if player is on ground or not
     * @return {boolean}
     */
    get isOnGround() {
        return this.#isOnGround
    }

    /**
     * set player money - also sets the UI
     * @param _money {number} example: 150.65
     * @constructor
     */
    set money(_money) {
        this.#money = _money

        // set money in UI
        GUI.UI_setMoney(_money)
    }

    /**
     * get player money
     * @return {number} example: 150.65
     */
    get money() {
        return this.#money
    }

    /**
     * set client player kills - also sets the UI
     * @param _kills {number} example: 1
     */
    set kills(_kills) {
        this.#kills = _kills

        GUI.UI_setKills(_kills)
    }

    /**
     * get client player kills
     * @return {number}
     */
    get kills() {
        return this.#kills
    }

    /**
     * set player health
     * @param _health {number} example: 100
     */
    set health(_health) {
        this.#health = _health

        // update GUI
        GUI.UI_setPlayerHealth(_health)
    }

    /**
     * get player health
     * @return {number} example: 100
     */
    get health() {
        return this.#health
    }

    /**
     * set is player is sprinting or not
     * @param _option {boolean}
     */
    isSprinting(_option) {
        if (_option) {
            Camera.getCamera().speed = this.#sprintSpeed
        }
        else {
            Camera.getCamera().speed = this.#walkSpeed
        }
    }

    /**
     * set player is jumping or not
     * @param _option {boolean}
     */
    setJumping(_option) {
        if (_option) {
            Scene.getScene().gravity.y = this.#jumpHeight
        }
        else {
            Scene.getScene().gravity.y = this.#gravity
        }
    }
}

export default new ClientPlayer()