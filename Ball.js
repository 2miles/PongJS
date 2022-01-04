
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
        this.heading = 0
        this.direction = {x: 0} //just not undef.

        // while the balls starting angle is decent.. 
        while (Math.abs(this.direction.x) <= .2 || 
               Math.abs(this.direction.y) >= .9) 
        {
            //
            this.heading = randomNumberBetween(0, 2 * Math.PI) //returns radians
            this.direction = { x: Math.cos(this.heading), y: Math.sin(this.heading) }

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
        const ballRect = this.getRect()
        // change ball direction when hitting top or bottom wall
        if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
            this.direction.y *= -1
        }
        /*
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
         */
        

        //fix this function
////////////////////////////////////////////
        if (isCollision(paddleRects[0], ballRect)) {
            //multiply the heading by the balls distance from the center as
            //a percentage of the paddle width
            const paddleCenter = calculateCenter(paddleRects[0]);
            let ballHeight = this.y / 100 * window.innerHeight
            let paddleLength = paddleRects[0].bottom -  paddleRects[0].top
            let collisionDistFromCenter = paddleCenter - ballHeight;
            let accuracy;
            if (collisionDistFromCenter / paddleLength < 0) {
                accuracy = (collisionDistFromCenter / paddleLength * 2) - 1
            } else {
                accuracy = (collisionDistFromCenter / paddleLength * 2) + 1
            }

            console.log(`paddleCenter: ${paddleCenter}`)
            console.log(`paddleTop:    ${paddleRects[0].top}`)
            console.log(`paddleBottom: ${paddleRects[0].bottom}`)
            console.log(`ball.y: ${ballHeight}`)
            console.log(`distance from center: ${collisionDistFromCenter}`);
            console.log(`accuracy: ${accuracy}`);


            this.direction.x *= -1  
            //  implementation of dynamic ball bounce based on 'accuracy'
            //  this.heading *= (accuracy); 
            //  this.direction = { x: Math.cos(this.heading), y: Math.sin(this.heading) }
        }
        if (isCollision(paddleRects[1], ballRect)) {
            this.direction.x *= -1  
        }
    }
    /*
        //when the ball hits either paddle flip the x dir. component
        if (isCollision(paddleRects[0],ballRect)) {
            this.direction.x *= -1  }
        if (isCollision(paddleRects[1],ballRect)) {
            this.direction.x *= -1  
            */
    getRect() {
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

function calculateCenter(rect){
    return (rect.bottom - rect.top) / 2 + rect.top
}