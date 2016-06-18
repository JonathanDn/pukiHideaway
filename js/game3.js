'use strict';
var difficulties = [{
		amount : 9,
		max : 9
	}, {
		amount : 16,
		max : 20
	}, {
		amount : 16,
		max : 100
	}
]
var gDifficulty;
var gRemaining;
var gAmount;
var gMax;

$(document).ready(function () {
	//    verifyChalAccess(2);

	renderBoard();
	initDragAndDrop();
});

function renderBoard() {
	var $board = $('.gameBoard');
	var boardItems = [];
	for (var i = 1; i <= AMOUNT; i++) {
		//get the first number for the addition
		var randomNumber = parseInt(Math.random() * i);
		//try not to have 0, but don't eliminate it completely
		if (randomNumber === 0) {
			randomNumber = parseInt(Math.random() * i);
		}
		//put each question (excersise) in random order
		boardItems.splice(parseInt(Math.random() * i), 0,
			'<div class="board-cell" data-drag-target-id="#drag-' + i + '">' + randomNumber + '+' + (i - randomNumber) + '</div>');
	}
	$board.html(boardItems.join(''));
	var $sumBlocks = $('.sumBlocks');
	var blocksHTML = '';
	for (var i = 1; i <= AMOUNT; i++) {
		blocksHTML += '<div class="sumBlock" id="drag-' + i + '">' + i + '</div>';
	}
	$sumBlocks.html(blocksHTML);
}

function initDragAndDrop() {
	$('.sumBlock').draggable();
	$('.board-cell').each(function () {
		//console.log($(this));
		//console.log($(this).data('drag-target-id'));

		$(this).droppable({
			accept : $(this).data('drag-target-id'),
			drop : ondrop,
			tolerance : 'fit'
		});
	});
}

function ondrop(event, ui) {
	//make them invisible - because .hide() will mess up the layout
	$(this).css("visibility", "hidden");
	ui.draggable.css("visibility", "hidden");
	console.table(event);

	//somehow this event is fired twice every correct drop
	//this is a workaround
	gRemaining -= 0.5;
	//console.log(gRemaining);

	if (gRemaining === 0) {
		//show the continue button to next challanges
		$('.nextChallangeContainer').show();
		// save progress to local storage.
		saveCurrChal(3);
	}
}
