# Quizler Assessment

---

In this assessment students are tasked with using the helper functions they created
in their ```lib.js``` file throughout this module to build a command line application
which builds quizzes and allows the user to take quizzes they have built or pull
random questions from multiple quizzes and take a random quiz.

Students will use [inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
and [vorpal.js](https://github.com/dthree/vorpal/wiki) to build their
command line tool. The documentation for each will be very useful for students when
completing this assessment. A skeleton is provided which sets ups a command line
interface for the students is provided.

## Goal

---

The main goal is to assess the students knowledge of the JavaScript language and, more specifically, their ability to write and use Node as a JavaScript environment. Also, to assess students ability to adapt to new technologies and read documentation of libraries curated for the requirements of this assessment. Lastly, to assess students abilities to combine external libraries with their own custom libraries in order to build an application.

## Tasks

---

- [ ] Copy your ```lib.js``` functions from your assignments into lib.js
- [ ] Using your functions and inquirer.js, implement the ```createQuiz```, ```takeQuiz```, and ```takeRandomQuiz``` functions
- [ ] Using the functions you've created, implement the functionality for each command in your vorpal.js command line interface application


## Extra Tasks

---

For students who complete the assessment early and want more of a challenge attempt the following:

- [ ] Refactor your createQuestions function to create questions with unique numbers for identification
- [ ] Refacter createQuestions to also create an answer bank object when creating the questions
- [ ] Save the answer bank to a seperate file which corresponds to each quiz file. Or save them in the same file within one object with two keys: 'quiz' and 'answers'
- [ ] Add a command to your command line application which can grade the answers after a user has taken a quiz
- [ ] Refactor take quiz command so that it automatically grades responses and gives the user their grade on completion of a quiz
