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

export { HashMap };
