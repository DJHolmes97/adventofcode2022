import fs from "fs"
import util from "util"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
const treeArray = splitArray.map((tree) => {
  return tree.split("")
})
console.log(treeArray)

let visibleTree = 0

visibleTree += treeArray[0].length
visibleTree += treeArray[0].length
visibleTree += treeArray.length
visibleTree += treeArray.length
visibleTree -= 4

const negativeYRecursion = (treeArray, xIndex, yIndex, arrayY, treeValue) => {
  if (yIndex > 0 && treeArray[yIndex - 1][xIndex] < treeValue) {
    console.log(
      "currentY:",
      yIndex,
      " is greater than 0. And the next tree size ",
      treeArray[yIndex - 1][xIndex],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    return negativeYRecursion(treeArray, xIndex, yIndex - 1, arrayY, treeValue)
  } else if (yIndex === 0) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the column, add to size collection."
    )
    return true
  } else {
    console.log(
      "currentY:",
      yIndex,
      " is greater than 0. And the next tree size ",
      treeArray[yIndex - 1][xIndex],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
    return false
  }
}

const positiveYRecursion = (treeArray, xIndex, yIndex, arrayY, treeValue) => {
  if (yIndex < arrayY && treeArray[yIndex + 1][xIndex] < treeValue) {
    console.log(
      "currentY:",
      yIndex,
      " is less than the totalY ",
      arrayY,
      ". And the next tree size ",
      treeArray[yIndex + 1][xIndex],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    return positiveYRecursion(treeArray, xIndex, yIndex + 1, arrayY, treeValue)
  } else if (yIndex === arrayY) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the column, add to size collection."
    )
    return true
  } else {
    console.log(
      "currentY:",
      yIndex,
      " is less than the totalY ",
      arrayY,
      ". And the next tree size ",
      treeArray[yIndex + 1][xIndex],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
    return false
  }
}

const negativeXRecursion = (treeArray, xIndex, yIndex, arrayX, treeValue) => {
  if (xIndex !== 0 && treeArray[yIndex][xIndex - 1] < treeValue) {
    console.log(
      "currentX:",
      xIndex,
      " is greater than0. And the next tree size ",
      treeArray[yIndex][xIndex + 1],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    return negativeXRecursion(treeArray, xIndex - 1, yIndex, arrayX, treeValue)
  } else if (xIndex === 0) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the row, add to size collection."
    )
    return true
  } else {
    console.log(
      "currentX:",
      xIndex,
      " is greater than 0. And the next tree size ",
      treeArray[yIndex][xIndex - 1],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
    return false
  }
}

const positiveXRecursion = (treeArray, xIndex, yIndex, arrayX, treeValue) => {
  if (xIndex < arrayX && treeArray[yIndex][xIndex + 1] < treeValue) {
    console.log(
      "currentX:",
      xIndex,
      " is less than the totalX ",
      arrayX,
      ". And the next tree size ",
      treeArray[yIndex][xIndex + 1],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    return positiveXRecursion(treeArray, xIndex + 1, yIndex, arrayX, treeValue)
  } else if (xIndex === arrayX) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the row, add to size collection."
    )
    return true
  } else {
    console.log(
      "currentX:",
      xIndex,
      " is less than the totalX ",
      arrayX,
      ". And the next tree size ",
      treeArray[yIndex][xIndex + 1],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
    return false
  }
}

const visibleSearch = (treeArray, rowIndex, treeIndex, treeValue) => {
  const arrayY = treeArray.length - 1
  const arrayX = treeArray[0].length - 1
  let currentY = rowIndex
  let currentX = treeIndex
  let result = false

  //Positive X Search
  if (currentX < arrayX && treeArray[currentY][currentX + 1] < treeValue) {
    console.log("Positive X Search")
    console.log(
      "currentX:",
      currentX,
      " is less than the totalX ",
      arrayX,
      ". And the next tree size ",
      treeArray[currentY][currentX + 1],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    if (
      positiveXRecursion(treeArray, currentX + 1, currentY, arrayX, treeValue)
    ) {
      result = true
    }
  } else if (currentX === arrayX) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the row, add to size collection."
    )
    result = true
  } else {
    console.log(
      "currentX:",
      currentX,
      " is less than the totalX ",
      arrayX,
      ". And the next tree size ",
      treeArray[currentY][currentX + 1],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
  }

  //Negative X Search
  if (currentX !== 0 && treeArray[currentY][currentX - 1] < treeValue) {
    console.log("Negative X Search")
    console.log(
      "currentX:",
      currentX,
      " is greater than 0. And the next tree size ",
      treeArray[currentY][currentX - 1],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    if (
      negativeXRecursion(treeArray, currentX - 1, currentY, arrayX, treeValue)
    ) {
      result = true
    }
  } else if (currentX === 0) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the row, add to size collection."
    )
    result = true
  } else {
    console.log(
      "currentX:",
      currentX,
      " is greater than 0. And the next tree size ",
      treeArray[currentY][currentX - 1],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
  }

  //Positive Y Search
  if (currentY < arrayY && treeArray[currentY + 1][currentX] < treeValue) {
    console.log("Positive Y Search")
    console.log(
      "currentY:",
      currentY,
      " is less than the totalY ",
      arrayY,
      ". And the next tree size ",
      treeArray[currentY + 1][currentX],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    if (
      positiveYRecursion(treeArray, currentX, currentY + 1, arrayX, treeValue)
    ) {
      result = true
    }
  } else if (currentY === arrayY) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the column, add to size collection."
    )
    result = true
  } else {
    console.log(
      "currentY:",
      currentY,
      " is less than the totalY",
      arrayY,
      ". And the next tree size ",
      treeArray[currentY + 1][currentX],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
  }

  //Negative Y Search
  if (currentY > 0 && treeArray[currentY - 1][currentX] < treeValue) {
    console.log("Negative Y Search")
    console.log(
      "currentY:",
      currentY,
      " is greater than 0. And the next tree size ",
      treeArray[currentY - 1][currentX],
      " is less than the current tree size ",
      treeValue,
      ". So keep searching."
    )
    if (
      negativeYRecursion(treeArray, currentX, currentY - 1, arrayX, treeValue)
    ) {
      result = true
    }
  } else if (currentY === 0) {
    console.log(
      "The tree of size: ",
      treeValue,
      ". Has reached the end of the column, add to size collection."
    )
    result = true
  } else {
    console.log(
      "currentY:",
      currentY,
      " is greater than 0. And the next tree size ",
      treeArray[currentY - 1][currentX],
      " is larger than the current tree size ",
      treeValue,
      ". So end search"
    )
  }
  if (result) {
    return 1
  } else {
    return 0
  }
}

treeArray.forEach((treeRow, rowIndex) => {
  if (rowIndex !== 0 && rowIndex !== treeArray.length - 1) {
    treeRow.forEach((tree, treeIndex) => {
      if (treeIndex !== 0 && treeIndex !== treeRow.length - 1) {
        console.log(
          "Searching for tree of size:",
          tree,
          " from xIndex :",
          treeIndex,
          " and yIndex: ",
          rowIndex
        )
        let newValue = visibleSearch(treeArray, rowIndex, treeIndex, tree)
        visibleTree += newValue
        if (newValue) {
          console.log("\n\n")
          console.log(
            "yIndex: ",
            rowIndex,
            " xIndex: ",
            treeIndex,
            " treeSize: ",
            tree,
            " Added!"
          )
          console.log("\n\n")
        }
      }
    })
  }
})
console.log(visibleTree)
