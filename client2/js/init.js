
import Socket from './socket/Socket.js';
Socket.connect()

import Game from './Game.js';
Game.initGame()

import Camera from './Camera.js';
Camera.initCamera()

import Scene from './Scene.js';
Scene.createScene('MAP_01')


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
};

initFunction().then(() => {sceneToRender = scene});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});