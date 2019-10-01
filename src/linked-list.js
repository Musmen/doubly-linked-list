const Node = require('./node');

class LinkedList {
  constructor(head = null, tail = null, length = 0) {
    this._head = head;
    this._tail = tail;
    this.length = length;
  }

  append(data) {
    var node = new Node(data);
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      var currentNode = this._head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      node.prev = currentNode;
      currentNode.next = node;
      this._tail = currentNode.next;
    }
    this.length++;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    if (index < 0 || index > this.length) {
      return false;
    }
    var current = this._head;
    var count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current.data;
  }

  searchAt(index) {
    if (index < 0 || index > this.length - 1) {
      return false;
    }
    var current = this._head;
    var count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  insertAfter(index, data) {
    var current = this.searchAt(index);
    if (!current) {
      return false;
    }
    var node = new Node(data);
    node.next = current.next;
    node.prev = current;
    if (index === this.length - 1) {
      this._tail.next = node;
      this._tail = node;
    } else {
      current.next.prev = node;
      current.next = node;
    }
    this.length++;
  }

  insertAt(index, data) {
    var current = this.searchAt(index);
    if (!current) {
      return false;
    }
    var node = new Node(data);
    node.next = current;
    if (index == 0) {
      this._head = node;
    } else {
      node.prev = current.prev;
      current.prev.next = node;
    } 
    current.prev = node;
    this.length++;
  }

  isEmpty() {
    return !(this.length);
  }

  clear() {
    var node = new Node();
    this._head = node;
    this._tail = node;
    this.length = 0;
  }

  deleteAt(index) {
    if (index < 0 || index > this.length) {
      return false;
    }
    var result;
    if (index === 0) {
      result = this._head.data;
      this._head = this._head.next;
      this._head.prev = null;
    } else if (index === this.length - 1) {
      result = this._tail.data;
      this._tail = this._tail.prev;
      this._tail.next = null;
    } else {
      var count = 0;
      var current = this._head;
      while (count < index) {
        current = current.next;
        count++;
      }
      result = current.data;
      current.prev.next = current.next;
      current.next.prev = current.prev;
      // current.next = null;
      // current.prev = null;
    }
    this.length--;
    return result;
  }

  reverse() {
    var index = 0;
    while (index < this.length) {
      var temp = this._head;
      this.insertAfter(this.length - 1 - index, temp.data);
      this.deleteAt(0);
      index++;
    }
  }

  indexOf(data) {
    if (!this.length) {
      return false;
    }
    var count = 0;
    var current = this._head;
    while (count < this.length) {
      if (current.data === data) {
        return count;
      }
      current = current.next;
      count++;
    }
    return -1;
  }
}

module.exports = LinkedList;
