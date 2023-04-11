
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
}

export default new GUI()