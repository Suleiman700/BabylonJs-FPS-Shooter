
import GUI from '../GUI.js';
import Player from '../Player.js';
import Camera from '../Camera.js';
import Weapons from '../weapons/Weapons.js';
import Sky from '../Environment/Sky.js';

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

        /**
         * set start game data like player health, speed...etc
         */
        this.socket.on('setStartGameData', (_mapData) => {
            // set UI player health
            GUI.UI_setPlayerHealth(_mapData.defaultPlayerHealth)

            console.log(_mapData)

            // set selected weapon
            const selectedWeaponId = _mapData.defaultWeaponId
            Weapons.pickupWeapon(selectedWeaponId)

            // set player walk speed
            Player.walkSpeed = _mapData.defaultPlayerWalkSpeed
            // set player sprint speed
            Player.sprintSpeed = 20 // _mapData.defaultPlayerSprintSpeed
            // set player jump height
            Player.jumpHeight = _mapData.defaultPlayerJumpHeight
            // set player gravity
            Player.gravity = _mapData.defaultPlayerGravity

            // pick random spawn point and set player spawn
            const randomSpawnPoint = _mapData.playersSpawns[Math.floor(Math.random() * _mapData.playersSpawns.length)];
            Player.setCoords(randomSpawnPoint.x, randomSpawnPoint.y, randomSpawnPoint.z)

            // set sky
            const skyType = _mapData.skySettings.type
            Sky.showSky(skyType, Sky.ANIMATION_SPEED_SETTINGS.NORMAL)
        })

        // update room data
        this.socket.on('updateRoomData', (_data) => {
            // console.log(_data)

            // set round number UI text
            GUI.UI_setRoundNumber(_data.round)
        })
    }

    receiveEmits() {

    }
}

export default new Socket()