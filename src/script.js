import { HashMap } from "./hashmap";
import { HashSet } from "./hashset";

function hashmapCommands() {
  console.log("-----------------HASHMAP OPERATIONS BEGIN-------------------");
  let test = new HashMap();
  console.log(test.set("apple", "red"));
  console.log(test.set("banana", "yellow"));
  console.log(test.set("carrot", "orange"));
  console.log(test.set("dog", "brown"));
  console.log(test.set("elephant", "gray"));
  console.log(test.set("frog", "green"));
  console.log(test.set("grape", "purple"));
  console.log(test.set("hat", "black"));
  console.log(test.set("ice cream", "white"));
  console.log(test.set("jacket", "blue"));
  console.log(test.set("kite", "pink"));
  console.log(test.set("lion", "golden"));

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

  console.log("------- Entries are as follows -------------");
  console.log(test.entries());

  console.log("-----------------HASHMAP OPERATIONS END-------------------");
}

function hashsetCommands() {
  console.log("-----------------HASHSET OPERATIONS BEGIN-------------------");
  let test = new HashSet();
  console.log(test.set("SET_apple"));
  console.log(test.set("SET_banana"));
  console.log(test.set("SET_carrot"));
  console.log(test.set("SET_dog"));
  console.log(test.set("SET_elephant"));
  console.log(test.set("SET_frog"));
  console.log(test.set("SET_grape"));
  console.log(test.set("SET_hat"));
  console.log(test.set("SET_ice cream"));
  console.log(test.set("SET_jacket"));
  console.log(test.set("SET_kite"));
  console.log(test.set("SET_lion"));

  console.log("------------------------");
  test.printMe();
  console.log("------------------------");
  console.log("Length: " + test.length());
  console.log("Has SET_apple?: " + test.has("SET_apple"));
  console.log("Has SET_grape?: " + test.has("SET_grape"));
  console.log("Has kitty?: " + test.has("kitty"));
  console.log("Has umbrella?: " + test.has("umbrella"));

  console.log("SET_lion Removed? : " + test.remove("SET_lion"));

  console.log("Keys = " + test.keys());

  console.log("------- Entries are as follows -------------");
  console.log(test.entries());

  test.clear();
  console.log("SET CLEARED");
  test.printMe();
  console.log("-----------------HASHSET OPERATIONS END-------------------");
}

hashmapCommands();
hashsetCommands();
