'use strict'

var NUMS = {rows: 10,
            cols: 7,
            hiddenBlocks: 2
            };


var gTotalAttemptsCounter = 0;

var gDroppedCounter = 0;
var gCurrRow = 0;

// init game 1
$(document).ready(function () {
    verifyChalAccess(1);
    renderBoard(0);
    // renderBoard(1);

    // renderBoard(2);
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
        strHTML += '<td id="' + i + '-' + j + '" class="cell">' + ((j+row*NUMS.cols) + 1 )+ '</td>';
        // counter++;
    }
    strHTML += '</tr>';
    // console.log('strHTML: ', strHTML);
    
    elGameContainer.innerHTML += strHTML;
    // console.log('elGameContainer: ', elGameContainer);
    // hide 2 cells:(get them and hide them.)

    // take 2 random nums
    var randNum1 = parseInt(Math.random() * NUMS.cols);
    var randNum2 = parseInt(Math.random() * NUMS.cols);
    // console.log('randNum1: ', randNum1);
    
    // show 2 different empty blocks
    var elCell2Hide1 = document.getElementById(row +'-' + randNum1 );
    var elCell2Hide2 = document.getElementById(row +'-'+ randNum2 );
    var elCells2Hide = [elCell2Hide1, elCell2Hide2];

    // get loose block element before creating the loose blocks to drag n drop.
    var elLooseBlocks = document.querySelector('.looseBlocks');
    // create the left blocks
    for (var i = 0; i < elCells2Hide.length; i++) {
        // create 1 draggable block dynamically (i+1) is 0 and than 1 to create - 2 blocks random nums.
        elLooseBlocks.innerHTML += 
            '<div ondrop="drop(event)" ondragover="allowDrop(event)">'
                + ' <div class="leftBlock" draggable="true" ondragstart="drag(event)"  id="drag' + (i + 1) + '">'
                    + '<span class="leftBlockNum" >' + elCells2Hide[i].innerText  + '</span>'
                + '</div>'
            + '</div>'

            // hide it's text to present a black empty box.
            elCells2Hide[i].innerText = '';
            elCells2Hide[i].style.color = 'black';
            
            // turn empty array blocks to --> droppabble. (i + 1) --> create drop1 / drop2 to determine 2 different areas to drop the dragged item.
            elCells2Hide[i].setAttribute('ondrop', 'drop(event)')
            elCells2Hide[i].setAttribute('ondragover', 'allowDrop(event)')
            elCells2Hide[i].setAttribute('id', 'drop' + (i + 1));
    
    }

}

// DRAK & DROP:

function allowDrop(ev) {
    // cancel event ondragover
    ev.preventDefault();
}
function drag(ev) {
    
    // element that initiated the drag.
    // identify image after started dragging.
    // has to be target word(resrved)
    ev.dataTransfer.setData('content', ev.target.id);
    
}
function drop(ev) {
    // cancel event ondragover
    console.log('ev: ', ev);
    
    ev.preventDefault();
    // identify our content dragged:
    var draggedNum = ev.dataTransfer.getData("content");
    var innerHTMLEl2drag = ev.srcElement.innerHTML;
    // the dragged element
    // console.log('draggedNum: ', draggedNum);

    // the drop target
    // console.log('ev.target: ', ev.target);

    // console.log('el2drag: ', el2drag);
    // console.log('ev.target.innerHTML: ', ev.target.innerHTML);
    // console.log('ev.target.hasChildNodes(): ', ev.target.hasChildNodes());
    // if (el2drag !== ev.target.innerHTML) return;

    // append the dragged item --> to the drop target.

        //  console.log('el2drag: ', el2drag);
        //  console.log('ev.target.id: ', ev.target.id);
        //  console.log('draggedNum substring: ', draggedNum.substring(4, 5));
        //  console.log('ev.target.id substring: ', ev.target.id.substring(4, 5));
        
        // APPEND only if the DRAGGED item id === DROP TARGET item id.
        var draggedNum = ev.dataTransfer.getData("content");
        // if trying to put drag(1) on drop(2) || drag(2) on drop(1) return!
        if(draggedNum.substring(4, 5) !==  ev.target.id.substring(4, 5)) {
            // up the total attempts counter
            gTotalAttemptsCounter++;
            // update the DOM total attempts counter:
            var elAttemptsCounter = document.querySelector('.attempts');
            elAttemptsCounter.innerHTML =  gTotalAttemptsCounter;
            // notfy player he is wrong
            alert("Your'e wrong, try again!")
            return;
        };
            
            // console.log('ev.target: ', ev.target);
            ev.target.appendChild(document.getElementById(draggedNum));

            // add back the content:
            // console.log('innerHTMLEl2drag: ', innerHTMLEl2drag);
            ev.target.innerHTML = ev.srcElement.innerText;

            // update the cell with the dragged item and color.
            ev.target.style.color = 'white';

            // up the total attempts counter:
            gTotalAttemptsCounter++;
            // update the DOM total attempts counter:
            var elAttemptsCounter = document.querySelector('.attempts');
            elAttemptsCounter.innerHTML =  gTotalAttemptsCounter;

            // on the first drop ++ the count --> counts the draggables dropped succefully in curr row.
            gDroppedCounter++;
            // if the count is 2(all hidden blocks are now placed with the dragged blocks)
            if (gDroppedCounter === NUMS.hiddenBlocks) {

                // everytime I enter this if --> row num is ++
                gCurrRow++
                // when row number is 10 and you finish you win.
                if (gCurrRow === NUMS.rows) {
                    alert('You win!!!!');
                    return;
                }
                // render the next row --> 0, 1, 2, 3...
                renderBoard(gCurrRow);
                // Reset gDropped --> for the new row level.
                gDroppedCounter = 0;
            }

            // notify the player that he is right.
            alert('right on!');
            
       
}




