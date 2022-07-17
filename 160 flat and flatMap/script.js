// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const flatMovements = [32,36,[32,54,-31,35], 90, -93, 83];
const arr = flatMovements.flat();
console.log(arr);

const multiMovements = [32,36,[32, 54, -31, [44,39,83,91], 35], 90, -93, 83];


console.log(multiMovements.flat(2));

const accMovement = accounts.map( acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(accMovement);
  

const mixMovement = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov , 0);
console.log(mixMovement);