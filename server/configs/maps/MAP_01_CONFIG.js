
// const { CONFIG_AKM } = require('../../weapons/CONFIG_AKM.js');
//
// CONFIG_AKM.ammo = 9

const MAP_01_CONFIG = {
    id: 'MAP_01',
    name: 'MAP 01',
    zombiesSpawns: [
        {id: 0, x: 45, y: 3.015, z: 45, enabled: true,},
        {id: 1, x: -45, y: 3.015, z: -45, enabled: true,},
    ],
    defaultZombieSpawn: 1, // spawn 1 zombie first time
    defaultZombieHealth: 100, // default zombie health
    defaultZombieDamage: 1, // default zombie damage
    defaultZombieShootReward: 1, // default zombie shoot reward (money)
    defaultZombieKillReward: 2, // default zombie kill reward (money)
    defaultZombieWalkSpeed: 1, // default zombie walk speed
    defaultZombieSpawnTimer: 1000, // time between each zombie spawn (in ms)

    defaultPlayerWalkSpeed: 3.5, // default player walk speed
    defaultPlayerSprintSpeed: 5, // default player sprint speed
    defaultPlayerHealth: 100, // default player health (1 ~ 100)
    defaultPlayerJumpHeight: 0.2, // default player jump height (uses less gravity)
    defaultPlayerGravity: -0.2, // default player gravity
    defaultPlayerMoney: 0, // default player money

    defaultWeaponId: 'G17', // default weapon id

    timeBetweenRounds: 2000, // time between rounds (in ms)

    performance: {
        zombieSpawnLimit: 20, // the maximum number of zombies to spawn in scene - (number / 2 = the maximum number of zombies) because each zombie has two meshes - example: 10 means 5 zombies | 20 means 10 zombies
    },

    multiplier: {
        increaseZombieHealthEachRound: 5, // increase zombie health for each new round
    },

    skySettings: {
        type: 2, // types can be found in client Sky class under SKY_TYPES
    },

    // define players spawns in map
    playersSpawns: [
        // {x: 0, y: 10, z: 0, pan: 10, roll: 10},
        {x: 15, y: 10, z: 45, pan: 25, roll: 1},
        // {x: 30, y: 10, z: 30, pan: 10, roll: 10},
    ],

}

module.exports = { MAP_01_CONFIG }