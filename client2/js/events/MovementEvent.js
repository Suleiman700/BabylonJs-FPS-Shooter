
/*
    event fired on player movement like: walking, sprinting, jumping...etc
 */

import Camera from '../Camera.js';
import Scene from '../Scene.js';
import Player from '../Player.js';
import Socket from '../socket/Socket.js';

class MovementEvent {
    constructor() {}

    /**
     * receive player movements event
     */
    fireEvent() {
        const newX = Camera.getCamera().position.x
        const newY = Camera.getCamera().position.y
        const newZ = Camera.getCamera().position.z

        // save coords in player
        Player.setCoords(newX, newY, newZ)

        // emit to server
        // Socket.socket.emit('playerMoved', {x: newX, y: newY, z: newZ})
    }

    /**
     * register player movements event
     */
    register() {
        let previousPosition = Camera.getCamera().position.clone();

        // Register the event
        Scene.getScene().onBeforeRenderObservable.add(() => {
            let currentPosition = Camera.getCamera().position;
            if (!currentPosition.equals(previousPosition)) {
                // The position has changed
                // console.log(currentPosition);
                previousPosition = currentPosition.clone();
                this.fireEvent()
            }
        });
    }
}

export default new MovementEvent()