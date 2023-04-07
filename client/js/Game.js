
import Camera from './Camera.js';
import Player from './Player.js';

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scenes = {};
        this.currentScene = null;
        this.camera = null;
        this.player = null;
        this.createScenes();
        this.run();
    }

    createScenes() {
        // Create default scene
        const defaultScene = new BABYLON.Scene(this.engine);
        const camera = new Camera(defaultScene);
        const player = new Player(defaultScene, camera);
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, defaultScene);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), defaultScene);
        this.scenes.SCENE_DEFAULT = { scene: defaultScene, camera, player };

        this.player = player
    }

    loadScene(sceneName) {
        if (this.currentScene) {
            this.currentScene.scene.dispose();
        }
        this.currentScene = this.scenes[sceneName];
        this.currentScene.scene.render();
    }

    run() {
        this.engine.runRenderLoop(() => {
            this.currentScene.scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
}