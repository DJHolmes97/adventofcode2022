import fs from "fs"
import util from "util"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
let currentSignal = 1
let cycleNumber = 0
let crtOne = ""
let crtTwo = ""
let crtThree = ""
let crtFour = ""
let crtFive = ""
let crtSix = ""

const checkCurrentPosition = (currentPosition) => {
  if (
    currentSignal === currentPosition ||
    currentSignal - 1 === currentPosition ||
    currentSignal + 1 === currentPosition
  ) {
    return "#"
  } else {
    return "."
  }
}

const addToCrt = () => {
  if (cycleNumber > 0 && cycleNumber < 41) {
    let currentPosition = crtOne.length
    crtOne = crtOne + checkCurrentPosition(currentPosition)
  } else if (cycleNumber < 81) {
    let currentPosition = crtTwo.length
    crtTwo = crtTwo + checkCurrentPosition(currentPosition)
  } else if (cycleNumber < 121) {
    let currentPosition = crtThree.length
    crtThree = crtThree + checkCurrentPosition(currentPosition)
  } else if (cycleNumber < 161) {
    let currentPosition = crtFour.length
    crtFour = crtFour + checkCurrentPosition(currentPosition)
  } else if (cycleNumber < 201) {
    let currentPosition = crtFive.length
    crtFive = crtFive + checkCurrentPosition(currentPosition)
  } else if (cycleNumber < 241) {
    let currentPosition = crtSix.length
    crtSix = crtSix + checkCurrentPosition(currentPosition)
  }
}
splitArray.forEach((line, index) => {
  if (line === "noop") {
    cycleNumber++
    addToCrt()
  } else {
    const addX = line.split(" ")
    const newSignal = parseInt(addX[1])
    console.log(newSignal)

    for (let i = 0; i < 2; i++) {
      cycleNumber++
      addToCrt()
    }
    currentSignal += newSignal
  }
})

console.log(crtOne)
console.log(crtTwo)
console.log(crtThree)
console.log(crtFour)
console.log(crtFive)
console.log(crtSix)
