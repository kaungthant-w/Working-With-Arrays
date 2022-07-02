// // Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
//   };
  
//   const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
//   };
  
//   const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
//   };
  
//   const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
//   };
  
//   const accounts = [account1, account2, account3, account4];

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

// console.log(movDescription);


for(const movement of movements ) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`)
  } else {
    console.log(`You withdraw ${movement}`);
  }
}