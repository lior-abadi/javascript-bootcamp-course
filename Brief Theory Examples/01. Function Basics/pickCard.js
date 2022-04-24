/*
The cards returned need to have a suit and a number.
Numbers: 2345678910JQKA (14 numbers)
Suits: Clubs, Spades, Hearts, Diamonds (4 suits)
*/

let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A" ]
let suits = ["Clubs", "Spades", "Diamonds", "Hearts"];

function arrayRand(array){
    return Math.floor(Math.random() * array.length);
}

function drawCard(){
    return {
        number: (numbers[arrayRand(numbers)]),
        suit : suits[arrayRand(suits)]
    }
}

console.log(drawCard());