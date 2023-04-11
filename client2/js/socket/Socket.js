
import GUI from '../GUI.js';
import Player from '../Player.js';

class Socket {

    socket = null; // store socket
    #port = 8003; // store socket port

    constructor() {}

    connect() {
        this.socket = io(`http://localhost:${this.#port}`)

        // Listen for events from the server
        this.socket.on('connect', () => {
            console.log('Connected to server!');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server!');
        });

        /**
         * set start game data like player health, speed...etc
         */
        this.socket.on('setStartGameData', (_data) => {
            // set UI player health
            GUI.UI_setPlayerHealth(_data.defaultPlayerHealth)
            // set player walk speed
            Player.setWalkSpeed(_data.defaultPlayerWalkSpeed)
        })

        // update room data
        this.socket.on('updateRoomData', (_data) => {
            console.log(_data)
            // set round number UI text
            GUI.UI_setRoundNumber(_data.round)
        })
    }

    receiveEmits() {

    }
}

export default new Socket()