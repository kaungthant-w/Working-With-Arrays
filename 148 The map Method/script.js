const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const euroToUsd = 1.1;
  // const movementsUSD = movements.map(mov => mov * euroToUsd);

  const movementsUSD = movements.map(function(mov) {
    // return 23;
    return mov * euroToUsd;
  })

console.log(movementsUSD);

const movementUSDFor = [];
for( const mov of movements ) {
   movementUSDFor.push(mov * euroToUsd);
}

console.log(movementUSDFor);

const movementKyats = movements.map(mov => mov * 2000)
console.log(movementKyats)


const movementDescription = movements.map( (mov, i, arr) => {
  if(mov > 0) {
    return `Movement ${i} : You deposited ${mov}`;
  } else {
    return `Movement ${i} : You withdraw ${Math.abs(mov)}`
  }
});

const movDescription = movements.map((mov, i) => mov > 0 ? `You deposited ${mov} ` : `You withdraw ${Math.abs(mov)}`);

console.log(movDescription);

for(const movement of movements ) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`)
  } else {
    console.log(`You withdraw ${movement}`);
  }
}