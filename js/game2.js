'use strict'

// create the current nums.arr --> game level.
// can be modified according to initial number / cols / rows to change DIFFICULTY
function createBoard() {
    for (var i = 0; i < nums.rows; i++) {
        for (var j = 0; j < nums.cols; j++) {
            // console.log('here');
            // console.log('nums.initial: ', nums.initial);
            // console.log('nums.arr[i][j]: ', nums.arr[i][j]);
            
            // create a 1-21 nums array.
            nums.arr.push(nums.initial);
            nums.initial++;
            
        }
    }
    console.log('nums.arr: ', nums.arr);
}

function renderBoard() {
    var counter = 1;
    var elGameContainer = document.querySelector('.gameContainer');
    console.log('elGameContainer: ', elGameContainer);
    
    var strHTML = '<table align="center"><tbody>';
    for (var i = 0; i < nums.rows; i++) {
        strHTML += '<tr>';  
        for (var j = 0; j < nums.cols; j++) {
            // console.log('nums.arr[i][j]: ', nums.arr[i][j]);
            // added id for each cell.
            strHTML += '<td id="' + i + '-' + j + '" class="cell">' + counter + '</td>';
            counter++;
        }
        strHTML += '</tr>';

    }
    strHTML += '</tbody></table>';

    elGameContainer.innerHTML = strHTML;
    // console.log('elGameContainer: ', elGameContainer);
    // hide 2 cells:(get them and hide them.)
    var elCell2Hide1 = document.getElementById('2-3');
    var elCell2Hide2 = document.getElementById('2-4');
    console.log('elCell2Hide1: ', elCell2Hide1);
    console.log('elCell2Hide2: ', elCell2Hide2);
    // hidden them succefully.
    elCell2Hide1.style.visibility = 'hidden';
    elCell2Hide2.style.visibility = 'hidden';
    
    
}


var nums = {rows: 3,
            cols: 7,
            initial: 1,
            arr: []
            };


createBoard();

renderBoard();
