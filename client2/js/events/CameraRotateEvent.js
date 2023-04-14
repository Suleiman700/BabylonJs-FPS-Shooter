import Camera from '../Camera.js';

/*
    event fired when player rotates the camera
    rotations will happen in x & y only
 */

class CameraRotateEvent {
    constructor() {}

    eventFired() {
        // console.log(Camera.getCamera().rotation)
        console.log('event fired')
    }
}

export default new CameraRotateEvent()