import fs from "fs"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
let winningAmount = 0
let secondAmount = 0
let thirdAmount = 0
let runningTotal = 0
splitArray.forEach((value) => {
  console.log("currentValue:", value)
  if (value === "") {
    console.log("Move on to next elf.")
    if (winningAmount < runningTotal) {
      thirdAmount = secondAmount
      secondAmount = winningAmount
      winningAmount = runningTotal
    } else if (secondAmount < runningTotal) {
      thirdAmount = secondAmount
      secondAmount = runningTotal
    } else if (thirdAmount < runningTotal) {
      thirdAmount = runningTotal
    }
    runningTotal = 0
  } else {
    console.log("new running total:", runningTotal)
    runningTotal += parseInt(value)
  }
})

console.log(winningAmount + secondAmount + thirdAmount)
