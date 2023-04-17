
import Scene from '../Scene.js';

class Particles {
    constructor() {}

    playWallShopPurchaseParticle(_coords) {
        // Create a particle system at player's position
        const particleSystem = new BABYLON.ParticleSystem("dollarSigns", 2000, Scene.getScene());

        // Set particle texture and emitter position
        particleSystem.particleTexture = new BABYLON.Texture("./assets/textures/flying_money_01.png", Scene.getScene());
        particleSystem.emitter = _coords;

        // Set particle parameters
        particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
        particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);
        particleSystem.color1 = new BABYLON.Color4(1, 1, 0, 1);
        particleSystem.color2 = new BABYLON.Color4(1, 1, 0, 1);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 10;
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        particleSystem.emitRate = 10;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Start emitting particles
        particleSystem.start();

        // Stop emitting particles after 1 second
        setTimeout(() => {
            particleSystem.stop();
        }, 350);
    }
}

export default new Particles()