class Scene {
    constructor(engine, name, width, height) {
        this.engine = engine;
        this.scene = new BABYLON.Scene(engine);
        this.name = name;
        this.width = width;
        this.height = height;
    }

    load() {
        BABYLON.SceneLoader.Append(`./scenes/${this.name}/`, `${this.name}.babylon`, this.scene, (scene) => {
            this.scene = scene;
            this.scene.executeWhenReady(() => {
                this.engine.hideLoadingUI();
            });
        });
    }
}