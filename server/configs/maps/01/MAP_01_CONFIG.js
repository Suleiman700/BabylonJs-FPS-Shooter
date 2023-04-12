
const { CONFIG_AKM } = require('../../weapons/CONFIG_AKM.js');

CONFIG_AKM.ammo = 9

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

    defaultPlayerWalkSpeed: 1.5, // default player walk speed
    defaultPlayerSprintSpeed: 2.5, // default player sprint speed
    defaultPlayerHealth: 100, // default player health (1 ~ 100)
    defaultPlayerJumpHeight: 0.2, // default player jump height (uses less gravity)
    defaultPlayerGravity: -0.1, // default player gravity

    // define players spawns in map
    playersSpawns: [
        {x: 10, y: 10, z: 10, pan: 10, roll: 10}
    ],

    defaultWeaponId: 'G17', // default weapon id
}

module.exports = { MAP_01_CONFIG }