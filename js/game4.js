'use strict';

var animals = [{id: 1,
               image: 'img/hippo.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 2,
               image: 'img/elephant.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 3,
               image: 'img/butterfly.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 4,
               image: 'img/turtle.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               },
               {id: 5,
               image: 'img/panda.png',
               answers: [1, 2, 3, 4, 5],
               correctOptIndex: 1,
               isCorrect: false
               }];


function getAnimalsLocation() {
    var elLocation = document.querySelectorAll('.animal');
    console.log('elLocation: ', elLocation);
    return elLocation;
};

// getAnimalsLocation();

function createAnimals() {
    var animalsLocations = getAnimalsLocation();
    // console.log('animalsLocations: ', animalsLocations);
    // console.log('animalsLocations[0]: ', animalsLocations[0]);
    // console.log('animalsLocations[0].children: ', animalsLocations[0].children);
    

    // randomly pick an animal i make a loop and put this string inside it.
    var animalImageHTML = '';
    animalImageHTML += '<img src="' + animals[1].image + '" alt="">';
    // console.log('animalImageHTML: ', animalImageHTML);
    
    // 1. if there is no animal in the div put an animal inside
    // 2. next stage to change the for loop to put an image randomly not in every spot.

    // rand amount of animals to present
    var randAmountOfAnimalsToPlace = parseInt(Math.random() * animals.length) + 1;
    // console.log('randAmountOfAnimalsToPlace: ', randAmountOfAnimalsToPlace);
    
    // for the given amount of animals to place this round start placing:
    while (randAmountOfAnimalsToPlace > 0) {
        
        // create rand location for animal:
        var randLocation = parseInt(Math.random() * animalsLocations.length);
        // put animal in random location
        // console.log('animalsLocations[randLocation]: ', animalsLocations[randLocation]);
        
        // if there is no anima; in this location:
        if (animalsLocations[randLocation].children.length === 0) {
            // console.log('here 2');

            // place it:
            animalsLocations[randLocation].innerHTML = animalImageHTML;
            // - the given amount of animals to place until you reach 0 and exit while
            randAmountOfAnimalsToPlace--;
        }
    }
}

createAnimals();

