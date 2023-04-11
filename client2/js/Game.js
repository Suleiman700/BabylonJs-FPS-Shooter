
class Game {
    #canvas = null
    #engine = null

    constructor() {}

    getEngine() {
        return this.#engine
    }

    getCanvas() {
        return this.#canvas
    }

    initGame() {
        this.#canvas = document.getElementById("renderCanvas")

        this.#canvas.onclick = () => {
            this.#canvas.requestPointerLock()
        }
        this.#canvas.addEventListener('pointerlockchange', () => {
            if (this.#canvas.pointerLockElement === canvas) {
                // control = true;
                divObj.innerHTML = "The pointer is locked. Press Esc to unlock.";
                canvas.addEventListener("mousemove", mousemoveCallback, false);
            } else {
                // control = false;
                divObj.innerHTML = "The pointer is unlocked.";
                canvas.removeEventListener("mousemove", mousemoveCallback, false);
            }
        }, false);
    }
}

export default new Game()