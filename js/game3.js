'use strict';
var AMOUNT=10;
$(document).ready(function () {
	//    verifyChalAccess(2);
	//    renderBoard(0);
	testing();
	renderBoard();
	initDragAndDrop();
	console.log(Date.now());
});

function testing() {
	$("#drag1").draggable();
	$("#drag2").draggable();

	$('#drop1').droppable({
		accept : '#drag1'
	});
	$('#drop2').droppable({
		accept : '#drag2'
	});
	$('#drop3').droppable();
}

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
	$('.board-cell').
	//	droppable();
	each(function () {
		//console.log($(this));
		//console.log($(this).data('drag-target-id'));

		$(this).droppable({
			accept : $(this).data('drag-target-id'),
			drop : function (event, ui) {
				//	$(this)
				//	.hide();
				$(this).css("visibility", "hidden");
				ui.draggable.hide();
			}
		});

	});
}
