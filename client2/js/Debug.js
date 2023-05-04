
import Scene from './Scene.js';
import Game from './Game.js';

class Debug {
    enabled = true
    stats = {
        meshesInScene: 0, // number of meshes in scene
        fps: 0, // game FPS
    }

    constructor() {
        if (this.enabled) {
            setInterval(() => {
                this.refresh()
            }, 100)
        }
    }

    /**
     * set debug window to be shown or hidden
     * @param _option {boolean}
     */
    isShown(_option) {

    }

    refresh() {
        const debugWindow = document.querySelector('#debug-window')

        // show number of meshes in scene
        const countMeshes = debugWindow.querySelector('#count-meshes')
        this.stats.meshesInScene = Scene.getScene().meshes.length
        countMeshes.innerHTML = this.stats.meshesInScene

        // show game FPS
        const fps = debugWindow.querySelector('#fps')
        this.stats.fps = Game.getEngine().getFps().toFixed()
        fps.innerHTML = this.stats.fps
    }



    #buildDebugDiv() {
        const div = document.createElement('div')

    }
}

export default new Debug()