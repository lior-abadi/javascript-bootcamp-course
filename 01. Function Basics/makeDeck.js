const myDeck = {
    deck: [],
    discardPile: [],
    numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A" ],
    suits: ["Clubs", "Spades", "Diamonds", "Hearts"],
    initializeDeck() {
        const {suits, numbers, deck} = this;
        for (let value of numbers){
            for(let suit of suits){
                deck.push({
                    value,
                    suit
                })
            }
        }
    },
    drawCard() {
        let drawnCard =  this.deck.pop();
        this.discardPile.push(drawnCard);
        return drawnCard;
    },
    drawMultiple(numCards) {
        multipleDrawn = [];
        for(let i = 0; i<numCards; i++){
           multipleDrawn.push(this.drawCard());
        }
        return multipleDrawn;
    },
    suffleDeck(){
        const {deck} = this;
        for(let i = deck.length -1 ; i > 0; i--){
            let j = Math.floor(Math.random() * (i+1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
}