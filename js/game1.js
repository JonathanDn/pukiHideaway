// 'use strict'

//amount of possible answers to display
var ANSWERS_AMOUNT = 2;

// quests model
var quests = [
	[{
			id : 1,
			image : 'img/polarBear.jpg',
			answers : ['That is a Grizzly Bear', 'That is a Polar Bear', 'That is a Panda Bear', 'that is a typical Brown Bear'], 
			correctOptIndex : 1,
			isCorrect : false
		}, {
			id : 2,
			image : 'img/cow.jpg',
			answers : ['This cat brings milk', 'This dog brings milk', 'This cow brings milk', 'This cow brings fish'], 
			correctOptIndex : 2,
			isCorrect : false
		}, {
			id : 3,
			image : 'img/elephant.jpg',
			answers : ['The dog is a the biggest mammal on ground', 'The aligator is the biggest mammal on ground', 'The whale is the biggest mammal on ground', 'The elephant is the biggest mammal on ground'], 
			correctOptIndex : 3,
			isCorrect : false
		}, {
			id : 4,
			image : 'img/lion.jpg',
			answers : ['This fox is the king of the animal kingdom', 'This deer is the king of the animal kingdom', 'This lion is the king of the animal kingdom', 'This wolf is the king of the animal kingdom'], 
			correctOptIndex : 2,
			isCorrect : false
		}, {
			id : 5,
			image : 'img/bangalTigris.jpg',
			answers : ['Beware of the panther!', 'The cheetah is the fastest predetor on ground', 'The wildcats ears are his most important organ', 'The bangal tigris is a near-extinct species'], 
			correctOptIndex : 3,
			isCorrect : false
		}
	],
	[]
];

var gCurrQuestion = 0;
var gDifficulty;
// init game 1
$(document).ready(function () {
	game1Init();
});
// game init:
function game1Init() {
	// before loading this game --> check if user is permitted to play.
	verifyChalAccess(0);
	gDifficulty = loadGameDifficulty();
	var elDifficulty=document.querySelector('.game1difficulty');
	elDifficulty.textContent=DIFFICULTYTEXT[gDifficulty];
	// render questions from MODEL to DOM
	renderQuestion(gDifficulty, gCurrQuestion);
}

// rendering model.
function renderQuestion(difficulty, questionNumber) {
	var elImage = document.querySelector('.changingImg');
	var elsAnswers = document.querySelectorAll('.answerBar');
	var currQuest = quests[difficulty][questionNumber];
	//add the correct answer(s) to the list
	var answerNumbers = [currQuest.correctOptIndex];

	//add more answer(s) to the list
	while (answerNumbers.length < ANSWERS_AMOUNT) {
		var randonAnswerNum = randomInt(currQuest.answers.length);
		if (!answerNumbers.includes(randonAnswerNum)) {
			var newRandomOrder = randomInt(answerNumbers.length + 1);
			answerNumbers.splice(newRandomOrder, 0, randonAnswerNum)
		}
	}

	//do the rendering
	answerNumbers.forEach(function (answerNum, i) {
		elsAnswers[i].textContent = currQuest.answers[answerNum];
		elsAnswers[i].setAttribute('data-answer-num', answerNum);
	});
	elImage.src = currQuest.image;
}

// will fit all questions screens 1-5, 2-5, 3-5 and so on.
function answerClicked(elAnswer) {
	if (+elAnswer.getAttribute('data-answer-num') === quests[gDifficulty][gCurrQuestion].correctOptIndex) {
		if (gCurrQuestion === quests[gDifficulty].length - 1) {
			// change to happy bear
			var elTeddy = document.querySelector('.happyTeddy');
			elTeddy.src = 'img/happyteddy.png';
			// display "next challange" button:
			var elNextChal = document.querySelector('.nextChallangeContainer');
			// console.log('elNextChal: ', elNextChal);
			elNextChal.style.display = "block";

			// showing the next challange button
			saveCurrChal(1);

		} else {
			var elQuestionNum = document.querySelector('.questionNum');
			gCurrQuestion++;
			elQuestionNum.textContent = gCurrQuestion + 1;
			renderQuestion(gDifficulty, gCurrQuestion);
		}
	} else {
		alert('Wrong answer');
	}
}
