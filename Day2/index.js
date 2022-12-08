import fs from "fs"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
console.log(splitArray)

const mappedArray = splitArray.map((value) => {
  const newArray = value.split(" ")
  console.log(newArray)
  return newArray
})

let totalScore = 0
//Rock 1
//Paper 2
//Scissors 3
mappedArray.forEach((value) => {
  const enemyKey = value[0]
  console.log(enemyKey)
  const playerKey = value[1]
  console.log(playerKey)
  let playerPoints = 0
  switch (playerKey) {
    case "Z":
      //Must Win
      switch (enemyKey) {
        case "A":
          //Enemy Play: Rock
          //Player Play: Paper
          playerPoints = 2 + 6
          break
        case "B":
          //Enemy Play: Paper
          //Player Play: Scissors
          playerPoints = 3 + 6
          break
        case "C":
          //Enemy Play: Scissors
          //Player Play: Rock
          playerPoints = 1 + 6
          break
      }
      break
    case "Y":
      //Must Draw
      switch (enemyKey) {
        case "A":
          //Enemy Play: Rock
          //Player Play: Rock
          playerPoints = 1 + 3
          break
        case "B":
          //Enemy Play: Paper
          //Player Play: Paper
          playerPoints = 2 + 3
          break
        case "C":
          //Enemy Play: Scissors
          //Player Play: Scissors
          playerPoints = 3 + 3
          break
      }
      break
    case "X":
      //Must Lose
      switch (enemyKey) {
        case "A":
          //Enemy Play: Rock
          //Player Play: Scissors
          playerPoints = 0 + 3
          break
        case "B":
          //Enemy Play: Paper
          //Player Play: Rock
          playerPoints = 0 + 1
          break
        case "C":
          //Enemy Play: Scissors
          //Player Play: Paper
          playerPoints = 0 + 2
          break
      }
      break
  }
  console.log(playerPoints)
  totalScore += playerPoints
})
console.log(totalScore)
