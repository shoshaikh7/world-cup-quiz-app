/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In what year did the first World Cup take place?',
      answers: [
        '1930',
        '1925',
        '1934',
        '1937'
      ],
      correctAnswer: '1930'
    },
    {
      question: 'What country has the most World Cup wins?',
      answers: [
        'France',
        'Brazil',
        'Argentina',
        'Germany'
      ],
      correctAnswer: 'Brazil'
    },
    {
      question: 'What player has scored the most goals in World Cup history?',
      answers: [
        'Lionel Messi',
        'Christiano Ronaldo',
        'Miroslav Klose',
        'David Beckham'
      ],
      correctAnswer: 'Miroslav Klose'
    },
    {
      question: 'What year did the United States host the World Cup?',
      answers: [
        '1990',
        '1986',
        '1994',
        '2010'
      ],
      correctAnswer: '1994'
    },
    {
      question: 'What country is hosting the 2022 World cup?',
      answers: [
        'Qatar',
        'Japan',
        'South Korea',
        'Australia'
      ],
      correctAnswer: 'Qatar'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// Generate intro
function generateIntro () {  
  const introTemplate = `<section id="intro">
                          <p id="intro-text">Put your knowledge of World Cup history to the test with this fun quiz!</p>
                          <button id="js-start-quiz">Start Quiz</button>
                        </section>`
  return introTemplate;
}

// Generate answer choices
function generateAnswerChoices () {
  let answerChoices = store.questions[store.questionNumber].answers;  
  let answerTemplate = '';
  
  for (let i = 0; i < answerChoices.length; i++) {
    answerTemplate += `<button class="js-answer-choice" id="js-choice-${i + 1}">${answerChoices[i]}</button>`

  }
  return answerTemplate;
}

// Generate question
function generateQuestion () {
  let currentQuestion = store.questions[store.questionNumber];  
  const questionTemplate = `<section id="questions"><form id="js-question-form"><div id="js-question">${currentQuestion.question}</div><div id="js-answer-choices">${generateAnswerChoices()}</div><div id="js-next-button-container"><button id="js-next-button">Next</button></div></form></section>`  
  return questionTemplate;
}

// Generate correct answer
function generateCorrectAnswer (status) {
  let correctAnswer = store.questions[store.questionNumber];
  let correctAnswerHtml = '';
  if (status === "Correct") {
    correctAnswerHtml = `<div id="correct-answer">You are correct!</div>`
  } else {
    correctAnswerHtml = `<div id="incorrect-answer">Sorry! That is incorrect. The correct answer is ${correctAnswer.correctAnswer}.</div>`
  }
  return correctAnswerHtml;
}

// Generate question number and score
function generateCurrentQuestionNumAndScore () {
  let questionNumAndScore = `<section id="js-question-and-score"><p id="js-question-num">${store.questionNumber + 1}/${store.questions.length}</p><p id="js-score">${store.score}/${store.questions.length}</p></section>`
  return questionNumAndScore;
}

// Generate final results
function generateFinalResults () {

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render () {
  let newHtml = '';  
  if (store.quizStarted === false) {
    // If 'quizStarted === false' show intro    
    $('main').html(generateIntro());        
  } else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    // else if 'questionNumber < questions.length'
    // show question, answers choices, and question number/score
    newHtml = generateQuestion();
    newHtml += generateCurrentQuestionNumAndScore();
    $('main').html(newHtml);

  } else {
    $('main').html('blah');

  }  
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
// Handle 'start quiz' button
function handleStartQuiz () {  
  $('main').on('click', '#js-start-quiz', e => {    
    store.quizStarted = true;
    render();
  });
}

// Handle 'answer' submit
function handleAnswerSubmit () {  
  $('main').on('click', '.js-answer-choice', e => {
    e.preventDefault();    
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    let selectedAnswer = $(e.currentTarget).html();       
    // Creat a container to render answer status     
    let answerStatusContainer = '<div class="js-answer-status"></div>'
    $('main').append(answerStatusContainer);

    // Check if the user answer is correct or not
    if (correctAnswer === selectedAnswer) {      
      store.score++      
      $('#js-score').html(`${store.score}/${store.questions.length}`);
      $('.js-answer-status').append(generateCorrectAnswer("Correct"));
    } else {
      $('.js-answer-status').append(generateCorrectAnswer("Incorrect"));
    }
    console.log(store.questionNumber)
    store.questionNumber++;
    console.log(store.questionNumber)
    // Disable buttons so user can't select a new answer for the same question
    $(e.currentTarget).prop('disabled', true);
    $(e.currentTarget).siblings().prop('disabled', true);
    
    // Show next button
    $('#js-next-button').show();

  });
}

// Handle 'next question' button
function handleNextQuestion () {
  $('main').on('click', '#js-next-button', e => {     
    e.preventDefault();     
    render();
  });
}

// Reset data values
function resetValues () {
  

}

// Handle 'restart quiz' button 
function handleRestartQuiz () {
  

}

function initQuizApp () {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleRestartQuiz();
}

$(initQuizApp);