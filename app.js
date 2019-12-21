var state = {
  questions: [
    {
      text: "Which of the following is <u>NOT</u> a member of Led Zeppelin?",
      answers: [
        { text: "Robert Plant", isCorrect: false },
        { text: "Jimmy Page", isCorrect: false },
        { text: "John Paul Jones", isCorrect: false },
        { text: "Keith Moon", isCorrect: true }
      ]
    },
    {
      text:
        "What famous guitarist played the star spangled banner during his Woodstock performance?",
      answers: [
        { text: "Ravi Shankar", isCorrect: false },
        { text: "Steven Stills", isCorrect: false },
        { text: "Jimi Hendrix", isCorrect: true },
        { text: "Eric Claption", isCorrect: false }
      ]
    },
    {
      text:
        "Which of the following artists did <u>NOT</u> die as a direct result of an accidental overdose?",
      answers: [
        { text: "Jim Morrison", isCorrect: false },
        { text: "Kurt Cobain", isCorrect: true },
        { text: "John Bonham", isCorrect: false },
        { text: "Jimi Hendrix", isCorrect: false }
      ]
    },
    {
      text: "Which band was joined by legendary guitarist Joe Walsh?",
      answers: [
        { text: "The Beatles", isCorrect: false },
        { text: "The Eagles", isCorrect: true },
        { text: "Bad Company", isCorrect: false },
        { text: "Steve Miller Band", isCorrect: false }
      ]
    },
    {
      text:
        "Which Led Zeppelin song plays a satanic message when played backwards?",
      answers: [
        { text: "Over the Hills and Far Away", isCorrect: false },
        { text: "Stairway to Heaven", isCorrect: true },
        { text: "The Immigrant Song", isCorrect: false },
        { text: "Rock and Roll", isCorrect: false }
      ]
    },
    {
      text: "What are the last lines of White Rabbit by Jefferson Airplane?",
      answers: [
        { text: "Free your head", isCorrect: false },
        { text: "Feed your head", isCorrect: true },
        { text: "Fear your head", isCorrect: false },
        { text: "Feel your head", isCorrect: false }
      ]
    },
    {
      text: "Who wrote the solo to Pink Floyd's Time?",
      answers: [
        { text: "Roger Waters", isCorrect: false },
        { text: "David Gilmour", isCorrect: true },
        { text: "Eric CLapton", isCorrect: false },
        { text: "George Harrison", isCorrect: false }
      ]
    },
    {
      text: "Which of the following tracks appeared on Led Zeppelin II?",
      answers: [
        { text: "Rock and Roll", isCorrect: false },
        { text: "The Lemon Song", isCorrect: true },
        { text: "Bron Y Aur Stomp", isCorrect: false },
        { text: "Dazed and Confused", isCorrect: false }
      ]
    },
    {
      text:
        "Which Jimi Hendrix song was recorded in one take during a BBC documentary filming?",
      answers: [
        { text: "Foxy Lady", isCorrect: false },
        { text: "Voodoo Child (Slight Return)", isCorrect: true },
        { text: "Little Wing", isCorrect: false },
        { text: "Hey Joe", isCorrect: false }
      ]
    },
    {
      text:
        "What is the age of the famous 'club' of musicians who have died young?",
      answers: [
        { text: "26", isCorrect: false },
        { text: "27", isCorrect: true },
        { text: "25", isCorrect: false },
        { text: "29", isCorrect: false }
      ]
    }
  ],
  currentQuestionIndex: 0,
  correctAnswers: 0
};

function displayTotals() {
  var numberCorrect = state.correctAnswers;
  var amountOfQuestions = state.questions.length;
  if (numberCorrect === 10) {
    setTimeout(function() {
      sweetAlert(
        "Congrats! You answered " +
          numberCorrect +
          " out of " +
          amountOfQuestions +
          " correctly! You know your shit!"
      );
    }, 100);
  } else if (numberCorrect < 10 && numberCorrect >= 7) {
    setTimeout(function() {
      sweetAlert(
        "Not Bad! You answered " +
          numberCorrect +
          " out of " +
          amountOfQuestions +
          " correctly! You know a solid amount."
      );
    }, 100);
  } else if (numberCorrect < 7 && numberCorrect >= 4) {
    setTimeout(function() {
      sweetAlert(
        "Yeesh. You only answered " +
          numberCorrect +
          " out of " +
          amountOfQuestions +
          " correctly... Do you even like music?"
      );
    }, 100);
  } else {
    setTimeout(function() {
      sweetAlert(
        "Gross. You only answered " +
          numberCorrect +
          " out of " +
          amountOfQuestions +
          " correctly. It's like you don't even care."
      );
    }, 100);
  }
  reset();
}

function displayCorrectAnswer() {
  var currentQuestion = state.currentQuestionIndex;
  var correctAnswer = state.questions[currentQuestion].answers.find(function(answer) {
    return answer.isCorrect === true;
  });

  $(".correctedAnswer").text(
    "The correct answer is " + correctAnswer.text + "."
  );
}

function correctGuess(element) {
  $(element)
    .css("border", "1px solid green")
    .attr("disabled", true);
  state.correctAnswers++;
}

function incorrectGuess(element) {
  $(element).css("border", "1px solid red");
  $(element)
    .parent()
    .children()
    .attr("disabled", true);

  displayCorrectAnswer();
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

function displayNumCorrect() {
  $(".answerTally").text(
    "You have answered " +
      state.correctAnswers +
      " out of " +
      state.questions.length +
      " correctly."
  );
}

function renderAnswers(answers) {
  return shuffle(answers).map(function(answer) {
    return `<button data-correct = '${answer.isCorrect}'>
          ${answer.text}
        </button>`;
  });
}

function reset() {
  $(".next").text("Next");
  state.currentQuestionIndex = 0;
  state.correctAnswers = 0;
}

function render() {
  var currentQuestion = state.currentQuestionIndex;
  var questionCount = currentQuestion + 1;
  var answers = state.questions[currentQuestion].answers;

  $(".questionArea").html(state.questions[currentQuestion].text);
  $(".answerArea").html(renderAnswers(answers));

  // clears corrected answer element in case there was a wrong answer and it was added
  $(".correctedAnswer").html("");
  $(".pageTally").text("Question " + questionCount + " of 10");
  displayNumCorrect();
}

function updateDisplay() {
  var length = state.questions.length;

  if (state.currentQuestionIndex === length) {
    displayTotals();
  } else if (state.currentQuestionIndex === length - 1) {
    $(".next").text("Get Score");
  }

  render();
}

$(".next").on("click", function(event) {
  event.preventDefault();
  state.currentQuestionIndex++;

  updateDisplay();
});

$("body").on("click", ".answerArea button", function(event) {
  event.preventDefault();

  if ($(this).attr("data-correct") === "true") {
    correctGuess(this);
  } else {
    incorrectGuess(this);
  }

  displayNumCorrect();
});

shuffle(state.questions);
render();
