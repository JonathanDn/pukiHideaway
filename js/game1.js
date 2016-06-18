// 'use strict'

//amount of possible answers to display
var ANSWERS_AMOUNT = 2;

// quests model
var quests = [
	[{
			image : 'img/goldenFish.jpg',
			answers : ['It\'s a golden fish', 'It\'s a trout', 'It\'s a whale'],
			correctOptIndex : 0,
			isCorrect : false
		}, {
			image : 'img/bunny.jpg',
			answers : ['I am known for showing up on Easter', 'I am known for showing up on Christmas', 'I am known for showing up on Hanukka'],
			correctOptIndex : 0,
			isCorrect : false
		}, {
			image : 'img/wolf.jpg',
			answers : ['I am an excellent hunter', 'I am vegetarian', 'I am a good friend of sheep'],
			correctOptIndex : 0,
			isCorrect : false
		}
	],
	[{
			image : 'img/polarBear.jpg',
			answers : ['That is a Grizzly Bear', 'That is a Polar Bear', 'That is a Panda Bear', 'that is a typical Brown Bear'],
			correctOptIndex : 1,
			isCorrect : false
		}, {
			image : 'img/cow.jpg',
			answers : ['This cat brings milk', 'This dog brings milk', 'This cow brings milk', 'This cow brings fish'],
			correctOptIndex : 2,
			isCorrect : false
		}, {
			image : 'img/elephant.jpg',
			answers : ['The dog is a the biggest mammal on ground', 'The aligator is the biggest mammal on ground', 'The whale is the biggest mammal on ground', 'The elephant is the biggest mammal on ground'],
			correctOptIndex : 3,
			isCorrect : false
		}, {
			image : 'img/lion.jpg',
			answers : ['This fox is the king of the animal kingdom', 'This deer is the king of the animal kingdom', 'This lion is the king of the animal kingdom', 'This wolf is the king of the animal kingdom'],
			correctOptIndex : 2,
			isCorrect : false
		}, {
			image : 'img/bangalTigris.jpg',
			answers : ['Beware of the panther!', 'The cheetah is the fastest predetor on ground', 'The wildcats ears are his most important organ', 'The bangal tigris is a near-extinct species'],
			correctOptIndex : 3,
			isCorrect : false
		}
	],
	[{
			image : 'img/armadilo.jpg',
			answers : ['My special ability is sniffing around with his big nose', 'My special ability is rolling to a ball to defend from predators', 'My special ability is running very fast to catch it\'s prey', 'Having exceptional swimming skills'],
			correctOptIndex : 1,
			isCorrect : false
		}, {
			image : 'img/orangutan.jpg',
			answers : ['They love dense forests with high trees', 'They love vast seas with many fish', 'They love endless desserts with scarce water'],
			correctOptIndex : 0,
			isCorrect : false
		}, {
			image : 'img/parrot.jpg',
			answers : ['Instead of hands i use my tail', 'Instead of hands i use my feathers', 'Instead of hands i use my beak and legs'],
			correctOptIndex : 2,
			isCorrect : false
		}, {
			image : 'img/rhyno.jpg',
			answers : ['Sought after their thick skin', 'Sought after the speed it can reach when running', 'Sought after their horns made of ivory'],
			correctOptIndex : 2,
			isCorrect : false
		}, {
			image : 'img/chameleon.jpg',
			answers : ['Known mostly for climbing ability', 'Known mostly for independent rotating eyes ability', 'Known mostly for excellent camouflage ability'],
			correctOptIndex : 2,
			isCorrect : false
		}

	]
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
	var elDifficulty = document.querySelector('.game1difficulty');
	elDifficulty.textContent = DIFFICULTYTEXT[gDifficulty];
	// render questions from MODEL to DOM
	var elTotalQuestions = document.querySelector('.game1total-questions');
	elTotalQuestions.textContent=quests[gDifficulty].length;
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

	// do the rendering
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
