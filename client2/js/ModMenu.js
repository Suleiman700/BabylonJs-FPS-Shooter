
import Camera from './Camera.js';
import Player from './ClientPlayer.js';

class ModMenu {

    #modalId = 'exampleModalCenter'

    constructor() {
        this.declareTriggerCheats()
    }

    declareTriggerCheats() {
        // noClip cheat
        const noClipToggle = document.querySelector(`#${this.#modalId} #TOGGLE_NOCLIP`)
        noClipToggle.addEventListener('change', () => {
            Camera.getCamera().checkCollisions = !noClipToggle.checked
        })

        // walk speed cheat
        const toggleWalkSpeed = document.querySelector(`#${this.#modalId} #TOGGLE_WALKSPEED`)
        const rangeWalkSpeed = document.querySelector(`#${this.#modalId} #RANGE_WALKSPEED`)
        toggleWalkSpeed.addEventListener('change', () => cheatWalkSpeed())
        rangeWalkSpeed.addEventListener('change', () => cheatWalkSpeed())
        const cheatWalkSpeed = () => {
            if (toggleWalkSpeed.checked) {
                const newWalkSpeed = document.querySelector(`#${this.#modalId} #RANGE_WALKSPEED`).value
                Camera.getCamera().speed = newWalkSpeed
            }
            // restore original walk speed
            else {
                Camera.getCamera().speed = Player.getWalkSpeed()
            }
        }

    }
}

export default new ModMenu()