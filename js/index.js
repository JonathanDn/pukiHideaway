'use strict';
var gGameState = {};
var gChals = [{
		href : 'game1.html',
		name : 'The Garden',
	}, {
		href : 'game2',
		name : 'The Forest',
	}, {
		href : 'game3',
		name : 'The Beach',
	}
];

$(document).ready(function () {

	//Load gGameState
	gGameState.currChal = loadCurrChal();
	//	gGameState.difficulty = loadGameDifficulty();
	changeDifficulty(loadGameDifficulty());
});

function changeDifficulty(difficulty) {
	saveGameDifficulty(difficulty);
	
	var $difficultyButtons = [];
	$difficultyButtons[EASY] = $('#difficulty-easy');
	$difficultyButtons[MEDIUM] = $('#difficulty-medium');
	$difficultyButtons[HARD] = $('#difficulty-hard');
	$difficultyButtons.forEach(function ($button, index) {
		if (index === difficulty) {
			$button.addClass('btn-primary active');
			$button.removeClass('btn-info');
		} else {
			$button.removeClass('btn-primary active')
			$button.addClass('btn-info');
		}
	});
	/*	var $medium=$(#difficulty-medium);
	var $hard=$(#difficulty-hard);
	switch(difficulty){
	case EASY:
	$easy.addClass('btn-primary active');
	$medium.removeClasss('btn-primary active');
	$hard.removeClasss('btn-primary active');
	break;
	}
	 */
}
