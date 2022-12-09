import fs from "fs"
import util from "util"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
const directions = splitArray.map((value) => {
  let newValue = value.split(" ")
  return newValue
})

let head = {
  x: 0,
  y: 0,
}
let tail = {
  x: 0,
  y: 0,
}

let tailLocations = ["00"]
const getXDifference = () => {
  let difference = 0
  if (head.x > tail.x) {
    for (let i = tail.x; i < head.x; i++) {
      difference++
    }
  } else if (head.x < tail.x) {
    for (let i = head.x; i < tail.x; i++) {
      difference--
    }
  }
  if (difference > 2 || difference < -2) console.log("Bug")
  return difference
}

const getYDifference = () => {
  let difference = 0
  if (head.y > tail.y) {
    for (let i = tail.y; i < head.y; i++) {
      difference++
    }
  } else if (head.y < tail.y) {
    for (let i = head.y; i < tail.y; i++) {
      difference--
    }
  }

  if (difference > 2 || difference < -2) console.log("Bug")
  return difference
}

const getIsTouching = (xDifference, yDifference) => {
  if (xDifference === 1 && yDifference === 1) {
    return true
  } else if (xDifference === 1 && yDifference === -1) {
    return true
  } else if (xDifference === -1 && yDifference === 1) {
    return true
  } else if (xDifference === -1 && yDifference === -1) {
    return true
  } else if (xDifference === 1 && yDifference === 0) {
    return true
  } else if (xDifference === -1 && yDifference === 0) {
    return true
  } else if (xDifference === 0 && yDifference === 1) {
    return true
  } else if (xDifference === 0 && yDifference === -1) {
    return true
  } else if (xDifference === 0 && yDifference === 0) {
    return true
  } else {
    return false
  }
}

const tailMovement = () => {
  let xDifference = getXDifference()
  let yDifference = getYDifference()

  let isTouching = getIsTouching(xDifference, yDifference)
  if (!isTouching) {
    if (xDifference === 2 && yDifference === 0) {
      //Move right one
      tail.x++
    } else if (xDifference === -2 && yDifference === 0) {
      //Move left one
      tail.x--
    } else if (xDifference === 0 && yDifference === 2) {
      //Move up one
      tail.y++
    } else if (xDifference === 0 && yDifference === -2) {
      //Move down one
      tail.y--
    } else if (xDifference === 2 && yDifference === 1) {
      //
      //Move up and right one
      tail.x++
      tail.y++
    } else if (xDifference === -2 && yDifference === 1) {
      //
      //Move up and left one
      tail.x--
      tail.y++
    } else if (xDifference === -2 && yDifference === -1) {
      //
      //Move down and left one
      tail.y--
      tail.x--
    } else if (xDifference === 1 && yDifference === 2) {
      //
      //Move up and right one
      tail.y++
      tail.x++
    } else if (xDifference === 1 && yDifference === -2) {
      //
      //Move down and right one
      tail.y--
      tail.x++
    } else if (xDifference === -1 && yDifference === -2) {
      //
      //Move down and left
      tail.y--
      tail.x--
    } else if (xDifference === 2 && yDifference === -1) {
      //Move down and right
      tail.x++
      tail.y--
    } else if (xDifference === -1 && yDifference === 2) {
      tail.y++
      tail.x--
    }
    tailLocations.push(`${tail.x}${tail.y}`)
  }
}
const movementRecursion = (xMovement, yMovement) => {
  if (xMovement > 0) {
    head.x++
    tailMovement()
    movementRecursion(xMovement - 1, yMovement)
  } else if (xMovement < 0) {
    head.x--
    tailMovement()
    movementRecursion(xMovement + 1, yMovement)
  } else if (yMovement > 0) {
    head.y++
    tailMovement()
    movementRecursion(xMovement, yMovement - 1)
  } else if (yMovement < 0) {
    head.y--
    tailMovement()
    movementRecursion(xMovement, yMovement + 1)
  }
}

const movementStepper = (direction, steps) => {
  let yMovement = 0
  let xMovement = 0

  switch (direction) {
    case "R":
      xMovement = parseInt(steps)
      movementRecursion(xMovement, yMovement)
      break
    case "L":
      xMovement = parseInt(steps) * -1
      movementRecursion(xMovement, yMovement)
      break
    case "U":
      yMovement = parseInt(steps)
      movementRecursion(xMovement, yMovement)
      break
    case "D":
      yMovement = parseInt(steps) * -1
      movementRecursion(xMovement, yMovement)
      break
  }
}
directions.forEach((direction, index) => {
  movementStepper(direction[0], direction[1])
})

let uniqueTailLocations = [...new Set(tailLocations)]
console.log(uniqueTailLocations.length)
