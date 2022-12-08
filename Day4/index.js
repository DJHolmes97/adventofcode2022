import fs from "fs"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")

const sectionArray = splitArray.map((line) => {
  const newLine = line.split(",")
  const elf1 = newLine[0] ? newLine[0].split("-") : ""
  const elf2 = newLine[1] ? newLine[1].split("-") : ""
  const part1 = parseInt(elf1[0])
  const part2 = parseInt(elf1[1])
  const part3 = parseInt(elf2[0])
  const part4 = parseInt(elf2[1])
  return [part1, part2, part3, part4]
})

console.log(sectionArray)
let totalScore = 0

sectionArray.forEach((pair) => {
  if (
    (pair[0] >= pair[2] && pair[0] <= pair[3]) ||
    (pair[1] >= pair[2] && pair[1] <= pair[3]) ||
    (pair[2] >= pair[0] && pair[2] <= pair[1]) ||
    (pair[3] >= pair[0] && pair[3] <= pair[1])
  ) {
    totalScore++
  }
})
console.log(totalScore)
