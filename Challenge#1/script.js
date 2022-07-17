// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

const checkDogs = function(dogsJulia, dogsKate) {
    const correctedDogs = dogsJulia.slice();
    correctedDogs.splice(-2);
    console.log(correctedDogs);
    const bothDogs = [...correctedDogs, ...dogsKate];
    console.log(bothDogs);

    bothDogs.forEach(function(dog, i) {
        if(dog >= 3) {
            console.log(`Dog number ${i+1} is an adult , and is ${dog} years old `);
        } else {
            console.log(`Dog number ${i+1} is a puppy , and is ${dog} years old`);
        }
    })
}

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


const addArray = [3, 2, 5, 8, 9, 10, 23];
const addUpdate = addArray.map( (add) => add * 2);
console.log(addUpdate);

const salery = [150000, 260000, 300000, 700000];

const saleryYear = salery.map(sa => sa + 2000);
console.log(saleryYear);

const higherSalery = saleryYear.filter(sa => sa > 300000);
console.log(higherSalery);

const totalSalery = saleryYear.reduce((sa,i) => sa + i);
console.log(totalSalery);