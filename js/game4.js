'use strict';

var quests = [{id: 1,
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


function getAnimalLocation() {
    var elLocation = document.querySelectorAll('.animal');
    console.log('elLocation: ', elLocation);
    
};

getAnimalLocation();