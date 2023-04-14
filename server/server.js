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
function setStartGameData(_roomId, _socket) {
    // get map id from room
    const roomData = Rooms.getRoomData(_roomId)
    const mapId = roomData.mapData.id
    const mapData = Maps.getMapDataById(mapId)

    // io.to(roomID).emit('updateRoomData', newRoomData)
    _socket.emit('setStartGameData', {...mapData, socketId: _socket.id})
}



// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A new client connected');

    // create new room
    const roomId = '123'
    const mapId = 'MAP_01'

    // get map data
    const mapData = Maps.getMapDataById(mapId)
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
        holdingGunId: 'AKM',
        coords: {x: 0, y: 0, z: 0},
        camera: {tilt: 0, pan: 0}
    }
    Players.addPlayer(newPlayerData)

    // join room
    socket.join(roomId)
    socket.roomId = roomId

    setStartGameData(roomId, socket)

    socket.on('playerMoved', (_newCoords) => {
        const newX = _newCoords.x
        const newY = _newCoords.y
        const newZ = _newCoords.z

        Players.updatePlayerCoords(socket.id, _newCoords)
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
}, 10)




server.listen(8003, () => {
    console.log('Server listening on port 8003');
});