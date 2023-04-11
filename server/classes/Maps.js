
const { MAP_01_CONFIG } = require('../configs/maps/01/MAP_01_CONFIG.js')

class Maps {
    constructor() {}

    /**
     * get map data by id
     * @param _mapID {string} example: MAP_01
     * @returns {object}}
     */
    getMapDataById(_mapID) {
        switch (_mapID) {
            case 'MAP_01':
                return MAP_01_CONFIG
            default:
                throw new Error(`[Get Map Data By Id] Unable to find map with id ${_mapID}`);
        }
    }
}

module.exports = new Maps()