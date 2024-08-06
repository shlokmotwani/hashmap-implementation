/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashMap: () => (/* binding */ HashMap)
/* harmony export */ });
class HashMap {
  constructor() {
    this.arrayCapacity = 16;
    this.buckets = new Array(this.arrayCapacity);
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    let newObject = { key: key, value: value, next: null };
    let hashCode = this.hash(key);
    let temp = this.buckets[hashCode];

    if (!temp) {
      this.buckets[hashCode] = newObject;
      this.expandIfOverloaded();
      return `(${key}, ${value}) pair set as HEAD.`;
    }
    let prev;
    while (temp) {
      if (temp.key === key) {
        temp.value = value;
        return;
      }
      prev = temp;
      temp = temp.next;
    }

    prev.next = newObject;
    this.expandIfOverloaded();
    return `(${key}, ${value}) added to LINKED LIST.`;
  }

  get(key) {
    let hashCode = this.hash(key);
    let temp = this.buckets[hashCode]; 
    if (temp) {
      return temp.value;
    }
    return null;
  }

  has(key) {
    let hashCode = this.hash(key);
    let temp = this.buckets[hashCode];
    if (temp) {
      while (temp) {
        if (temp.key === key) {
          return true;
        }
        temp = temp.next;
      }
    }
    return false;
  }

  remove(key) {
    let hashCode = this.hash(key);
    let head = this.buckets[hashCode];
    if (head) {
      let prev = head;
      let temp = head.next;
      if (head.key === key) {
        this.buckets[hashCode] = head.next;
        head.next = null;
        return true;
      }
      while (temp) {
        if (temp.key === key) {
          prev.next = temp.next;
          temp.next = null;
          return true;
        }
        temp = temp.next;
        prev = prev.next;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        while (temp) {
          count++;
          temp = temp.next;
        }
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(16);
  }

  keys() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        while (temp) {
          arr.push(temp.key);
          temp = temp.next;
        }
      }
    }
    return arr;
  }

  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        while (temp) {
          arr.push(temp.value);
          temp = temp.next;
        }
      }
    }
    return arr;
  }

  entries() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        while (temp) {
          arr.push(temp);
          temp = temp.next;
        }
      }
    }
    return arr;
  }

  printMe() {
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        let hashCode = this.hash(temp.key);
        let str = `${hashCode} : `;
        while (temp) {
          str += `{ ${temp.key} ${temp.value} } -> `;
          temp = temp.next;
        }
        str += "null";
        console.log(str);
      }
    }
  }

  expandIfOverloaded() {
    let isOverLoaded = this.length() >= this.loadFactor * this.arrayCapacity;
    if (!isOverLoaded) {
      return;
    }
    console.log("HashMap OVERLOADED");
    console.log("HashMap BEFORE OVERLOAD");
    this.printMe();

    //temporarily push all hashmap objects to an array
    let tempArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let temp = this.buckets[i];
      if (temp) {
        while (temp) {
          let objectToPush = { key: temp.key, value: temp.value, next: null };
          tempArray.push(objectToPush);
          temp = temp.next;
        }
      }
    }

    this.arrayCapacity *= 2;
    this.buckets = new Array(this.arrayCapacity);
    for (let i = 0; i < tempArray.length; i++) {
      this.set(tempArray[i].key, tempArray[i].value);
    }

    console.log("HashMap AFTER OVERLOAD");
    this.printMe();
  }
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashSet: () => (/* binding */ HashSet)
/* harmony export */ });
class HashSet {
    constructor() {
      this.arrayCapacity = 16;
      this.buckets = new Array(this.arrayCapacity);
      this.loadFactor = 0.75;
    }
  
    hash(key) {
      let hashCode = 0;
  
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode =
          (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      }
  
      return hashCode;
    }
  
    set(key) {
      let newObject = { key: key, next: null };
      let hashCode = this.hash(key);
      let temp = this.buckets[hashCode];
  
      if (!temp) {
        this.buckets[hashCode] = newObject;
        this.expandIfOverloaded();
        return `${key} set as HEAD.`;
      }
      let prev;
      while (temp) {
        if (temp.key === key) {
          return 'Key already exists.';
        }
        prev = temp;
        temp = temp.next;
      }
  
      prev.next = newObject;
      this.expandIfOverloaded();
      return `${key} added to LINKED LIST.`;
    }
  
    has(key) {
      let hashCode = this.hash(key);
      let temp = this.buckets[hashCode];
      if (temp) {
        while (temp) {
          if (temp.key === key) {
            return true;
          }
          temp = temp.next;
        }
      }
      return false;
    }
  
    remove(key) {
      let hashCode = this.hash(key);
      let head = this.buckets[hashCode];
      if (head) {
        let prev = head;
        let temp = head.next;
        if (head.key === key) {
          this.buckets[hashCode] = head.next;
          head.next = null;
          return true;
        }
        while (temp) {
          if (temp.key === key) {
            prev.next = temp.next;
            temp.next = null;
            return true;
          }
          temp = temp.next;
          prev = prev.next;
        }
      }
      return false;
    }
  
    length() {
      let count = 0;
      for (let i = 0; i < this.buckets.length; i++) {
        let temp = this.buckets[i];
        if (temp) {
          while (temp) {
            count++;
            temp = temp.next;
          }
        }
      }
      return count;
    }
  
    clear() {
      this.buckets = new Array(16);
    }
  
    keys() {
      let arr = [];
      for (let i = 0; i < this.buckets.length; i++) {
        let temp = this.buckets[i];
        if (temp) {
          while (temp) {
            arr.push(temp.key);
            temp = temp.next;
          }
        }
      }
      return arr;
    }

    entries() {
      let arr = [];
      for (let i = 0; i < this.buckets.length; i++) {
        let temp = this.buckets[i];
        if (temp) {
          while (temp) {
            arr.push(temp);
            temp = temp.next;
          }
        }
      }
      return arr;
    }
  
    printMe() {
      for (let i = 0; i < this.buckets.length; i++) {
        let temp = this.buckets[i];
        if (temp) {
          let hashCode = this.hash(temp.key);
          let str = `${hashCode} : `;
          while (temp) {
            str += `{ ${temp.key} } -> `;
            temp = temp.next;
          }
          str += "null";
          console.log(str);
        }
      }
    }
  
    expandIfOverloaded() {
      let isOverLoaded = this.length() >= this.loadFactor * this.arrayCapacity;
      if (!isOverLoaded) {
        return;
      }
      console.log("HashSet OVERLOADED");
      console.log("HashSet BEFORE OVERLOAD");
      this.printMe();
  
      //temporarily push all hashmap objects to an array
      let tempArray = [];
      for (let i = 0; i < this.buckets.length; i++) {
        let temp = this.buckets[i];
        if (temp) {
          while (temp) {
            let objectToPush = { key: temp.key, next: null };
            tempArray.push(objectToPush);
            temp = temp.next;
          }
        }
      }
  
      this.arrayCapacity *= 2;
      this.buckets = new Array(this.arrayCapacity);
      for (let i = 0; i < tempArray.length; i++) {
        this.set(tempArray[i].key, tempArray[i].value);
      }
  
      console.log("HashSet AFTER OVERLOAD");
      this.printMe();
    }
  }
  
  
  

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hashmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _hashset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



function hashmapCommands() {
  console.log("-----------------HASHMAP OPERATIONS BEGIN-------------------");
  let test = new _hashmap__WEBPACK_IMPORTED_MODULE_0__.HashMap();
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
  let test = new _hashset__WEBPACK_IMPORTED_MODULE_1__.HashSet();
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQiw2Q0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hhc2htYXAtaW1wbGVtZW50YXRpb24vLi9zcmMvaGFzaG1hcC5qcyIsIndlYnBhY2s6Ly9oYXNobWFwLWltcGxlbWVudGF0aW9uLy4vc3JjL2hhc2hzZXQuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC1pbXBsZW1lbnRhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYXNobWFwLWltcGxlbWVudGF0aW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYXNobWFwLWltcGxlbWVudGF0aW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGFzaG1hcC1pbXBsZW1lbnRhdGlvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhc2htYXAtaW1wbGVtZW50YXRpb24vLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhhc2hNYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFycmF5Q2FwYWNpdHkgPSAxNjtcbiAgICB0aGlzLmJ1Y2tldHMgPSBuZXcgQXJyYXkodGhpcy5hcnJheUNhcGFjaXR5KTtcbiAgICB0aGlzLmxvYWRGYWN0b3IgPSAwLjc1O1xuICB9XG5cbiAgaGFzaChrZXkpIHtcbiAgICBsZXQgaGFzaENvZGUgPSAwO1xuXG4gICAgY29uc3QgcHJpbWVOdW1iZXIgPSAzMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgICAgaGFzaENvZGUgPVxuICAgICAgICAocHJpbWVOdW1iZXIgKiBoYXNoQ29kZSArIGtleS5jaGFyQ29kZUF0KGkpKSAlIHRoaXMuYnVja2V0cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc2hDb2RlO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBsZXQgbmV3T2JqZWN0ID0geyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlLCBuZXh0OiBudWxsIH07XG4gICAgbGV0IGhhc2hDb2RlID0gdGhpcy5oYXNoKGtleSk7XG4gICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdO1xuXG4gICAgaWYgKCF0ZW1wKSB7XG4gICAgICB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdID0gbmV3T2JqZWN0O1xuICAgICAgdGhpcy5leHBhbmRJZk92ZXJsb2FkZWQoKTtcbiAgICAgIHJldHVybiBgKCR7a2V5fSwgJHt2YWx1ZX0pIHBhaXIgc2V0IGFzIEhFQUQuYDtcbiAgICB9XG4gICAgbGV0IHByZXY7XG4gICAgd2hpbGUgKHRlbXApIHtcbiAgICAgIGlmICh0ZW1wLmtleSA9PT0ga2V5KSB7XG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcHJldiA9IHRlbXA7XG4gICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgIH1cblxuICAgIHByZXYubmV4dCA9IG5ld09iamVjdDtcbiAgICB0aGlzLmV4cGFuZElmT3ZlcmxvYWRlZCgpO1xuICAgIHJldHVybiBgKCR7a2V5fSwgJHt2YWx1ZX0pIGFkZGVkIHRvIExJTktFRCBMSVNULmA7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgbGV0IGhhc2hDb2RlID0gdGhpcy5oYXNoKGtleSk7XG4gICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdOyBcbiAgICBpZiAodGVtcCkge1xuICAgICAgcmV0dXJuIHRlbXAudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGxldCBoYXNoQ29kZSA9IHRoaXMuaGFzaChrZXkpO1xuICAgIGxldCB0ZW1wID0gdGhpcy5idWNrZXRzW2hhc2hDb2RlXTtcbiAgICBpZiAodGVtcCkge1xuICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgaWYgKHRlbXAua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZW1vdmUoa2V5KSB7XG4gICAgbGV0IGhhc2hDb2RlID0gdGhpcy5oYXNoKGtleSk7XG4gICAgbGV0IGhlYWQgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdO1xuICAgIGlmIChoZWFkKSB7XG4gICAgICBsZXQgcHJldiA9IGhlYWQ7XG4gICAgICBsZXQgdGVtcCA9IGhlYWQubmV4dDtcbiAgICAgIGlmIChoZWFkLmtleSA9PT0ga2V5KSB7XG4gICAgICAgIHRoaXMuYnVja2V0c1toYXNoQ29kZV0gPSBoZWFkLm5leHQ7XG4gICAgICAgIGhlYWQubmV4dCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgaWYgKHRlbXAua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICBwcmV2Lm5leHQgPSB0ZW1wLm5leHQ7XG4gICAgICAgICAgdGVtcC5uZXh0ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgICBwcmV2ID0gcHJldi5uZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnVja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICBpZiAodGVtcCkge1xuICAgICAgICB3aGlsZSAodGVtcCkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmJ1Y2tldHMgPSBuZXcgQXJyYXkoMTYpO1xuICB9XG5cbiAga2V5cygpIHtcbiAgICBsZXQgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0ZW1wID0gdGhpcy5idWNrZXRzW2ldO1xuICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICBhcnIucHVzaCh0ZW1wLmtleSk7XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgdmFsdWVzKCkge1xuICAgIGxldCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnVja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICBpZiAodGVtcCkge1xuICAgICAgICB3aGlsZSAodGVtcCkge1xuICAgICAgICAgIGFyci5wdXNoKHRlbXAudmFsdWUpO1xuICAgICAgICAgIHRlbXAgPSB0ZW1wLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGVudHJpZXMoKSB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdGVtcCA9IHRoaXMuYnVja2V0c1tpXTtcbiAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICAgICAgYXJyLnB1c2godGVtcCk7XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgcHJpbnRNZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnVja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICBpZiAodGVtcCkge1xuICAgICAgICBsZXQgaGFzaENvZGUgPSB0aGlzLmhhc2godGVtcC5rZXkpO1xuICAgICAgICBsZXQgc3RyID0gYCR7aGFzaENvZGV9IDogYDtcbiAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICBzdHIgKz0gYHsgJHt0ZW1wLmtleX0gJHt0ZW1wLnZhbHVlfSB9IC0+IGA7XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gXCJudWxsXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwYW5kSWZPdmVybG9hZGVkKCkge1xuICAgIGxldCBpc092ZXJMb2FkZWQgPSB0aGlzLmxlbmd0aCgpID49IHRoaXMubG9hZEZhY3RvciAqIHRoaXMuYXJyYXlDYXBhY2l0eTtcbiAgICBpZiAoIWlzT3ZlckxvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkhhc2hNYXAgT1ZFUkxPQURFRFwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkhhc2hNYXAgQkVGT1JFIE9WRVJMT0FEXCIpO1xuICAgIHRoaXMucHJpbnRNZSgpO1xuXG4gICAgLy90ZW1wb3JhcmlseSBwdXNoIGFsbCBoYXNobWFwIG9iamVjdHMgdG8gYW4gYXJyYXlcbiAgICBsZXQgdGVtcEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0ZW1wID0gdGhpcy5idWNrZXRzW2ldO1xuICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICBsZXQgb2JqZWN0VG9QdXNoID0geyBrZXk6IHRlbXAua2V5LCB2YWx1ZTogdGVtcC52YWx1ZSwgbmV4dDogbnVsbCB9O1xuICAgICAgICAgIHRlbXBBcnJheS5wdXNoKG9iamVjdFRvUHVzaCk7XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXJyYXlDYXBhY2l0eSAqPSAyO1xuICAgIHRoaXMuYnVja2V0cyA9IG5ldyBBcnJheSh0aGlzLmFycmF5Q2FwYWNpdHkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnNldCh0ZW1wQXJyYXlbaV0ua2V5LCB0ZW1wQXJyYXlbaV0udmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiSGFzaE1hcCBBRlRFUiBPVkVSTE9BRFwiKTtcbiAgICB0aGlzLnByaW50TWUoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBIYXNoTWFwIH07XG4iLCJjbGFzcyBIYXNoU2V0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuYXJyYXlDYXBhY2l0eSA9IDE2O1xuICAgICAgdGhpcy5idWNrZXRzID0gbmV3IEFycmF5KHRoaXMuYXJyYXlDYXBhY2l0eSk7XG4gICAgICB0aGlzLmxvYWRGYWN0b3IgPSAwLjc1O1xuICAgIH1cbiAgXG4gICAgaGFzaChrZXkpIHtcbiAgICAgIGxldCBoYXNoQ29kZSA9IDA7XG4gIFxuICAgICAgY29uc3QgcHJpbWVOdW1iZXIgPSAzMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhhc2hDb2RlID1cbiAgICAgICAgICAocHJpbWVOdW1iZXIgKiBoYXNoQ29kZSArIGtleS5jaGFyQ29kZUF0KGkpKSAlIHRoaXMuYnVja2V0cy5sZW5ndGg7XG4gICAgICB9XG4gIFxuICAgICAgcmV0dXJuIGhhc2hDb2RlO1xuICAgIH1cbiAgXG4gICAgc2V0KGtleSkge1xuICAgICAgbGV0IG5ld09iamVjdCA9IHsga2V5OiBrZXksIG5leHQ6IG51bGwgfTtcbiAgICAgIGxldCBoYXNoQ29kZSA9IHRoaXMuaGFzaChrZXkpO1xuICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdO1xuICBcbiAgICAgIGlmICghdGVtcCkge1xuICAgICAgICB0aGlzLmJ1Y2tldHNbaGFzaENvZGVdID0gbmV3T2JqZWN0O1xuICAgICAgICB0aGlzLmV4cGFuZElmT3ZlcmxvYWRlZCgpO1xuICAgICAgICByZXR1cm4gYCR7a2V5fSBzZXQgYXMgSEVBRC5gO1xuICAgICAgfVxuICAgICAgbGV0IHByZXY7XG4gICAgICB3aGlsZSAodGVtcCkge1xuICAgICAgICBpZiAodGVtcC5rZXkgPT09IGtleSkge1xuICAgICAgICAgIHJldHVybiAnS2V5IGFscmVhZHkgZXhpc3RzLic7XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSB0ZW1wLm5leHQ7XG4gICAgICB9XG4gIFxuICAgICAgcHJldi5uZXh0ID0gbmV3T2JqZWN0O1xuICAgICAgdGhpcy5leHBhbmRJZk92ZXJsb2FkZWQoKTtcbiAgICAgIHJldHVybiBgJHtrZXl9IGFkZGVkIHRvIExJTktFRCBMSVNULmA7XG4gICAgfVxuICBcbiAgICBoYXMoa2V5KSB7XG4gICAgICBsZXQgaGFzaENvZGUgPSB0aGlzLmhhc2goa2V5KTtcbiAgICAgIGxldCB0ZW1wID0gdGhpcy5idWNrZXRzW2hhc2hDb2RlXTtcbiAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICAgICAgaWYgKHRlbXAua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICBcbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICBsZXQgaGFzaENvZGUgPSB0aGlzLmhhc2goa2V5KTtcbiAgICAgIGxldCBoZWFkID0gdGhpcy5idWNrZXRzW2hhc2hDb2RlXTtcbiAgICAgIGlmIChoZWFkKSB7XG4gICAgICAgIGxldCBwcmV2ID0gaGVhZDtcbiAgICAgICAgbGV0IHRlbXAgPSBoZWFkLm5leHQ7XG4gICAgICAgIGlmIChoZWFkLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgdGhpcy5idWNrZXRzW2hhc2hDb2RlXSA9IGhlYWQubmV4dDtcbiAgICAgICAgICBoZWFkLm5leHQgPSBudWxsO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICAgICAgaWYgKHRlbXAua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IHRlbXAubmV4dDtcbiAgICAgICAgICAgIHRlbXAubmV4dCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgICBwcmV2ID0gcHJldi5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICBcbiAgICBsZW5ndGgoKSB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgXG4gICAgY2xlYXIoKSB7XG4gICAgICB0aGlzLmJ1Y2tldHMgPSBuZXcgQXJyYXkoMTYpO1xuICAgIH1cbiAgXG4gICAga2V5cygpIHtcbiAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0ZW1wID0gdGhpcy5idWNrZXRzW2ldO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0ZW1wLmtleSk7XG4gICAgICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgbGV0IGFyciA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHRlbXApO1xuICAgICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICBcbiAgICBwcmludE1lKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgbGV0IGhhc2hDb2RlID0gdGhpcy5oYXNoKHRlbXAua2V5KTtcbiAgICAgICAgICBsZXQgc3RyID0gYCR7aGFzaENvZGV9IDogYDtcbiAgICAgICAgICB3aGlsZSAodGVtcCkge1xuICAgICAgICAgICAgc3RyICs9IGB7ICR7dGVtcC5rZXl9IH0gLT4gYDtcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLm5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ciArPSBcIm51bGxcIjtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzdHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBleHBhbmRJZk92ZXJsb2FkZWQoKSB7XG4gICAgICBsZXQgaXNPdmVyTG9hZGVkID0gdGhpcy5sZW5ndGgoKSA+PSB0aGlzLmxvYWRGYWN0b3IgKiB0aGlzLmFycmF5Q2FwYWNpdHk7XG4gICAgICBpZiAoIWlzT3ZlckxvYWRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIkhhc2hTZXQgT1ZFUkxPQURFRFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiSGFzaFNldCBCRUZPUkUgT1ZFUkxPQURcIik7XG4gICAgICB0aGlzLnByaW50TWUoKTtcbiAgXG4gICAgICAvL3RlbXBvcmFyaWx5IHB1c2ggYWxsIGhhc2htYXAgb2JqZWN0cyB0byBhbiBhcnJheVxuICAgICAgbGV0IHRlbXBBcnJheSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1Y2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmJ1Y2tldHNbaV07XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgd2hpbGUgKHRlbXApIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RUb1B1c2ggPSB7IGtleTogdGVtcC5rZXksIG5leHQ6IG51bGwgfTtcbiAgICAgICAgICAgIHRlbXBBcnJheS5wdXNoKG9iamVjdFRvUHVzaCk7XG4gICAgICAgICAgICB0ZW1wID0gdGVtcC5uZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIHRoaXMuYXJyYXlDYXBhY2l0eSAqPSAyO1xuICAgICAgdGhpcy5idWNrZXRzID0gbmV3IEFycmF5KHRoaXMuYXJyYXlDYXBhY2l0eSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnNldCh0ZW1wQXJyYXlbaV0ua2V5LCB0ZW1wQXJyYXlbaV0udmFsdWUpO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnNvbGUubG9nKFwiSGFzaFNldCBBRlRFUiBPVkVSTE9BRFwiKTtcbiAgICAgIHRoaXMucHJpbnRNZSgpO1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IHsgSGFzaFNldCB9O1xuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEhhc2hNYXAgfSBmcm9tIFwiLi9oYXNobWFwXCI7XG5pbXBvcnQgeyBIYXNoU2V0IH0gZnJvbSBcIi4vaGFzaHNldFwiO1xuXG5mdW5jdGlvbiBoYXNobWFwQ29tbWFuZHMoKSB7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS1IQVNITUFQIE9QRVJBVElPTlMgQkVHSU4tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICBsZXQgdGVzdCA9IG5ldyBIYXNoTWFwKCk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiYXBwbGVcIiwgXCJyZWRcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcImJhbmFuYVwiLCBcInllbGxvd1wiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiY2Fycm90XCIsIFwib3JhbmdlXCIpKTtcbiAgY29uc29sZS5sb2codGVzdC5zZXQoXCJkb2dcIiwgXCJicm93blwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiZWxlcGhhbnRcIiwgXCJncmF5XCIpKTtcbiAgY29uc29sZS5sb2codGVzdC5zZXQoXCJmcm9nXCIsIFwiZ3JlZW5cIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcImdyYXBlXCIsIFwicHVycGxlXCIpKTtcbiAgY29uc29sZS5sb2codGVzdC5zZXQoXCJoYXRcIiwgXCJibGFja1wiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiaWNlIGNyZWFtXCIsIFwid2hpdGVcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcImphY2tldFwiLCBcImJsdWVcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcImtpdGVcIiwgXCJwaW5rXCIpKTtcbiAgY29uc29sZS5sb2codGVzdC5zZXQoXCJsaW9uXCIsIFwiZ29sZGVuXCIpKTtcblxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgdGVzdC5wcmludE1lKCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICBjb25zb2xlLmxvZyhcIkxlbmd0aDogXCIgKyB0ZXN0Lmxlbmd0aCgpKTtcbiAgY29uc29sZS5sb2coXCJIYXMgYXBwbGU/OiBcIiArIHRlc3QuaGFzKFwiYXBwbGVcIikpO1xuICBjb25zb2xlLmxvZyhcIkhhcyBsaW9uPzogXCIgKyB0ZXN0LmhhcyhcImRvZ1wiKSk7XG4gIGNvbnNvbGUubG9nKFwiSGFzIGtpdHR5PzogXCIgKyB0ZXN0LmhhcyhcImtpdHR5XCIpKTtcbiAgY29uc29sZS5sb2coXCJIYXMgdW1icmVsbGE/OiBcIiArIHRlc3QuaGFzKFwidW1icmVsbGFcIikpO1xuXG4gIGNvbnNvbGUubG9nKFwiTGlvbiBSZW1vdmVkPyA6IFwiICsgdGVzdC5yZW1vdmUoXCJsaW9uXCIpKTtcblxuICBjb25zb2xlLmxvZyhcIktleXMgPSBcIiArIHRlc3Qua2V5cygpKTtcbiAgY29uc29sZS5sb2coXCJWYWx1ZXMgPSBcIiArIHRlc3QudmFsdWVzKCkpO1xuXG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLSBFbnRyaWVzIGFyZSBhcyBmb2xsb3dzIC0tLS0tLS0tLS0tLS1cIik7XG4gIGNvbnNvbGUubG9nKHRlc3QuZW50cmllcygpKTtcblxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tSEFTSE1BUCBPUEVSQVRJT05TIEVORC0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG59XG5cbmZ1bmN0aW9uIGhhc2hzZXRDb21tYW5kcygpIHtcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLUhBU0hTRVQgT1BFUkFUSU9OUyBCRUdJTi0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gIGxldCB0ZXN0ID0gbmV3IEhhc2hTZXQoKTtcbiAgY29uc29sZS5sb2codGVzdC5zZXQoXCJTRVRfYXBwbGVcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9iYW5hbmFcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9jYXJyb3RcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9kb2dcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9lbGVwaGFudFwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiU0VUX2Zyb2dcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9ncmFwZVwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiU0VUX2hhdFwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiU0VUX2ljZSBjcmVhbVwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiU0VUX2phY2tldFwiKSk7XG4gIGNvbnNvbGUubG9nKHRlc3Quc2V0KFwiU0VUX2tpdGVcIikpO1xuICBjb25zb2xlLmxvZyh0ZXN0LnNldChcIlNFVF9saW9uXCIpKTtcblxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgdGVzdC5wcmludE1lKCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICBjb25zb2xlLmxvZyhcIkxlbmd0aDogXCIgKyB0ZXN0Lmxlbmd0aCgpKTtcbiAgY29uc29sZS5sb2coXCJIYXMgU0VUX2FwcGxlPzogXCIgKyB0ZXN0LmhhcyhcIlNFVF9hcHBsZVwiKSk7XG4gIGNvbnNvbGUubG9nKFwiSGFzIFNFVF9ncmFwZT86IFwiICsgdGVzdC5oYXMoXCJTRVRfZ3JhcGVcIikpO1xuICBjb25zb2xlLmxvZyhcIkhhcyBraXR0eT86IFwiICsgdGVzdC5oYXMoXCJraXR0eVwiKSk7XG4gIGNvbnNvbGUubG9nKFwiSGFzIHVtYnJlbGxhPzogXCIgKyB0ZXN0LmhhcyhcInVtYnJlbGxhXCIpKTtcblxuICBjb25zb2xlLmxvZyhcIlNFVF9saW9uIFJlbW92ZWQ/IDogXCIgKyB0ZXN0LnJlbW92ZShcIlNFVF9saW9uXCIpKTtcblxuICBjb25zb2xlLmxvZyhcIktleXMgPSBcIiArIHRlc3Qua2V5cygpKTtcblxuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0gRW50cmllcyBhcmUgYXMgZm9sbG93cyAtLS0tLS0tLS0tLS0tXCIpO1xuICBjb25zb2xlLmxvZyh0ZXN0LmVudHJpZXMoKSk7XG5cbiAgdGVzdC5jbGVhcigpO1xuICBjb25zb2xlLmxvZyhcIlNFVCBDTEVBUkVEXCIpO1xuICB0ZXN0LnByaW50TWUoKTtcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLUhBU0hTRVQgT1BFUkFUSU9OUyBFTkQtLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xufVxuXG5oYXNobWFwQ29tbWFuZHMoKTtcbmhhc2hzZXRDb21tYW5kcygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9