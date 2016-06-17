'use strict';

var animals = [{id: 1,
               name: 'hippos',
               image: 'img/hippo.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 2,
               name: 'elephants',
               image: 'img/elephant.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 3,
               name: 'butterflys',
               image: 'img/butterfly.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 4,
               name: 'turtles',
               image: 'img/turtle.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 5,
               name: 'pandas',
               image: 'img/panda.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 6,
               name: 'dolphins',
               image: 'img/dolphin.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               }];

var gChosenAnimal;

var gAnimalAmount;

var gGuessedAmount;

function compareAmounts() {
    console.log('gAnimalAmount: ', gAnimalAmount);
    console.log('gGuessedAmount: ', gGuessedAmount);
    
    if (gAnimalAmount === gGuessedAmount) {
        alert('You win!')
    } else {
        alert('Wrong Guess...');
    }
}

function checkUserGuess(elAmount) {
    // console.log('here');
    // grab the child of this element and show it's innerHTML
    // console.log('elAmount.childNodes[0].innerHTML: ', elAmount.childNodes[0].innerHTML);
    gGuessedAmount = +elAmount.childNodes[0].innerHTML;
    // console.log('gGuessedAmount: ', gGuessedAmount);
    compareAmounts();
}


function getAnimalsLocation() {
    var elLocation = document.querySelectorAll('.animal');
    console.log('elLocation: ', elLocation);
    return elLocation;
};

function getRandomAnimal() {
    // get a random animal image:
    gChosenAnimal = animals[parseInt(Math.random() * animals.length)];
    // console.log('gChosenAnimal: ', gChosenAnimal);
    
    return gChosenAnimal;
}

function getRandomAmountOfAnimalsToPlace(animalsLocations) {
    gAnimalAmount = parseInt(Math.random() * animalsLocations.length) + 1;
    // console.log('gAnimalAmount: ', gAnimalAmount);
    
    return gAnimalAmount;
}

function getRandomLocationToPlaceAnimal(animalsLocations) {
    var randLocation = parseInt(Math.random() * animalsLocations.length);
    return randLocation;
}

function getRandomAnimalHTML() {
    // randomly pick an animal i make a loop and put this string inside it.
    gChosenAnimal = getRandomAnimal();
    var animalImageHTML = '';
    animalImageHTML += '<img src="' + gChosenAnimal.image + '" alt="">';
    return animalImageHTML;
}


function createAnimals() {
    // grab the all possible animal locations:
    var animalsLocations = getAnimalsLocation();
    
    // grab random animal species:
    var randAnimalHTML = getRandomAnimalHTML();

    // grab X amount of animals to place:
    var animalsAmount = getRandomAmountOfAnimalsToPlace(animalsLocations);
    // console.log('randAmountOfAnimalsToPlace: ', randAmountOfAnimalsToPlace);
    
    // for the given amount of animals to place this round start placing:
    while (animalsAmount > 0) {
        
        // create rand location for animal:
        var randLoc = getRandomLocationToPlaceAnimal(animalsLocations);
        
        // if there is no anima; in this location:
        if (animalsLocations[randLoc].children.length === 0) {
            // console.log('here 2');

            // place it:
            animalsLocations[randLoc].innerHTML = randAnimalHTML;
            // - the given amount of animals to place until you reach 0 and exit while
            animalsAmount--;
        }
    }
    console.log('gChosenAnimal: ', gChosenAnimal);
    var chosenAnimalSpecies = gChosenAnimal
    
    var animalSpecies = document.querySelector('.randAnimalName');
    animalSpecies.innerHTML = gChosenAnimal.name;
    
}

function gameInit(){
    createAnimals();
    
}


// init game 4
$(document).ready(function () {
	// verifyChalAccess(3);
	gameInit();
});
