import Camera from './Camera.js';
import Scene from './Scene.js';

class Player {
    #debug = false

    coords = {x: 0, y: 0, z: 0}
    #heath = -1 // number (1 ~ 100)
    #walkSpeed = -1 // number
    #sprintSpeed = -1 // number
    #jumpHeight = -1 // number
    #gravity = -0.6
    #isOnGround = true // boolean

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

export default new Player()