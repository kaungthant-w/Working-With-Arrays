const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const calcAverageHumanAge = ages => ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age >= 18).reduce((acc, age ,i ,arr) => acc + age / arr.length, 0 );


const avg1 = calcAverageHumanAge([5, 2, 4, 12, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 1, 5, 651]);

console.log(avg1)
console.log(avg2);