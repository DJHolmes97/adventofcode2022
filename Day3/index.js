import fs from "fs"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
let currentGroup = []
let groupArray = []
splitArray.forEach((value) => {
  if (currentGroup.length === 0) {
    currentGroup.push(value)
  } else if (currentGroup.length === 1) {
    currentGroup.push(value)
  } else if (currentGroup.length === 2) {
    currentGroup.push(value)
  } else {
    groupArray.push(currentGroup)
    currentGroup = []
    currentGroup.push(value)
  }
})
console.log(groupArray)

const scoringMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 26 + 1,
  B: 26 + 2,
  C: 26 + 3,
  D: 26 + 4,
  E: 26 + 5,
  F: 26 + 6,
  G: 26 + 7,
  H: 26 + 8,
  I: 26 + 9,
  J: 26 + 10,
  K: 26 + 11,
  L: 26 + 12,
  M: 26 + 13,
  N: 26 + 14,
  O: 26 + 15,
  P: 26 + 16,
  Q: 26 + 17,
  R: 26 + 18,
  S: 26 + 19,
  T: 26 + 20,
  U: 26 + 21,
  V: 26 + 22,
  W: 26 + 23,
  X: 26 + 24,
  Y: 26 + 25,
  Z: 26 + 26,
}
let totalScore = 0
groupArray.forEach((group) => {
  let elf1 = group[0].split("")
  let elf2 = group[1].split("")
  let elf3 = group[2].split("")

  let runningScore = 0
  let matchedCharacter = 0
  elf1.forEach((item) => {
    if (elf2.includes(item) && elf3.includes(item)) {
      matchedCharacter = item
    }
  })
  if (matchedCharacter !== 0) {
    runningScore = scoringMap[matchedCharacter]
  }
  totalScore += runningScore
})
console.log(totalScore)
