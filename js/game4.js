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
    // console.log('gAnimalAmount: ', gAnimalAmount);
    // console.log('gGuessedAmount: ', gGuessedAmount);
    if (gAnimalAmount === gGuessedAmount) {
        gCorrectGuesses++
        // console.log('gCorrectGuesses: ', gCorrectGuesses);
        // console.log('Right guess!');
        if (gCorrectGuesses === 5) {
            var elSuccessBtn = document.querySelector('.backMenuBtn');
            elSuccessBtn.style.display = 'block';
            // update local storage to life lock on last stage.
            saveCurrChal(4); 
            alert('You Won!!')
            return;
        }
    } else {
        alert('Wrong Guess...');
    }
    // if game still not won shuffle it again
    createAnimals();
}

function checkUserGuess(elAmount) {
    // grab the child of this element and show it's innerHTML
    // console.log('elAmount.childNodes[0].innerHTML: ', elAmount.childNodes[0].innerHTML);
    gGuessedAmount = (+elAmount.childNodes[0].innerHTML);
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
    // round up to make 1-5 options only.
    var currAnimalAmountToPlace = parseInt(Math.random() * animalsLocations.length + 1);
    // console.log('currAnimalAmountToPlace: ', currAnimalAmountToPlace);
    return currAnimalAmountToPlace;
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
    // preperations for second round of game:

    // zeroize the amount of animals placed to 0:
    // grab all divs that contain img and change their innerHTML to ''.
    if (gAnimalAmount > 0) {
        console.log('here as well');
        var elAnimalLocations = getAnimalsLocation();
        // console.log('elAnimalLocations: ', elAnimalLocations);
        for (var i = 0; i < elAnimalLocations.length; i++) {
            // console.log('elAnimalLocations[i].childNodes[0]: ', elAnimalLocations[i].childNodes[0]);
            // console.log('elAnimalLocations[i].innerHTML: ', elAnimalLocations[i].innerHTML);
            // clean previous animals before printing new ones.
            elAnimalLocations[i].innerHTML = '';
        }
    }

    // grab the all possible animal locations:
    var animalsLocations = getAnimalsLocation();
    // grab X amount of animals to place:
    var currAnimalAmount = getRandomAmountOfAnimalsToPlace(animalsLocations);
    // actual amount of animals placed 
    gAnimalAmount = currAnimalAmount;
    // update global curr amount of animals to whats actually printed
    // grab random animal species:
    var randAnimalHTML = getRandomAnimalHTML();
    // console.log('randAmountOfAnimalsToPlace: ', randAmountOfAnimalsToPlace);
    console.log('currAnimalAmount before while: ', currAnimalAmount);
    // for the given amount of animals to place this round start placing:
    while (currAnimalAmount > 0) {
        // create rand location for animal:
        var randLoc = getRandomLocationToPlaceAnimal(animalsLocations);
        // if there is no animal; in this location place one.
        if (animalsLocations[randLoc].innerHTML !== '' || animalsLocations[randLoc].innerHTML === 1) {
            // the CONFLICT happens when randloc repeats and han an animal is pushed twice to the same place.
            // if randLoc already CONTAINS IMAGE! --> go back to the beginning of the loop choose an other randLoc
            if(animalsLocations[randLoc].innerHTML === randAnimalHTML) {
                // console.log('contains image');
                continue;
            }
        }
        // if passed that if --> create the animal
        // if it's a NEW RAND LOCATION --> place it:
        animalsLocations[randLoc].innerHTML = randAnimalHTML;
        currAnimalAmount--;
    }
    var chosenAnimalSpecies = gChosenAnimal;
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
