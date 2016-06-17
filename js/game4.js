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

var gCorrectGuesses = 0;

function compareAmounts() {
    console.log('gAnimalAmount: ', gAnimalAmount);
    console.log('gGuessedAmount: ', gGuessedAmount);
    if (gAnimalAmount === gGuessedAmount) {
        gCorrectGuesses++
        alert('Right Guess!');
        if (gCorrectGuesses === 5) {
            var elSuccessBtn = document.querySelector('.backMenuBtn');
            elSuccessBtn.style.display = 'block';
            alert('You Won!!')
        }
    } else {
        alert('Wrong Guess...');
    }
    // if game still not won shuffle it again
    createAnimals();
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
    // console.log('elLocation: ', elLocation);
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
    console.log('here');

    // zeroize the amount of animals placed to 0:
    // grab all divs that contain img and change their innerHTML to ''.
    if (gAnimalAmount > 0) {
        console.log('here as well');
        
        var elAnimalLocations = getAnimalsLocation();
        console.log('elAnimalLocations: ', elAnimalLocations);
        for (var i = 0; i < elAnimalLocations.length; i++) {
            // console.log('here 3');
            // console.log('elAnimalLocations[i].childNodes[0]: ', elAnimalLocations[i].childNodes[0]);
            console.log('elAnimalLocations[i].innerHTML: ', elAnimalLocations[i].innerHTML);
            // clean previous animals before printing new ones.
            elAnimalLocations[i].innerHTML = '';
        }
    }

    // grab the all possible animal locations:
    var animalsLocations = getAnimalsLocation();

    // grab X amount of animals to place:
    var animalsAmount = getRandomAmountOfAnimalsToPlace(animalsLocations);
    
    // grab random animal species:
    var randAnimalHTML = getRandomAnimalHTML();

    // console.log('randAmountOfAnimalsToPlace: ', randAmountOfAnimalsToPlace);
    
    // for the given amount of animals to place this round start placing:
    while (animalsAmount > 0) {
        
        // create rand location for animal:
        var randLoc = getRandomLocationToPlaceAnimal(animalsLocations);
        
        // if there is no animal; in this location:
        if (animalsLocations[randLoc].childNodes[0] !== '') {
            // console.log('here 2');

            // place it:
            animalsLocations[randLoc].innerHTML = randAnimalHTML;
            // - the given amount of animals to place until you reach 0 and exit while
            animalsAmount--;
        }
    }
    // console.log('gChosenAnimal: ', gChosenAnimal);
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
