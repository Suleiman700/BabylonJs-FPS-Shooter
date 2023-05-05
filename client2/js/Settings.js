
class Settings {

    zombies = {
        spawnTimer: -1, // time between each zombie spawn (in ms) - this will be updated on setStartGameData server emit
        spawnLimit: -1, // the maximum number of zombies to be created in scene
    }

    constructor() {}
}

export default new Settings()