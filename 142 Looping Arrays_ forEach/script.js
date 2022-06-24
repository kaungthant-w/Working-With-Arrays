const movements = [342, 322, 523, -321, -211, 1232, 32, -12, 332];

console.log(movements)
// for
for(const movement of movements ) {
   if(movement > 0) {
    console.log(`Your deposite : ${movement}`);
   } else {
       console.log(`Your withdraw : ${Math.abs(movement)}`);
   }
}

for(const [i, movement] of movements.entries()) {
    if(movement > 0) {
        console.log(`${i+1}. Your deposite : ${movement}`);
    } else {
        console.log(`${i+1}. Your withdraw: ${movement}`)
    }
}

// foreach 
movements.forEach(function(movement){
    if(movement > 0) {
        console.log(`Your deposited ${movement}`)
    } else {
        console.log(`Your withdarw ${Math.abs(movement)}`)
    }
})

movements.forEach(function(mov, i, arr) {
    if(mov > 0) {
        console.log(`${i} Your deposited ${mov}`)
    } else {
        console.log(`${i} Your withdraw : ${Math.abs(mov)}`)
    }
})