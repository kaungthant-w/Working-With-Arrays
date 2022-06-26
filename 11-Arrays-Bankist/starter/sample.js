

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

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';
    const movs = sort ? acc.movements.slice().sort((a, b) => a-b) : acc.movements;
    movs.forEach(function(mov, i ) {

        const type = mov > 0 ? "deposit" : "withdrawal";
        
        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}$</div>
        </div> 
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html);
    }) 
    
};

const aclcDisplaySummary = function( acc) {

    //income
    const incomes = acc.movements.filter(mov => mov > 0).reduce( (acc, mov) => acc + mov , 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    //outcome
    const outcomes = acc.movements.filter(mov => mov < 0).reduce( (acc, mov) => acc + mov , 0);

    labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`;

    // interest
    const interests = acc.movements
    .filter(mov => mov > 0)
    .map( deposite => (deposite * 1.2) / 100)
    .filter( (int, i , arr) => {
        // console.log(arr);
        return int >=1;
    })
    .reduce( (acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interests.toFixed(2)}€`;


}

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov , 0);

    labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
}

const updateUI = function (acc) {
   //Display Movement
   displayMovements(acc);

   //display summary 
   aclcDisplaySummary(acc);

   // display balance
   calcDisplayBalance(acc);
}

//event handler
let currentAccount;

//fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const now = new Date();
const days = `${now.getDate()}` .padStart(2, 0);
const months = `${now.getMonth() +1}`.padStart(2, 0);
const years = now.getFullYear();
const hours = now.getHours();
const mins = now.getMinutes();

labelDate.textContent = `${days} / ${months} / ${years} ${hours} : ${mins}`;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  
  //currentAccount
  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value );

//   console.log(currentAccount);

 if(currentAccount?.pin === +(inputLoginPin.value)) {
    //  console.log("Login");

    //Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = 1;

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

   //updateUI 
  updateUI(currentAccount);
 }
});


btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  let amount = +(inputTransferAmount.value);
  let recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(amount, recieverAcc);

  inputTransferAmount.value = inputTransferTo.value = "";
  if ( amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username ){

    // console.log("Transfer Valid");
    //Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(
    inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin

  ) {

    const index = accounts.findIndex( acc => acc.username === currentAccount.username);
    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";

});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  
  let amount = Math.floor(inputLoanAmount.value);

  if( amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1 )){
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);

  sorted = !sorted;
});

const createUserNames = function (accs) {
   accs.forEach ( acc => {
       acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
   } );
};

createUserNames(accounts);



// const createUserNames = function(accs){
//     accs.forEach(function (acc) {
//       acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join('');
//     });
//   } 
  
//   createUserNames(accounts);





//maximum value
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

const max = movements.reduce( (acc, mov) => {
    if (acc > mov) return acc;
    else return mov;
}, movements[0]);

console.log(max);



const eurToUsd = 1.1;
const totalDepositeUsd = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd)
.reduce((mov, cur) => mov + cur, 0);

console.log(totalDepositeUsd);

const totalWithdarwUsd = movements.filter(mov => mov < 0).map(mov => mov * eurToUsd).reduce((mov,reu) => mov+reu, 0);
console.log(`${Math.abs(totalWithdarwUsd)}`);

const movements1 = [5000, 3400, -150, -790, -3210, -1000, 8500, -30, -2000];


const firstWithdarwal = movements1.find(mov => mov <0);

console.log(firstWithdarwal);

console.log(accounts);

const account11 = accounts.find( acc => acc.owner === "Jessica Davis");

console.log(account11);

// Some and Every

console.log(movements);
console.log(movements.includes(-790));

console.log(movements.some( mov => mov > 0));
console.log(movements.every( mov => mov > 0));
console.log(movements.fill(mov => mov > 0));


//flat and flatMap
const arr = [[3, 32, 21, 24, 54, 87, 90],[22,11,15,19,91,23], 323, [32,321,[323,321,47,92,10,30]],323];

console.log(arr.flat(2));

const accountMovements = accounts.map( acc => acc.movements);

const allMovements = accountMovements.flat();

console.log(allMovements);
// console.log(arr.flatMap());

const overalBalance = allMovements.reduce((acc, mov)=> acc + mov, 0);

const accMovements = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);

const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc+mov, 0);

console.log(overalBalance2);

console.log(accMovements);

console.log(overalBalance);


//sort
const owner = ['jonas', 'zach', 'adam', 'martha'];

console.log(owner.sort());

const movements5 = [2, -21, 22, 28, 92, 90, -88, 882];
//ascending
movements5.sort((a,b) => {
  if( a > b) return 1;
  if ( a< b) return -1;
})


console.log(movements5);

//desending
movements5.sort((a,b) => {
  if( a > b) return -1;
  if( a < b) return 1;
})

movements5.sort( (a, b) => a-b);
console.log(movements5);

movements5.sort( (a, b) => b-a);
console.log(movements5);

const x = new Array(7);
console.log(x);

x.fill(3,2);
console.log(x);

const arr2 = [3,2,1,4,6,7,9,0,10,22];
arr2.fill(322,4,7);

console.log(arr2)

const y = Array.from({length:7}, (cur, i) => i + 1);
console.log(y)

const movementUI = Array.from(document.querySelectorAll('.movements__value'));

console.log(movementUI);

labelBalance.addEventListener('click', function(){
  const movementUI = Array.from(document.querySelectorAll(".movements__value"), el => Number(el.textContent.replace('$','')));
  console.log(movementUI);

  const movementUI2 = [...document.querySelectorAll('.movements__value')];

  console.log(movementUI2);
});





console.log("Here end");

labelBalance.addEventListener('click', function() {

  [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
    if( i % 2 === 0 ) row.style.backgroundColor = "orangered";
    if(i % 3 === 0) row.style.backgroundColor = "blue"
  });
});

// console.log(".......foreach...........");

console.log(2 ** 53 -1);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log( 2** 53 + 3);
console.log( 2 ** 53 + 4);
console.log( 2 ** 53 + 5);
console.log( 2 ** 53 + 5);
console.log( 2 ** 53 + 5);
console.log( 2 ** 53 + 5);

console.log( '323332424452952502752572n');
console.log( BigInt(341414149897892287048141048));

console.log(10000n + 1000n);
console.log(34245252524254524525n * 34245252524254524525n );

const huge = 20234243240141420n;
const num =32;

console.log(huge + BigInt(num));

console.log(20n > 5);
console.log(typeof 20n);
console.log( 20n == 20 );

console.log(11n / 2n);
console.log(11n / 3n);
console.log(10n / 3n);
console.log(12n / 3n);
console.log(10 / 3);

console.log(Number.MAX_SAFE_INTEGER);

console.log(huge +  " Really big!");

const now = new Date();
console.log(now);
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date ('December 24, 2015'));
console.log(account1.movements[0]);


// const createUserNames = function(accs) {
    //     accs.forEach(function (acc) {
    //         acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
    //     });
    // };
    
    // createUserNames(accounts);
    // // console.log(accounts);
    
    
    
    
    // const depositeFor = [];
    // for( const mov of movements) {
    //     if ( mov > 0) {
    //         depositeFor.push(mov);
    //     }
    // }
    
    // console.log(depositeFor);
    
    
    // const withdraws = movements.filter( mov => mov < 0);
    //  console.log(withdraws);
     
    //  for ( const mov of movements) {
    //      if ( mov < 0) {
    //          depositeFor.push(mov);
    //      }
    //  }
    
    //  console.log(depositeFor);
    
    
    //  const balance = movements.reduce( function ( acc, aur, i, arr) {
    //      console.log(`Iteraton ${i} : ${acc}`);
    //     return acc + aur;
    //  } , 0);
    
    
    // console.log(balance);
    
    
    // let balanceFor = 0;
    // for(const mov of movements) {
    //     balanceFor += mov;
    // }
    
    // console.log(balanceFor);
    
    
    
    
    // const ArrBalance = movements.reduce((acc, cur, arr, i) => acc + cur , 0);
    // console.log(`Balance => ${ArrBalance}`);
    
    
    // console.log("Here end");
    
    // const movements = [202, -103, 111, -133, -233, 331];
    // for( const mov of movements) {
    //     if(mov > 0) {
    //         console.log(`You deposite ${mov}`);
    //     } else {
    //         console.log(`You withdarw  ${Math.abs(mov)}`);
    //     }
    // }

// movements.forEach(mov => {
//     if(mov > 0) {
//         console.log(`Dep ${mov}`);
//     } else {
//         console.log(`With ${Math.abs(mov)}`);
//     }
// })


console.log("..item..");

// for([i, movement] of movements.entries()) {
//     if( movement > 0) {
//         console.log(`Move ${i} : ${movement}`);
//     } else {
//         console.log(`Ment ${i} : ${Math.abs(movement)}`);
//     }
// }


// movements.forEach((movement, i) => {
//     if( movement > 0) {
//         console.log(`${i+1} : ${movement}`);
//     } else {
//         console.log(`${i+1} : ${movement}`);
//     }
// } );





// console.log(".....chevron......");
// const chev = new Map([['first','The energy chevron',],['second','The energy Total'],['third','The enertgy of shwemyanmar']]);

// chev.forEach((value, key , map) => {
//     console.log(`${key} => ${value} `)
// });


// const currencyUit = new Set(['USD', 'EUR', 'STRL','POUND', 'USD', "RUPY"]);

// console.log(currencyUit);

