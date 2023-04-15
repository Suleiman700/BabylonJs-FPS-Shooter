
import Scene from './Scene.js';
import Player from './ClientPlayer.js';
import AKM from './weapons/AKM.js';
import G17 from './weapons/G17.js';

class Players {
    #players = [] // store other players

    constructor() {}

    drawPlayers() {
        // Loop through players received from the emit
        for (let i = 0; i < this.#players.length; i++) {
            const playerData = this.#players[i];
            const playerId = playerData.socketId;

            // Skip the current player
            if (playerId === Player.socketId) {
                continue;
            }

            // Find the player mesh in the scene using the socket ID
            const playerMesh = Scene.getScene().getMeshByName(`player-${playerId}`);

            // If the player mesh exists, update its position
            if (playerMesh && playerMesh.type === 'player') {
                playerMesh.position = new BABYLON.Vector3(playerData.coords.x, playerData.coords.y - 1.5, playerData.coords.z);

                playerMesh.rotation.x = playerData.cameraRotation.x;
                playerMesh.rotation.y = playerData.cameraRotation.y;
                playerMesh.rotation.z = playerData.cameraRotation.z;
            } else {
                // Create new player mesh
                const playerMesh = BABYLON.MeshBuilder.CreateCylinder(`player-${playerId}`, { diameter: 2, height: 3 }, Scene.getScene());
                playerMesh.position = new BABYLON.Vector3(playerData.coords.x, playerData.coords.y - 1.5, playerData.coords.z);
                playerMesh.type = 'player';
                playerMesh.rotation.y = playerData.cameraRotation.y;
                playerMesh.rotation.x = playerData.cameraRotation.z;

                // draw weapon on player body
                let weaponClone = undefined
                switch (playerData.holdingGunId) {
                    case 'AKM':
                        weaponClone = AKM.MODEL_weaponModel.clone("AKM Clone");
                        break
                    case 'G17':
                        weaponClone = G17.MODEL_weaponModel.clone("G17 Clone");
                        break
                }

                weaponClone.visibility = 1
                weaponClone.position = new BABYLON.Vector3(AKM.MEASUREMENTS.position.x, AKM.MEASUREMENTS.position.y + 1, AKM.MEASUREMENTS.position.z)
                weaponClone.rotation.x = AKM.MEASUREMENTS.rotation.x
                weaponClone.rotation.y = AKM.MEASUREMENTS.rotation.y
                weaponClone.rotation.z = AKM.MEASUREMENTS.rotation.z

                weaponClone.parent = playerMesh

                // Add player mesh to the scene
                Scene.getScene().addMesh(playerMesh);
            }
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