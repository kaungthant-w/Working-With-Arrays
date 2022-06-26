const currencies = new Map([
    ["USD", "United Stated Dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound Sterling"],
]);

currencies.forEach(function(value, key, map) {
    console.log(`Symbol => ${key} , \n Meaning => ${value} `)
})

const currencyUnique = new Set(["USD", "EUR", "GBP", "USD", "GBP", "USD"]);

console.log(currencyUnique);

currencyUnique.forEach(function(value, _, map) {
    console.log(`${value} => ${value}`)
})