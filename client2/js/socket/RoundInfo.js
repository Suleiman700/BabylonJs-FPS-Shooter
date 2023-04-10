
class RoundInfo {
    #UI_roundCountLblId = 'round-number' // display the number of round

    constructor() {}

    /**
     * set round number UI text
     * @param _roundNumber {string|number} example: 1
     */
    UI_setRoundNumber(_roundNumber) {
        document.querySelector(`#${this.#UI_roundCountLblId}`).innerHTML = _roundNumber
    }
}

export default new RoundInfo()