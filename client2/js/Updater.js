
import GUI from './GUI.js';
import Camera from './Camera.js';
import Player from './Player.js';

class Updater {
    #cameraCoords = {x: 0, y: 0, z: 0}

    constructor() {}

    runUpdater() {
        // grab necessary data
        this.#grabNecessaryData()

        // update necessary data
        this.#updateNecessaryData()

        // update GUI
        this.#updateGUI()
    }

    /**
     * grab necessary data
     * @return {void}
     */
    #grabNecessaryData() {
        // grab camera coords
        this.#cameraCoords = {
            x: Camera.getCamera().position.x,
            y: Camera.getCamera().position.y,
            z: Camera.getCamera().position.z,
        }
    }

    /**
     * update necessary data
     * @return {void}
     */
    #updateNecessaryData() {
        // store camera coords in player data
        Player.setCoords(this.#cameraCoords.x, this.#cameraCoords.y, this.#cameraCoords.z)
    }

    /**
     * Update GUI
     * @return {void}
     */
    #updateGUI() {
        // update GUI coords
        GUI.UI_setPlayerCoords(this.#cameraCoords.x, this.#cameraCoords.y, this.#cameraCoords.z)
    }
}

export default new Updater()