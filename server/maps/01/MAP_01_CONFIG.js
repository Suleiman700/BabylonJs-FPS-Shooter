
const MAP_01_CONFIG = {
    id: 'MAP_01',
    name: 'MAP 01',
    zombiesSpawns: [
        {x: 0, y: 0, z: 0},
    ],
    starterZombieSpawn: 1, // spawn 1 zombie first time
    starterZombieHealth: 100, // default zombie health
    starterZombieDamage: 1, // default zombie damage
    starterZombieKillReward: 1, // default zombie kill reward (money)
    starterZombieWalkSpeed: 1, // default zombie walk speed

    starterPlayerWalkSpeed: 1, // default player walk speed
    starterPlayerSprintSpeed: 2, // default player sprint speed
    starterPlayerHealth: 100, // default player health
    starterPlayerJumpHeight: 1.5, // default player jump height
}

module.exports = { MAP_01_CONFIG }