const calcAverageHumanAge = function(ages) {
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

    const adults = humanAges.filter(age => age >= 18);

    console.log(humanAges);
    console.log(adults);

    const average = adults.reduce((acc, cur) => acc + cur , 0) / adults.length;

    return average;



}
const avg1 = calcAverageHumanAge([5, 2, 4, 12, 8, 3])
const avg2 = calcAverageHumanAge([16, 6, 1, 5, 651])
// console.log(avg1)
// console.log(avg2)

console.log(avg1, avg2);