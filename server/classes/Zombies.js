
class Zombies {
    // store zombies
    #zombies = [];

    // template for storing room
    #zombieTemplate = {
        roomId: '', // string
        id: 0, // number - 1, 2, 3
        health: 100, // number
        speed: 1, // number
        damage: 1, // number
        color: 'red', // string
        scale: {x: 1, y: 1, z: 1}, // zombie scale
        coords: {x: 0, y: 0, z: 0}, // current zombie coords
        walkTo: {x: 0, y: 0, z: 0}, // walk to coords
    }

    constructor() {}

    createZombie(_zombieData) {
        // check if zombie data matches the template
        const isValid = Object.keys(this.#zombieTemplate).every(
            (key) => key in _zombieData
        );

        if (!isValid) {
            throw new Error('Cannot add new player, Data does not match template');
        }

        // Add player to the list
        this.#zombies.push(_zombieData);
    }


    /**
     * get zombies in room
     * @param _roomId {string}
     * @return {[{}]}
     */
    getZombiesInRoom(_roomId) {
        return this.#zombies.filter(zombie => zombie.roomId == _roomId);
    }

    /**
     * update zombie walk to coords
     * @param _coords {object} example: {x: 0, y: 0, z: 0}
     * @param _roomId {string}
     * @param _zombieId {number}
     */
    updateZombieWalkTo(_coords, _roomId, _zombieId) {
        const zombieToUpdate = this.#zombies.find(zombie => zombie.roomId == _roomId && zombie.id == _zombieId)
        if (zombieToUpdate) {
            zombieToUpdate.walkTo = _coords;
            // zombieToUpdate.coords = _coords;
        }
    }

    /**
     * calculate the number of zombies to spawn
     * @param _difficulty {number} example: 1
     * @param _round {number} example: 10
     * @return {number}
     */
    calcNumberOfZombiesToSpawn(_difficulty, _round) {
        // Define the base maximum number of zombies for each difficulty level
        const baseMaxZombies = {
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6
        };

        // Define the formula to calculate additional zombies based on round number
        const roundFactor = 2; // Adjust this value to control the rate of increase
        const additionalZombies = _round * roundFactor;

        // Calculate the total maximum number of zombies for the given difficulty and round
        return baseMaxZombies[_difficulty] + additionalZombies;
    }

    get zombies() {
        return this.#zombies
    }
}

module.exports = new Zombies()