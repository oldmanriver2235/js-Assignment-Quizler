import vorpal from 'vorpal'
import inquirer from 'inquirer'

import { readFile, writeFile, chooseRandom, createPrompt, createQuestions } from './lib'

const cli = vorpal()

const askForQuestions = [
  {
    type: 'input',
    name: 'numQuestions',
    message: 'How many questions do you want in your quiz?',
    validate: (input) => {
      const pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/)
      return pass ? true : 'Please enter a valid number!'
    }
  },
  {
    type: 'input',
    name: 'numChoices',
    message: 'How many choices should each question have?',
    validate: (input) => {
      const pass = input.match(/^(?:[2-4]|0[2-4]|4)$/)
      return pass ? true : 'Please enter a valid number!'
    }
  }
]

const createQuiz = (title) =>
  // TODO implement createQuiz

const takeQuiz = (title, output) =>
  // TODO implement takeQuiz

const takeRandomQuiz = (quizes, output, n) =>
  // TODO implement takeRandomQuiz

cli
  .command('create <fileName>', 'Creates a new quiz and saves it to the given fileName')
  .action(function (input, callback) {
    // TODO implement functionality for create command
  })

cli
  .command('take <fileName> <outputFile>', 'Loads a quiz and saves the users answers to the given outputFile')
  .action(function (input, callback) {
    // TODO implement functionality for taking a quiz
  })

cli
  .command('random <outputFile> <fileNames...>', 'Loads a quiz or' +
    ' multiple quizes and selects a random number of questions from each quiz.' +
    ' Then, saves the users answers to the given outputFile')
  .action(function (input, callback) {
    // TODO implement the functionality for taking a random quiz
  })

cli
  .delimiter(cli.chalk['yellow']('quizler>'))
  .show()
