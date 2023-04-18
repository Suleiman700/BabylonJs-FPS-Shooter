
// const { CONFIG_AKM } = require('../../weapons/CONFIG_AKM.js');
//
// CONFIG_AKM.ammo = 9

const MAP_01_CONFIG = {
    id: 'MAP_01',
    name: 'MAP 01',
    zombiesSpawns: [
        {x: 0, y: 0, z: 0},
    ],
    defaultZombieSpawn: 1, // spawn 1 zombie first time
    defaultZombieHealth: 100, // default zombie health
    defaultZombieDamage: 1, // default zombie damage
    defaultZombieKillReward: 1, // default zombie kill reward (money)
    defaultZombieWalkSpeed: 1, // default zombie walk speed

    defaultPlayerWalkSpeed: 3.5, // default player walk speed
    defaultPlayerSprintSpeed: 5, // default player sprint speed
    defaultPlayerHealth: 100, // default player health (1 ~ 100)
    defaultPlayerJumpHeight: 0.2, // default player jump height (uses less gravity)
    defaultPlayerGravity: -0.2, // default player gravity
    defaultPlayerMoney: 1000, // default player money

    skySettings: {
        type: 3, // types can be found in client Sky class under SKY_TYPES
    },

    // define players spawns in map
    playersSpawns: [
        // {x: 0, y: 10, z: 0, pan: 10, roll: 10},
        {x: 10, y: 10, z: 10, pan: 10, roll: 10},
        // {x: 30, y: 10, z: 30, pan: 10, roll: 10},
    ],

    defaultWeaponId: 'AKM', // default weapon id
}

module.exports = { MAP_01_CONFIG }