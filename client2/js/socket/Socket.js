
import GUI from '../GUI.js';

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

        // update room data
        this.socket.on('updateRoomData', (_data) => {
            console.log(_data.players[0].coords)
            // set round number UI text
            GUI.UI_setRoundNumber(_data.round)
        })
    }

    receiveEmits() {

    }
}

export default new Socket()