
class GUI {
    #UI_roundCountLblId = 'round-number' // display the number of round
    #UI_playerHealth = 'UI-player-health' // display player health

    constructor() {}

    /**
     * set round number UI text
     * @param _roundNumber {string|number} example: 1
     */
    UI_setRoundNumber(_roundNumber) {
        document.querySelector(`#${this.#UI_roundCountLblId}`).innerHTML = _roundNumber
    }

    /**
     * set player health in UI
     * @param _playerHealth {number} example: 87.4
     * @constructor
     */
    UI_setPlayerHealth(_playerHealth) {
        document.querySelector(`#${this.#UI_playerHealth}`).style.width = _playerHealth + '%'
    }

    /**
     * set player coords in UI
     * @param _x {number}
     * @param _y {number}
     * @param _z {number}
     * @constructor
     */
    UI_setPlayerCoords(_x, _y, _z) {
        document.querySelector('#player-coords-x').innerHTML = _x.toFixed(3)
        document.querySelector('#player-coords-y').innerHTML = _y.toFixed(3)
        document.querySelector('#player-coords-z').innerHTML = _z.toFixed(3)
    }

    /**
     * set ammo in UI
     * @param _weaponMagSize {number} example: 30
     * @param _weaponAmmoCapacity {number} example: 180
     * @constructor
     */
    UI_setAmmo(_weaponMagSize, _weaponAmmoCapacity) {
        const ammoLeft = parseInt(_weaponAmmoCapacity) - parseInt(_weaponMagSize)
        document.querySelector('#ui-weapon-ammo').innerHTML = `${_weaponMagSize}/${ammoLeft}`
    }
}

export default new GUI()