
class Player {
    #coords = {x: 0, y: 0, z: 0}
    #heath = undefined

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
}

export default new Player()