export default class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        // this.createPlayer();
    }

    createPlayer() {
        const scene = this.scene
        const camera = this.camera

        scene.camera = camera


        BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
            // BABYLON.SceneLoader.ImportMesh("", "./assets/models/players/", "test2.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
            // Set the imported mesh as the player model
            const player = newMeshes[0];

            player.scaling.scaleInPlace(0.1);

            //Lock camera on the character
            // camera.target = player;
            // scene.camera.target = player
            // scene.camera.lockedTarget = player
            // camera.lockedTarget = player;


            // Set the player model's scaling
            // player.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);

            // Set the player model's position
            player.position = new BABYLON.Vector3(0, 0, 0);

            // Set the player model's rotation
            player.rotation = new BABYLON.Vector3(0, Math.PI, 0);

            // Get the walking animation from the imported animation groups
            const walkingAnim = scene.getAnimationGroupByName("Idle");

            // Play the walking animation on the player model
            walkingAnim.start(true, 1.0, walkingAnim.from, walkingAnim.to, true);

            //Hero character variables
            var heroSpeed = 0.03;
            var heroSpeedBackwards = 0.01;
            var heroRotationSpeed = 0.1;

            var animating = true;

            const walkAnim = scene.getAnimationGroupByName("Walking");
            const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
            const idleAnim = scene.getAnimationGroupByName("Idle");
            const sambaAnim = scene.getAnimationGroupByName("Samba");



            //Rendering loop (executed for everyframe)
            scene.onBeforeRenderObservable.add(() => {
                var keydown = false;
                //Manage the movements of the character (e.g. position, direction)
                if (inputMap["w"]) {
                    player.moveWithCollisions(player.forward.scaleInPlace(heroSpeed));
                    keydown = true;
                }
                if (inputMap["s"]) {
                    player.moveWithCollisions(player.forward.scaleInPlace(-heroSpeedBackwards));
                    keydown = true;
                }
                if (inputMap["a"]) {
                    player.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["d"]) {
                    player.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["b"]) {
                    keydown = true;
                }

                //Manage animations to be played
                if (keydown) {
                    if (!animating) {
                        animating = true;
                        if (inputMap["s"]) {
                            //Walk backwards
                            walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
                        }
                        else if
                        (inputMap["b"]) {
                            //Samba!
                            sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
                        }
                        else {
                            //Walk
                            walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                        }
                    }
                }
                else {

                    if (animating) {
                        //Default animation is idle when no key is down
                        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

                        //Stop all animations besides Idle Anim when no key is down
                        sambaAnim.stop();
                        walkAnim.stop();
                        walkBackAnim.stop();

                        //Ensure animation are played only once per rendering loop
                        animating = false;
                    }
                }
            });
        });


        // Keyboard events
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
    }

    setPosition(x, y, z) {

        // const sphere = this.scene.getMeshByName("player");
        // sphere.position = new BABYLON.Vector3(x, y + 0.5, z);
    }
}