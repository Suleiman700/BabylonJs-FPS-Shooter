import Camera from './Camera.js';

class Player {
    #coords = {x: 0, y: 0, z: 0}
    #heath = undefined // number (1 ~ 100)
    #walkSpeed = undefined // number

    constructor() {}

    /**
     * set player coords
     * @param _x {number} example: 15.6
     * @param _y {number} example: 2.0
     * @param _z {number} example: 35.45
     */
    setCoords(_x, _y, _z) {
        this.#coords.x = _x
        this.#coords.y = _y
        this.#coords._z = _z
    }

    /**
     * get player walk speed
     * @returns {number}
     */
    getWalkSpeed() {
        return this.#walkSpeed
    }

    /**
     * set player walk speed
     * @param _walkSpeed {number} example: 2.5
     */
    setWalkSpeed(_walkSpeed) {
        this.#walkSpeed = _walkSpeed
        Camera.getCamera().speed = _walkSpeed
    }
}

export default new Player()