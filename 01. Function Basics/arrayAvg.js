function arrayAVG(numArray) {
    let totalSum = 0;
    for (let number of numArray) {
        totalSum += number;
    }
    return totalSum / numArray.length;
}

array1 = [5,10]
array2 = [10,10,10, 20]

console.log(arrayAVG(array1));
console.log(arrayAVG(array2));