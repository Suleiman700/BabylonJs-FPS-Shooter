
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
        const bulletDirection = {x, y, z};
        // const bulletDirection = Camera.getCamera().getForwardRay().direction;


        const { x: xPos, y: yPos, z: zPos } = Camera.getCamera().position;
        const bulletCords = { x: xPos, y: yPos, z: zPos };

        Socket.socket.emit('bulletFired', {weaponId, shooterId, bulletCords, bulletDirection})
    }

}

export default new ShootEvent()