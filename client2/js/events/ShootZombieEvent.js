import Socket from '../socket/Socket.js';

class ShootZombieEvent {
    constructor() {}

    /**
     * fire shoot zombie event
     * @param _zombieId {number} example: 0
     * @param _damageAmount {number} example: 10
     */
    fireEvent(_zombieId, _damageAmount) {
        Socket.socket.emit('ShootZombieEvent', {zombieId: _zombieId, damageAmount: _damageAmount})
    }
}

export default new ShootZombieEvent()