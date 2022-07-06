const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// PIPELINE
const eurTousd = 1.1;
const totalDepositeUSD = movements.filter(mov => mov > 0).
map(mov => mov * eurTousd).
reduce((mov, acc) => mov + acc, 0);

console.log(`Total Deposites => ${totalDepositeUSD}`);


const totalWithdrawalUSD = movements.filter(mov => mov < 0).
map(mov => mov * eurTousd).
reduce((mov, acc) => mov + acc, 0);

console.log(`Total withdrawals =>  ${Math.abs(totalWithdrawalUSD)}`);


const totalDpoUSD = movements.filter(mov => mov > 0).
map((mov, i, arr) => {
    console.log(arr);
    return mov * eurTousd;
}).
reduce((mov, acc) => mov + acc, 0);
console.log(totalDpoUSD);


const totalWdlUSD = movements.filter(mov => mov < 0).
map((mov, i, arr) => {
    console.log(arr);
    return mov * eurTousd;
}).
reduce((mov, acc) => mov + acc, 0);

console.log(totalWdlUSD);