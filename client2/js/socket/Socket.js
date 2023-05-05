
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';
import Camera from '../Camera.js';
import Weapons from '../weapons/Weapons.js';
import Sky from '../Environment/Sky.js';
import Players from '../Players.js';
import Particles from '../Environment/Particles.js';
import Zombies from '../Zombies.js';
import Game from '../Game.js';
import Settings from '../Settings.js';

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

            // store zombies settings
            Settings.zombies.spawnTimer = _mapData.defaultZombieSpawnTimer
            Settings.zombies.spawnLimit = _mapData.performance.zombieSpawnLimit

            // pick random spawn point and set player spawn
            const randomSpawnPoint = _mapData.playersSpawns[Math.floor(Math.random() * _mapData.playersSpawns.length)];
            ClientPlayer.setCoords(randomSpawnPoint.x, randomSpawnPoint.y, randomSpawnPoint.z)

            // set sky
            const skyType = _mapData.skySettings.type
            Sky.showSky(skyType, Sky.ANIMATION_SPEED_SETTINGS.NORMAL)
        })

        // update room data - loop
        this.socket.on('updateRoomData', (_data) => {
            // console.log(_data)

            // set round number UI text
            GUI.UI_setRoundNumber(_data.roundData.number)

            // console.log(_data)

            // store players
            Players.players = _data.players

            // store zombies
            Zombies.zombies = _data.zombies

            // set the number of zombies left
            GUI.UI_setZombiesLeftNumber(_data.zombies.length)
        })

        this.socket.on('bulletFired', (_bulletData) => {
            Weapons.fireFromOther(_bulletData.weaponId, _bulletData.bulletCords, _bulletData.bulletDirection)
        })

        /**
         * play wall shop purchase particles
         * @param _particleCoords {object} example: {x: 15, y: 3.015, z: 90}
         */
        this.socket.on('playWallShopPurchaseParticle', (_particleCoords) => {
            console.log('here')
            // play purchase from wall shop particles
            Particles.playWallShopPurchaseParticle(_particleCoords)
        })
    }

    receiveEmits() {

    }
}

export default new Socket()