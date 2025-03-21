function BookArray() {
    // Call the parent constructor (Array)
    Array.call(this);
}

// Properly inherit from Array
BookArray.prototype = Object.create(Array.prototype);

// Ensure constructor is set correctly
BookArray.prototype.constructor = BookArray;

// Override push method
BookArray.prototype.push = function (x) {
    console.log("hello");
    return Array.prototype.push.call(this, x);
};

// Create an instance of BookArray
// let myBookArrayInst = new BookArray();

// myBookArrayInst.push(123);

// console.log(myBookArrayInst);
