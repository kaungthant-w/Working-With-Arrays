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
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-07-26T12:01:20.894Z',
    '2020-05-27T17:01:17.194Z',
    '2022-06-05T16:33:06.386Z',
    '2022-07-10T14:43:26.374Z',
  ],
  currency:"EUR",
  locale:'en-US',

};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2021-02-05T16:33:06.386Z',
    '2022-01-05T16:33:06.386Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-07-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
    '2022-07-26T12:01:20.894Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency:"EUR",
  locale:'en-US',

};

const accounts = [account1, account2];

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

const formatMovementDate = function(date) {

  const calcDayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  
  const daysPassed = calcDayPassed(new Date(), date);
  console.log(daysPassed);

  if(daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if(daysPassed <= 7) return `${daysPassed}days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style:"currency",
    currency:currency,

  }).format(value);
}

// Lecture
const displayMovements = function(acc , sort = false) {

  const movs = sort ? acc.movements.slice().sort( (a, b) => a - b ) : acc.movements;

  containerMovements.innerHTML = "";
  movs.forEach(function(mov, i) {

    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    const formatedMov = formatCur(mov, acc.locale, acc.currency);
    // const formatted = new Intl.NumberFormat(acc.locale, {
    //   style:"currency",
    //   currency:acc.currency,
    // }).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i+1} ${type} </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const createUserNames = function(accs) {

  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join('');
  });
  
}

createUserNames(accounts);

// balance
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) =>  acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}???`;
}

// calcDisplayBalance(account1.movements);

// Update UI
const UpdateUI = function(acc) {
   //display movements
   displayMovements(acc);

   //display balance
   calcDisplayBalance(acc);

   //display summary
   calcDisplaySummary(acc);
}

// logout timer

const startLogoutTimer = function() {

  const tick = function() {

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    
    // In each call, print the remaing time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // // Decrease is
    // time--;

    // when 0 seconds, stop timer and log out user
    if(time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get start";
      containerApp.style.opacity = 0;
    }

    // DECREASE 14
      time--; 

  }
  // Set time to 5 min
  let time = 120;

  // Call the time every second
  tick();
  const timer = setInterval( tick, 1000);
  return timer;

}

//summary
const calcDisplaySummary = function(acc) {

  // incomes
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) =>  acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  //outcomes
  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) =>  acc + mov, 0);
  labelSumOut.textContent = formatCur(outcomes, acc.locale, acc.currency);
  //interest
  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * 1.2) / 100).filter(mov => mov >= 1).reduce((acc, mov) =>  acc + mov, 0);
  labelSumInterest.textContent = interest
}

// calcDisplaySummary(account1.movements);

//handler


//fake always logged in
// currentAccount = account2;
// UpdateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting API
const now = new Date();

const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  month : 'long',
  year : '2-digit',
  weekday : "long",

};

labelDate.textContent = new Intl.DateTimeFormat('pt-PT', options).format(now);
// labelDate.textContent = new Intl.DateTimeFormat('en-GB').format(now);
// labelDate.textContent = new Intl.DateTimeFormat('ar-SY').format(now);
// labelDate.textContent = new Intl.DateTimeFormat('ca-ES').format(now);
// labelDate.textContent = new Intl.DateTimeFormat('be-BY').format(now);

let currentAccount, timer;
btnLogin.addEventListener("click", function(e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  if(currentAccount?.pin === +(inputLoginPin.value)) {
      //display UI and message
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" "   )[0]}`;
      containerApp.style.opacity = 100;

      const now = new Date();
      const day = `${now.getDate()}`.padStart(2, 0);
      const month = `${now.getMonth() + 1}`.padStart(2, 0);
      const year = now.getFullYear();
      const hour = now.getHours();
      const min = now.getMinutes();
      labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

      //clear input fields
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();

      // Timer

      if(timer) clearInterval(timer);
      timer = startLogoutTimer();

      //Update UI
      UpdateUI(currentAccount);
  }

  
});

btnTransfer.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, reciverAcc);

  inputTransferAmount.value = inputTransferTo.value = "";

  if(
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
      //Doing the transfer
      currentAccount.movements.push(-amount);
      reciverAcc.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());
      reciverAcc.movementsDates.push(new Date().toISOString());

      //Update UI
      UpdateUI(currentAccount);

      clearInterval(timer);
      timer = startLogoutTimer();
  }
});


btnClose.addEventListener("click", function(e) {
  e.preventDefault();
  if( inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // console.log(index);
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = "";


});

btnLoan.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1) ) {
    setTimeout(function() {
    // add movement
    currentAccount.movements.push(amount);

    // add load date
    currentAccount.movementsDates.push(new Date().toISOString());

    // update UI
    UpdateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
    }, 2500)
    
  }
  inputLoanAmount.value = '';
});


let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted
    );

    sorted = !sorted;
})


labelBalance.addEventListener("click", function() {
  [...document.querySelectorAll(".movements__row")].forEach(function(row, i){
    if(i % 2 === 0) row.style.backgroundColor = "green";
    row.style.color = "white";

    if(i % 3 === 0) row.style.backgroundColor = "black";
  })
})

// ========================================
// const user = "Steven Thomas Williams";
// const username = user.toLowerCase().split(" ").map(name => name[0]).join("");
// return username;
// console.log(createUserName("Steven Thomas Williams"));


// setTimeout(() => {
//   const mov = new Date();
//   console.log(mov);
// }, 3000);


// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 1000);