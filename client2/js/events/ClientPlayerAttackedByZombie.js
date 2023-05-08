import Camera from '../Camera.js';
import Socket from '../socket/Socket.js';

/*
    event fired when client player gets attacked by zombie
 */

class ClientPlayerAttackedByZombie {
    constructor() {}

    eventFired() {
        Socket.socket.emit('ClientPlayerAttackedByZombie')
    }
}

export default new ClientPlayerAttackedByZombie()