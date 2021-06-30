//libraries
const readlineSync = require('readline-sync') //this library is used to take input
const chalk = require('chalk') //this library is used to beautify the ouput

//this list contains all the questions, options and answers
var allQuestions = [questionsLevelOne = [{
      question: ' What type of pastry are profiteroles made from? ',
      option: ['a. ', 'b. ', 'c. Choux pastry', 'd. '],
      answer: 'c'
    },
    {
      question: ' What is the main flavour of aioli? ',
      option: ['a. ', 'b. Garlic', 'c. ', 'd. '],
      answer: 'b'
    },
    {
      question: ' Which vegetable can be oyster, chestnut or shitaki? ',
      option: ['a. Mushroom', 'b. ', 'c. ', 'd. '],
      answer: 'a'
    },
    {
      question: ' What is wiener schnitzel? ',
      option: ['a. ', 'b. ', 'c. ', 'd. Veal'],
      answer: 'd'
    },
    {
      question: ' How is steak tartare cooked? ',
      option: ['a. ', 'b. ', 'c. ', 'd. It’s served raw'],
      answer: 'd'
    }
  ],

  questionsLevelTwo = [{
      question: ' What type of pastry are profiteroles made from? ',
      option: ['a. ', 'b. ', 'c. Choux pastry', 'd. '],
      answer: 'c'
    },
    {
      question: ' What is the main flavour of aioli? ',
      option: ['a. ', 'b. Garlic', 'c. ', 'd. '],
      answer: 'b'
    }
  ]
]

//global variables
var score = 0.0 //count the score
var levelCounter = 1
const wrong = chalk.hex('#b32d00'); //red color to indicate wrong answer
const right = chalk.greenBright; //green color to indicate wrong answer
const quesColor = chalk.bold.hex('#66ff99') //color of questions
const optionColor = chalk.bold.hex('#4d4dff') //color of options
const gameDesc = chalk.hex('#00e699') // game description color
const gameRulesColor = chalk.bgCyan // game description color
var counter = 0
var reward = 1
var cost = 0.25

//starts the game
function startGame() {
  console.log(chalk.hex('#cc6699')('Welcome to FOOD QUIZ!!!!!'))
  var userName = readlineSync.question(chalk.hex('#b3ff1a')('May I have your name please...'))
  console.clear()
  console.log(chalk.hex('#7979d2')('Welcome ') + chalk.hex('#00ccff')(userName))
  console.log(gameDesc('This quiz questions on foods and drinks. If you are a foodie and wanna learn more about foods and drinks just give it a try!!!'))
}

//displays rules of the game
function gameRules(correct, incorrect) {
  console.log('Welcome to level - ', levelCounter)
  console.log(gameRulesColor('Rules of the game :-'))
  console.log(gameRulesColor('If your answer is correct then you will be get ', correct, ' point and incorrect answer will cost you ', incorrect, ' point'))
}

//asks if the user is ready to start the quiz
function ready(questions) {
  var startGameQues = readlineSync.question(chalk.hex('#ff1a66')('So are you ready? y/n '))
  console.clear()
  if (startGameQues.toLowerCase() == 'y') {
    game(questions)
  } else {
    console.log(chalk.hex('#ffff4d')('Thank You!!'))
    return;
  }
}

function play(question, option, answer) {
  // print question -> take answer -> check answer -> print score
  console.log(quesColor(question))
  for (var i = 0; i < option.length; i++) {
    console.log(optionColor(option[i]))
  }
  var userAnswer = readlineSync.question(chalk.hex('#4dffff')('Answer: '))
  if (userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()) {
    console.log(right('Correct!'))
    score = score + 1
    currentScore(score)
  } else {
    console.log(wrong('Incorrect!'))
    score = score - 0.5
    currentScore(score)
  }
}

function game(questions) {
  // Iterate through the questions
  for (var i = 0; i < questions.length; i++) {
    var currentQuestion = questions[i]
    play(currentQuestion.question, currentQuestion.option, currentQuestion.answer)
  }
}

function currentScore() {
  // Display the current score
  console.log(chalk.hex('#ffff33')('Your score: ', score))
  console.log(chalk.hex('#b300b3')('------------------------'))
}
// function finalScore(){
//   console.log('Congrats you scored: ',score, ' at the end of level - ',levelCounter)
//   if(score<=questions.length && score>=questions.length - 1.5){
//     console.log('You are highscorer.....take a screenshot and send it to me, so that I could add it in the highscorer section')
//     console.log('Thank you!!!')
//   }
//   else{
//     console.log('You played well.....')
//     console.log('Thank you!!!')
//   }
// }

//chec if the user qualifies to nxt level
function nextLevel() {

  if (score <= 5 && score >= 3) {
    levelCounter = levelCounter + 1
    console.log('Congrats you made it to level: ', levelCounter)
    reward = reward + 1
    cost = cost + 0.75
    loop()
  } else {
    console.log("You couldn't make it to next level")
    console.log('Thank you!!')
  }
}


//interate through the questions and levels
function loop() {
  gameRules(reward, cost)
  ready(allQuestions[counter])
  counter = counter + 1
  if (counter < allQuestions.length) {
    nextLevel()
  } else if (counter === allQuestions.length) {
    console.log("Well done, you made it to the end of the game")
    console.log('Thank you!!')
  }
}
startGame()
loop()

// finalScore(score)