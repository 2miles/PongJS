const INITIAL_VELOCITY = .025
const VELOCITY_INCREASE = 0.00001

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset()
    }

    // call this when Ball is created, and when game ends
    reset() {
        // center the ball on the screen
        this.x = 50
        this.y = 50
        //this.heading = 0
        this.direction = {x: 0, y: 0} //just not undef.

        // while the balls starting angle is decent.. 
        while (Math.abs(this.direction.x) <= .2 || 
               Math.abs(this.direction.y) >= .9) 
        {
            //
            const heading = randomNumberBetween(0, 2 * Math.PI) //returns radians
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY
    }

    get x() {
        return parseFloat( getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }
    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }
    get y() {
        return parseFloat( getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }
    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    //this function gets called every tick
    update(delta, paddleRects) {
        // update ball position
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        // increase velocity
        this.velocity += VELOCITY_INCREASE * delta
        const ballRect = this.rect()
        // change ball direction when hitting top or bottom wall
        if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
            this.direction.y *= -1
        }
        /*
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
         */
        
        if (isCollision(paddleRects[0],ballRect)) {
            this.direction.x *= -1  
        }
        if (isCollision(paddleRects[1],ballRect)) {
            this.direction.x *= -1  
        }
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }
}


// return random Whole number between min and max
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}
// return if two Rects are colliding
function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right && rect1.right >= rect2.left &&
           rect1.top <= rect2.bottom && rect1.bottom >= rect2.top
}