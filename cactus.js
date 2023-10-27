import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 700
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus(nextCactusTime)
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    const cactusRect = cactus.getBoundingClientRect();
    const xOffset = 5; // Adjust as needed to make the rectangle smaller
    const yOffset = 5; // Adjust as needed to make the rectangle smaller

    return {
      left: cactusRect.left + xOffset,
      top: cactusRect.top + yOffset,
      right: cactusRect.right - xOffset,
      bottom: cactusRect.bottom - yOffset,
    };
  });
}

function createCactus(nextCactusTime) {
  console.log(nextCactusTime);
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  if(nextCactusTime>-5){
  cactus.src = "imgs/bench.png"
  cactus.classList.add("cactus")
}
  else{
    cactus.src = "imgs/bench-laptop.png"
    cactus.classList.add("bench-laptop")
  }
  // cactus.classList.add("bench-laptop")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
