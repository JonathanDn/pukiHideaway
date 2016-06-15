'use strict';
$(document).ready(function () {
	//    verifyChalAccess(2);
	//    renderBoard(0);
	$("#drag1").draggable();
	$("#drag2").draggable();
	
	$('#drop1').droppable({accept:'#drag1'});
	$('#drop2').droppable({accept:'#drag2'});
	$('#drop3').droppable();
});
