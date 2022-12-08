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

const negativeYRecursion = (
  treeArray,
  xIndex,
  yIndex,
  arrayY,
  treeValue,
  YNegativeViewCount
) => {
  if (yIndex > 0 && treeArray[yIndex - 1][xIndex] < treeValue) {
    console.log("YNegativeViewCount", YNegativeViewCount)
    return negativeYRecursion(
      treeArray,
      xIndex,
      yIndex - 1,
      arrayY,
      treeValue,
      YNegativeViewCount + 1
    )
  } else if (yIndex === 0) {
    return YNegativeViewCount
  } else {
    return YNegativeViewCount + 1
  }
}

const positiveYRecursion = (
  treeArray,
  xIndex,
  yIndex,
  arrayY,
  treeValue,
  YPositiveViewCount
) => {
  if (yIndex < arrayY && treeArray[yIndex + 1][xIndex] < treeValue) {
    return positiveYRecursion(
      treeArray,
      xIndex,
      yIndex + 1,
      arrayY,
      treeValue,
      YPositiveViewCount + 1
    )
  } else if (yIndex === arrayY) {
    return YPositiveViewCount
  } else {
    return YPositiveViewCount + 1
  }
}

const negativeXRecursion = (
  treeArray,
  xIndex,
  yIndex,
  arrayX,
  treeValue,
  XNegativeViewCount
) => {
  if (xIndex !== 0 && treeArray[yIndex][xIndex - 1] < treeValue) {
    return negativeXRecursion(
      treeArray,
      xIndex - 1,
      yIndex,
      arrayX,
      treeValue,
      XNegativeViewCount + 1
    )
  } else if (xIndex === 0) {
    return XNegativeViewCount
  } else {
    return XNegativeViewCount + 1
  }
}

const positiveXRecursion = (
  treeArray,
  xIndex,
  yIndex,
  arrayX,
  treeValue,
  XPositiveViewCount
) => {
  if (xIndex < arrayX && treeArray[yIndex][xIndex + 1] < treeValue) {
    return positiveXRecursion(
      treeArray,
      xIndex + 1,
      yIndex,
      arrayX,
      treeValue,
      XPositiveViewCount + 1
    )
  } else if (xIndex === arrayX) {
    return XPositiveViewCount
  } else {
    return XPositiveViewCount + 1
  }
}

const visibleSearch = (treeArray, rowIndex, treeIndex, treeValue) => {
  const arrayY = treeArray.length - 1
  const arrayX = treeArray[0].length - 1
  let currentY = rowIndex
  let currentX = treeIndex
  let XPositiveViewCount = 0
  let XNegativeViewCount = 0
  let YPositiveViewCount = 0
  let YNegativeViewCount = 0

  //Positive X Search
  if (currentX < arrayX && treeArray[currentY][currentX + 1] < treeValue) {
    XPositiveViewCount = positiveXRecursion(
      treeArray,
      currentX + 1,
      currentY,
      arrayX,
      treeValue,
      XPositiveViewCount + 1
    )
  }

  //Negative X Search
  if (currentX !== 0 && treeArray[currentY][currentX - 1] < treeValue) {
    XNegativeViewCount = negativeXRecursion(
      treeArray,
      currentX - 1,
      currentY,
      arrayX,
      treeValue,
      XNegativeViewCount + 1
    )
  }

  //Positive Y Search
  if (currentY < arrayY && treeArray[currentY + 1][currentX] < treeValue) {
    YPositiveViewCount = positiveYRecursion(
      treeArray,
      currentX,
      currentY + 1,
      arrayX,
      treeValue,
      YPositiveViewCount + 1
    )
  }

  //Negative Y Search
  if (currentY > 0 && treeArray[currentY - 1][currentX] < treeValue) {
    YNegativeViewCount = negativeYRecursion(
      treeArray,
      currentX,
      currentY - 1,
      arrayX,
      treeValue,
      YNegativeViewCount + 1
    )
    console.log("YNegativeViewCount", YNegativeViewCount)
  }

  return (
    XNegativeViewCount *
    XPositiveViewCount *
    YPositiveViewCount *
    YNegativeViewCount
  )
}

let highestScorer = 0
treeArray.forEach((treeRow, rowIndex) => {
  treeRow.forEach((tree, treeIndex) => {
    let newValue = visibleSearch(treeArray, rowIndex, treeIndex, tree)
    console.log(rowIndex, treeIndex, tree, newValue)
    if (newValue > highestScorer) {
      highestScorer = newValue
      console.log("High Score: ", highestScorer)
    }
  })
})

console.log(highestScorer)
