'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// displayMovements 
const displayMovements = function ( movements, sort = false ) {

  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a-b) : movements;

  movements.forEach(function(mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// console.log(containerMovements.innerHTML);

// aclcDisplayBalance
const aclcDisplayBalance = function (acc) {

  //Balance
  acc.balance = acc.movements.reduce( (mov, acc) => mov + acc,0);
  labelBalance.textContent = `${acc.balance}€`;

}


//aclcDisplaySummary
const aclcDisplaySummary = function (acc) {

  // incomes
  const incomes = acc.movements.filter( mov => mov > 0).reduce(( mov, acc) => mov + acc, 0);
  labelSumIn.textContent = `${incomes}€`;

  //outcomes
  const outcomes = acc.movements.filter ( mov => mov < 0).reduce(( mov, acc) => mov + acc, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  //interest
  const interest = acc.movements
  .filter ( mov => mov > 0)
  .map(deposite => (deposite * acc.interestRate)/100)
  .filter (( int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  } )
  .reduce( (mov, int) => mov + int, 0);
  labelSumInterest.textContent = `${interest}€`;

}

const updateUI = function (acc) {
   //display movements
   displayMovements(acc.movements);

   //display balance
   aclcDisplayBalance(acc); 

   //display summary
   aclcDisplaySummary(acc);
}



//event handler
let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  
  //currentAccount
  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value );

  console.log(currentAccount);

  if( currentAccount?.pin === Number(inputLoginPin.value)){
    
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;

    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

  }


});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciveracc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, reciveracc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(
    amount > 0 && 
    reciveracc &&
    currentAccount.balance >= amount && 
    reciveracc?.username !== currentAccount.username
  ) {
    // console.log("Transfer Valid");
    
    //Doing the transfer
    currentAccount.movements.push(-amount);
    reciveracc.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
});

//btnLoan
btnLoan.addEventListener("click", function(e) {
e.preventDefault();

const amount = Number(inputLoanAmount.value);

if(amount > 0 && currentAccount.movements.some( mov => mov >= amount * 0.1)){
  //add amount
  currentAccount.movements.push(amount);

  //update UI
  updateUI(currentAccount);
}

inputLoanAmount.value = '';

});


//closeAccount
btnClose.addEventListener( 'click', function(e) {
    e.preventDefault();

    // console.log('delete');
    
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      // console.log(index);

      // Delete Account
      accounts.splice(index, 1);

      //Hide UI
      containerApp.style.opacity = 0;


    }

    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
//sort displaymoments
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  console.log("Sort");
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const createUserNames = function(accs){
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join('');
  });
} 

createUserNames(accounts);

// console.log(accounts);

/ ////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach( (value, key, map) => {
//   console.log (`${key} : ${value}`);
// } );


// const currenciesUniq = new Set([ 'USD', 'EUR', 'GBP']);

// currenciesUniq.forEach((value, _, map) => {
//   console.log(`${value} : ${value}`);
// });



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const [i, movement] of movements.entries()){
//   if(movement > 0) {
//   console.log(`Movement ${i+1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// }


// console.log("-----foreach ------");

// movements.forEach(movement => {
//   if(movement > 0){
//     console.log(`Your Deposite ${movement}`);
//   }else{
//     console.log(`Your withdarw ${Math.abs(movement)}`);
//   }
// });

// movements.forEach((mov,i,arr) => {
//   if(mov > 0) {
//     console.log(`Movement ${i+1}: Deposited => ${mov}`);
//   } else {
//     console.log(`Movement ${i+1}: Withdrew => ${Math.abs(mov)}`);
//   }
// });

const eurotousd = 1.1;
const movementUSD = movements.map(mov => mov * eurotousd);

// console.log(movements);
// console.log(movementUSD);

const movementUSDFor = [];
for (const mov of movements) movementUSDFor.push(mov * eurotousd);

// console.log(movementUSDFor);

const movementDescriptions = movements.map((mov, i , arr)=>{
  if(mov > 0) {
    return `Movement ${i+1} : You deposited ${mov}`;
  }else{
    return `Movement ${i+1} : You withdraw ${Math.abs(mov)}`;
  }
});

const movementDES = movements.map((mov, i, arr) => 
  `movement ${i+1} : You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(mov)}`
);

// console.log(movementDES);
// console.log(movementDescriptions.join("\n"));

// const user = "John Luwet Williams";

const firstName = "Kyaw Myo ";
const lastName = "Thant";
const fullName = firstName.concat(lastName).toLowerCase().split(' ').map(name=>name[0]).join("");

// console.log(fullName);

const createName = function(user) {
  const username = user.toLowerCase().split(" ").map(name=>name[0]).join("");

  return username;
}

// console.log(createName("Maung Maung Than"));


// const userName = user.toLowerCase().split(' ').map(name=> name[0]).join('');
// console.log(userName);

// const username =user.toLowerCase().split(" ").map(function (name) {
//   return name[0];
// });
// console.log(username);


// filter

const deposites = movements.filter(mov => mov > 0);
// console.log(deposites);

const withdraws = movements.filter(mov => mov < 0);
// console.log(withdraws);

// magic of chaining methods
const eurToUsd = 1.1;
const totalDepositeUSD = movements.filter(mov => mov < 0).map(mov => mov*eurToUsd).reduce((red,mov) => red+mov, 0);

// console.log(totalDepositeUSD);


//find
const firstWithDrawal = movements.find( mov => mov < 0);
console.log( movements); 
console.log( firstWithDrawal);

const firstDeposite = movements.find( mov => mov > 1000);
console.log(firstDeposite);

console.log(accounts);

const account = accounts.find( acc => acc.owner === "Jessica Davis");
console.log(account);

//every
const deposite = mov => mov > 0;
console.log(movements.every(deposite));
console.log(movements.some(deposite));
console.log(movements.filter(deposite));


// sort
const accMovements = movements.sort((a, b) => a-b);
console.log(accMovements);

/////////////////////////////////////////////////


// console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2023, 8, 19, 12, 9));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date (2037, 31, 32, 32, 9, 56);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth())
console.log(future.getDate())
console.log(future.getDay());

console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(2198592596000));
const NowDate = (Date.now());
console.log(new Date(NowDate))

future.setFullYear(2028);
console.log(future)