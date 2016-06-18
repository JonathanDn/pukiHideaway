'use strict';
var DIFFICULTIES = [{
		amount : 9,
		max : 9
	}, {
		amount : 16,
		max : 20
	}, {
		amount : 16,
		max : 99
	}
]
var gDifficulty;
var gRemaining;
var gAmount;
var gMax;

$(document).ready(function () {
	verifyChalAccess(2);
	gDifficulty = loadGameDifficulty();
	gAmount = DIFFICULTIES[gDifficulty].amount;
	gRemaining = gAmount;
	gMax = DIFFICULTIES[gDifficulty].max;
	renderBoard();
	initDragAndDrop();
});

function renderBoard() {
	var $board = $('.gameBoard');
	var draggableBlocks = getArrayOfRandomUniqueNums(gAmount, 1, gMax);
	var boardHTML = '';
	draggableBlocks.forEach(function (total) {
		var a = randomInt(gMax);
		var b = total - a;
		var excersise = '' + ((b > 0) ? (a + '+' + b) : (a + '-' + (-b)));
		//console.log(total,'=',excersise,'b>0',b>0);
		boardHTML += '<div class="board-cell" data-drag-target-id="#drag-' + total + '">' + excersise + '</div>';
	});
	$board.html(boardHTML);
	$board.addClass('game3-'+DIFFICULTYTEXT[gDifficulty]);
	if (gMax === 9) {
		$board.addClass('X3X3');
	}
	
	var $sumBlocks = $('.sumBlocks');
	var blocksHTML = '';

	draggableBlocks.sort(function (a, b) {
		return a - b
	});
	draggableBlocks.forEach(function (blockValue) {
		blocksHTML += '<div class="sumBlock" id="drag-' + blockValue + '"><span class="sumBlockNum">' + blockValue + '</span></div>';
	});
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
	//console.table(event);

	//somehow this event is fired twice every correct drop
	//this is a workaround
	gRemaining -= 0.5;
	//console.log(gRemaining);

	if (gRemaining === 0) {
		//show the continue button to next challanges
		$('.nextChallangeContainer').show();
		//$('.nextChallangeContainer').dialog();
		
		// save progress to local storage.
		saveCurrChal(3);
	}
}

//min is inclusive,max is exclusive
function getArrayOfRandomUniqueNums(length, min, max) {
	var ar = [parseInt(Math.random() * max) + min];
	while (ar.length < length) {
		var rand = parseInt(Math.random() * max) + min;
		if (!ar.includes(rand)) {
			ar.push(rand);
		}
	}
	return ar;
}
