class Maps {
    constructor() {}

    /**
     * get map config by its id
     * @param _mapId {string} example: MAP_01
     * @return {object}
     */
    async getMapConfig(_mapId) {
        // const configModule = await import(`../configs/maps/MAP_01_CONFIG.js`);
        const configModule = await import(`../configs/maps/${_mapId}_CONFIG.js`);
        return configModule.default[`${_mapId}_CONFIG`];
    }
}

module.exports = new Maps()