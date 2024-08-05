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
test.set('moon', 'silver')

test.set('XXXhat', 'black')
test.set('XXXice cream', 'white')
test.set('XXXjacket', 'blue')
test.set('XXXkite', 'pink')
test.set('XXXlion', 'golden')
test.set('XXXmoon', 'silver')

console.log(test.entries());

test.set('lion', 'white')
console.log(test.entries());