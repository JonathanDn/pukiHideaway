'use strict';
var gChals = [{
		href : 'game1.html',
		name : 'Match pictures',
	}, {
		href : 'game2.html',
		name : 'Complete numbers',
	}, {
		href : 'game3.html',
		name : 'Calculations',
	},
	{
		href : 'game4.html',
		name : 'Counting Stuff',
	}
];

$(document).ready(function () {
	var currChal = loadCurrChal();
	var difficulty = loadGameDifficulty()
		changeDifficulty(difficulty);
	renderChals(currChal);
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
}

function renderChals(currChal) {
	/*
	<div class="chal">
	Challange 1
	</div>
	<div class="chal">
	Challange 2
	</div>
	<div class="chal">
	Challange 3
	</div>
	 */
	var $chalsDiv = $('.challanges');
	var html = '';
	gChals.forEach(function (chal, chalIndex) {

		var currChalHtml = '<div class="chal';

		if (chalIndex < currChal) {
			//chal is already completed
			currChalHtml += ' complete';
		} else if (chalIndex > currChal) {
			//chal still locked
			currChalHtml += ' locked';
		}
		currChalHtml += '">' + chal.name + '</div>';

		if (chalIndex <= currChal) {
			currChalHtml = '<a href="' + chal.href + '">' + currChalHtml + '</a>';
		}
		html += currChalHtml

	});
	//console.log(html);
	$chalsDiv.html(html);
}
