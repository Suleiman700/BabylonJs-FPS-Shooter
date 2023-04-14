
/*
    Event responsible for receiving any shooting events
 */

import Weapons from '../weapons/Weapons.js';
import ClientPlayer from '../ClientPlayer.js';
import Camera from '../Camera.js';
import Socket from '../socket/Socket.js';

class ShootEvent {
    constructor() {}

    fireEvent() {
        // get weapon id - example: AKM
        const weaponId = Weapons.weaponId

        // get shooter id (player id)
        const shooterId = ClientPlayer.socketId

        // get bullet direction
        const { direction: { x, y, z } } = Camera.getCamera().getForwardRay();
        const bulletDirection = { x, y, z };

        // get bullet coords
        const bulletCords = {
            x: 0,
            y: 0,
            z: 0,
        }

        Socket.socket.emit('bulletFired', {weaponId, shooterId, bulletDirection, bulletCords})
    }

}

export default new ShootEvent()