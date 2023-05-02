
class Rooms {
    #debug = true

    // store rooms
    #rooms = [];

    // template for storing room
    #roomTemplate = {
        roomId: '', // string
        difficulty: 0, // number - 1, 2, 3
        mapData: {}, // store map data
        roundData: {
            isStarted: false,
            number: 0, // number - 1, 2, 3..etc
        },
    }

    constructor() {}

    /**
     * check if room exists
     * @param _roomId {string} example: 123
     * @returns {boolean}
     */
    doesRoomExists(_roomId) {
        const room = this.#rooms.find(room => room.roomId == _roomId)
        return !!room;
    }

    createRoom(_roomData) {
        // check if room data matches the template
        const isValid = Object.keys(this.#roomTemplate).every(
            (key) => key in _roomData
        );

        if (!isValid) {
            throw new Error('Cannot create new room, Data does not match template');
        }

        // Add room to the list
        this.#rooms.push({..._roomData});
    }

    /**
     * set room is started or not
     * @param _option {boolean}
     * @param _roomId {string}
     */
    setRoomIsStarted(_option, _roomId) {
        // check if room exists
        const roomExists = this.doesRoomExists(_roomId);
        if (roomExists) {
            // get room index
            const roomIndex = this.#rooms.findIndex(room => room.roomId == _roomId);

            // update isStarted property
            this.#rooms[roomIndex].roundData.isStarted = _option;

            console.log(`[Set Room IsStarted] Room ${_roomId} isStarted set to ${_option}`);
        }
        else {
            if (this.#debug) {
                console.log(`[Set Room IsStarted] Failed to set isStarted, room ID does not exist`);
            }
        }
    }

    /**
     * get room data
     * @param _roomId {string} example: 123
     * @returns {{}}
     */
    getRoomData(_roomId) {
        return this.#rooms.find(room => room.roomId == _roomId)
    }

    /**
     * get rooms
     * @returns {[{}]}
     */
    getRooms() {
        return this.#rooms
    }

    // /**
    //  * add player to room
    //  * @param _playerData {object} example: {
    //  *     socketId: '',
    //  *     health: 0,
    //  *     money: 0,
    //  * }
    //  * <br>
    //  * @param _roomId {string} example: 123
    //  */
    // addPlayer(_playerData, _roomId) {
    //     // check if room exists
    //     const roomExists = this.doesRoomExists(_roomId)
    //     if (roomExists) {
    //         // get room index
    //         const roomIndex = this.#rooms.findIndex(room => room.roomId == _roomId)
    //         // add player to room
    //
    //         if (this.#debug) {
    //             console.log(`[Add Player To Room] socket ${_playerData.socketId} added to room ${_roomId}`)
    //         }
    //
    //         this.#rooms[roomIndex].players.push(_playerData)
    //     }
    //     else {
    //         if (this.#debug) {
    //             console.log(`[Add Player To Room] Failed to add player, room ID does not exists`)
    //         }
    //     }
    // }

    /**
     * delete room
     * @param _roomId {string} example: 123
     */
    deleteRoom(_roomId) {
        // check if room exists
        const roomExists = this.doesRoomExists(_roomId)
        if (roomExists) {
            // get room index
            const roomIndex = this.#rooms.findIndex(room => room.roomId == _roomId)

            this.#rooms.splice(roomIndex, 1)
            console.log(`[Delete Room] Room deleted`)
        }
        else {
            if (this.#debug) {
                console.log(`[Delete Room] Failed to delete room, room ID does not exists`)
            }
        }
    }
}

module.exports = new Rooms()