import fs from "fs"
import util from "util"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
let currentSignal = 1
const result = []
splitArray.forEach((line, index) => {
  if (line === "noop") {
    result.push(currentSignal)
  } else {
    const addX = line.split(" ")
    const newSignal = parseInt(addX[1])
    console.log(newSignal)

    for (let i = 0; i < 2; i++) {
      result.push(currentSignal)
    }
    currentSignal += newSignal
  }
})
result.push(currentSignal)
console.log(result)
const cycleMath =
  result[19] * 20 +
  result[59] * 60 +
  result[99] * 100 +
  result[139] * 140 +
  result[179] * 180 +
  result[219] * 220

console.log(cycleMath)
