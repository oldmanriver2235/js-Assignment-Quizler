import vorpal from 'vorpal'
import { prompt } from 'inquirer'

import {
  readFile,
  writeFile,
  chooseRandom,
  createPrompt,
  createQuestions
} from './lib'

const cli = vorpal()

const askForQuestions = [
  {
    type: 'input',
    name: 'numQuestions',
    message: 'How many questions do you want in your quiz?',
    validate: input => {
      const pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/)
      return pass ? true : 'Please enter a valid number!'
    }
  },
  {
    type: 'input',
    name: 'numChoices',
    message: 'How many choices should each question have?',
    validate: input => {
      const pass = input.match(/^(?:[2-4]|0[2-4]|4)$/)
      return pass ? true : 'Please enter a valid number!'
    }
  }
]

const createQuiz = title =>
  prompt(askForQuestions)
    .then(createPrompt)
    .then(result => prompt(result))
    .then(createQuestions)
    .then(answers => writeFile(`${title}.json`, JSON.stringify(answers)))
    .catch(err => console.log('Error creating the quiz.', err))

const takeQuiz = (title, output) =>
  readFile(`${title}.json`)
    .then(data => JSON.parse(data))
    .then(questions => prompt(questions))
    .then(answers => writeFile(`${output}.json`, JSON.stringify(answers)))
    .catch(err => console.log('error taking quiz', err))

const takeRandomQuiz = (quizes, output, n) =>
  Promise.all(quizes.map(quiz => readFile(`${quiz}.json`)))
    .then(data => data.map(v => JSON.parse(v)))
    .then(quizes =>
      chooseRandom(quizes.reduce((acc, quiz) => [...acc, ...quiz], []), n)
    )
    .then(questions => prompt(questions))
    .then(answers => writeFile(`${output}.json`, JSON.stringify(answers)))
    .catch(err => console.log('error taking random quiz', err))

cli
  .command(
    'create <fileName>',
    'Creates a new quiz and saves it to the given fileName'
  )
  .action(function (input, callback) {
    return createQuiz(input.fileName).then(() =>
      console.log('File saved successfully')
    )
  })

cli
  .command(
    'take <fileName> <outputFile>',
    'Loads a quiz and saves the users answers to the given outputFile'
  )
  .action(function (input, callback) {
    return takeQuiz(input.fileName, input.outputFile)
  })

cli
  .command(
    'random <outputFile> <numQuestions> <fileNames...>',
    'Loads a quiz or' +
      ' multiple quizes and selects a random number of questions from each quiz.' +
      ' Then, saves the users answers to the given outputFile'
  )
  .action(function (input, callback) {
    return takeRandomQuiz(input.fileNames, input.outputFile, input.numQuestions)
  })

cli.delimiter(cli.chalk['yellow']('quizler>')).show()
