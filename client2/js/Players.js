
import Scene from './Scene.js';
import Player from './ClientPlayer.js';

class Players {
    #players = [] // store other players

    constructor() {}

    drawPlayers() {
        // Loop through players received from the emit
        for (let i = 0; i < this.#players.length; i++) {
            const playerData = this.#players[i];

            // Check if player is already drawn on the scene
            const existingPlayerMesh = Scene.getScene().getMeshByName(`player-${playerData.socketId}`);
            if (existingPlayerMesh && existingPlayerMesh.type === 'player') {
                existingPlayerMesh.dispose();
            }

            // dont render client player
            if (playerData.socketId === Player.socketId) continue

            // Create new player mesh
            const playerMesh = BABYLON.MeshBuilder.CreateCylinder(`player-${playerData.socketId}`, { diameter: 2, height: 3 }, Scene.getScene());
            playerMesh.position = new BABYLON.Vector3(playerData.coords.x, playerData.coords.y - 1.5, playerData.coords.z);
            playerMesh.type = 'player';
            // playerMesh.rotation.y = playerData.camera.pan;
            // playerMesh.rotation.x = playerData.camera.tilt;

            // Add player mesh to the scene
            Scene.getScene().addMesh(playerMesh);
        }
    }

    /**
     * set players
     * @param _players {[{}]}
     * [
     *     {
     *         "socketId": "aOzmvHpu_r0BrMgrAAAW",
     *         "roomId": "123",
     *         "health": 100,
     *         "money": 0,
     *         "holdingGunId": "AKM",
     *         "coords": {
     *             "x": 0,
     *             "y": 0,
     *             "z": 0
     *         },
     *         "camera": {
     *             "tilt": 0,
     *             "pan": 0
     *         }
     *     },
     *     {
     *         "socketId": "1EXA7R6qn5scryPIAAAX",
     *         "roomId": "123",
     *         "health": 100,
     *         "money": 0,
     *         "holdingGunId": "AKM",
     *         "coords": {
     *             "x": 0,
     *             "y": 0,
     *             "z": 0
     *         },
     *         "camera": {
     *             "tilt": 0,
     *             "pan": 0
     *         }
     *     }
     * ]
     */
    set players(_players) {
        this.#players = _players
    }

    /**
     * get players
     * @return {[{}]}
     */
    get players() {
        return this.#players
    }
}

export default new Players()