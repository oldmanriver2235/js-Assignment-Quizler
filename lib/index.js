'use strict';

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _inquirer = require('inquirer');

var _lib = require('./lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _vorpal2.default)();

const askForQuestions = [{
  type: 'input',
  name: 'numQuestions',
  message: 'How many questions do you want in your quiz?',
  validate: input => {
    const pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/);
    return pass ? true : 'Please enter a valid number!';
  }
}, {
  type: 'input',
  name: 'numChoices',
  message: 'How many choices should each question have?',
  validate: input => {
    const pass = input.match(/^(?:[2-4]|0[2-4]|4)$/);
    return pass ? true : 'Please enter a valid number!';
  }
}];

const createQuiz = title => (0, _inquirer.prompt)(askForQuestions).then(_lib.createPrompt).then(result => (0, _inquirer.prompt)(result)).then(_lib.createQuestions).then(answers => (0, _lib.writeFile)(`${title}.json`, JSON.stringify(answers))).catch(err => console.log('Error creating the quiz.', err));

const takeQuiz = (title, output) => (0, _lib.readFile)(`${title}.json`).then(data => JSON.parse(data)).then(questions => (0, _inquirer.prompt)(questions)).then(answers => (0, _lib.writeFile)(`${output}.json`, JSON.stringify(answers))).catch(err => console.log('error taking quiz', err));

const takeRandomQuiz = (quizes, output, n) => Promise.all(quizes.map(quiz => (0, _lib.readFile)(`${quiz}.json`))).then(data => data.map(v => JSON.parse(v))).then(quizes => (0, _lib.chooseRandom)(quizes.reduce((acc, quiz) => [...acc, ...quiz], []), n)).then(questions => (0, _inquirer.prompt)(questions)).then(answers => (0, _lib.writeFile)(`${output}.json`, JSON.stringify(answers))).catch(err => console.log('error taking random quiz', err));

cli.command('create <fileName>', 'Creates a new quiz and saves it to the given fileName').action(function (input, callback) {
  return createQuiz(input.fileName).then(() => console.log('File saved successfully'));
});

cli.command('take <fileName> <outputFile>', 'Loads a quiz and saves the users answers to the given outputFile').action(function (input, callback) {
  return takeQuiz(input.fileName, input.outputFile);
});

cli.command('random <outputFile> <numQuestions> <fileNames...>', 'Loads a quiz or' + ' multiple quizes and selects a random number of questions from each quiz.' + ' Then, saves the users answers to the given outputFile').action(function (input, callback) {
  return takeRandomQuiz(input.fileNames, input.outputFile, input.numQuestions);
});

cli.delimiter(cli.chalk['yellow']('quizler>')).show();