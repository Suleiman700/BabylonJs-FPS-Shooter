
class Players {

    #debug = true;

    // store players
    #players = []

    // template for storing player
    #playerTemplate = {
        socketId: '', // string
        roomId: '', // string
        health: 0, // number
        money: 0, // number
        coords: {x: 0, y: 0, z: 0}
    }

    constructor() {}

    /**
     * add player
     * @param _playerData {object}
     * example:
     * {
     *    socketId: socket.id,
     *    roomId: 123
     *    health: 100,
     *    money: 0,
     *    coords: {x: 0, y: 0, z: 0}
     * }
     */
    addPlayer(_playerData) {
        // check if player data matches the template
        const isValid = Object.keys(this.#playerTemplate).every(
            (key) => key in _playerData
        );

        if (!isValid) {
            throw new Error('Cannot add new player, Data does not match template');
        }

        // Add player to the list
        this.#players.push(_playerData);
    }

    /**
     * remove player
     * @param socketId {string}
     */
    removePlayer(socketId) {
        const index = this.#players.findIndex((player) => player.socketId === socketId);

        if (index === -1) {
            throw new Error(`[Remove Player] Player with socketId ${socketId} not found`);
        }

        if (this.#debug) console.log(`[Remove Player] Player with socketId ${socketId} removed`)

        this.#players.splice(index, 1);
    }

    /**
     * get players in room
     * @param _roomId {string} example: 123
     * @returns {[{}]}
     * example:
     * [
     *   {
     *     socketId: 'Bkee3yt5Ue9uizslAAAB',
     *     roomId: '123',
     *     health: 100,
     *     money: 0,
     *     coords: { x: 0, y: 0, z: 0 }
     *   }
     * ]
     */
    getPlayersInRoom(_roomId) {
        return this.#players.filter(player => player.roomId == _roomId);
    }

    /**
     * count players in room
     * @param _roomId {string} example: 123
     * @returns {number}
     */
    countPlayersInRoom(_roomId) {
        return this.#players.filter(player => player.roomId == _roomId).length;
    }
}

module.exports = new Players()