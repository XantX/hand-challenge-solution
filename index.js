/*
  * 👉 : moves the memory pointer to the next cell
  
  * 👈 : moves the memory pointer to the previous cell
  
  * 👆 : increment the memory cell at the current position
  
  * 👇 : decreases the memory cell at the current position.
  
  * 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
  
  * 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
  
  * 👊 : Display the current character represented by the ASCII code defined by the current position
  *
  *
  * As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
  * Loops of 🤜 and 🤛 can be nested.
*/

const MIN_CELL = 0
const MAX_CELL = 255
let MEMORY = [0]
let BRACKETS = {}
let pointer = 0
let RESULT = []
let indexOfIntruction = 0

const actions = {
  '👉': (_instructions) => {
    pointer++
    if (MEMORY[pointer] == null) {
      MEMORY.push(0)
    }
  },
  '👈': (_instructions) => {
    pointer--
  },
  '👆': (_instructions) => {
    MEMORY[pointer] < MAX_CELL ? (MEMORY[pointer]++) : (MEMORY[pointer] = MIN_CELL)
  },
  '👇': (_instructions) => {
    MEMORY[pointer] == MIN_CELL ? (MEMORY[pointer] = MAX_CELL) : (MEMORY[pointer]--)
  },
  '🤜': (_intructions) => {
    if (MEMORY[pointer] == MIN_CELL) {
      let indexClose = BRACKETS[indexOfIntruction.toString()]
      indexOfIntruction = indexClose++
    }
  },
  '🤛': (_intructions) => {
    if (MEMORY[pointer] != MIN_CELL) {
      let indexOpen = findOpenBracket(indexOfIntruction)
      indexOfIntruction = indexOpen++
    }
  },
  '👊': (_intructions) => {
    printMemory()
  }
}

function findOpenBracket(index) {
  const entries = Object.entries(BRACKETS)
  const foundOpenBracket = entries.find(([_key, value]) => value === index)
  return foundOpenBracket ? foundOpenBracket[0] : 0
}

function getLoops(instructions) {
  const LOOPS = []
  instructions.forEach((instruction, indexArray) => {
    if (instruction == '🤜') {
      LOOPS.push(indexArray)
    }
    if (instruction == '🤛') {
      const lastOpen = LOOPS.pop()
      BRACKETS[lastOpen] = indexArray
    }
  })
}

function printMemory() {
  const value = MEMORY[pointer]
  RESULT.push(String.fromCharCode(value))
}

function compile(_handCode) {
  MEMORY = [0]
  BRACKETS = {}
  pointer = 0
  RESULT = []
  indexOfIntruction = 0

  const arrayOfInstructions = Array.from(_handCode)
  getLoops(arrayOfInstructions)
  while (indexOfIntruction < (arrayOfInstructions.length)) {
    let instruction = arrayOfInstructions[indexOfIntruction]
    actions[instruction](arrayOfInstructions)
    indexOfIntruction++
  }
  const message = RESULT.join('')
  return message.trim()
}

module.exports = compile
