// TODO copy your readFile, writeFile, chooseRandom, createPrompt, and createQuestions
// functions from your notes and assignments.
import fs from 'fs'
import shuffle from 'shuffle-array'

// TODO export your functions
export const chooseRandom = (array = [], number) => {
  if (array.length <= 1) {
    return array
  }
  if (!number >= 1 && !number < array.length) {
    number = Math.floor(Math.random() * array.length) + 1
  }
  let array2 = [...array]
  shuffle(array2)
  return array2.slice(0, number)
}

export const createPrompt = (
  { numQuestions = 1, numChoices = 2 } = { numQuestions: 1, numChoices: 2 }
) => {
  let array = []

  if (isNaN(numQuestions)) {
    return array
  }

  let question = n => ({
    type: 'input',
    name: `question-${n}`,
    message: `Enter question ${n}`
  })

  let choice = (n, o) => ({
    type: 'input',
    name: `question-${n}-choice-${o}`,
    message: `Enter answer choice ${o} for question ${n}`
  })

  for (var i = 1; i <= numQuestions; i++) {
    array.push(question(i))

    for (var j = 1; j <= numChoices; j++) {
      array.push(choice(i, j))
    }
  }

  return array
}
export const createQuestions = (questions = {}) => {
  let questionsArray = []
  let currentQuestion = {}

  if (questions === undefined || Object.keys(questions).length < 1) {
    return questionsArray
  }

  for (let [key, value] of Object.entries(questions)) {
    // console.log(key, value)
    if (key.match(/^question-([0-9]+)$/)) {
      if (currentQuestion.name !== undefined) {
        questionsArray.push(currentQuestion)
      }
      currentQuestion = { type: 'list', name: key, message: value, choices: [] }
    } else if (key.match(new RegExp(`question-([0-9]+)-choice-([0-9]+)`))) {
      currentQuestion.choices.push(value)
    }
  }
  questionsArray.push(currentQuestion)
  return questionsArray
}
export const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })

export const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, err => {
      if (err) {
        reject(err)
      }
      resolve('File saved successfully')
    })
  })
