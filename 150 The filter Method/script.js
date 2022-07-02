//filter method
// deposite
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposite = movements.filter(mov => mov > 0);

console.log(deposite);

// for of (deposite)
const depositeMovFor = [];
for(const movement of movements) {
    if(movement > 0) { 
        depositeMovFor.push(movement);
    } 
}
console.log(depositeMovFor);

//filter (withdraw) 
const withdraw = movements.filter(mov => mov < 0);
console.log(withdraw);

// for of (withdraw)
const withdrawMov = [];
for(const withdraw of movements) {
    if (withdraw < 0) {
        withdrawMov.push(withdraw);
    }
}
console.log(withdrawMov)