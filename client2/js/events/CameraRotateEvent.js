import Camera from '../Camera.js';
import Socket from '../socket/Socket.js';

/*
    event fired when player rotates the camera
    rotations will happen in x & y only
 */

class CameraRotateEvent {
    constructor() {}

    eventFired() {
        // console.log(Camera.getCamera().rotation)
        Socket.socket.emit('playerRotateCamera', Camera.getCamera().rotation)
    }
}

export default new CameraRotateEvent()