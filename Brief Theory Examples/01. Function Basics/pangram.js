function isPangramV1(phrase){
    // ASCII 65-90, A-Z. All asciis sum 2015.
    let outPhrase = phrase; 
    phrase = (phrase.toUpperCase()).replace(/ /g, "");
    let asciiArray = [];
    for (let letter in phrase){
        if (phrase.charCodeAt(letter) <= 64 || phrase.charCodeAt(letter) >= 91 ){
            return "The phrase contains a character that is not a letter."   
        }
        asciiArray.push(phrase.charCodeAt(letter));   
    }
    asciiArray = [... new Set(asciiArray)];
    let sum = 0;
    for (let ascii of asciiArray){
        sum += ascii; 
    }
    if (sum === 2015) {
        return (`"${outPhrase}" is a pangram`)
    } else {
        return (`"${outPhrase}" is NOT a pangram`)
    }
}

function isPangramV2(phrase){
    let lCase = phrase.toLowerCase();
    for (let char of "abcdefghijklmnopqrstuvwxyz"){
        if (lCase.indexOf(char) === -1) {
            return false
        }
    }
    return true;
}

console.log(isPangramV1("The quick brown fox jumps over a lazy dog 1234"));
console.log(isPangramV1("hi how are you."));
console.log(isPangramV1("The quick brown fox jumps over a lazy dog"));
console.log(isPangramV1("Glib jocks quiz nymph to vex dwarf"));

console.log(isPangramV2("The quick brown fox jumps over a lazy dog 1234"));
console.log(isPangramV2("hi how are you."));
console.log(isPangramV2("The quick brown fox jumps over a lazy dog"));
console.log(isPangramV2("Glib jocks quiz nymph to vex dwarf"));
