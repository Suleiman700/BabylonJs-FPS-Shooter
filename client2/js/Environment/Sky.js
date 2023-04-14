import Scene from '../Scene.js';

/*
    Usage:

    Sky.showSky(Sky.SKY_TYPES.MORNING, Sky.ANIMATION_SPEED_SETTINGS.NORMAL)
 */

class Sky {
    #skybox = undefined
    #skyboxMaterial = undefined

    // sky types
    SKY_TYPES = {
        MORNING: 1,
        NOON: 2,
        EVENING: 3,
    }

    // show sky animation speed settings
    ANIMATION_SPEED_SETTINGS = {
        VERY_SLOW: 5,
        SLOW: 6,
        NORMAL: 7,
        FAST: 8,
        VERY_FAST: 9,
    }

    constructor() {
        // Sky material
        this.#skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", Scene.getScene());
        this.#skyboxMaterial.backFaceCulling = false;

        // Sky mesh (box)
        this.#skybox = BABYLON.Mesh.CreateBox("skyBox", 300, Scene.getScene());
        this.#skybox.material = this.#skyboxMaterial;
    }

    /**
     * show sky
     * @param _skyType {number} example: 1
     * @param _animationSpeed {number} the speed
     */
    showSky(_skyType, _animationSpeed) {
        // Set sky configuration based on skyType
        switch (_skyType) {
            case 1: // morning
                this.#setSkyConfig("material.inclination", this.#skyboxMaterial.inclination, 0.45, _animationSpeed);
                break;
            case 2: // noon
                this.#setSkyConfig("material.inclination", this.#skyboxMaterial.inclination, 0, _animationSpeed);
                break;
            case 3: // evening
                this.#setSkyConfig("material.inclination", this.#skyboxMaterial.inclination, -0.5, _animationSpeed);
                break;
            // add more sky types as needed
        }

        this.#skybox.setEnabled(true);
    }

    #setSkyConfig(property, from, to, speed) {
        var keys = [
            { frame: 0, value: from },
            { frame: 100, value: to }
        ];

        var frameRate = 10; // default frame rate
        switch(speed) {
            case this.ANIMATION_SPEED_SETTINGS.VERY_SLOW:
                frameRate = 0.1;
                break;
            case this.ANIMATION_SPEED_SETTINGS.SLOW:
                frameRate = 0.5;
                break;
            case this.ANIMATION_SPEED_SETTINGS.NORMAL:
                frameRate = 10;
                break;
            case this.ANIMATION_SPEED_SETTINGS.FAST:
                frameRate = 20;
                break;
            case this.ANIMATION_SPEED_SETTINGS.VERY_FAST:
                frameRate = 50;
                break;
        }

        var animation = new BABYLON.Animation("animation", property, 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setKeys(keys);
        animation.framePerSecond = frameRate;

        Scene.getScene().stopAnimation(this.#skybox);
        Scene.getScene().beginDirectAnimation(this.#skybox, [animation], 0, 100, false, 30);
    }
}

export default new Sky()