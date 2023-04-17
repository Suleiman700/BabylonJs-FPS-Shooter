const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create a new HTTP server
const io = require('socket.io')(server, {cors: {origin: '*'}}); // Create a new Socket.IO server and attach it to the HTTP server

const Players = require('./classes/Players.js')
const Rooms = require('./classes/Rooms.js')
const Maps = require('./classes/Maps.js')



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

    // get map data
    const mapData = await Maps.getMapConfig(mapId)
    const newRoomData = {
        roomId: roomId,
        round: 1,
        difficulty: 1,
        mapData: mapData,
    }
    Rooms.createRoom(newRoomData)

    // add player to room
    const newPlayerData = {
        socketId: socket.id,
        roomId: roomId,
        health: 100,
        money: 0,
        holdingGunId: mapData.defaultWeaponId,
        coords: {x: 0, y: 0, z: 0},
        cameraRotation: {x: 0, y: 0, z: 0},
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
        // get zombies
        const zombies = [

        ]

        // put room players into data
        const newRoomData = {
            ...roomData,
            players: roomPlayers
        }
        io.to(roomID).emit('updateRoomData', newRoomData)
    }
}, 1)




server.listen(8003, () => {
    console.log('Server listening on port 8003');
});