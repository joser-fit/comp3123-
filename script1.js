// Execrsie-1
// Capitalize the first Letter of a String.
console.log("--------------------------------------------");
console.log("Excersise-1 ()")
console.log("--------------------------------------------");
const sentence='the quick brown fox';

const senteSplit= sentence.split(' ');
const firstWordCap= senteSplit.map(word=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(' ');

console.log(firstWordCap)


// Exercis 2
// Get Maximum Number
console.log("--------------------------------------------");
console.log("Excersise-2")
console.log("--------------------------------------------");
const max= function(a,b,c){
    let lar= a;
    if (b>lar){
        lar=b
    }
    if(c>lar){
        lar=c
    }
    return lar;
}

console.log(max (1,0,1));
console.log(max (0,-10,-20));
console.log(max (1000,510,440));


// Exercise-3
// move last three words to first
console.log("--------------------------------------------");
console.log("Excersise-3")
console.log("--------------------------------------------");

const right= function(word){

    if(word.length >=3){
      
       return word.slice(-3)+word.slice(0,-3)
    }else{
        return `\"${word}\" is shorter than 3 letters`
    }

}
console.log(right("Python"));
console.log(right("JavaScript"));
console.log(right("Hi"));


// Exercise-4:
console.log("--------------------------------------------");
console.log("Excersise-4");
console.log("--------------------------------------------");
const angle_Type=function(angle){

    if (angle>0 && angle <90){
        return `${angle}: is an Acute Angle`
    }else if (angle ==90){
        return `${angle}: is a Right Angle`
    }else if (angle>90 && angle <180){
        return `${angle}: is an Obtuse Angle`
    }else if (angle ==180){
        return `${angle}: is an Acute Angle`
    }
}

console.log(angle_Type(47))
console.log(angle_Type(90))
console.log(angle_Type(145))
console.log(angle_Type(180))

// Exercise-5:
console.log("--------------------------------------------");
console.log("Excersise-5");
console.log("--------------------------------------------");

function array_max_sum(numbers, k) {
    if (!Number.isInteger(k) || k < 1 || k > numbers.length) {
        return null;
    }

    let sum = 0;

    // Sum the first k numbers.
    for (let i = 0; i < k; i++) {
        sum += numbers[i];
    }

    let maxSum = sum;

    // Move the window one position at a time.
    for (let i = k; i < numbers.length; i++) {
        sum = sum - numbers[i - k] + numbers[i];
        maxSum = Math.max(maxSum, sum);
    }

    return maxSum;
}

console.log(array_max_sum([1, 2, 3, 14, 5], 2))
console.log(array_max_sum([2, 3, 5, 1, 6], 3))
console.log(array_max_sum([9, 3, 5, 1, 7], 2))
