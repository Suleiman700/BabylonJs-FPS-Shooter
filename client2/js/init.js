
import Loader from './Loader.js';
await Loader.loadWeapons()

import Socket from './socket/Socket.js';
Socket.connect()

import Game from './Game.js';
Game.initGame()

import Camera from './Camera.js';
Camera.initCamera()

import Scene from './Scene.js';
Scene.createScene('MAP_01')

import Keys from './Keys.js';
import ModMenu from './ModMenu.js';
import Updater from './Updater.js';


// register events
import MovementEvent from './events/MovementEvent.js';
import Players from './Players.js';
MovementEvent.register()

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
            // Updater.runUpdater()

            // draw players
            Players.drawPlayers()
        }
    });
}

window.initFunction = async function() {
    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = Scene.getScene()

    // register canvas keys
    Keys.registerKeys()
};

initFunction().then(() => {sceneToRender = scene});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});