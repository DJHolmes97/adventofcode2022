import fs from "fs"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("")
let finalIndex = 0
let markers = []
splitArray.forEach((marker, index) => {
  if (markers.length !== new Set(markers).size || markers.length < 4) {
    finalIndex++
    markers.push(marker)
    if (markers.length > 14) {
      markers.shift()
    }
  }
})

console.log("\n")
console.log("index", finalIndex)
console.log(markers)
