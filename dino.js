import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"
import { bossWin } from "./boss.js"
const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  const dinoRect = dinoElem.getBoundingClientRect();
  const xOffset = 5; // Adjust as needed to make the rectangle smaller
  const yOffset = 5; // Adjust as needed to make the rectangle smaller

  
  return {
    left: dinoRect.left + xOffset,
    top: dinoRect.top + yOffset,
    right: dinoRect.right - xOffset,
    bottom: dinoRect.bottom - yOffset,
  };
}

export function setDinoLose() {
  dinoElem.src = "imgs/stationary.png"
  bossWin(currentFrameTime,dinoFrame,DINO_FRAME_COUNT)
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/run-0.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  console.log(e.code)
  if (e.code !== "Space" || isJumping) {}
  else{
  yVelocity = JUMP_SPEED*0.95
  isJumping = true
  }
  if(e.code!=="Enter" || isJumping) return
  else{
    console.log("enter");
    yVelocity = JUMP_SPEED*1.1
    isJumping = true
  }
}
