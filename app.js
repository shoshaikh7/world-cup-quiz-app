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
  const introTemplate = `<section id="start-content">
                          <p id="intro-text">Put your knowledge of World Cup history to the test with this fun quiz!</p>
                          <button id="js-start-quiz">Start Quiz</button>
                        </section>`
  return introTemplate;
}

// Generate answer choices
function generateAnswerChoices () {
  let answerChoices = store.questions[store.questionNumber].answers;
  let questionCounter = 0;
  let answerTemplate = ''

  console.log(answerChoices);
  for (let i = 0; i < answerChoices.length; i++) {
    answerTemplate += `<button class="js-answer-choice" id="js-choice-${i + 1}">${answerChoices[i]}</button>`

  }
  return answerTemplate;
}

// Generate question
function generateQuestion () {
  let currentQuestion = store.questions[store.questionNumber].question;
  console.log(currentQuestion);
  const questionTemplate = `<form id="js-question-form>
                              <div id="js-question">
                                ${currentQuestion}
                              </div>
                              <div id="js-answer-choices">
                                ${generateAnswerChoices()}                              
                              </div>
                            </form>`

  return questionTemplate;
}

// Generate correct answer
function generateCorrectAnswer () {

}

// Generate question number and score
function generateCurrentQuestionNumAndScore () {

}

// Generate final results
function generateFinalResults () {

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render () {
  if (store.quizStarted === false) {
    // If 'quizStarted === false' show intro
    $('main').html(generateIntro());
    return;
  } else if (store.questionNumber < store.questions.length) {
    // else if 'questionNumber < questions.length'
    // show question, answers choices, and question number/score
    $('main').html(generateQuestion());

  } else {
    // else show final results

  }  
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
// Handle 'start quiz' button
function handleStartQuiz () {
  console.log("Starting Quiz");
  $('main').on('click', '#js-start-quiz', e => {
    store.quizStarted = true;
    render();
  });
}

// Handle 'answer' submit
function handleAnswerSubmit () {
  console.log("Submitting Answer");
  
}

// Handle 'next question' button
function handleNextQuestion () {
  console.log("Showing next question");

}

// Reset data values
function resetValues () {
  console.log("Resetting Values");

}

// Handle 'restart quiz' button 
function handleRestartQuiz () {
  console.log("Restarting Quiz");

}

function initQuizApp () {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleRestartQuiz();
}

$(initQuizApp);