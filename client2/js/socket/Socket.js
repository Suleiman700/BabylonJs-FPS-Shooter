
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';
import Camera from '../Camera.js';
import Weapons from '../weapons/Weapons.js';
import Sky from '../Environment/Sky.js';
import Players from '../Players.js';

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
            Weapons.pickupWeapon(_mapData.defaultWeaponId)

            // set player socket id
            ClientPlayer.socketId = _mapData.socketId

            // set player walk speed
            ClientPlayer.walkSpeed = _mapData.defaultPlayerWalkSpeed
            // set player sprint speed
            ClientPlayer.sprintSpeed = _mapData.defaultPlayerSprintSpeed
            // set player jump height
            ClientPlayer.jumpHeight = _mapData.defaultPlayerJumpHeight
            // set player gravity
            ClientPlayer.gravity = _mapData.defaultPlayerGravity
            // set player money - this also sets the UI
            ClientPlayer.money = _mapData.defaultPlayerMoney

            // pick random spawn point and set player spawn
            const randomSpawnPoint = _mapData.playersSpawns[Math.floor(Math.random() * _mapData.playersSpawns.length)];
            ClientPlayer.setCoords(randomSpawnPoint.x, randomSpawnPoint.y, randomSpawnPoint.z)

            // set sky
            const skyType = _mapData.skySettings.type
            Sky.showSky(skyType, Sky.ANIMATION_SPEED_SETTINGS.NORMAL)
        })

        // update room data
        this.socket.on('updateRoomData', (_data) => {
            // console.log(_data)

            // set round number UI text
            GUI.UI_setRoundNumber(_data.round)

            // store players
            Players.players = _data.players
        })

        this.socket.on('bulletFired', (_bulletData) => {
            Weapons.fireFromOther(_bulletData.weaponId, _bulletData.bulletCords, _bulletData.bulletDirection)
        })
    }

    receiveEmits() {

    }
}

export default new Socket()