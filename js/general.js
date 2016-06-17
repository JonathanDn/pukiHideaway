'use strict';
var EASY = 0;
var MEDIUM = 1;
var HARD = 2;

//returns current difficulty (from localstorage)
function loadGameDifficulty() {
	var difficulty = localStorage.getItem('pukisHideawayByRobertAndJonnyDifficulty');
	if (difficulty === null) {
		difficulty = EASY;
	}
	return +difficulty;
}

//returns current unlocked chal
function loadCurrChal() {
	var currChal = localStorage.getItem('pukisHideawayByRobertAndJonnyCurrChal');
	if (currChal === null) {
		currChal = 0;
	}
	return +currChal;
}

//updates difficulty (to be used by the main menu when the user changes difficulty)
function saveGameDifficulty(difficulty) {
	localStorage.pukisHideawayByRobertAndJonnyDifficulty = difficulty;
}

//updates current unlocked chal (to be used when the user finishes a chal)
function saveCurrChal(currChal) {
	// curr chal in local storage < then curr chal.
	if (loadCurrChal() < currChal) {
		localStorage.pukisHideawayByRobertAndJonnyCurrChal = currChal;
	}
}

//checks if the user is allowed to play this chal, if not redirects to the main menu
//to be used onload of every chal
function verifyChalAccess(chal) {
	var currChal = loadCurrChal();
	//	console.log('chal:',chal,'currChal:',currChal,'currChal<chal:',currChal<chal)
	if (currChal < chal) {
		window.location = 'index.html';
		//		return ('acting');
	}
	//	return ('access granted');
}

function randomInt(max){
	return parseInt(Math.random()*max);
}
//Array.includes rarely suported on mobile (failed on 2/2 phones), so here is a polyfill
if (!Array.prototype.includes) {
    Array.prototype.includes = function(s) {
        return this.indexOf(s) > -1
    }
}
