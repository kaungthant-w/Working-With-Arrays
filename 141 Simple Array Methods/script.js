const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// array slice
console.log(arr.slice(1));
console.log(arr);

console.log(arr.slice(1,3));

console.log(arr.slice(-1));

console.log(arr.slice(-2));

console.log(arr.slice(1,-2));

console.log(arr.slice())

console.log([...arr]);

//splice
// console.log(arr.splice(2));

console.log(arr.splice(-1));
console.log(arr);

console.log(arr.splice(1));
console.log(arr);

// console.log(arr.splice(2))
console.log(arr);


//reverse
const mimi = ["sister", "Young Sister", "Brother", "Cusion"];

console.log(mimi.reverse());
console.log(mimi);

//concat
const arr1 = ["a", "b", "k", "G", "F"]
const arr2 = ["h", "i", "j", "k","F"]
console.log(arr1.concat(arr2))
console.log([...arr1 , ...arr2]);

//join having
const twoArr = ([...arr1, ...arr2]);
console.log(twoArr.join(" "));




