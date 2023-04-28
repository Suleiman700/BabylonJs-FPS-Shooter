const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create a new HTTP server
const io = require('socket.io')(server, {cors: {origin: '*'}}); // Create a new Socket.IO server and attach it to the HTTP server

const Players = require('./classes/Players.js')
const Rooms = require('./classes/Rooms.js')
const Maps = require('./classes/Maps.js')
const Zombies = require('./classes/Zombies.js');



const lobbies = [];
const players = [];

/**
 * send required data when the game starts for the first time
 * @param _roomId {string} example: 123
 * @param _socket {socket}
 */
async function setStartGameData(_roomId, _socket) {
    // get map id from room
    const roomData = Rooms.getRoomData(_roomId)
    const mapId = roomData.mapData.id
    const mapData = await Maps.getMapConfig(mapId)
    // io.to(roomID).emit('updateRoomData', newRoomData)
    _socket.emit('setStartGameData', {...mapData, socketId: _socket.id})
}



// Handle Socket.IO connections
io.on('connection', async (socket) => {
    console.log('A new client connected');

    // create new room
    const roomId = '123'
    const mapId = 'MAP_01'
    const playerName = 'DUMMY'

    // get map data
    const mapData = await Maps.getMapConfig(mapId)
    const newRoomData = {
        roomId: roomId,
        difficulty: 1,
        mapData: mapData,
        roundData: {
            isStarted: false,
            number: 1
        },
    }
    Rooms.createRoom(newRoomData)

    // add player to room
    const newPlayerData = {
        socketId: socket.id,
        roomId: roomId,
        name: playerName,
        health: mapData.defaultPlayerHealth,
        money: mapData.defaultPlayerMoney,
        holdingGunId: mapData.defaultWeaponId,
        coords: {x: 0, y: 0, z: 0},
        cameraRotation: {x: 0, y: 0, z: 0},
        stats: {
            bulletsFired: 0
        },
        isReadyForNextRound: false
    }
    Players.addPlayer(newPlayerData)

    // join room
    socket.join(roomId)
    socket.roomId = roomId

    setStartGameData(roomId, socket)

    /**
     * event when player moves
     * @param _newCoords {object} example: { x: 10.289480511656688, y: 3.015, z: 11.974716675241892 }
     */
    socket.on('playerMoved', (_newCoords) => {
        // update player coords
        Players.updatePlayerCoords(socket.id, _newCoords)
    })

    /**
     * event when player shoot bullet
     * @param _bulletData {object}
     * {
     *     "weaponId": "AKM",
     *     "shooterId": "PZXS_j4uyPoV2VkAAAAN",
     *     "bulletDirection": {
     *         "x": 0.988952772804412,
     *         "y": -0.01605881308671595,
     *         "z": 0.14735850055124486
     *     },
     *     "bulletCords": {
     *         "x": 10,
     *         "y": 3.015,
     *         "z": 10
     *     }
     * }
     */
    socket.on('bulletFired', (_bulletData) => {
        socket.broadcast.to(socket.roomId).emit('bulletFired', _bulletData)
    })

    /**
     * event when player rotates camera
     * @param _rotationData {object} example: {_x: 0, _y: 0, _z: 0}
     */
    socket.on('playerRotateCamera', (_rotationData) => {
        // update player camera coords
        Players.updatePlayerCameraRotation(socket.id, _rotationData)
    })

    /**
     * event when player purchase weapon from wall shop
     * @param _purchasedWeaponData {object} example: {weaponId: 'AKM', weaponCost: 150}
     */
    socket.on('playerPurchasedWeaponFromWallShop', (_purchasedWeaponData) => {
        // update player holding weapon id
        Players.purchasedWeapon(socket.id, _purchasedWeaponData.weaponId, _purchasedWeaponData.weaponCost)

        // emit to all players to play wall shop purchase particle
        const particleCoords = Players.getPlayerCoords(socket.id)
        io.sockets.in(socket.roomId).emit('playWallShopPurchaseParticle', particleCoords)
    })

    socket.on('playerPurchasedMedkitFromWallShop', (_medkitData) => {
        console.log(_medkitData)
        Players.purchasedMedkit(socket.id, _medkitData.itemCost)
    })

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A client disconnected');

        // remove player
        Players.removePlayer(socket.id)

        // count players left in room
        const countPlayersInRoom = Players.countPlayersInRoom(socket.roomId)
        console.log(countPlayersInRoom)

        // delete room if no players left in it
        if (countPlayersInRoom == 0) {
            // delete room
            Rooms.deleteRoom(socket.roomId)
        }
    });
});







setInterval(() => {
    // update rooms
    for (const roomData of Rooms.getRooms()) {
        const roomID = roomData.roomId

        // get room players
        const roomPlayers = Players.getPlayersInRoom(roomID)

        // check if round is started
        if (roomData.roundData.isStarted) {
            // check if there are zombies in room
            let zombiesInRoom = Zombies.getZombiesInRoom(roomID)

            // zombies found in room
            if (zombiesInRoom.length) {
                // iterate on zombies and make them walk to player coords
                const playerCoords = roomPlayers[0].coords // {x: 0, y: 0, z: 0}

                for (let i = 0; i < zombiesInRoom.length; i++) {
                    const zombieId = zombiesInRoom[i].id
                    Zombies.updateZombieWalkTo(playerCoords, roomID, zombieId)
                }
            }
            // no zombies in room
            else {
                // calculate the amount of zombies to spawn based on difficulty and round number
                const numberOfZombiesToSpawn = 1 // Zombies.calcNumberOfZombiesToSpawn(roomData.difficulty, roomData.roundData.number)

                // create zombies
                for (let i = 0; i < numberOfZombiesToSpawn; i++) {
                    // get available zombies spawners
                    const availableZombiesSpawners = roomData.mapData.zombiesSpawns.filter(zombieSpawn => zombieSpawn.enabled === true)

                    // pick random spawn point
                    const randomIndex = Math.floor(Math.random() * availableZombiesSpawners.length);

                    const zombieData = {
                        roomId: roomID, // string
                        id: i, // number - 1, 2, 3
                        health: roomData.mapData.defaultZombieHealth, // number
                        speed: roomData.mapData.defaultZombieWalkSpeed, // number
                        damage: roomData.mapData.defaultZombieDamage, // number
                        color: 'red', // string
                        scale: {x: 1, y: 1, z: 1}, // zombie scale
                        coords: {
                            x: availableZombiesSpawners[randomIndex].x,
                            y: availableZombiesSpawners[randomIndex].y,
                            z: availableZombiesSpawners[randomIndex].z
                        }, // current zombie coords
                        walkTo: {
                            x: 0,
                            y: 0,
                            z: 0,
                        }, // zombie walk to coords
                    }
                    Zombies.createZombie(zombieData)
                }
            }



        }
        else {
            // set round to started
            setTimeout(() => {
                roomData.roundData.isStarted = true
                // console.log(roomData.roundData.number)
            }, roomData.mapData.timeBetweenRounds)
        }

        // get zombies
        const zombies = Zombies.getZombiesInRoom(roomID)

        // put room players into data
        const newRoomData = {
            ...roomData,
            players: roomPlayers,
            zombies: zombies,
        }

        console.log(zombies[0])

        io.to(roomID).emit('updateRoomData', newRoomData)
    }
}, 1000)




server.listen(8003, () => {
    console.log('Server listening on port 8003');
});