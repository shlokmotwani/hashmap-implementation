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
  
  export { HashSet };
  