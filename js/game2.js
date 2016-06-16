'use strict'

var NUMS = {
	rows : 3,
	cols : 7,
	hiddenBlocks : 3
};

// count number of attempts to drag n drop
var gTotalAttemptsCounter = 0;
// dropped items counter
// current row to print counter
var gDroppedCounter = 0;
var gCurrRow = 0;

// init game 1
$(document).ready(function () {
	verifyChalAccess(1);
	renderBoard(0);
});

// create the current nums.arr --> game level.
// can be modified according to initial number / cols / rows to change DIFFICULTY

function renderBoard(row) {
	var elGameContainer = document.querySelector('.gameContainer');
	// console.log('elGameContainer: ', elGameContainer);

	var strHTML = '';
	var i = row;
	strHTML += '<tr>';
	for (var j = 0; j < NUMS.cols; j++) {
		// var counter = i * j + 1;
		// console.log('nums.arr[i][j]: ', nums.arr[i][j]);

		// added id for each cell.
		strHTML += '<td id="' + i + '-' + j + '" class="cell">' + ((j + row * NUMS.cols) + 1) + '</td>';
		// counter++;
	}
	strHTML += '</tr>';
	// console.log('strHTML: ', strHTML);

	elGameContainer.innerHTML += strHTML;
	// console.log('elGameContainer: ', elGameContainer);
	// hide 2 cells:(get them and hide them.)

	// create RAND NUMS to determine how many HIDDEN CELLS will show this round.(according to difficulty.)
	var randNums = [];
	var elCells2Hide = [];
	for (var i = 0; i < NUMS.hiddenBlocks; i++) {

		// create a DYNAMIC RAND NUMS ARRAY.
		// define randNum this round.
		var randNum = parseInt(Math.random() * NUMS.cols);
		// check if this randNum exists in the array before.

		// make sure ALL RANDOM NUMS are UNIQUE.
		while (randNums.includes(randNum)) {
			// if this randNum exists -->  replace the new randNum.
			randNum = parseInt(Math.random() * NUMS.cols);
		}
		// if randNum not included in array PUSH it!
		randNums.push(randNum);

		// if not existing --> push it.
		// create a dynamic amount of cells 2 hide( and drag)
		elCells2Hide.push(document.getElementById(row + '-' + randNums[i]));
	}

	// get loose block element before creating the loose blocks to drag n drop.
	var elLooseBlocks = document.querySelector('.looseBlocks');
	// create the left blocks
	var looseBlocksHTML = '';
	for (var i = 0; i < elCells2Hide.length; i++) {
		// create 1 draggable block dynamically (i+1) is 0 and than 1 to create - 2 blocks random nums.
		var id = 'drag' + (i + 1)
			looseBlocksHTML +=
			'<div>'
			 + ' <div class="leftBlock" id="' + id + '">'
			 + '<span class="leftBlockNum" >' + elCells2Hide[i].innerText + '</span>'
			 + '</div>'
			 + '</div>';

		// hide it's text to present a black empty box.
		elCells2Hide[i].innerText = '';
		//elCells2Hide[i].style.color = 'black';
		$(elCells2Hide[i]).droppable({
			accept : '#' + id,
			/*			accept : function (element) {
			console.log(element[0]);
			console.log(element.id,'#'+id);
			if (element[0].id==='#'+id){	return true}
			else{return false}
			},
			 */
			drop : ondrop
		});
		//		$(elCells2Hide[i]).droppable({
		//accept : '#'+id,
		//		accept:function(d){
		//		if (d.attr('id')==='#'+id) {return true} else {return false}
		//}
		//			,drop : function(){
		//			console.log('wrong');
		//	}
		//		});


		// turn empty array blocks to --> droppabble. (i + 1) --> create drop1 / drop2 to determine 2 different areas to drop the dragged item.
		//elCells2Hide[i].setAttribute('ondrop', 'drop(event)')
		//elCells2Hide[i].setAttribute('ondragover', 'allowDrop(event)')
		//elCells2Hide[i].setAttribute('id', 'drop' + (i + 1));
	}
	elLooseBlocks.innerHTML = looseBlocksHTML;
	$('.leftBlock').draggable({
		revert : 'invalid',
		start : function () {
			// up the total attempts counter
			gTotalAttemptsCounter++;
			// update the DOM total attempts counter:
			var elAttemptsCounter = document.querySelector('.attempts');
			elAttemptsCounter.innerHTML = gTotalAttemptsCounter;
		}
	});

}

// DRAK & DROP:

function ondrop(event, ui) {
	//this event double-fires alot, make sure it didn't happen this time
	if (ui.draggable.css('visibility') === 'hidden') {
//		console.log('misfire again');
		return;
	}
	event.target.innerHTML = ui.draggable.html();
	ui.draggable.css('visibility', 'hidden');

	gDroppedCounter++;

	if (gDroppedCounter === NUMS.hiddenBlocks) {

		// everytime I enter this if --> row num is ++
		gCurrRow++
		// when row number is 10 and you finish you win.
		if (gCurrRow === NUMS.rows) {
			alert('You win!!!!');

			// display "next challange" button:
			var elNextChal = document.querySelector('.nextChallangeContainer2');
			// console.log('elNextChal: ', elNextChal);
			elNextChal.style.display = "block";
			// save curr chal progress.
			// console.log('before saving ls');

			// save progress to local storage.
			saveCurrChal(2);
			// console.log('after saving ls');


			return;
		}

		// 1 SECOND DELAY before printing next row.
		// you SOLVED this round.
		setTimeout(function () {
			// render the next row --> 0, 1, 2, 3...
			renderBoard(gCurrRow);
		}, 700);

		// Reset gDropped --> for the new row level.
		gDroppedCounter = 0;
	}
}
