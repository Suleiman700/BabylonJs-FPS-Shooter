
class PlayersStatsTable {
    constructor() {
        this.tableId = 'table-player-stats'
    }

    setShown(_option) {
        $('#modal-players-stats').modal(_option? 'show':'hide')
    }

    /**
     * add category row into table
     * @param _playerData {object}
     * example of _playerData:
     * {
     *     "socketId": "UJvXVDmXSl9djv5_AAB3",
     *     "roomId": "123",
     *     "health": 100,
     *     "money": 1000,
     *     "holdingGunId": "AKM",
     *     "coords": {
     *         "x": 16,
     *         "y": 3.015,
     *         "z": 85
     *     },
     *     "cameraRotation": {
     *         "x": 0,
     *         "y": 0,
     *         "z": 0
     *     }
     * }
     * @return {void}
     */
    rowAdd(_playerData) {
        const row = this.#buildRow(_playerData)

        // add row into table
        document.querySelector(`#${this.tableId} tbody`).appendChild(row)
    }

    /**
     * receive info and build a row for it to be inserted into table
     * @param _playerInfo
     */
    #buildRow(_playerInfo) {
        const tr = document.createElement('tr')

        const cell_playerName = document.createElement('th')
        cell_playerName.innerText = _playerInfo.name
        cell_playerName.setAttribute('scope', 'row')
        tr.appendChild(cell_playerName)

        const cell_kills = document.createElement('td')
        cell_kills.innerText = 0
        tr.appendChild(cell_kills)

        const cell_money = document.createElement('td')
        cell_money.innerText = `$${_playerInfo.money}`
        tr.appendChild(cell_money)

        return tr
    }

    /**
     * clear table rows
     * @return {void}
     */
    clearRows() {
        document.querySelector(`#${this.tableId} tbody`).innerHTML = ''
    }

    /**
     * get the number of table rows
     * @return {number}
     */
    #rowsCount() {
        const rows = document.querySelectorAll(`#${this.tableId} tbody tr`)
        return rows.length
    }
}

export default new PlayersStatsTable()