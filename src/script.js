import { HashMap } from "./hashmap";

let test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


console.log("------------------------");
test.printMe();
console.log("------------------------");
console.log("Length: " + test.length());
console.log("Has apple?: " + test.has("apple"));
console.log("Has lion?: " + test.has("dog"));
console.log("Has kitty?: " + test.has("kitty"));
console.log("Has umbrella?: " + test.has("umbrella"));

console.log("Lion Removed? : " + test.remove("lion"));

console.log("Keys = " + test.keys());
console.log("Values = " + test.values());

console.log("------- Entries are as follows -------------")
console.log(test.entries());