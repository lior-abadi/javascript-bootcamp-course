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
    let numbRand = arrayRand(numbers);
    let suitRand = arrayRand(suits);
    let card = {
        number: (numbers[numbRand]),
        suit : suits[suitRand]
    }
    return card
}

console.log(drawCard());