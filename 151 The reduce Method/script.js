const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//reduce method
const balance = movements.reduce(function(acc, cur, i , arr) {
    console.log(`${i} : ${acc}`)
    return acc + cur;
}, 100);

console.log(balance);

const balance1 = movements.reduce((acc, cur) => acc+cur,0);
console.log(balance1);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);