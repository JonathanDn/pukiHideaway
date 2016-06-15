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
    // console.log('nums.arr: ', nums.arr);
}

function renderBoard(row) {
    var elGameContainer = document.querySelector('.gameContainer');
    // console.log('elGameContainer: ', elGameContainer);
    
    var strHTML = '';
    var i = row;
    strHTML += '<tr>';  
    for (var j = 0; j < nums.cols; j++) {
        // var counter = i * j + 1;
        // console.log('nums.arr[i][j]: ', nums.arr[i][j]);
        // added id for each cell.
        strHTML += '<td id="' + i + '-' + j + '" class="cell">' + ((j+row*nums.cols) + 1 )+ '</td>';
        // counter++;
    }
    strHTML += '</tr>';
    // console.log('strHTML: ', strHTML);
    
    elGameContainer.innerHTML += strHTML;
    // console.log('elGameContainer: ', elGameContainer);
    // hide 2 cells:(get them and hide them.)

    // take 2 random nums
    var randNum1 = parseInt(Math.random() * nums.cols);
    var randNum2 = parseInt(Math.random() * nums.cols);
    // console.log('randNum1: ', randNum1);
    
    // show 2 different empty blocks
    var elCell2Hide1 = document.getElementById(row +'-' + randNum1 );
    var elCell2Hide2 = document.getElementById(row +'-'+ randNum2 );

    // create the left blocks
    var elLooseBlocks = document.querySelector('.looseBlocks');
    elLooseBlocks.innerHTML = 
        '<div ondrop="drop(event)" ondragover="allowDrop(event)">'
            + ' <div class="leftBlock" draggable="true" ondragstart="drag(event)"  id="drag1">'
                + '<span class="leftBlockNum" >' + elCell2Hide1.innerText  + '</span>'
            + '</div>'
        + '</div>'

        + '<div ondrop="drop(event)" ondragover="allowDrop(event)">'
            + '<div class="rightBlock" draggable="true" ondragstart="drag(event)"  id="drag2">'
                +  '<span class="rightBlockNum">' + elCell2Hide2.innerText + '</span>'
            + '</div>'
        + '</div>'

    // console.log('elCell2Hide1: ', elCell2Hide1);
    // console.log('elCell2Hide2: ', elCell2Hide2);
    // hidden them succefully.
    elCell2Hide1.innerText = ' ';
    elCell2Hide2.innerText = ' ';
    elCell2Hide1.style.color = 'black';
    elCell2Hide2.style.color = 'black';
    // add drop attributes:

    // I need a div to surrond them then give him the attributes.
    elCell2Hide1.setAttribute('ondrop', 'drop(event)')
    elCell2Hide1.setAttribute('ondragover', 'allowDrop(event)')
    elCell2Hide1.setAttribute('id', 'drop1');
    
   
    elCell2Hide2.setAttribute('ondrop', 'drop(event)');
    elCell2Hide2.setAttribute('ondragover', 'allowDrop(event)');
    elCell2Hide2.setAttribute('id', 'drop2');

    // ondrop="drop(event)" ondragover="allowDrop(event)" id="drop1"
    
    
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
            totalAttemptsCounter++;
            // update the DOM total attempts counter:
            var elAttemptsCounter = document.querySelector('.attempts');
            elAttemptsCounter.innerHTML =  totalAttemptsCounter;
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
            totalAttemptsCounter++;
            // update the DOM total attempts counter:
            var elAttemptsCounter = document.querySelector('.attempts');
            elAttemptsCounter.innerHTML =  totalAttemptsCounter;


            // notify the player that he is right.
            alert('right on!');
            
       
}


var nums = {rows: 10,
            cols: 7,
            initial: 1,
            arr: []
            };


var totalAttemptsCounter = 0;


// init game 1
$(document).ready(function () {
    verifyChalAccess(1);
    createBoard();
    renderBoard(0);
    // renderBoard(1);
    // renderBoard(2);
});


