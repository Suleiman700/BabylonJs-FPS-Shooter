

import Game from './Game.js';
import Scene from './Scene.js';
import Camera from './Camera.js';
import Loader from './Loader.js';
import Sky from './Environment/Sky.js';
import Socket from './socket/Socket.js';
import Keys from './Keys.js';
import ModMenu from './ModMenu.js';
import Updater from './Updater.js';
import AKM from './weapons/AKM.js';
import MovementEvent from './events/MovementEvent.js';
import Players from './Players.js';
import Zombies from './Zombies.js';
import scene from './Scene.js';
// import Debug from './Debug.js';
import Materials from './Materials.js';
import ClientPlayer from './ClientPlayer.js';

Game.initCanvas()
Game.createDefaultEngine()

Scene.initScene()
await Loader.loadWeapons()
await Loader.loadItems()
await Materials.loadMaterial()
Scene.createScene('MAP_01')

Camera.initCamera()


// Environment
Sky.initSky()

// register events
MovementEvent.register()

Socket.connect()


Keys.registerKeys()

// Enable the performance monitor
// Scene.getScene().debugLayer.show();

var startRenderLoop = function (_engine, _canvas, _scene) {
    _engine.runRenderLoop(function () {
        if (_scene && _scene.activeCamera) {
            Scene.getScene().render();
            Updater.runUpdater()

            // draw players
            Players.updatePlayersData()
            // draw zombies
            Zombies.updateZombiesData()
        }
    });
}

Scene.getScene().registerBeforeRender(() => {
    const zombies = Zombies.zombies;
    const zombieSpeed = 0.01;
    const zombieThreshold = 2;

    // find zombie meshes that are died (not exists in zombies data anymore)
    Scene.getScene().meshes.forEach(mesh => {

        // Check if mesh is a zombie
        if (mesh.type === 'zombie') {
            // Check if zombie ID is not in the new zombie data
            const zombieId = parseInt(mesh.name.replace('zombie-', ''));
            const zombieExists = zombies.find(zombie => zombie.id == zombieId);
            if (!zombieExists) {
                // Remove the mesh from the scene
                Zombies.removeZombieMeshFromScene(mesh)
            }
        }
    });

    // move zombies follow walkTo path
    zombies.forEach(zombieData => {
        const zombieId = zombieData.id;
        let zombieMesh = Scene.getScene().getMeshByName(`zombie-${zombieId}`);
        if (zombieMesh && zombieMesh.type === 'zombie') {
            const zombiePos = zombieMesh.position.clone();
            const zombieWalkTo = new BABYLON.Vector3(zombieData.walkTo.x, 0.5, zombieData.walkTo.z);

            // update zombie health in UI
            Zombies.updateZombieUIHealth(zombieMesh, zombieData.health)

            // Calculate the direction from the zombie to the walkTo point
            let direction = zombieWalkTo.subtract(zombiePos);
            direction.normalize();

            // Check for collisions with other zombies
            zombies.forEach(otherZombieData => {
                const otherZombieId = otherZombieData.id;
                if (zombieId === otherZombieId) {
                    return;
                }
                const otherZombieMesh = Scene.getScene().getMeshByName(`zombie-${otherZombieId}`);
                if (otherZombieMesh && otherZombieMesh.type === 'zombie') {
                    const otherZombiePos = otherZombieMesh.position.clone();
                    const distance = BABYLON.Vector3.Distance(zombiePos, otherZombiePos);
                    if (distance < zombieThreshold) {
                        // Zombies are colliding, move away from other zombie
                        if (distance < 2) {
                            const moveAwayDirection = zombiePos.subtract(otherZombiePos);
                            moveAwayDirection.normalize();
                            moveAwayDirection.scaleInPlace(0.02);
                            zombieMesh.moveWithCollisions(moveAwayDirection);
                            otherZombieMesh.moveWithCollisions(moveAwayDirection.negate());
                            // direction = direction.add(moveAwayDirection);
                        }
                    }
                }
            });

            // Scale the direction vector by the zombie's speed and delta time
            direction.scaleInPlace(zombieSpeed * Game.getEngine().getDeltaTime());

            // Move the zombie in the direction of the vector
            zombieMesh.moveWithCollisions(direction);
        }
    });
});




startRenderLoop(Game.getEngine(), Game.getCanvas(), Scene.getScene());

// Resize
window.addEventListener("resize", function () {
    Game.getEngine().resize();
});




window.initFunction = async function() {
    var asyncEngineCreation = async function() {
        try {
            return Game.createDefaultEngine()
            // return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return Game.createDefaultEngine()
            // return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!Game.getEngine()) throw 'engine should not be null.';
    startRenderLoop(Game.getEngine(), Game.getCanvas(), Scene.getScene());
    // window.scene = Scene.getScene()

    // register canvas keys
    // Keys.registerKeys()
};

// initFunction().then(() => {sceneToRender = scene});
// initFunction();





// const canvas = document.getElementById("mapCanvas");
// const ctx = canvas.getContext("2d");
// function drawMap() {
//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     // Define the radar dimensions
//     const radarSize = 200;
//     const padding = 10;
//
//     // Calculate the top left corner of the radar
//     const radarX = padding;
//     const radarY = padding;
//
//     // Draw the radar background
//     ctx.fillStyle = "#EEE";
//     ctx.fillRect(radarX, radarY, radarSize, radarSize);
//
//     // Get the client player's coordinates
//     const clientX = ClientPlayer.coords.x;
//     const clientY = ClientPlayer.coords.z;
//
//     // Calculate the scale factor for positioning the dots
//     const scaleFactor = radarSize / (2 * Math.max(canvas.width, canvas.height));
//
//     // Draw the targets
//     ctx.fillStyle = "red";
//     Zombies.zombies.forEach((target) => {
//         const targetX = radarX + radarSize / 2 + (target.coords.x - clientX) * scaleFactor;
//         const targetY = radarY + radarSize / 2 + (target.coords.z - clientY) * scaleFactor;
//         ctx.fillRect(targetX, targetY, 5, 5);
//     });
//
//     // Draw the axis lines
//     ctx.strokeStyle = "black";
//     ctx.beginPath();
//     ctx.moveTo(radarX, radarY + radarSize / 2);
//     ctx.lineTo(radarX + radarSize, radarY + radarSize / 2);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(radarX + radarSize / 2, radarY);
//     ctx.lineTo(radarX + radarSize / 2, radarY + radarSize);
//     ctx.stroke();
// }
// setInterval(drawMap, 100); // Update the map every 100 milliseconds