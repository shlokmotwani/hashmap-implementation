class HashMap {
  constructor() {
    this.buckets = new Array(16);
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
    let hashCode = this.hash(key);
    if (this.buckets[hashCode]) {
      this.buckets[hashCode] = { key, value };
      return `(${key}, ${value}) pair overwritten.`;
    }
    this.buckets[hashCode] = { key, value };
    return `(${key}, ${value}) pair set.`;
  }

  get(key) {
    let hashCode = this.hash(key);
    if (this.buckets[hashCode]) {
      return this.buckets[hashCode].value;
    }
    return null;
  }

  has(key) {
    let hashCode = this.hash(key);
    if (this.buckets[hashCode] && this.buckets[hashCode].key === key) {
      return true;
    }
    return false;
  }

  remove(key) {
    let hashCode = this.hash(key);
    if (this.buckets[hashCode]) {
      this.buckets[hashCode] = null;
      return true;
    }
    return false;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        count++;
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
      if (this.buckets[i]) {
        arr.push(this.buckets[i].key);
      }
    }
    return arr;
  }

  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        arr.push(this.buckets[i].value);
      }
    }
    return arr;
  }

  entries() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let obj = {};
        obj[this.buckets[i].key] = this.buckets[i].value;
        arr.push(obj);
      }
    }
    return arr;
  }
}

export { HashMap };
