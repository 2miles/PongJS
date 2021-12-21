const SPEED = .02

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.position = 50
        this.reset()
    }
    get position() {
        return parseFloat( getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }
    set position(value) {
        this.paddleElem.style.setProperty("--position", value)
    }
    rect() {
        return this.paddleElem.getBoundingClientRect()
    }
    reset() {
        this.position = 50
    }

    //computer paddle AI
    update(delta, ballHeight) {
        //paddle moves slower the closer it is to the ball
        this.position += SPEED * delta * (ballHeight - this.position)
    }
}