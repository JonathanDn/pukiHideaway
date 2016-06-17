// 'use strict'


// quests model
var quests = [{
		id : 1,
		image : 'img/polarBear.jpg',
		answers : ['That is a Grizzly Bear', 'That is a Polar Bear', 'That is a Panda Bear', 'that is a typical Brown Bear'], // 4 options for various levels of difficulty
		correctOptIndex : 1,
		isCorrect : false
	}, {
		id : 2,
		image : 'img/cow.jpg',
		answers : ['This cat brings milk', 'This dog brings milk', 'This cow brings milk', 'This cow brings fish'], // 4 options for various levels of difficulty
		correctOptIndex : 2,
		isCorrect : false
	}, {
		id : 3,
		image : 'img/elephant.jpg',
		answers : ['The dog is a the biggest mammal on ground', 'The aligator is the biggest mammal on ground', 'The whale is the biggest mammal on ground', 'The elephant is the biggest mammal on ground'], // 4 options for various levels of difficulty
		correctOptIndex : 3,
		isCorrect : false
	}, {
		id : 4,
		image : 'img/lion.jpg',
		answers : ['This fox is the king of the animal kingdom', 'This deer is the king of the animal kingdom', 'This lion is the king of the animal kingdom', 'This wolf is the king of the animal kingdom'], // 4 options for various levels of difficulty
		correctOptIndex : 2,
		isCorrect : false
	}, {
		id : 5,
		image : 'img/bangalTigris.jpg',
		answers : ['Beware of the panther!', 'The cheetah is the fastest predetor on ground', 'The wildcats ears are his most important organ', 'The bangal tigris is a near-extinct species'], // 4 options for various levels of difficulty
		correctOptIndex : 3,
		isCorrect : false
	}
];
var gCurrQuestion = 0;
// init game 1
$(document).ready(function () {
	game1Init();
});
// game init:
function game1Init() {
	// before loading this game --> check if user is permitted to play.
	verifyChalAccess(0);

	console.log('initing');
	// render questions from MODEL to DOM
	renderQuestion(0);
}

// rendering model.
function renderQuestion(questionNumber) {
	// NOT DONE
	// check if previous record of player exists in local storage.
	// localStorage.getItem('');

	var elFirstAnswer = document.querySelector('.answerBar1');
	var elSecondAnswer = document.querySelector('.answerBar2');
	var elImage = document.querySelector('.changingImg');

	//add the correct answer to the list
	var answerNumbers = [quests[questionNumber].correctOptIndex];
	while(answerNumbers.length<gAnswersAmount){
		
	}
	// render the 5th FINAL question content
	if (quests[3].isCorrect) {
		// console.log('here');
		// the fourth question content:
		elFirstAnswer.innerText = quests[4].answers[1];
		elSecondAnswer.innerText = quests[4].answers[3];
		// don't continue the function --> content changed to question 2.

		// render 5th question IMAGE:

		elImage4.src = 'img/bangalTigris.jpg';

		// Declare that GAME1 IS OVER! and now move to GAME2 --> upon click.
		return;
	}

	// render the 4th question content
	if (quests[2].isCorrect) {
		// console.log('here');
		// the fourth question content:
		elFirstAnswer.innerText = quests[3].answers[2];
		elSecondAnswer.innerText = quests[3].answers[0];
		// don't continue the function --> content changed to question 2.

		// render 4th question IMAGE:
		elImage3.src = 'img/lion.jpg';

		return;
	}

	// render the 3rd question content
	if (quests[1].isCorrect) {
		// console.log('here');
		// the third question content:
		elFirstAnswer.innerText = quests[2].answers[0];
		elSecondAnswer.innerText = quests[2].answers[3];
		// don't continue the function --> content changed to question 2.

		// render 3rd question IMAGE:
		elImage2.src = 'img/elephant.jpg';

		return;
	}

	// render the 2nd question content:
	if (quests[0].isCorrect) {
		// console.log('here');
		// the second question:
		elFirstAnswer.innerText = quests[1].answers[2];
		elSecondAnswer.innerText = quests[1].answers[0];
		// don't continue the function --> content changed to question 2.

		// render 2nd question IMAGE:
		// console.log('elImage1.src: ', elImage1.src);
		elImage1.src = 'img/cow.jpg';

		return;
	}
	// show answers
	// console.log('elFirstAnswer: ', elFirstAnswer);
	// console.log('elSecondAnswer: ', elSecondAnswer);
	// console.log('quests.answers[0]: ', quests[0].answers[0]);

	// the first question
	elFirstAnswer.innerText = quests[0].answers[0];
	elSecondAnswer.innerText = quests[0].answers[1];
}

// will fit all questions screens 1-5, 2-5, 3-5 and so on.
function answerClicked(elAnswer) {
	// console.log('quests[0].correctOptIndex: ', quests[0].correctOptIndex);
	// the right answeres.
	var rightFirstAnswer = quests[0].answers[quests[0].correctOptIndex];
	var rightSecondAnswer = quests[1].answers[quests[1].correctOptIndex];
	var rightThirdAnswer = quests[2].answers[quests[2].correctOptIndex];
	var rightFourthAnswer = quests[3].answers[quests[3].correctOptIndex];
	var rightFifthAnswer = quests[4].answers[quests[4].correctOptIndex];

	// console.log('right answers: 1.', rightFirstAnswer, '2.', rightSecondAnswer, '3.', rightThirdAnswer, '4.', rightFourthAnswer, '5.', rightFifthAnswer);
	// console.log('quests[0].isCorrect: ', quests[0].isCorrect );


	// check 1st question if correct:
	if (elAnswer.innerText === rightFirstAnswer) {
		console.log('Right 1st Answer!');
		quests[0].isCorrect = true;
		// update question number ++:
		var elQuestionNum = document.querySelector('.questionNum');
		elQuestionNum.innerText++;
		// now render again:
		renderQuestion();
		// console.log('quests[0].isCorrect: ', quests[0].isCorrect );
		return;
	}

	// check 2nd question if correct:
	if (elAnswer.innerText === rightSecondAnswer) {
		console.log('Right 2nd Answer!');
		quests[1].isCorrect = true;
		// update question number ++:
		var elQuestionNum = document.querySelector('.questionNum');
		elQuestionNum.innerText++;
		// now render questions to third questions.
		renderQuestion();
		return;
	}

	// check 3rd question if correct:
	if (elAnswer.innerText === rightThirdAnswer) {
		console.log('Right 3rd Answer!');
		quests[2].isCorrect = true;
		// update question number ++:
		var elQuestionNum = document.querySelector('.questionNum');
		elQuestionNum.innerText++;
		// now render questions to fourth questions.
		renderQuestion();
		return;
	}

	// check 4th question if correct:
	if (elAnswer.innerText === rightFourthAnswer) {
		console.log('Right 4th Answer!');
		quests[3].isCorrect = true;
		// update question number ++:
		var elQuestionNum = document.querySelector('.questionNum');
		elQuestionNum.innerText++;
		// now render questions to fifth questions.
		renderQuestion();
		return;
	}

	// check 5th question if correct:
	if (elAnswer.innerText === rightFifthAnswer) {
		console.log('Right 5th Answer! GAME WON!');
		quests[4].isCorrect = true;
		// now render questions to fifth questions.
		// change to happy bear
		var elTeddy = document.querySelector('.happyTeddy');
		elTeddy.src = 'img/happyteddy.png';
		// display "next challange" button:
		var elNextChal = document.querySelector('.nextChallangeContainer');
		// console.log('elNextChal: ', elNextChal);
		elNextChal.style.display = "block";

		// showing the next challange button
		saveCurrChal(1);

		renderQuestion();

		return;
	}

}