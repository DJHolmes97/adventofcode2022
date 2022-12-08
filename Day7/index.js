import fs from "fs"
import util from "util"

const inputData = fs.readFileSync("input.txt", "utf8")

const splitArray = inputData.split("\n")
let command = ""
let input = ""
let directory = { root: { size: 0, contents: {} } }
let currentDirectoryLevel = ["root"]

const directoryRecursion = (
  newDirectory,
  recursionIndex,
  newFileKey,
  newFileValue
) => {
  let currentLevel = currentDirectoryLevel[recursionIndex]
  let newFile =
    newFileValue !== "dir"
      ? { size: parseInt(newFileValue) }
      : { size: 0, contents: [] }
  if (currentDirectoryLevel[recursionIndex + 1]) {
    recursionIndex++
    if (newFileValue === "dir") {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          contents: directoryRecursion(
            newDirectory[currentLevel].contents,
            recursionIndex,
            newFileKey,
            newFileValue
          ),
        },
      }
    } else {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          size: newDirectory[currentLevel].size + parseInt(newFileValue),
          contents: directoryRecursion(
            newDirectory[currentLevel].contents,
            recursionIndex,
            newFileKey,
            newFileValue
          ),
        },
      }
    }
  } else {
    if (newFileValue === "dir") {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          contents: {
            ...newDirectory[currentLevel].contents,
            [newFileKey]: newFile,
          },
        },
      }
    } else {
      console.log("borkenBit", newDirectory)
      console.log(currentLevel)
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          size: newDirectory[currentLevel].size + parseInt(newFileValue),
          contents: {
            ...newDirectory[currentLevel].contents,
            [newFileKey]: newFile,
          },
        },
      }
    }
  }
}

const directoryBuilder = (newFileKey, newFileValue) => {
  let recursionIndex = 0
  let currentLevel = currentDirectoryLevel[recursionIndex]
  let newDirectory = directory
  let newFile =
    newFileValue !== "dir"
      ? { size: parseInt(newFileValue) }
      : { size: 0, contents: [] }
  if (currentDirectoryLevel[recursionIndex + 1]) {
    recursionIndex++
    if (newFileValue === "dir") {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          contents: directoryRecursion(
            newDirectory[currentLevel].contents,
            recursionIndex,
            newFileKey,
            newFileValue
          ),
        },
      }
    } else {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          size: newDirectory[currentLevel].size + parseInt(newFileValue),
          contents: directoryRecursion(
            newDirectory[currentLevel].contents,
            recursionIndex,
            newFileKey,
            newFileValue
          ),
        },
      }
    }
  } else {
    if (newFileValue === "dir") {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          contents: {
            ...newDirectory[currentLevel].contents,
            [newFileKey]: newFile,
          },
        },
      }
    } else {
      return {
        ...newDirectory,
        [currentLevel]: {
          ...newDirectory[currentLevel],
          size: newDirectory[currentLevel].size + parseInt(newFileValue),
          contents: {
            ...newDirectory[currentLevel].contents,
            [newFileKey]: newFile,
          },
        },
      }
    }
  }
}

splitArray.forEach((line, index) => {
  console.log(index, line)
  console.log(
    util.inspect(directory, { showHidden: false, depth: null, colors: true })
  )
  if (line.charAt(0) === "$") {
    let commandArray = line.split(" ")
    command = commandArray[1]
    input = commandArray[2]
    console.log(command)
    console.log(input)

    if (command === "cd") {
      if (input === "..") {
        currentDirectoryLevel.pop()
      } else {
        currentDirectoryLevel.push(input)
      }
    }
  } else {
    let file = line.split(" ")
    if (file[0] === "dir") {
      const newFileKey = file[1]
      const newFileValue = "dir"
      const newFileType = "dir"
      directory = directoryBuilder(newFileKey, newFileValue, newFileType)
    } else {
      let newFileKey = ""
      let newFileType = "file"
      console.log(file)
      if (file[1].length > 1) {
        newFileKey = file[1]
      } else {
        newFileKey = file[1]
      }
      const newFileValue = file[0]
      directory = directoryBuilder(newFileKey, newFileValue, newFileType)
    }
  }
})

console.log(
  util.inspect(directory, { showHidden: false, depth: null, colors: true })
)

let totalSum = 0

let fileSystemSize = 70000000
let neededUnusedSpace = 30000000
let usedSpace = directory.root.size
let actualUnusedSpace = fileSystemSize - usedSpace
let leftToGo = neededUnusedSpace - actualUnusedSpace
let directoryToDelete = null
const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (key !== "size" && key !== "contents" && obj[key].contents) {
      console.log(
        `key: ${key}, size: ${obj[key].size}, contents: ${obj[key].contents}`
      )
      if (obj[key].size > leftToGo) {
        console.log(obj[key].size, "biggerThan", leftToGo)
        if (!directoryToDelete) {
          console.log(obj[key].size, "fillingEmptySpace")
          directoryToDelete = { name: key, size: obj[key].size }
        } else if (obj[key].size < directoryToDelete.size) {
          directoryToDelete = { name: key, size: obj[key].size }
        }
      }
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterate(obj[key])
    }
  })
}

console.log("fileSystemSize", fileSystemSize)
console.log("neededUnusedSpace", neededUnusedSpace)
console.log("usedSpace", usedSpace)
console.log("actualUnusedSpace", actualUnusedSpace)
console.log("leftToGo", leftToGo)
iterate(directory)
console.log(directoryToDelete)
