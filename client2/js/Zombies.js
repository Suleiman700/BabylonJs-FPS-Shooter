
import Scene from './Scene.js';
import Camera from './Camera.js';
import Game from './Game.js';

class Zombies {
    #zombies = [] // array of zombies objects
    /*
        store zombies spawners
        {
            id: 0,
            enabled: false,
        }
     */
    #spawners = []

    #DEVELOPER = {
        DEBUG: true,
        SHOW_ZOMBIE_BOUNDING_BOX: false,
        SHOW_ZOMBIE_ID_ABOVE: true, // show id above the zombie mesh
    }

    constructor() {}

    /**
     * update zombies data
     * @param _zombiesData {[{}]}
     */
    updateZombiesData(_zombiesData) {
        // Loop through players received from the emit
        for (let i = 0; i < this.#zombies.length; i++) {
            const zombieData = this.#zombies[i];
            const zombieCoords = zombieData.coords // example: {x: 0, y: 0, z: 0}
            const zombieId = zombieData.id;
            const zombieWalkTo = zombieData.walkTo // example: {x: 0, y: 0, z: 0}
            const zombieSpeed = 0.05

            // Find the zombie mesh in the scene using the socket ID
            let zombieMesh = Scene.getScene().getMeshByName(`zombie-${zombieId}`);


            // If zombie mesh exists, update its position
            if (zombieMesh && zombieMesh.type === 'zombie') {
                // If zombie mesh exists, update its position and walk towards the player
                // zombieMesh.position = new BABYLON.Vector3(zombieCoords.x, zombieCoords.y, zombieCoords.z);

                // zombieMesh.checkCollisions = true



            }
            else {
                // Create new zombie mesh
                zombieMesh = BABYLON.MeshBuilder.CreateCylinder(`zombie-${zombieId}`, {height: 3, diameter: 2, tessellation: 10}, Scene.getScene());
                zombieMesh.position = new BABYLON.Vector3(zombieCoords.x, zombieCoords.y, zombieCoords.z);
                zombieMesh.type = 'zombie';
                zombieMesh.position.y = 1
                zombieMesh.position.x = Math.random() * 20 - 10; // Set x position randomly between -10 and 10
                zombieMesh.position.z = Math.random() * 20 - 10; // Set z position randomly between -10 and 10
                zombieMesh.material = new BABYLON.StandardMaterial("mat", Scene.getScene());
                zombieMesh.health = 100
                zombieMesh.material.emissiveColor = new BABYLON.Color3(zombieData.health, zombieData.health, zombieData.health);
                zombieMesh.material = new BABYLON.StandardMaterial("mat", Scene.getScene()); // Create a new standard material for the zombie
                zombieMesh.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Set the diffuse color to red (R: 1, G: 0, B: 0)

                // zombieMesh.checkCollisions = true;
                // // Set up collision detection for the zombie
                // zombieMesh.ellipsoid = new BABYLON.Vector3(1, 1, 1);
                // zombieMesh.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);


                if (this.#DEVELOPER.SHOW_ZOMBIE_ID_ABOVE) {
                    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
                    // Create a new text block for the zombie ID label
                    var zombieIdText = new BABYLON.GUI.TextBlock();
                    zombieIdText.text = `Zombie ID: ${zombieId}`;
                    zombieIdText.color = "white";
                    zombieIdText.fontSize = 14;
                    zombieIdText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                    zombieIdText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    // Add the zombie ID text to the advanced texture
                    advancedTexture.addControl(zombieIdText);
                    // Set the position of the zombie ID text above the zombie mesh
                    var zombiePosition = zombieMesh.getBoundingInfo().boundingBox.centerWorld;
                    var screenPosition = BABYLON.Vector3.Project(zombiePosition, BABYLON.Matrix.Identity(), Scene.getScene().getTransformMatrix(), Scene.getScene().activeCamera.viewport.toGlobal(Game.getEngine()));
                    zombieIdText.linkWithMesh(zombieMesh);
                    zombieIdText.linkOffsetY = -50;
                    // Add the zombie ID text control to the zombie mesh as a metadata
                    zombieMesh.zombieIdUIText = zombieIdText;
                }

                if (this.#DEVELOPER.SHOW_ZOMBIE_BOUNDING_BOX) {
                    // show zombie bounding box
                    zombieMesh.showBoundingBox = true
                }


                zombieMesh.physicsImpostor = new BABYLON.PhysicsImpostor(zombieMesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0, restitution: 0, friction: 0.5, applyGravity: true }, Scene.getScene());
                // zombieMesh.physicsImpostor.physicsBody.collisionFilterGroup = 2; // set collision group to 2 for zombies
                // zombieMesh.physicsImpostor.physicsBody.collisionFilterMask = 1; // only collide with ground


                // zombieMesh.physicsImpostor = new BABYLON.PhysicsImpostor(zombieMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, Scene.getScene());

                zombieMesh.checkCollisions = true

                // Add zombie mesh to the scene
                Scene.getScene().addMesh(zombieMesh);
            }
        }
    }

    spawnZombies() {
        var targetHealth = 100;

        function isTooClose(zombie, zombiesArray, minDistance) {
            for (var i = 0; i < zombiesArray.length; i++) {
                var otherZombie = zombiesArray[i];
                var distance = BABYLON.Vector3.Distance(zombie.position, otherZombie.position);
                if (distance < minDistance) {
                    return true;
                }
            }
            return false;
        }


        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        var minDistance = 5; // Minimum distance between zombies

        // Create 1 targets
        for (var i = 0; i < 1; i++) {
            var zombie = BABYLON.MeshBuilder.CreateCylinder("zombie", {height: 3, diameter: 2, tessellation: 10}, Scene.getScene());
            // zombie.scaling.y = 0.5; // Set the scaling of the cylinder to make it half the original height

            zombie.type = 'zombie'
            zombie.position.y = 10
            zombie.position.x = Math.random() * 20 - 10; // Set x position randomly between -10 and 10
            zombie.position.z = Math.random() * 20 - 10; // Set z position randomly between -10 and 10
            zombie.material = new BABYLON.StandardMaterial("mat", Scene.getScene());
            zombie.health = targetHealth
            zombie.material.emissiveColor = new BABYLON.Color3(zombie.health, zombie.health, zombie.health);
            zombie.material = new BABYLON.StandardMaterial("mat", Scene.getScene()); // Create a new standard material for the zombie
            zombie.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Set the diffuse color to red (R: 1, G: 0, B: 0)

            // show bounding box if enabled
            if (this.#DEVELOPER.SHOW_ZOMBIE_BOUNDING_BOX) zombie.showBoundingBox = true

            zombie.physicsImpostor = new BABYLON.PhysicsImpostor(zombie, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0, restitution: 0, friction: 0.5, applyGravity: false }, Scene.getScene());
            zombie.physicsImpostor.physicsBody.collisionFilterGroup = 0; // set collision group to 2 for zombies

            // enemy health bar
            var enemyHealthBar = new BABYLON.GUI.Rectangle();
            enemyHealthBar.width = "100px";
            enemyHealthBar.height = "10px";
            enemyHealthBar.cornerRadius = 20;
            enemyHealthBar.color = "black";
            enemyHealthBar.thickness = 3;
            enemyHealthBar.background = "green";
            advancedTexture.addControl(enemyHealthBar);
            enemyHealthBar.linkWithMesh(zombie);
            enemyHealthBar.linkOffsetY = -80;

            zombie.healthBar = enemyHealthBar

            // Update the zombie's initial position with minimum distance between zombies
            do {
                zombie.position.x = Math.random() * 20 - 10;
                zombie.position.z = Math.random() * 20 - 10;
            } while (isTooClose(zombie, this.#zombies, minDistance));

            this.#zombies.push(zombie);
        }

        var followRange = 100;
        var zombieSpeed = 0.005;


        // Scene.getScene().registerBeforeRender(() => {
        //     const player = Camera.getCamera();
        //     // Iterate over the zombies array and update their positions
        //     // Update the direction of the zombie based on the player's position
        //     for (var i = 0; i < this.#zombies.length; i++) {
        //         var zombie = this.#zombies[i];
        //
        //         // Set the zombie's Y position to 0
        //         zombie.position.y = 1;
        //
        //         // Calculate the distance between the zombie and the player
        //         var distance = BABYLON.Vector3.Distance(zombie.position, player.position);
        //
        //         // If the distance is within the follow range, move the zombie towards the player
        //         if (distance <= followRange) {
        //             // Calculate the direction from the zombie to the player
        //             var direction = player.position.subtract(zombie.position);
        //
        //             // Normalize the direction vector
        //             direction.normalize();
        //
        //             // Multiply the direction by the zombie's speed and delta time
        //             direction.scaleInPlace(zombieSpeed * Scene.getScene().getEngine().getDeltaTime());
        //
        //             // Move the zombie towards the player
        //             zombie.moveWithCollisions(direction);
        //         }
        //
        //         // Check if zombies are too close and move them slightly
        //         for (var j = i + 1; j < this.#zombies.length; j++) {
        //             var otherZombie = this.#zombies[j];
        //             var dist = BABYLON.Vector3.Distance(zombie.position, otherZombie.position);
        //             if (dist < 2) {
        //                 // Move the zombies away from each other
        //                 var direction = zombie.position.subtract(otherZombie.position);
        //                 direction.normalize();
        //                 direction.scaleInPlace(0.01);
        //                 zombie.moveWithCollisions(direction);
        //                 otherZombie.moveWithCollisions(direction.negate());
        //             }
        //         }
        //     }
        // });
    }

    /**
     * set zombies
     * @param _zombies {[{}]}
     * @return {*[]}
     */
    set zombies(_zombies) {
        this.#zombies = _zombies
    }
    /**
     *
     * get zombies
     * @return {*[]}
     */
    get zombies() {
        return this.#zombies
    }

}

export default new Zombies()