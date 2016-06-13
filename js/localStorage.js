'use strict';
function loadGameState(){
		JSONString = localStorage.pukisHideawayByRobertAndJonny;
	if (JSONString === null) {
		gameState.difficulty = EASY;
		gameState.currChal = 0;
	}else{
		gameState=JSON.parse(JSONString);
	}
	return gameState;
}

function saveGameState(gameState){
	localStorage.pukisHideawayByRobertAndJonny=JSON.stringify(gameState);
}