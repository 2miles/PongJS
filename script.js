import Ball from './Ball.js' 
import Paddle from './Paddle.js' 

//selecting the ball HTML element and creating a new ball class 
const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")



/**
 * SCRIPT:
 * function update(time) 
 * function handleLose()
 * function isLose
 * 
 * BALL:
 * constructor(htmlObj)
 * function update(delta, paddleRects)
 * function reset()
 * function rect()
 * get position()
 * set position(value)
 * get y()
 * set y(value)
 * function randomNumberBetween( min, max)
 * function isCollision(rect1, rect2)
 * 
 * PADDLE:
 * constructor(htmlObj)
 * function update(delta, ballHeight)
 * function reset()
 * function rect()
 * get position()
 * set position(value)
 */


//calls update every time somthing on the screen changes
let lastTime //null
function update(time) {
    if (lastTime != null) {
        //actual time between this tick and last
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()] )
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        //transition through colors every tick
        document.documentElement.style.setProperty("--hue", hue + delta * .01)
        //
        if (isLose()) {
            handleLose()
        }
    }
    lastTime = time
    window.requestAnimationFrame(update)
}

function handleLose(){
    const ballRect = ball.rect()
    if (ballRect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset();
    computerPaddle.reset()
    console.log("you lose")
}
function isLose() {
    const ballRect = ball.rect()
    return (ballRect.right >= window.innerWidth || ballRect.left <= 0)
}

document.addEventListener("mousemove", e => {
    //convert pixels to percentages
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)


