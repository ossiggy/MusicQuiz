var state = {
	currentQuestionIndex: 0,
	questions: questions,
  correctAnswers: 0
}
shuffle(questions)
render()
$(".next").on("click", goToNext)
$("body").on("click", ".answerArea button", guessedAnswer)

function goToNext(event){
	state.currentQuestionIndex++
	render()
}
function render(){
	var index = state.currentQuestionIndex
	var length = state.questions.length
  var questionCount = index+1
	if(index===length){
    reset()
  }
  if(index===length-1){
    $(".next").text("Start Over")
  }
  $(".questionArea").html(state.questions[state.currentQuestionIndex].text)
  var answers = state.questions[state.currentQuestionIndex].answers
  $(".answerArea").html(renderAnswers(answers))
  $(".correctedAnswer").html("")
  $(".pageTally").html("Question "+questionCount+" of 10")
  displayNumCorrect()
}
function displayNumCorrect(){
  $(".answerTally").html("You have answered "+state.correctAnswers+" out of "+questions.length+" correctly.")
}
function renderAnswers(answers){
  return shuffle(answers).map(function(answer){
    return "<button data-correct = '"+answer.correct+"'>"+answer.text+"</button>"
  }).join("")
}
function guessedAnswer(event){
  $(this).attr("data-correct")==="true" ? correctGuess(this) : incorrectGuess(this)
  displayNumCorrect()
    if(state.currentQuestionIndex===state.questions.length-1){
      if(state.correctAnswers===10){
        setTimeout(function(){
        sweetAlert("Congrats! You answered "+state.correctAnswers+" out of "+questions.length+" correctly! You know your shit!")
        }, 100)
      }
      else if(state.correctAnswers<10&&state.correctAnswers>=7){
        setTimeout(function(){
        sweetAlert("Not Bad! You answered "+state.correctAnswers+" out of "+questions.length+" correctly! You know a solid amount.")
        }, 100)       
      }
      else if(state.correctAnswers<7&&state.correctAnswers>=4){
        setTimeout(function(){
        sweetAlert("Yeesh. You only answered "+state.correctAnswers+" out of "+questions.length+" correctly... Do you even like music?")
        }, 100)
      }
      else{
        setTimeout(function(){
        sweetAlert("Gross. You only answered "+state.correctAnswers+" out of "+questions.length+" correctly. It's like you don't even care.")
        }, 100)
      }
  }
}
function correctGuess(element){
  $(element).css("border", "1px solid green").attr("disabled", true)
  state.correctAnswers++
}
function incorrectGuess(element){
  $(element).css("border", "1px solid red")
    $(element).parent().children().attr("disabled", true)
    displayCorrectAnswer()
}
function displayCorrectAnswer(){
    var correctAnswer = state.questions[state.currentQuestionIndex].answers.find(function(answer){
      return answer.correct
    })
    $(".correctedAnswer").html("The correct answer is "+correctAnswer.text+".")
}
function reset(){
		$(".next").text("Next")
		state.currentQuestionIndex=0 
    state.correctAnswers=0
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
  return a
}
